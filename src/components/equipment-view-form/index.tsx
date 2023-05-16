import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';
import { ControlledSelect } from '../form-fields/controlled-select';
import { Equipment } from '../equipment-view-modal';
import {
  ESTADOS_EQUIPAMENTO,
  TIPOS_ARMAZENAMENTO,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
} from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api } from '@/services/api';

type FormValues = {
  tippingNumber: string;
  serialNumber: string;
  type: { value: string; label: string };
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: { value: string; label: string };
  acquisitionDate: string;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: { value: string; label: string };
  processor?: string;
  storageType?: { value: string; label: string };
  storageAmount?: string;
  brandName: string;
  acquisitionName: string;
  unitId?: string;
  ram_size?: string;
  estado: { value: string; label: string };
};


interface EquipmentFormProps {
  equipmentId: string | null,
  onClose: () => void
}

export default function EquipmentViewForm({ 
  equipmentId, 
  onClose 
}: EquipmentFormProps) {

  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const watchType = watch('type', { label: '', value: '' });


  const listOfYears: Array<{ value: number; label: string }> = (() => {
    const endYear: number = new Date().getFullYear();
    const startYear: number = endYear - 30;

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: year, label: year.toString() };
    }).reverse();
  })();

  useEffect(() => {
    // Função para buscar os dados do equipamento usando o ID
    const fetchEquipmentData = async () => {
      try {
        const { data }: AxiosResponse<Equipment[]> = await api.get(
          'equipment/find',
          {params: {id: equipmentId}},
        )
        const d = data[0]
        // Fazer a requisição GET para obter os dados do equipamento pelo ID
        console.log(d, data);

        // Preencher os campos do formulário com os dados obtidos
        setValue('tippingNumber', d.tippingNumber ?? '');
        setValue('serialNumber', d.serialNumber ?? '');
        setValue('type', { value: d.type ?? '', label: '' });
        setValue('situacao', d.situacao ?? '');
        setValue('model', d.model ?? '');
        setValue('description', d.description ?? '');
        setValue('screenSize', d.screenSize ?? '');
        setValue('invoiceNumber', d.invoiceNumber ?? '');
        setValue('power', d.power ?? '');
        setValue('screenType', { value: d.screenType ?? '', label: '' });
        setValue('processor', d.processor ?? '');
        setValue('storageType', { value: d.storageType ?? '', label: '' });
        setValue('storageAmount', d.storageAmount ?? '');
        setValue('brandName', d.brandName ?? '');
        setValue('acquisitionName', d.acquisitionName ?? '');
        //setValue('unitId', d.unitId ?? '');
        setValue('ram_size', d.ram_size ?? '');
        setValue('estado', { value: d.estado ?? '', label: '' });

        // Preencher os demais campos do formulário com as informações relevantes

      } catch (error) {
        console.error('Erro ao obter os dados do equipamento:', error);
      }
    };

    // Chamar a função para buscar os dados do equipamento ao carregar o componente
    fetchEquipmentData();
  }, [equipmentId, setValue]);

  return (
    <form id="equipment-register-form">
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
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}
