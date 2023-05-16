import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useState, useEffect, SetStateAction } from 'react';
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
import { TRUE } from 'sass';
import { d } from 'vitest/dist/index-761e769b';

type FormValues = {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: string;
  acquisitionDate: string;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  brandName: string;
  acquisitionName: string;
  unitId?: string;
  ram_size?: string;
  estado: string;
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
        /*if (equipmentId !== null) {
          const formFields = document.querySelectorAll('form#equipment-register-form input, form#equipment-register-form select, form#equipment-register-form textarea');
          formFields.forEach(field => {
            field.setAttribute('readonly', 'true');
          });
        }*/

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
        setValue('type', d.type);
        setValue('situacao', d.situacao ?? '');
        setValue('model', d.model ?? '');
        setValue('description', d.description ?? '');
        setValue('screenSize', d.screenSize ?? '');
        setValue('invoiceNumber', d.invoiceNumber ?? '');
        setValue('power', d.power ?? '');
        setValue('screenType', d.screenType);
        setValue('processor', d.processor ?? '');
        setValue('storageType', d.storageType );
        setValue('storageAmount', d.storageAmount ?? '');
        setValue('brandName', d.brandName ?? '');
        setValue('acquisitionName', d.acquisitionName ?? '');
        setValue('initialUseDate', d.initialUseDate);

        //setValue('unitId', d.unitId ?? '');
        setValue('ram_size', d.ram_size ?? '');
        setValue('estado',d.estado);

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
        <Input
          id="type"
          placeholder="Selecione uma opção"
          label="Tipo de equipamento"
          errors={errors.type}
          {...register('type', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
          isReadOnly
        />
        <Input
          label="Marca"
          errors={errors.brandName}
          {...register('brandName', {
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
          errors={errors.acquisitionName}
          {...register('acquisitionName', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
          isReadOnly
        />

        <Input
          id="estado"
          label="Estado do equipamento"
          errors={errors.estado}
          {...register('estado', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
          isReadOnly
        />

        <Input
          id="initialUseDate"
          label="Ano da aquisição"
          errors={errors.initialUseDate}
          {...register('initialUseDate', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}          isReadOnly
        />

        <Input
          type='date'
          id='acquisitionDate'
          errors={errors.acquisitionDate}
          {...register('acquisitionDate', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
          label="Data de aquisição"
          required
        />
        {d.type == 'CPU' (
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
              options={TIPOS_ARMAZENAMENTO}
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
            isReadOnly
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
          Voltar
        </Button>
        <Button type="submit" form="equipment-register-form" variant="primary">
          Editar
        </Button>
      </Flex>
    </form>
  );
}
