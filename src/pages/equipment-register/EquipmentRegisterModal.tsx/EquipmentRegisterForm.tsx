import { Grid } from '@chakra-ui/react';
import EquipmentRegisterSelectField from './EquipmentRegisterSelectField';
import EquipmentRegisterTextField from './EquipmentRegisterTextField';

export default function EquipmentRegisterForm() {
  const tiposEquipamento = [
    { value: 'CPU', key: 'cpu' },
    { value: 'Escaneador', key: 'escaneador' },
    { value: 'Estabilizador', key: 'estabilizador' },
    { value: 'Monitor', key: 'monitor' },
    { value: 'Nobreak', key: 'nobreak' },
    { value: 'Webcam', key: 'webcam' },
  ];

  const estadosEquipamento = [
    { value: 'NOVO', key: 'novo' },
    { value: 'USADO', key: 'usado' },
  ];

  return (
    <form>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <EquipmentRegisterSelectField
          title="Tipo de Equipamento"
          name="tipo-equipamento"
          items={tiposEquipamento}
        />
        <EquipmentRegisterTextField title="Marca" name="marca" />
        <EquipmentRegisterTextField title="Modelo" name="modelo" />

        <EquipmentRegisterTextField
          title="N° Tombamento"
          name="numero-tombamento"
        />
        <EquipmentRegisterTextField title="N° Série" name="numero-serie" />
        <EquipmentRegisterTextField
          title="Tipo de aquisição"
          name="tipo-aquisicao"
        />

        <EquipmentRegisterSelectField
          title="Estado do equipamento"
          name="estado-equipamento"
          items={estadosEquipamento}
        />
        <EquipmentRegisterTextField
          title="Ano do equipamento"
          name="ano-equipamento"
        />
        <EquipmentRegisterTextField
          title="Data de aquisição"
          name="data-aquisicao"
        />

        <EquipmentRegisterTextField
          title="Detalhes"
          name="data-aquisicao"
          colSpan={3}
          rowSpan={2}
        />
      </Grid>
    </form>
  );
}
