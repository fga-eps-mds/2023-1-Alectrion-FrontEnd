/* eslint-disable no-empty-pattern */
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button, Flex, Grid, GridItem, Box } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { Select, SingleValue } from 'chakra-react-select';

import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api, apiSchedula } from '@/config/lib/axios';
import { User, LoginResponse } from '../../constants/user';
import { Workstation } from '@/constants/equipment';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';

type FormValues = {
  tippingNumber: string;
  equipmentId: string;
  authorId: string;
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

  const [selectedSender, setSelectedSender] = useState<User>();
  const [selectedReceiver, setSelectedReceiver] = useState<User>();

  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation>();

  const take = 5;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const setLocalStorage = async () => {
    const { data }: AxiosResponse<LoginResponse> = await api.post(
      '/user/login',
      {
        username: "admin",
        password: "admin1234"
      }
    )
    const { token, expireIn, email, name, role } = data
    localStorage.setItem(
      '@App:user',
      JSON.stringify({ token, expireIn, email, name, role })
    )
    localStorage.setItem('@App:token', token)

    api.defaults.headers.common.Authorization = 'Bearer ' + token
  }

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

  const fetchSender = async (username: string) => {
    try {
      const token = localStorage.getItem('@App:token') || '';
      const { data }: AxiosResponse<User[]> = await api.get(`user/get`, {
        params: { userName: username },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedSender(data[0]);
    } catch (error) {
      setSelectedSender(undefined);
      console.error(error);
    }
  };

  const fetchReceiver = async () => {
    try {
      const loggedUser = JSON.parse(
        localStorage.getItem('@App:user') || ''
      ) as unknown as LoginResponse;
      const { data }: AxiosResponse<User[]> = await api.get(`user/get`, {
        params: { email: loggedUser.email },
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
      });
      setSelectedReceiver(data[0]);
    } catch (error) {
      setSelectedReceiver(undefined);
      console.error(error);
    }
  };

  const handleSenderSearch = debounce(async (e) => {
    const str = e.target.value;
    fetchSender(str);
  }, 500);

  useEffect(() => {
    setLocalStorage();
    getWorkstations();
    fetchReceiver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { description, senderPhone } = formData;

      const payload = {
        equipmentId: selectedEquipment?.id,
        description,
        authorId: selectedReceiver?.id,
        receiverName: selectedReceiver?.name,
        authorFunctionalNumber: selectedReceiver?.id,
        senderName: selectedSender?.name,
        senderFunctionalNumber: selectedSender?.id,
        date: new Date().toISOString(),
        receiverFunctionalNumber: selectedReceiver?.name,
        senderPhone,
      };

      const response = await api.post(
        `equipment/create-order-service/${selectedEquipment?.id}`,
        payload
      );
      toast.success('Ordem de serviço cadastrada com sucesso', 'Sucesso');
      setRefreshRequest(!refreshRequest);
      console.log(response.data);
      onClose();
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao cadastrar ordem de serviço';
      toast.error(message);
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
          <strong>Usuário(Funcional Temporária):</strong>
          <Input
            placeholder="username"
            errors={undefined}
            onChange={handleSenderSearch}
          />
        </GridItem>
        <GridItem>
          <strong>Responsável pela entrega:</strong>
          <Input
            errors={errors.senderName}
            placeholder="Responsável"
            type="text"
            defaultValue={selectedSender?.name}
          />
        </GridItem>
        <GridItem>
          <strong>Atribuição:</strong>
          <Input
            errors={undefined}
            placeholder="Atribuição"
            name="atribuicao"
            defaultValue={selectedSender?.job}
          />
        </GridItem>

        <GridItem>
          <strong>Posto de trabalho:</strong>
          <Select
            placeholder="Posto de trabalho"
            name="Posto de trabalho"
            options={formattedOptions(workstations, 'name', 'name')}
            onChange={handleWorkstationChange}
          />
        </GridItem>
        <GridItem>
          <strong>Cidade:</strong>
          <Input
            placeholder="Cidade"
            errors={undefined}
            defaultValue={selectedWorkstation?.city.name || ''}
            readOnly
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
        <GridItem />
        <GridItem gridColumn="1 / span 3">
          <TextArea
            errors={errors.description}
            label="Descrição:"
            maxChars={255}
            {...register('description', {
              maxLength: 255,
            })}
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
