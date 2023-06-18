/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Select,
  useSafeLayoutEffect,
} from '@chakra-ui/react';
import { error } from 'console';
import { SingleValue } from 'chakra-react-select';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { TextArea } from '../form-fields/text-area';
import { NewControlledSelect } from '../form-fields/new-controlled-select';
import { OSSTATUS } from '@/constants/orderservice';
import { User } from '@/constants/user';

type EditOrderServiceFormValues = {
  equipment: EquipmentData;
  senderName: string;
  senderDocument: string;
  seiProcess: string;

  status: string;
  description: string;
};

interface ISelectOption {
  label: string;
  value: number | string;
}

interface EditOrderServiceFormProps {
  onClose: () => void;
  orderService: EditOrderServiceFormValues;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderServiceEditForm({
  onClose,
  orderService,
  refreshRequest,
  setRefreshRequest,
}: EditOrderServiceFormProps) {
  const take = 5;
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);
  const [receiver, setReceiver] = useState<User>();
  const [sender, setSender] = useState<User>();

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

  const handleChange = (event: SingleValue<ISelectOption>) => {
    const selectedOption = equipments.find(
      (equipment) => equipment.tippingNumber === event?.value
    );
    setSelectedEquipment(selectedOption as EquipmentData);
  };
  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<EditOrderServiceFormValues>({
    defaultValues: orderService,
  });

  const watchStatus = watch('status');

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>(
    orderService.equipment
  );
  console.log(orderService);
  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };
  const formattedOptions = <T, K extends keyof T>(
    data: T[],
    label: K,
    value: K
  ): ISelectOption[] => {
    return data?.map((item: T) => {
      const optionLable = String(item[label]);
      const optionValue: number | string = String(item[value]);
      return { label: optionLable, value: optionValue };
    });
  };
  const handleSearch = debounce(async (str) => {
    if (str !== '') {
      fetchEquipments(str);
    }
  }, 500);
  const onSubmit = handleSubmit(async (formData) => {
    try {
      const {
        senderName,
        seiProcess,
        senderDocument,
        description,
        ...rest
      } = formData;
      const payload = {
        senderName: senderName.valueOf,
        senderDocument: senderDocument.valueOf,
        seiProcess: seiProcess.valueOf,
        description: description.valueOf,
        ...rest,
      };

      const response = await api.put(
        'order-service/updateOrderService',
        payload
      );

      if (response.status === 200) {
        toast.success('Ordem de serviço editada com sucesso', 'Sucesso');
        setRefreshRequest(!setRefreshRequest);
        if (onClose) {
          onClose();
        }
        return;
      }
      toast.error('Erro ao tentar editar a Ordem de serviço', 'Erro');
    } catch {
      toast.error('Erro ao tentar editar a Ordem de serviço', 'Erro');
    }
  });

  useEffect(() => {}, [watchStatus]);

  useEffect(() => {}, []);
  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem gridColumn="1 / span 2">
          <strong>Nº de tombamento:</strong>
          <Box flex="1">
            <Input
              defaultValue={selectedEquipment.tippingNumber}
              errors={errors.equipment?.tippingNumber}
              isReadOnly
            />
          </Box>
        </GridItem>
        <GridItem>
          <strong>Status:</strong>
          <Box flex="1">
            <NewControlledSelect
              name="status"
              control={control}
              options={OSSTATUS}
            />
          </Box>
        </GridItem>
        <GridItem>
          <strong>Tipo:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Tipo"
            defaultValue={selectedEquipment.type || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Nº de série:</strong>
          <Input
            errors={undefined}
            type="text"
            defaultValue={selectedEquipment.serialNumber}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Marca:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Marca"
            defaultValue={selectedEquipment.brand.name}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Modelo:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Modelo"
            defaultValue={selectedEquipment.model}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Lotação:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Lotação"
            defaultValue={selectedEquipment.unit.localization}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Situação:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Situação"
            defaultValue={selectedEquipment.situacao}
            readOnly
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <strong>Ordem de Serviço:</strong>
        </GridItem>
        <GridItem>
          <strong>Responsável pela entrega</strong>
          <Input
            errors={errors.senderName}
            type="text"
            {...register('senderName')}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong> Funcional/CPF </strong>
          <Input
            errors={errors.senderDocument}
            type="text"
            placeholder="Funcional/CPF"
            {...register('senderDocument')}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Processo SEI</strong>
          <Input
            errors={errors.seiProcess}
            type="text"
            placeholder="Processo SEI"
            {...register('seiProcess', {
              required: true,
              minLength: 15,
              maxLength: 15,
            })}
          />
        </GridItem>
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
        {watchStatus === 'Concluído' && (
          <GridItem>
            <Input
              label="Técnico Responsável"
              errors={errors.senderName}
              type="text"
              placeholder="Nome do Recebedor"
              {...register('senderName', {
                required: 'Campo Obrigatório',
              })}
            />
          </GridItem>
        )}
      </Grid>
      <Flex gap="9rem" mt="2rem" mb="2rem" justify="center">
        <GridItem>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </GridItem>
        <GridItem>
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </GridItem>
      </Flex>
    </form>
  );
}
