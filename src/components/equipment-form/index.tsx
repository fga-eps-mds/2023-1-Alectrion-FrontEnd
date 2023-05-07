import { useForm } from 'react-hook-form';
import { Grid, GridItem } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';
import { ControlledSelect } from '../form-fields/controlled-select';
import {
  ESTADOS_EQUIPAMENTO,
  TIPOS_ARMAZENAMENTO,
  TipoEquipamento,
  TipoArmazenamento,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
  TipoMonitor,
} from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';

export default function EquipmentForm() {
  const { control } = useForm();

  return (
    <form>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <ControlledSelect
          control={control}
          label="Tipo de equipamento"
          name="tipo-equipamento"
          options={TIPOS_EQUIPAMENTO}
        />

        <Input label="Marca" errors={undefined} />

        <Input label="Modelo" errors={undefined} />

        <Input label="Nº Tombamento" errors={undefined} />

        <Input label="Nº Serie" errors={undefined} />

        <Input label="Nº da Nota Fiscal" errors={undefined} />

        <Input label="Tipo de aquisição" errors={undefined} />

        <ControlledSelect
          control={control}
          label="Estado do equipamento"
          name="estado-equipamento"
          options={ESTADOS_EQUIPAMENTO}
        />

        <Input label="Ano do Equipamento" errors={undefined} />

        <Datepicker
          name="data-aquisição"
          label="Data de aquisição"
          control={control}
        />

        <GridItem gridColumn="1 / span 3">
          <TextArea label="Descrição" errors={undefined} maxChars={255} />
        </GridItem>
      </Grid>
    </form>
  );
}
