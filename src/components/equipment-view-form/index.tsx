import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useState, useEffect, SetStateAction } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';

import { format, addDays } from 'date-fns';
import MovementHistory from '../movement-history';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { ControlledSelect } from '../form-fields/controlled-select';
import { Datepicker } from '../form-fields/date';
import { toast } from '@/utils/toast';
import { api } from '../../config/lib/axios';
import { EquipmentData } from '../../pages/equipments/EquipamentsControl';

import { DeleteExtensiveButton } from '../action-buttons/delete-extensive-button';

export type ViewEquipFormValues = {
  id: any;
  tippingNumber: string;
  serialNumber: string;
  type: { value: string; label: string };
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: { value: number; label: string };
  acquisitionDate: Date;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: { value: string; label: string };
  processor?: string;
  storageType?: { value: string; label: string };
  storageAmount?: string;
  brand: { name: string };
  acquisition: { name: string };
  unitId?: string;
  ram_size?: string;
  estado: { value: string; label: string };
};

interface ViewEquipmentFormProps {
  onClose: () => void;
  equipment: ViewEquipFormValues;
}

export default function EquipmentViewForm({
  onClose,
  equipment,
}: ViewEquipmentFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
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
  }, []);

    const handleDelete = async () => {
      console.log('excluir', equipment);
      console.log('id', equipment.id);
      try {
        const response = await api.delete('equipment/deleteEquipment', {
          params: { id: equipment.id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@App:token')}`,
          },
        });
        onClose();
        toast.success('Equipamento excluído com sucesso.');
        
        console.log('response', response);
      } catch (error: any) {
        console.log('Erro ao obter os dados do equipamento:', error);
        toast.error(error.response.data.error);
      }
      
    }
  return (
    <form id="equipment-register-form">
      <Grid templateColumns="repeat(5, 5fr)" gap={6} alignItems={"end"}>
        <ControlledSelect
          control={control}
          name="type"
          id="type"
          placeholder="Selecione uma opção"
          label="Tipo de equipamento"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          isReadOnly
        />

        <Input
          label="Marca"
          errors={errors.brand?.name}
          {...register('brand.name', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
          isReadOnly
        />

        <Input
          label="Modelo"
          errors={errors.model}
          {...register('model', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
          isReadOnly
        />

        <Input
          label="Nº Tombamento"
          errors={errors.tippingNumber}
          {...register('tippingNumber', {
            required: 'Campo Obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Por favor, digite apenas números.',
            },
          })}
          isReadOnly
        />

        <Input
          label="Nº Serie"
          errors={errors.serialNumber}
          {...register('serialNumber', {
            required: 'Campo Obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Por favor, digite apenas números.',
            },
          })}
          isReadOnly
        />

        <Input
          label="Nº da Nota Fiscal"
          errors={errors.invoiceNumber}
          {...register('invoiceNumber', {
            required: 'Campo Obrigatório',
            maxLength: 50,
            pattern: {
              value: /^[0-9]+$/,
              message: 'Por favor, digite apenas números.',
            },
          })}
          isReadOnly
        />

        <Input
          label="Tipo de aquisição"
          errors={errors.acquisition?.name}
          {...register('acquisition.name', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
          isReadOnly
        />

        <ControlledSelect
          control={control}
          name="estado"
          id="estado"
          placeholder="Selecione uma opção"
          label="Estado do equipamento"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          isReadOnly
        />

        <ControlledSelect
          control={control}
          name="initialUseDate"
          id="initialUseDate"
          placeholder="Selecione uma opção"
          label="Ano da aquisição"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          isReadOnly
        />

        <Datepicker
          label="Data de aquisição"
          name="acquisitionDate"
          required
          control={control}
          readOnly
        />

        {equipment.type.value === 'CPU' && (
          <>
            <Input
              label="Qtd. Memória RAM (GB)"
              errors={errors.ram_size}
              {...register('ram_size', {
                required: 'Campo Obrigatório',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Por favor, digite apenas números.',
                },
              })}
              isReadOnly
            />

            <ControlledSelect
              control={control}
              name="storageType"
              id="storageType"
              placeholder="Selecione uma opção"
              label="Tipo de armazenamento"
              rules={{ required: 'Campo obrigatório' }}
              isReadOnly
            />

            <Input
              label="Qtd. Armazenamento (GB)"
              errors={errors.storageAmount}
              {...register('storageAmount', {
                required: 'Campo Obrigatório',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Por favor, digite apenas números.',
                },
              })}
              isReadOnly
            />

            <Input
              label="Processador"
              errors={errors.processor}
              {...register('processor', {
                required: 'Campo Obrigatório',
              })}
              isReadOnly
            />
          </>
        )}

        {equipment.type.value === 'Monitor' && (
          <>
            <ControlledSelect
              control={control}
              name="screenType"
              id="screenType"
              placeholder="Selecione uma opção"
              label="Tipo de monitor"
              rules={{ required: 'Campo obrigatório' }}
              isReadOnly
            />

            <Input
              label="Tamanho do Monitor"
              errors={errors.storageAmount}
              {...register('screenSize', {
                required: 'Campo Obrigatório',
              })}
              isReadOnly
            />
          </>
        )}

        {(equipment.type.value === 'Estabilizador' ||
          equipment.type.value === 'Nobreak') && (
          <Input
            label="Potência (VA)"
            errors={errors.storageAmount}
            {...register('power', {
              required: 'Campo Obrigatório',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Por favor, digite apenas números.',
              },
            })}
            isReadOnly
          />
        )}

        <GridItem gridColumn="1 / span 5">
          <TextArea
            label="Descrição"
            errors={errors.description}
            maxChars={255}
            {...register('description', {
              maxLength: 255,
            })}
            readOnly
          />
        </GridItem>
      </Grid>
      <p style={{ fontWeight: '900', fontSize: '1rem', padding: '2rem 0rem 0.5rem 0rem' }}>Histórico de Movimentações</p>
      <MovementHistory equipmentId={equipment.id} />
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="space-between">
        <Button variant="secondary" onClick={onClose}>
          Voltar
        </Button>
        <Button variant="primary">Editar</Button>
        <DeleteExtensiveButton onClick={handleDelete} label="equipamento" />
      </Flex>
    </form>
  );
}
