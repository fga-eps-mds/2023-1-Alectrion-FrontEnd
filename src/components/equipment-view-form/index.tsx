import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import MovementHistory from '../movement-history';
import { TextArea } from '../form-fields/text-area';
import { Datepicker } from '../form-fields/date';
import { toast } from '@/utils/toast';
import { api } from '../../config/lib/axios';
import { EquipmentData } from '../../pages/equipments/EquipmentsControl';

import { DeleteExtensiveButton } from '../action-buttons/delete-extensive-button';
import { NewControlledSelect } from '../form-fields/new-controlled-select';
import { Input } from '../form-fields/input';

export type ViewEquipFormValues = {
  id: any;
  tippingNumber: string;
  serialNumber: string;
  type: { name: string };
  situacao: string;
  model: string;
  description?: string;
  acquisitionDate: Date;
  screenSize?: string;
  power?: string;
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  brandName: string;
  acquisition: { name: string };
  unitId?: string;
  ram_size?: string;
  estado: string;
};

interface ViewEquipmentFormProps {
  equipmentEdit: EquipmentData;
  equipment: ViewEquipFormValues;
  onClose: () => void;
  handleEdit: (equipment: EquipmentData) => void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EquipmentViewForm({
  equipmentEdit,
  equipment,
  onClose,
  handleEdit,
  refreshRequest,
  setRefreshRequest,
}: ViewEquipmentFormProps) {
  const {
    control,
    register,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<ViewEquipFormValues>({
    defaultValues: equipment,
  });

  useEffect(() => {
    resetField('power');
    resetField('screenSize');
    resetField('screenType');
    resetField('ram_size');
    resetField('processor');
    resetField('storageType');
    resetField('storageAmount');
  }, [resetField, setValue, equipment]);

  useEffect(() => {
    resetField('type');
  }, [resetField]);

  const handleDelete = async () => {
    try {
      const response = await api.delete('equipment/deleteEquipment', {
        params: { id: equipment.id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@alectrion:token')}`,
        },
      });

      onClose();
      toast.success('Equipamento excluído com sucesso.');
      setRefreshRequest(!refreshRequest);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <form id="equipment-register-form">
      <Grid templateColumns="repeat(5, 5fr)" gap={6} alignItems="end">
        <NewControlledSelect
          control={control}
          name="type"
          id="type"
          placeholder="Selecione uma opção"
          label="Tipo de equipamento"
          isReadOnly
          defaultValue={equipment.type.name}
        />

        <Input
          disabled
          label="Marca"
          errors={errors.brandName}
          {...register('brandName')}
          isReadOnly
        />

        <Input
          disabled
          label="Modelo"
          errors={errors.model}
          {...register('model')}
          isReadOnly
        />

        <Input
          disabled
          label="Nº Tombamento"
          errors={errors.tippingNumber}
          {...register('tippingNumber')}
          isReadOnly
        />

        <Input
          disabled
          label="Nº Serie"
          errors={errors.serialNumber}
          {...register('serialNumber')}
          isReadOnly
        />

        <Input
          disabled
          label="Tipo de aquisição"
          errors={errors.acquisition?.name}
          {...register('acquisition.name')}
          isReadOnly
        />

        <NewControlledSelect
          control={control}
          name="estado"
          id="estado"
          placeholder="Selecione uma opção"
          label="Estado do equipamento"
          isReadOnly
          defaultValue={equipment.estado}
        />

        <Datepicker
          label="Data de aquisição"
          name="acquisitionDate"
          control={control}
          readOnly
          disabled
        />

        {equipment.type.name === 'CPU' && (
          <>
            <Input
              disabled
              label="Qtd. Memória RAM (GB)"
              errors={errors.ram_size}
              {...register('ram_size')}
              isReadOnly
            />

            <NewControlledSelect
              control={control}
              name="storageType"
              id="storageType"
              placeholder="Selecione uma opção"
              label="Tipo de armazenamento"
              isReadOnly
              defaultValue={equipment.storageType}
            />

            <Input
              disabled
              label="Qtd. Armazenamento (GB)"
              errors={errors.storageAmount}
              {...register('storageAmount')}
              isReadOnly
            />

            <Input
              disabled
              label="Processador"
              errors={errors.processor}
              {...register('processor')}
              isReadOnly
            />
          </>
        )}

        {equipment.type.name === 'Monitor' && (
          <>
            <NewControlledSelect
              control={control}
              name="screenType"
              id="screenType"
              placeholder="Selecione uma opção"
              label="Tipo de monitor"
              isReadOnly
              defaultValue={equipment.screenType}
            />

            <Input
              disabled
              label="Tamanho do Monitor"
              errors={errors.storageAmount}
              {...register('screenSize')}
              isReadOnly
            />
          </>
        )}

        {(equipment.type.name === 'Estabilizador' ||
          equipment.type.name === 'Nobreak') && (
          <Input
            disabled
            label="Potência (VA)"
            errors={errors.storageAmount}
            {...register('power')}
            isReadOnly
          />
        )}

        <GridItem gridColumn="1 / span 5">
          <TextArea
            label="Descrição"
            errors={errors.description}
            maxChars={255}
            {...register('description')}
            readOnly
            disabled
          />
        </GridItem>
      </Grid>
      <p
        style={{
          fontWeight: '900',
          fontSize: '1rem',
          padding: '2rem 0rem 0.5rem 0rem',
        }}
      >
        Histórico de Movimentações
      </p>
      <MovementHistory equipmentId={equipment.id} />
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="space-between">
        <Button variant="secondary" onClick={onClose} name="Voltar">
          Voltar
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleEdit(equipmentEdit);
            onClose();
          }}
          name="Editar"
        >
          Editar
        </Button>
        <DeleteExtensiveButton
          onClick={handleDelete}
          label="equipamento"
          name="Excluir"
        />
      </Flex>
    </form>
  );
}
