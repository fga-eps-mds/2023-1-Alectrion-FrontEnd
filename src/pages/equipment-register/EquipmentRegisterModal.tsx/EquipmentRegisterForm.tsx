import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
import {
  ESTADOS_EQUIPAMENTO,
  TIPOS_ARMAZENAMENTO,
  TipoEquipamento,
  TipoArmazenamento,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
  TipoMonitor,
} from '@/constants/equipment';
import EquipmentRegisterSelectField from './EquipmentRegisterSelectField';
import EquipmentRegisterTextField from './EquipmentRegisterTextField';

export default function EquipmentRegisterForm() {
  const [tipoEquipamento, setTipoEquipamento] = useState<TipoEquipamento>(
    TIPOS_EQUIPAMENTO[0].value
  );

  return (
    <form>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <EquipmentRegisterSelectField<TipoEquipamento>
          title="Tipo de Equipamento"
          name="tipo-equipamento"
          onChange={setTipoEquipamento}
          items={TIPOS_EQUIPAMENTO}
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
          items={ESTADOS_EQUIPAMENTO}
          onChange={() => {}}
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

        {tipoEquipamento === 'CPU' && (
          <>
            <EquipmentRegisterTextField title="Qtd. Memória RAM" name="ram" />
            <EquipmentRegisterTextField
              title="Qtd. Armazenamento"
              name="qtd-armazenamento"
            />
            <EquipmentRegisterSelectField<TipoArmazenamento>
              title="Tipo de Armazenamento"
              name="tipo-armazenamento"
              items={TIPOS_ARMAZENAMENTO}
              onChange={() => {}}
            />
            <EquipmentRegisterTextField
              title="Processador"
              name="processador"
            />
          </>
        )}

        {tipoEquipamento === 'Monitor' && (
          <>
            <EquipmentRegisterSelectField<TipoMonitor>
              title="Tipo de Monitor"
              name="tipo-monitor"
              items={TIPOS_MONITOR}
              onChange={() => {}}
            />
            <EquipmentRegisterTextField
              title="Tamanho do Monitor"
              name="tamanho-monitor"
            />
          </>
        )}

        {(tipoEquipamento === 'Estabilizador' ||
          tipoEquipamento === 'Nobreak') && (
          <EquipmentRegisterTextField title="Potência" name="potencia" />
        )}
      </Grid>
    </form>
  );
}
