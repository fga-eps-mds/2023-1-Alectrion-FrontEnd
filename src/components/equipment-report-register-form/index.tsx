import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';

import {
  TIPOS_ARMAZENAMENTO,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
  STATUS,
} from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { NewControlledSelect } from '../form-fields/new-controlled-select';

type FormValues = {
  equipType: string;
  model: string;
  brandName: string;
  registerInitialDate: string;
  registerFinalDate: string;
  acquisitionType: string;
  equipmentYear: string;
  equipmentStatus: string;

  storageType?: string;
  processor?: string;
  ram_size?: string;

  screenType?: string;
  screenSize?: string;

  power?: string;
};

interface ReportRegisterFormProps {
  onClose: () => void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EquipmentReportRegisterForm({
  onClose,
  refreshRequest,
  setRefreshRequest,
}: ReportRegisterFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<FormValues>();

  const watchType = watch('equipType');

  useEffect(() => {
    resetField('power');
    resetField('screenSize');
    resetField('screenType');
    resetField('ram_size');
    resetField('processor');
    resetField('storageType');
  }, [resetField, watchType]);

  const listOfYears: Array<{ value: number; label: string }> = (() => {
    const endYear: number = new Date().getFullYear();
    const startYear: number = endYear - 50;

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: year, label: year.toString() };
    }).reverse();
  })();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { equipType, ...rest } = formData;

      const payload = { ...rest };

      const response = await api.post('equipment/', payload);

      if (response.status === 200) {
        toast.success('Equipamento cadastrado com sucesso', 'Sucesso');
        setRefreshRequest(!refreshRequest);
        onClose();
        return;
      }
      toast.error('Erro gerar relatório', 'Erro');
    } catch (error: any) {
      if (error.response.data.error)
        toast.error(error.response.data.error, 'Erro');
      else toast.error('Erro ao tentar cadastrar o equipamento', 'Erro');
    }
  });

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem>
          <NewControlledSelect
            control={control}
            name="equipType"
            id="type"
            options={TIPOS_EQUIPAMENTO}
            placeholder="Selecione uma opção"
            label="Tipo de equipamento"
            rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          />
        </GridItem>
        <GridItem>
          <Input
            label="Marca"
            errors={errors.brandName}
            {...register('brandName', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
        </GridItem>

        <GridItem>
          <Input
            label="Modelo"
            errors={errors.model}
            {...register('model', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
        </GridItem>
        <GridItem>
          <NewControlledSelect
            label="Status"
            {...register('equipmentStatus')}
            control={control}
            options={STATUS}
          />
        </GridItem>

        <GridItem>
          <Input
            label="Tipo de aquisição"
            errors={errors.acquisitionType}
            {...register('acquisitionType', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
        </GridItem>
        {watchType === 'CPU' && (
          <>
            <GridItem>
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
            </GridItem>
            <GridItem>
              <NewControlledSelect
                control={control}
                name="storageType"
                id="storageType"
                options={TIPOS_ARMAZENAMENTO}
                placeholder="Selecione uma opção"
                label="Tipo de armazenamento"
                rules={{ required: 'Campo obrigatório' }}
              />
            </GridItem>
            <GridItem>
              <Input
                label="Qtd. Armazenamento (GB)"
                errors={errors.ram_size}
                {...register('processor')}
              />
            </GridItem>
            <GridItem>
              <Input
                label="Processador"
                errors={errors.processor}
                {...register('processor', {
                  required: 'Campo Obrigatório',
                })}
              />
            </GridItem>
          </>
        )}

        {watchType === 'Monitor' && (
          <>
            <GridItem>
              <NewControlledSelect
                control={control}
                name="screenType"
                id="screenType"
                options={TIPOS_MONITOR}
                placeholder="Selecione uma opção"
                label="Tipo de monitor"
                rules={{ required: 'Campo obrigatório' }}
              />
            </GridItem>
            <GridItem>
              <Input
                label="Tamanho do Monitor"
                errors={errors.screenSize}
                {...register('screenSize', {
                  required: 'Campo Obrigatório',
                })}
              />
            </GridItem>
          </>
        )}

        {(watchType === 'Estabilizador' || watchType === 'Nobreak') && (
          <GridItem>
            <Input
              label="Potência (VA)"
              errors={errors.power}
              {...register('power', {
                required: 'Campo Obrigatório',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Por favor, digite apenas números.',
                },
              })}
            />
          </GridItem>
        )}
      </Grid>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="secondary" background="212121">
          Limpar Filtros
        </Button>
        <Button type="submit" form="equipment-register-form" variant="primary">
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}
