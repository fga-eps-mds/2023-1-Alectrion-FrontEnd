import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';
import { ControlledSelect } from '../form-fields/controlled-select';

import {
  ESTADOS_EQUIPAMENTO,
  TIPOS_ARMAZENAMENTO,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
} from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { api } from '@/services/api';
import { toast } from '@/utils/toast';
import { FormValues } from '../equipment-edit-modal';

interface EquipmentFormProps {
  onClose: () => void;
  equip: FormValues
}

export default function EquipmentEditForm({ onClose, equip }: EquipmentFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: equip,
  });

  const watchType = watch('type', { label: '', value: '' });

  useEffect(() => {
    resetField('power');
    resetField('screenSize');
    resetField('screenType');
    resetField('ram_size');
    resetField('processor');
    resetField('storageType');
    resetField('storageAmount');
    
  }, [resetField, watchType, setValue, equip]);

  useEffect(() => {
    resetField('type');
  }, []);



  const listOfYears: Array<{ value: number; label: string }> = (() => {
    const endYear: number = new Date().getFullYear();
    const startYear: number = endYear - 30;

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: year, label: year.toString() };
    }).reverse();
  })();

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const onSubmit = handleSubmit(async (formData) => {

    try {
      const { type, estado, initialUseDate, storageType, screenType, acquisitionDate, ...rest } =
      formData;

      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const dateString = formatDate(acquisitionDate);
      
      const payload = {
        type: type.value,
        estado: estado.value,
        initialUseDate: initialUseDate.value,
        storageType: storageType?.value,
        screenType: screenType?.value,
        acquisitionDate: dateString,
        ...rest,
      };
      console.log(payload);
      
      const response = await api.put('equipment/updateEquipment', payload);

      if (response.status === 200) {
        toast.success('Equipamento cadastrado com sucesso', 'Sucesso');
        onClose();
        return;
      }
      toast.error('Erro ao tentar cadastrar o equipamento', 'Erro');
    } catch {
      toast.error('Erro ao tentar cadastrar o equipamento', 'Erro');
    }
  });

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <ControlledSelect
          control={control}
          name="type"
          id="type"
          options={TIPOS_EQUIPAMENTO}
          placeholder="Selecione uma opção"
          label="Tipo de equipamento"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        />
        <Input
          label="Marca"
          errors={errors.brandName}
          {...register('brandName', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
        />

        <Input
          label="Modelo"
          errors={errors.model}
          {...register('model', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
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
        />

        <Input
          label="Tipo de aquisição"
          errors={errors.acquisitionName}
          {...register('acquisitionName', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
        />

        <ControlledSelect
          control={control}
          name="estado"
          id="estado"
          options={ESTADOS_EQUIPAMENTO}
          placeholder="Selecione uma opção"
          label="Estado do equipamento"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        />

        <ControlledSelect
          control={control}
          name="initialUseDate"
          id="initialUseDate"
          options={listOfYears}
          placeholder="Selecione uma opção"
          label="Ano da aquisição"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        />

        <Datepicker
          label="Data de aquisição"
          name="acquisitionDate"
          required
          control={control}
        />
        {watchType.value === 'CPU' && (
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
            />
            <ControlledSelect
              control={control}
              name="storageType"
              id="storageType"
              options={TIPOS_ARMAZENAMENTO}
              placeholder="Selecione uma opção"
              label="Tipo de armazenamento"
              rules={{ required: 'Campo obrigatório' }}
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
            />
            <Input
              label="Processador"
              errors={errors.processor}
              {...register('processor', {
                required: 'Campo Obrigatório',
              })}
            />
          </>
        )}

        {watchType.value === 'Monitor' && (
          <>
            <ControlledSelect
              control={control}
              name="screenType"
              id="screenType"
              options={TIPOS_MONITOR}
              placeholder="Selecione uma opção"
              label="Tipo de monitor"
              rules={{ required: 'Campo obrigatório' }}
            />
            <Input
              label="Tamanho do Monitor"
              errors={errors.storageAmount}
              {...register('screenSize', {
                required: 'Campo Obrigatório',
              })}
            />
          </>
        )}

        {(watchType.value === 'Estabilizador' ||
          watchType.value === 'Nobreak') && (
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
          />
        )}
        <GridItem gridColumn="1 / span 3">
          <TextArea
            label="Descrição"
            errors={errors.description}
            maxChars={255}
            {...register('description', {
              maxLength: 255,
            })}
          />
        </GridItem>
      </Grid>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" form="equipment-register-form" variant="primary">
          Editar
        </Button>
      </Flex>
    </form>
  );
}
