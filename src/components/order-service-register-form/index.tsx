/* eslint-disable no-empty-pattern */
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button, Flex, Grid, GridItem, Box } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { Select, SingleValue } from 'chakra-react-select';

import { Input } from '../form-fields/input';
import { ControlledSelect } from '@/components/form-fields/controlled-select';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api, apiSchedula } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/order-service/order-service-control';
import { User } from '../../constants/user';
import { Workstation } from '@/constants/equipment';

type FormValues = {
  tippingNumber: string;
  equipmentId: string;
  userId: string;
  receiverName: string;
  authorFunctionalNumber: string;
  senderName: string;
  senderFunctionalNumber: string;
  senderTelefone?: string;
  date: string;
  receiverFunctionalNumber: string;
  description: string;
  senderPhone: string;
};

interface ISelectOption {
  label: string;
  value: number | string;
}

interface OrderServiceFormProps {
  onClose: () => void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderServiceregisterForm({
  onClose,
  refreshRequest,
  setRefreshRequest,
}: OrderServiceFormProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>();
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);

  const [selectedFuncionario, setSelectedFuncionario] = useState<User>();

  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation>();

  const take = 5;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const fetchEquipments = async (str: string) => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find?searchTipping=${str}&take=${take}`
      );
      setEquipments(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  const formattedOptions = <T, K extends keyof T>(
    data: T[],
    label: K,
    value: K
  ): ISelectOption[] => {
    return data?.map((item: T) => {
      const optionLable = String(item[label]); // Converter para string
      const optionValue: number | string = String(item[value]); // Converter para string
      return { label: optionLable, value: optionValue };
    });
  };

  const getWorkstations = async () => {
    apiSchedula
      .get<Workstation[]>('workstations')
      .then((response) => {
        setWorkstations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = debounce(async (str) => {
    if (str !== '') {
      fetchEquipments(str);
    }
  }, 500);

  const handleChange = (event: SingleValue<ISelectOption>) => {
    const selectedOption = equipments.find(
      (equipment) => equipment.tippingNumber === event?.value
    );
    setSelectedEquipment(selectedOption);
  };
  const handleWorkstationChange = (event: SingleValue<ISelectOption>) => {
    const selectedOption = workstations.find(
      (workstation) => workstation.name === event?.value
    );
    setSelectedWorkstation(selectedOption);
  };
  const fetchUser = async (username: string) => {
    const token = localStorage.getItem('@App:token') || '';
    try {
      const { data }: AxiosResponse<User[]> = await api.get(`user/get`, {
        params: { userName: username },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedFuncionario(data[0]);
    } catch (error) {
      setSelectedFuncionario(undefined);
      console.error(error);
    }
  };

  const handleUsernameSearch = debounce(async (e) => {
    const str = e.target.value;
    fetchUser(str);
    console.log(str);
  }, 500);

  useEffect(() => {
    console.log(selectedEquipment);
  }, [selectedEquipment]);

  useEffect(() => {
    getWorkstations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const {
        equipmentId,
        userId,
        receiverName,
        authorFunctionalNumber,
        senderName,
        senderFunctionalNumber,
        description,
        date,
        receiverFunctionalNumber,
        senderPhone,
      } = formData;

      const payload = {
        equipmentId: selectedEquipment?.id || '',
        userId: userId.valueOf,
        receiverName: receiverName.valueOf,
        authorFunctionalNumber: authorFunctionalNumber.valueOf,
        senderName: senderName.valueOf,
        senderFunctionalNumber: senderFunctionalNumber.valueOf,
        description: description.valueOf,
        date: date.valueOf,
        receiverFunctionalNumber: receiverFunctionalNumber.valueOf,
        senderPhone: senderPhone.valueOf,
      };

      const response = await api.post('create-order-service', payload);

      if (response.status === 200) {
        toast.success('Ordem de serviço cadastrada com sucesso', 'Sucesso');
        setRefreshRequest(!refreshRequest);
        onClose();
        return;
      }
      toast.error('Erro ao tentar cadastrar ordem de serviço', 'Erro');
    } catch {
      toast.error('Erro ao tentar cadastrar ordem de serviço', 'Erro');
    }
  });

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem
          gridColumn="1 / span 3"
          display="flex"
          alignItems="center"
          gap={4}
        >
          <strong>Nº de tombamento do equipamento:</strong>
          <Box flex="1">
            <Select
              placeholder="Pesquisa"
              onInputChange={handleSearch}
              onChange={handleChange}
              options={formattedOptions(
                equipments,
                'tippingNumber',
                'tippingNumber'
              )}
            />
          </Box>
        </GridItem>
        <GridItem>
          <strong>Tipo:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Tipo"
            defaultValue={selectedEquipment?.type || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Nº de série:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Nº de série"
            defaultValue={selectedEquipment?.serialNumber || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Marca:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Marca"
            defaultValue={selectedEquipment?.brand.name || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Modelo:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Modelo"
            defaultValue={selectedEquipment?.model || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Lotação:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Lotação"
            defaultValue={selectedEquipment?.unit.localization || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Situação:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Situação"
            defaultValue={selectedEquipment?.situacao || ''}
            readOnly
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <strong> Ordem de serviço</strong>
        </GridItem>
        <GridItem>
          <strong>Usuário:</strong>
          <Input
            placeholder="Usuário"
            errors={errors.senderName}
            onChange={handleUsernameSearch}
          />
        </GridItem>
        <GridItem>
          <strong>Responsável pela entrega:</strong>
          <Input
            errors={errors.receiverName}
            placeholder="Responsável"
            type="text"
            defaultValue={selectedFuncionario?.name}
          />
        </GridItem>
        <GridItem>
          <strong>Telefone:</strong>
          <Input
            placeholder="Telefone"
            type="text"
            errors={errors.senderPhone}
            {...register('senderPhone', {
              required: 'Campo obrigatório',
              maxLength: 15,
              pattern: {
                value: /^[0-9]+$/,
                message: 'Por favor, digite apenas números.',
              },
            })}
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <strong>Descrição:</strong>
          <Input
            errors={errors.description}
            placeholder="Descrição"
            type="text"
            {...register('description')}
          />
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(3, 3fr)" gap={6} />
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" form="equipment-register-form" variant="primary">
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}
