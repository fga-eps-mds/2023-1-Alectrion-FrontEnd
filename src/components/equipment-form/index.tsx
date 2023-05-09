import { useForm } from 'react-hook-form';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
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
  notaFiscal: string;
  aquisicao: string;
  descricao: string;
  tipoEquipamento: string;
  estadoEquipamento: string;
  anoAquisicao: string;
  dataAquisicao: string;
  screenType: string;
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
      console.log(formData);
    } catch {
      console.log('error');
    }
  });

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <ControlledSelect
          control={control}
          name="tipoEquipamento"
          id="tipoEquipamento"
          options={TIPOS_EQUIPAMENTO}
          placeholder="Selecione uma opção"
          label="Tipo de equipamento"
          rules={{ required: 'Campo obrigatório' }}
        />

        <Input
          label="Marca"
          errors={errors.marca}
          {...register('marca', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Modelo"
          errors={errors.modelo}
          {...register('modelo', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Nº Tombamento"
          errors={errors.tombamento}
          {...register('tombamento', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Nº Serie"
          errors={errors.serie}
          {...register('serie', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Nº da Nota Fiscal"
          errors={errors.notaFiscal}
          {...register('notaFiscal', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <Input
          label="Tipo de aquisição"
          errors={errors.aquisicao}
          {...register('aquisicao', {
            required: 'Campo Obrigatório',
            maxLength: 20,
          })}
        />

        <ControlledSelect
          control={control}
          name="estadoEquipamento"
          id="estadoEquipamento"
          options={ESTADOS_EQUIPAMENTO}
          placeholder="Selecione uma opção"
          label="Estado do equipamento"
          rules={{ required: 'Campo obrigatório' }}
        />

        <ControlledSelect
          control={control}
          name="anoAquisicao"
          id="anoAquisicao"
          options={listOfYears}
          placeholder="Selecione uma opção"
          label="Ano da aquisição"
          rules={{ required: 'Campo obrigatório' }}
        />

        <Datepicker
          label="Data de aquisição"
          name="dataAquisicao"
          required
          control={control}
        />

        <GridItem gridColumn="1 / span 3">
          <TextArea
            label="Descrição"
            errors={errors.descricao}
            maxChars={255}
            {...register('descricao', {
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
