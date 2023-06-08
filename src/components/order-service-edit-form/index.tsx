import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem, Select } from '@chakra-ui/react';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { Workstation } from '@/constants/equipment';

type EditOrderServiceFormValues = {
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

interface EditOrderServiceFormProps {
  onClose: () => void;
  equip: EditOrderServiceFormValues;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderServiceregisterForm({
  onClose,
  refreshRequest,
  setRefreshRequest,
}: EditOrderServiceFormProps) {
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>();
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);

  const [selectedSender, setSelectedSender] = useState<IUser>();
  const [selectedReceiver, setSelectedReceiver] = useState<IUser>();

  const [workstations, setWorkstations] = useState<Workstation[]>([]);
  const [selectedWorkstation, setSelectedWorkstation] = useState<Workstation>();

  const take = 5;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  
export default function OrderServiceEditForm({
  onClose,
  equip,
  refreshRequest,
  setRefreshRequest,
}: EditOrderServiceFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<EditOrderServiceFormValues>({
    defaultValues: equip,
  });

  useEffect(() => {
    reset({
      ...equip,
    });
  }, [equip, reset]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await api.put(
        'order-service/updateOrderService',
        formData
      );

      if (response.status === 200) {
        toast.success('Ordem de serviço editada com sucesso', 'Sucesso');
        setRefreshRequest(!refreshRequest);
        onClose();
        return;
      }

      toast.error('Erro ao tentar editar a Ordem de serviço', 'Erro');
    } catch {
      toast.error('Erro ao tentar editar a Ordem de serviço', 'Erro');
    }
  });

  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    throw new Error('Function not implemented.');
  }

  function formattedOptions(tippingNumbers: any, arg1: string, arg2: string) {
    throw new Error('Function not implemented.');
  }

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem gridColumn="1 / span 3">
          <strong>Ordem de Serviço #???????:</strong>
          <Box flex="1">
            <Select
              placeholder="N Tombamento"
              value={selectedOption}
              onChange={handleChange}
              options={formattedOptions(
                tippingNumbers,
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
          <strong>Edição de Ordem de Serviço:</strong>
        </GridItem>
        <GridItem>
          <strong>Author ID:</strong>
          <Input
            errors={errors.authorId}
            type="text"
            placeholder="Author ID"
            {...register('authorId')}
          />
        </GridItem>
        <GridItem>
          <strong>Nome do Recebedor:</strong>
          <Input
            errors={errors.receiverName}
            type="text"
            placeholder="Nome do Recebedor"
            {...register('receiverName')}
          />
        </GridItem>
        <GridItem>
          <strong>Número Funcional do Autor:</strong>
          <Input
            errors={errors.authorFunctionalNumber}
            type="text"
            placeholder="Número Funcional do Autor"
            {...register('authorFunctionalNumber')}
          />
        </GridItem>
        <GridItem>
          <strong>Nome do Remetente:</strong>
          <Input
            errors={errors.senderName}
            type="text"
            placeholder="Nome do Remetente"
            {...register('senderName')}
          />
        </GridItem>
        <GridItem>
          <strong>Número Funcional do Remetente:</strong>
          <Input
            errors={errors.senderFunctionalNumber}
            type="text"
            placeholder="Número Funcional do Remetente"
            {...register('senderFunctionalNumber')}
          />
        </GridItem>
        <GridItem>
          <strong>Número Funcional do Recebedor:</strong>
          <Input
            errors={errors.receiverFunctionalNumber}
            type="text"
            placeholder="Número Funcional do Recebedor"
            {...register('receiverFunctionalNumber')}
          />
        </GridItem>
        <GridItem>
          <strong>Telefone:</strong>
          <Input
            errors={errors.senderPhone}
            type="text"
            placeholder="Telefone"
            {...register('senderPhone')}
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <Button type="submit">Editar Ordem de Serviço</Button>
        </GridItem>
      </Grid>
    </form>
  );
}