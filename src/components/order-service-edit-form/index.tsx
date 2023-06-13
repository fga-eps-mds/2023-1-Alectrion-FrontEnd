/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem, Select } from '@chakra-ui/react';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { Workstation } from '@/constants/equipment';
import { TippingNumberSearchBar, debounce } from '../search-bar';
import { TextArea } from '../form-fields/text-area';
import { error } from 'console';

type EditOrderServiceFormValues = {
  equipment: EquipmentData;
  senderFunctionalNumber: { value: string; label: string };
  senderName: string;
  senderRole: string;
  senderPhone?: string;

  receiverFunctionalNumber: { value: string; label: string };
  receiverName: string;
  receiverRole: string;
  workstation: { value: string; label: string };
  city: string;
  
  date: string;
  description: string;
};

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

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>(orderService.equipment);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const response = await api.put(
        'order-service/updateOrderService',
        formData
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

  useEffect(()=>{
    console.log('EQUIPAMENTO CARREGADO', selectedEquipment);
  }, [selectedEquipment])

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem gridColumn="1 / span 2">
          <strong>Nº de tombamento:</strong>
          <Box flex="1">
            <TippingNumberSearchBar equip={selectedEquipment} changeEquipment={setSelectedEquipment} />
          </Box>
        </GridItem>
        <GridItem>
          <strong>Status:</strong>
          <Box flex="1">
            <TippingNumberSearchBar equip={selectedEquipment} changeEquipment={setSelectedEquipment} />
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
            placeholder="Nº de série"
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
          <strong>Funcional</strong>
          <Select
            {...register('senderFunctionalNumber')}
          />
        </GridItem>
        <GridItem>
          <strong>Responsável pela Entrega</strong>
          <Input
            errors={errors.receiverName}
            type="text"
            placeholder="Nome do Recebedor"
            {...register('receiverName')}
          />
        </GridItem>
        <GridItem>
          <strong>Atribuição do Entregador</strong>
          <Input
            errors={errors.senderRole}
            type="text"
            {...register('senderRole')}
          />
        </GridItem>
        <GridItem  gridColumn="1 / span 2">
          <strong>Responsável pelo recebimento:</strong>
          <Input
            errors={errors.receiverName}
            type="text"
            {...register('receiverName')}
          />
        </GridItem>
        <GridItem>
          <strong>Atribuição do Recebedor</strong>
          <Input
            errors={errors.receiverRole}
            type="text"
            {...register('receiverRole')}
          />
        </GridItem>
        <GridItem>
          <strong>Posto de trabalho</strong>
          <Select
            {...register('workstation')}
          />
        </GridItem>
        <GridItem>
          <strong>Cidade</strong>
          <Input
            errors={errors.city}
            type="text"
            {...register('city')}
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
          <TextArea
            errors={errors.description}
            label="Descrição:"
            maxChars={255}
            {...register('description', {
              maxLength: 255,
            })}
          />
        </GridItem>
        <GridItem>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
        </GridItem>
        <GridItem>
          <Button type="submit">Salvar</Button>
        </GridItem>
      </Grid>
    </form>
  );
}
