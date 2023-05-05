import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import { FaCalendar, FaCalendarAlt } from 'react-icons/fa';
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
import { RiCalendar2Line } from 'react-icons/ri';

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

        <Input
          label="Data de Aquisição"
          errors={undefined}
          rightElement={<RiCalendar2Line />}
        />
      </Grid>

      <Input label="Detalhes" errors={undefined} minH="8rem" />
    </form>
  );
}
