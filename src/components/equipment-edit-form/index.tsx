/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';

import {
  ESTADOS_EQUIPAMENTO,
  TIPOS_ARMAZENAMENTO,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
} from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { NewControlledSelect } from '../form-fields/new-controlled-select';

export type EditEquipFormValues = {
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

interface EditEquipmentFormProps {
  onClose: () => void;
  equip: EditEquipFormValues;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TypeData {
  id: number;
  name: string;
}

interface BrandData {
  id: number;
  name: string;
}

export default function EquipmentEditForm({
  onClose,
  equip,
  refreshRequest,
  setRefreshRequest,
}: EditEquipmentFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<EditEquipFormValues>({
    defaultValues: equip,
  });

  const watchType = watch('type');

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
      const {
        type,
        estado,
        storageType,
        screenType,
        acquisitionDate,
        ...rest
      } = formData;

      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const dateString = formatDate(acquisitionDate);

      const payload = {
        type,
        estado,
        storageType,
        screenType,
        acquisitionDate: dateString,
        ...rest,
      };

      const response = await api.put('equipment/updateEquipment', payload);

      if (response.status === 200) {
        toast.success('Equipamento editado com sucesso', 'Sucesso');
        setRefreshRequest(!refreshRequest);
        onClose();
        return;
      }

      toast.error('Erro ao tentar editar o equipamento', 'Erro');
    } catch {
      toast.error('Erro ao tentar editar o equipamento', 'Erro');
    }
  });

  const [types, setTypes] = useState<TypeData[]>([]);
  const [brands, setBrands] = useState<BrandData[]>([]);

  const fetchTypes = async (str: string) => {
    try {
      const { data }: AxiosResponse<TypeData[]> = await api.get(
        `equipment/type?search=${str}`
      );
      setTypes(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  const fetchBrands = async (str: string) => {
    try {
      const { data }: AxiosResponse<BrandData[]> = await api.get(
        `equipment/brand?search=${str}`
      );
      setBrands(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  useEffect(() => {
    fetchTypes('');
    fetchBrands('');
  }, []);

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <NewControlledSelect
          control={control}
          id="type"
          options={types.map((type) => ({
            value: type?.name ?? '',
            label: type?.name ?? '',
          }))}
          placeholder="Selecione uma opção"
          label="Tipo"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          {...register('type', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
        />

        <NewControlledSelect
          control={control}
          id="brandName"
          options={brands.map((brand) => ({
            value: brand?.name ?? '',
            label: brand?.name ?? '',
          }))}
          placeholder="Selecione uma opção"
          label="Marca"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
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
              value: /^[0-9a-zA-Z]+$/,
              message: 'Por favor, digite apenas letras e números.',
            },
          })}
        />

        <Input
          label="Tipo de aquisição"
          errors={errors.acquisition?.name}
          {...register('acquisition.name', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
        />

        <NewControlledSelect
          control={control}
          name="estado"
          id="estado"
          options={ESTADOS_EQUIPAMENTO}
          placeholder="Selecione uma opção"
          label="Estado do equipamento"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          cursor="pointer"
          defaultValue={equip?.estado}
        />

        <Datepicker
          label="Data de aquisição"
          name="acquisitionDate"
          required
          control={control}
        />

        {watchType.name === 'CPU' && (
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

            <NewControlledSelect
              control={control}
              name="storageType"
              id="storageType"
              options={TIPOS_ARMAZENAMENTO}
              placeholder="Selecione uma opção"
              label="Tipo de armazenamento"
              rules={{ required: 'Campo obrigatório' }}
              cursor="pointer"
              defaultValue={equip?.storageType}
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

        {watchType.name === 'Monitor' && (
          <>
            <NewControlledSelect
              control={control}
              name="screenType"
              id="screenType"
              options={TIPOS_MONITOR}
              placeholder="Selecione uma opção"
              label="Tipo de monitor"
              rules={{ required: 'Campo obrigatório' }}
              cursor="pointer"
              defaultValue={equip?.screenType}
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

        {(watchType.name === 'Estabilizador' ||
          watchType.name === 'Nobreak') && (
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
