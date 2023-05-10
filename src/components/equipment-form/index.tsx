import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';
import { ControlledSelect } from '../form-fields/controlled-select';
import { ESTADOS_EQUIPAMENTO, TIPOS_EQUIPAMENTO } from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
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
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  brandName: string;
  acquisitionName: string;
  unitId?: string;
  ram_size?: string;
  estado: { value: string; label: string };
};

export default function EquipmentForm() {
  const {
    control,
    register,
    handleSubmit,
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

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const { type, estado, initialUseDate, ...rest } = formData;

      const payload = {
        type: type.value,
        estado: estado.value,
        initialUseDate: initialUseDate.value,
        ...rest,
      };

      const { data }: AxiosResponse<any> = await api.post(
        'equipment/createEquipment',
        payload
      );
    } catch {
      console.log('error');
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
          rules={{ required: 'Campo obrigatório' }}
        />

        <Input
          label="Marca"
          errors={errors.brandName}
          {...register('brandName', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Modelo"
          errors={errors.model}
          {...register('model', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Nº Tombamento"
          errors={errors.tippingNumber}
          {...register('tippingNumber', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Nº Serie"
          errors={errors.serialNumber}
          {...register('serialNumber', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Nº da Nota Fiscal"
          errors={errors.invoiceNumber}
          {...register('invoiceNumber', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Tipo de aquisição"
          errors={errors.acquisitionName}
          {...register('acquisitionName', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <ControlledSelect
          control={control}
          name="estado"
          id="estado"
          options={ESTADOS_EQUIPAMENTO}
          placeholder="Selecione uma opção"
          label="Estado do equipamento"
          rules={{ required: 'Campo obrigatório' }}
        />

        <ControlledSelect
          control={control}
          name="initialUseDate"
          id="initialUseDate"
          options={listOfYears}
          placeholder="Selecione uma opção"
          label="Ano da aquisição"
          rules={{ required: 'Campo obrigatório' }}
        />

        <Datepicker
          label="Data de aquisição"
          name="acquisitionDate"
          required
          control={control}
        />

        <GridItem gridColumn="1 / span 3">
          <TextArea
            label="Descrição"
            errors={errors.description}
            maxChars={255}
            {...register('description', {
              required: 'Campo Obrigatório',
              maxLength: 255,
            })}
          />
        </GridItem>
      </Grid>
      <Flex gap="4rem" mt="2rem" mb="1rem">
        <Button variant="secondary">Cancelar</Button>
        <Button type="submit" form="equipment-register-form" variant="primary">
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}
