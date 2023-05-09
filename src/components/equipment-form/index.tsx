import { useForm } from 'react-hook-form';
import { Grid, GridItem } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';
import { ControlledSelect } from '../form-fields/controlled-select';
import { ESTADOS_EQUIPAMENTO, TIPOS_EQUIPAMENTO } from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';

type FormValues = {
  marca: string;
  modelo: string;
  tombamento: string;
  serie: string;
  'nota-fiscal': string;
  aquisicao: string;
  descricao: string;
  'tipo-equipamento': string;
  'estado-equipamento': string;
  'ano-aquisicao': string;
  'data-aquisicao': string;
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

  const onSubmit = () => ({});

  return (
    <form id="equipment-register-form" onSubmit={handleSubmit(onSubmit)}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <ControlledSelect
          control={control}
          label="Tipo de equipamento"
          {...register('tipo-equipamento', { required: true })}
          options={TIPOS_EQUIPAMENTO}
        />

        <Input
          label="Marca"
          errors={errors.marca}
          {...register('marca', { required: true, maxLength: 20 })}
        />

        <Input
          label="Modelo"
          errors={errors.modelo}
          {...register('modelo', { required: true, maxLength: 20 })}
        />

        <Input
          label="Nº Tombamento"
          errors={errors.tombamento}
          {...register('tombamento', { required: true, maxLength: 20 })}
        />

        <Input
          label="Nº Serie"
          errors={errors.serie}
          {...register('serie', { required: true, maxLength: 20 })}
        />

        <Input
          label="Nº da Nota Fiscal"
          errors={errors['nota-fiscal']}
          {...register('nota-fiscal', { required: true, maxLength: 20 })}
        />

        <Input
          label="Tipo de aquisição"
          errors={errors.aquisicao}
          {...register('aquisicao', { required: true, maxLength: 20 })}
        />

        <ControlledSelect
          control={control}
          label="Estado do equipamento"
          {...register('estado-equipamento', { required: true })}
          options={ESTADOS_EQUIPAMENTO}
        />

        <ControlledSelect
          control={control}
          label="Ano da aquisição"
          {...register('ano-aquisicao', { required: true })}
          options={listOfYears}
        />

        <Datepicker
          label="Data de aquisição"
          name="data-aquisicao"
          required
          control={control}
        />

        <GridItem gridColumn="1 / span 3">
          <TextArea
            label="Descrição"
            errors={errors.descricao}
            maxChars={255}
            isRequired
            {...register('descricao', { required: true, maxLength: 255 })}
          />
        </GridItem>
      </Grid>
    </form>
  );
}
