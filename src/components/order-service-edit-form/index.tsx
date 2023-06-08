/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem, Select } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';
import { ControlledSelect } from '../form-fields/controlled-select';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { Workstation } from '@/constants/equipment';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';

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
      watch,
      resetField,
      formState: { errors },
      setValue,
    } = useForm<EditOrderServiceFormValues>({
      defaultValues: equip,
    });

    const watchType = watch('type');
    useEffect(() => {
        resetField('authorId');
        resetField('receiverName');
        resetField('authorFunctionalNumber');
        resetField('senderName');
        resetField('senderFunctionalNumber');
        resetField('receiverFunctionalNumber');
      }, [resetField, watchType, setValue, equip]);

    useEffect(() => {
        resetField('type');
    }, []);

    const onSubmit = handleSubmit(async (formData) => {
        try {
          const {
            type,
            authorId,
            receiverName,
            authorFunctionalNumber,
            senderName,
            senderFunctionalNumber,
            receiverFunctionalNumber,
            ...rest
          } = formData;
    
    
          const payload = {
            type: type.value,
            authorId: authorId.valueOf,
            receiverName: receiverName.valueOf,
            authorFunctionalNumber: authorFunctionalNumber?.valueOf,
            senderName: senderName?.valueOf,
            senderFunctionalNumber: senderFunctionalNumber?.valueOf,
            receiverFunctionalNumber: receiverFunctionalNumber?.valueOf,
            ...rest,
          };

        const response = await api.put('order-service/updateOrderService', payload);

        if (response.status === 200) {
            toast.success('Ordem de serviço editada com sucesso', 'Sucesso');
            setRefreshRequest(!refreshRequest);
            onClose();
        return;
        }

        toast.error('Erro ao tentar editar Ordem de serviço', 'Erro');
    } catch {
        toast.error('Erro ao tentar editar o Ordem de serviço, 'Error');
    }
  });

    function formattedOptions(tippingNumbers: any, arg1: string, arg2: string) {
        throw new Error('Function not implemented.');
    }

    function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
        throw new Error('Function not implemented.');
    }

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem
          gridColumn="1 / span 3"
          display="flex"
          alignItems="center"
          gap={4}
        >
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