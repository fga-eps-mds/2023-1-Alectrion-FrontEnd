import { useForm } from 'react-hook-form';
import { SetStateAction, useEffect, useState } from 'react';
import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { Select, SingleValue } from 'chakra-react-select';
import { AxiosResponse } from 'axios';

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

type FormValues = {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  model: string;
  description?: string;
  acquisitionDate: string;
  screenSize?: string;
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
  onClose: () => void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

interface BrandData {
  id: number;
  name: string;
}

interface TypeData {
  id: number;
  name: string;
}

export default function EquipmentForm({
  onClose,
  refreshRequest,
  setRefreshRequest,
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

  const [description, setDescription] = useState('');

  const watchType = watch('type', '');
  const watchModel = watch('model', '');
  const watchPower = watch('power', '');
  const watchScreenSize = watch('screenSize', '');
  const watchScreenType = watch('screenType', '');
  const watchRam_size = watch('ram_size', '');
  const watchProcessor = watch('processor', '');
  const watchStorageType = watch('storageType', '');
  const watchStorageAmount = watch('storageAmount', '');

  useEffect(() => {
    resetField('power');
    resetField('screenSize');
    resetField('screenType');
    resetField('ram_size');
    resetField('processor');
    resetField('storageType');
    resetField('storageAmount');
    resetField('description');
  }, [resetField, watchType]);

  useEffect(() => {
    if (watchType === 'CPU') {
      setDescription(
        `${watchModel} ${watchProcessor} ${watchRam_size} ${watchStorageType} ${watchStorageAmount}`
      );
    } else if (watchType === 'Monitor') {
      setDescription(
        `${watchType} ${watchModel} ${watchScreenType} ${watchScreenSize}`
      );
    } else if (watchType === 'Estabilizador' || watchType === 'Nobreak') {
      setDescription(`${watchType} ${watchModel} ${watchPower}`);
    } else {
      setDescription(`${watchType} ${watchModel}`);
    }

    setValue('description', description);
  }, [
    setValue,
    description,
    watchType,
    watchModel,
    watchPower,
    watchScreenSize,
    watchScreenType,
    watchRam_size,
    watchProcessor,
    watchStorageType,
    watchStorageAmount,
  ]);

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { type, estado, storageType, screenType, ...rest } = formData;

      const payload = {
        type,
        estado,
        storageType,
        screenType,
        ...rest,
      };

      const response = await api.post('equipment/createEquipment', payload);

      if (response.status === 200) {
        toast.success('Equipamento cadastrado com sucesso', 'Sucesso');
        setRefreshRequest(!refreshRequest);
        onClose();
        return;
      }
      toast.error('Erro ao tentar cadastrar o equipamento', 'Erro');
    } catch (error: any) {
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao cadastrar equipamento';
      toast.error(message);
    }
  });

  const [brands, setBrands] = useState<BrandData[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandData>();
  const [types, setTypes] = useState<TypeData[]>([]);
  const [selectedType, setSelectedType] = useState<TypeData>();

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

  useEffect(() => {
    fetchTypes('');
    fetchBrands('');
  }, []);

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <NewControlledSelect
          control={control}
          name="type"
          id="type"
          options={types.map((type) => ({
            label: type?.name ?? '',
            value: type?.name ?? '',
          }))}
          placeholder="Selecione uma opção"
          label="Tipo de equipamento"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        />

        <NewControlledSelect
          control={control}
          name="brandName"
          id="brandName"
          options={brands.map((brand) => ({
            value: brand?.name ?? '',
            label: brand?.name ?? '',
          }))}
          placeholder="Selecione uma opção"
          label="Marca"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
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
          errors={errors.acquisitionName}
          {...register('acquisitionName', {
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
        />

        <Datepicker
          label="Data de aquisição"
          name="acquisitionDate"
          required
          control={control}
        />
        {watchType === 'CPU' && (
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

        {watchType === 'Monitor' && (
          <>
            <NewControlledSelect
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

        {(watchType === 'Estabilizador' || watchType === 'Nobreak') && (
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
            defaultValue={description}
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
