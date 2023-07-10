/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { SingleValue } from 'chakra-react-select';
import { format } from 'date-fns';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { TextArea } from '../form-fields/text-area';
import { NewControlledSelect } from '../form-fields/new-controlled-select';
import { OSSTATUS } from '@/constants/orderservice';
import { LoginResponse, User } from '@/constants/user';

type EditOrderServiceFormValues = {
  equipment: EquipmentData;
  equipmentId: string;
  seiProcess: string;
  id: string;
  status: string;
  description: string;
  finishDate: string;
  withdrawalName?: string;
  withdrawalDocument?: string;
  senderName?: string;
  senderDocument?: string;
  technicianName?: string;
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
  const [buttonText, setButtonText] = useState('Salvar');
  
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

  useEffect(() => {
    resetField('withdrawalName');
    resetField('withdrawalDocument');
    resetField('technicianName');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetField, watchStatus]);

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>(
    orderService.equipment
  );
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
        seiProcess,
        description,
        status,
        withdrawalName,
        withdrawalDocument,
        technicianName,
      } = formData;
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      const payload = {
        equipmentId: selectedEquipment.id,
        seiProcess,
        description,
        withdrawalName,
        withdrawalDocument,
        status,
        finishDate: formattedDate,
        id: orderService.id,
        technicianName,
      };

      const loggedUser = JSON.parse(
        localStorage.getItem('@alectrion:user') || ''
      ) as unknown as LoginResponse;

      const response = await api.put('equipment/updateOrderService', payload, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        }});

      if (response.status === 200) {
        toast.success('Ordem de serviço editada com sucesso', 'Sucesso');
        setRefreshRequest(!refreshRequest);
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

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    watchStatus === 'CONCLUDED'
      ? setButtonText('Finalizar')
      : setButtonText('Salvar');
  }, [watchStatus]);

  useEffect(() => {}, []);
  return (
    <form id="order-service-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem gridColumn="1 / span 2">
          <Box flex="1">
            <Input
              label="Nº de tombamento"
              errors={undefined}
              defaultValue={selectedEquipment.tippingNumber}
              isDisabled
              readOnly
            />
          </Box>
        </GridItem>
        <GridItem>
          <Box flex="1">
            <NewControlledSelect
              isDisabled={orderService.status === 'CONCLUDED'}
              label="Status"
              name="status"
              control={control}
              options={OSSTATUS}
            />
          </Box>
        </GridItem>
        <GridItem>
          <Input
            label="Tipo"
            errors={undefined}
            type="text"
            placeholder="Tipo"
            defaultValue={selectedEquipment.type.name || ''}
            isDisabled
            readOnly
          />
        </GridItem>
        <GridItem>
          <Input
            label="Nº de série"
            errors={undefined}
            type="text"
            defaultValue={selectedEquipment.serialNumber}
            isDisabled
            readOnly
          />
        </GridItem>
        <GridItem>
          <Input
            label="Marca"
            errors={undefined}
            type="text"
            placeholder="Marca"
            defaultValue={selectedEquipment.brand.name}
            isDisabled
            readOnly
          />
        </GridItem>
        <GridItem>
          <Input
            label="Modelo"
            errors={undefined}
            type="text"
            placeholder="Modelo"
            defaultValue={selectedEquipment.model}
            isDisabled
            readOnly
          />
        </GridItem>
        <GridItem>
          <Input
            label="Lotação"
            errors={undefined}
            type="text"
            placeholder="Lotação"
            defaultValue={selectedEquipment.unit.localization}
            isDisabled
            readOnly
          />
        </GridItem>
        <GridItem>
          <Input
            label="Situação"
            errors={undefined}
            type="text"
            placeholder="Situação"
            defaultValue={selectedEquipment.situacao}
            isDisabled
            readOnly
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <strong>Ordem de Serviço:</strong>
        </GridItem>
        <GridItem>
          <Input
            label="Responsável pela entrega"
            errors={errors.senderName}
            type="text"
            {...register('senderName')}
            isDisabled
            readOnly
          />
        </GridItem>
        <GridItem>
          <Input
            label="CPF ou Nº Funcional"
            errors={errors.senderDocument}
            type="text"
            placeholder="CPF ou Nº Funcional"
            {...register('senderDocument')}
            isDisabled={orderService.status === 'CONCLUDED'}
          />
        </GridItem>
        <GridItem>
          <Input
            label="Processo SEI"
            errors={errors.seiProcess}
            type="text"
            placeholder="Processo SEI"
            isDisabled={orderService.status === 'CONCLUDED'}
            {...register('seiProcess', {
              minLength: {
                value: 15,
                message: 'O Processo SEI deve ter no mínimo 15 dígitos',
              },
              maxLength: {
                value: 15,
                message: 'O Processo SEI deve ter no máximo 15 dígitos',
              },
            })}
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <TextArea
            errors={errors.description}
            label="Defeito do Equipamento:"
            maxChars={255}
            disabled={orderService.status === 'CONCLUDED'}
            {...register('description', {
              maxLength: 255,
            })}
          />
        </GridItem>
        {watchStatus === 'CONCLUDED' && (
          <>
            <GridItem>
              <Input
                label="Responsável pela retirada"
                placeholder="Nome do Responsável"
                errors={errors.withdrawalName}
                isDisabled={orderService.status === 'CONCLUDED'}
                type="text"
                {...register('withdrawalName', {
                  required: 'Campo Obrigatório',
                })}
              />
            </GridItem>
            <GridItem>
              <Input
                label="CPF ou Nº Funcional"
                errors={errors.withdrawalDocument}
                type="text"
                placeholder="CPF ou Nº Funcional"
                isDisabled={orderService.status === 'CONCLUDED'}
                {...register('withdrawalDocument', {
                  required: 'Campo Obrigatório',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Por favor, digite apenas números.',
                  },
                })}
              />
            </GridItem>
            <GridItem>
              <Input
                label="Técnico Responsável"
                errors={errors.technicianName}
                type="text"
                isDisabled={orderService.status === 'CONCLUDED'}
                placeholder="Nome do Técnico"
                {...register('technicianName', {
                  required: 'Campo Obrigatório',
                })}
              />
            </GridItem>
          </>
        )}
      </Grid>
      <Flex gap="9rem" mt="2rem" mb="2rem" justify="center">
        <GridItem>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </GridItem>
        <GridItem>
          <Button
            type="submit"
            variant="primary"
            form="order-service-register-form"
          >
            {buttonText}
          </Button>
        </GridItem>
      </Flex>
    </form>
  );
}
