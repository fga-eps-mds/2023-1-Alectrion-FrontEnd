/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */

import { useState } from 'react';
import { Grid } from '@chakra-ui/react';
// eslint-disable-next-line no-useless-escape
import EquipmentSelectField from './equipment-select-field';
import {
  ESTADOS_EQUIPAMENTO,
  TIPOS_ARMAZENAMENTO,
  TipoEquipamento,
  TipoArmazenamento,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
  TipoMonitor,
} from '@/constants/equipment';
import EquipmentTextField from './equipment-text-field';

export default function EquipmentForm() {
  const [tipoEquipamento, setTipoEquipamento] = useState<TipoEquipamento>(
    TIPOS_EQUIPAMENTO[0].value
  );

  return (
    <form>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <EquipmentSelectField<TipoEquipamento>
          title="Tipo de Equipamento"
          name="tipo-equipamento"
          onChange={setTipoEquipamento}
          items={TIPOS_EQUIPAMENTO}
        />
        <EquipmentTextField title="Marca" name="marca" />
        <EquipmentTextField title="Modelo" name="modelo" />

        <EquipmentTextField
          title="N° Tombamento"
          name="numero-tombamento"
        />
        <EquipmentTextField title="N° Série" name="numero-serie" />
        <EquipmentTextField
          title="Tipo de aquisição"
          name="tipo-aquisicao"
        />

        <EquipmentSelectField
          title="Estado do equipamento"
          name="estado-equipamento"
          items={ESTADOS_EQUIPAMENTO}
          onChange={() => {}}
        />
        <EquipmentTextField
          title="Ano do equipamento"
          name="ano-equipamento"
        />
        <EquipmentTextField
          title="Data de aquisição"
          name="data-aquisicao"
        />

        <EquipmentTextField
          title="Detalhes"
          name="data-aquisicao"
          colSpan={3}
          rowSpan={2}
        />

        {tipoEquipamento === 'CPU' && (
          <>
            <EquipmentTextField title="Qtd. Memória RAM" name="ram" />
            <EquipmentTextField
              title="Qtd. Armazenamento"
              name="qtd-armazenamento"
            />
            <EquipmentSelectField<TipoArmazenamento>
              title="Tipo de Armazenamento"
              name="tipo-armazenamento"
              items={TIPOS_ARMAZENAMENTO}
              onChange={() => {}}
            />
            <EquipmentTextField
              title="Processador"
              name="processador"
            />
          </>
        )}

        {tipoEquipamento === 'Monitor' && (
          <>
            <EquipmentSelectField<TipoMonitor>
              title="Tipo de Monitor"
              name="tipo-monitor"
              items={TIPOS_MONITOR}
              onChange={() => {}}
            />
            <EquipmentTextField
              title="Tamanho do Monitor"
              name="tamanho-monitor"
            />
          </>
        )}

        {(tipoEquipamento === 'Estabilizador' ||
          tipoEquipamento === 'Nobreak') && (
          <EquipmentTextField title="Potência" name="potencia" />
        )}
      </Grid>
    </form>
  );
}