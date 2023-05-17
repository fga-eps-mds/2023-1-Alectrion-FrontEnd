/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */

import { useState } from 'react';
import { Button, Flex, Grid } from '@chakra-ui/react';
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
import { api } from '@/config/lib/axios';
import { Equipment } from '@/pages/edit-equipment/edit-equipment-modal';
import EquipmentDateField from './equipment-date-field';

// type FormValues = {
//   marca: string;
//   modelo: string;
//   tombamento: string;
//   serie: string;
//   notaFiscal: string;
//   aquisicao: string;
//   descricao: string;
//   tipoEquipamento: string;
//   estadoEquipamento: string;
//   anoAquisicao: string;
//   dataAquisicao: string;
//   screenType: string;
// };

type FormValues = Equipment;

export default function EditEquipmentForm(props?: { equip: Equipment }) {
  const [tipoEquipamento, setTipoEquipamento] = useState(
    TIPOS_EQUIPAMENTO[0].value
  );

  const { handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    try {
      await axios.put("equipment/updateEquipment", formData);
    } catch (error) {
      console.log(`erro: ${error}`);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEquipment({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <EquipmentSelectField<TipoEquipamento>
          title="Tipo de Equipamento"
          name="tipo-equipamento"
          onChange={setTipoEquipamento}
          items={TIPOS_EQUIPAMENTO}
          defaultValue={props?.equip.type}
        />
        <EquipmentTextField title="Marca" name="marca" defaultValue={props?.equip.brand}/>
        <EquipmentTextField title="Modelo" name="modelo" defaultValue={props?.equip.model}/>

        <EquipmentTextField
          title="N° Tombamento"
          name="numero-tombamento"
          defaultValue={props?.equip.tippingNumber}
        />
        <EquipmentTextField title="N° Série" name="numero-serie" defaultValue={props?.equip.serialNumber}/>
        <EquipmentTextField
          title="Tipo de aquisição"
          name="tipo-aquisicao"
          defaultValue={props?.equip.acquisition}
        />

        <EquipmentSelectField
          title="Estado do equipamento"
          name="estado-equipamento"
          items={ESTADOS_EQUIPAMENTO}
          defaultValue={props?.equip.estado}
          onChange={() => {}}
        />
        <EquipmentTextField
          title="Ano do equipamento"
          name="ano-equipamento"
          defaultValue={props?.equip.initialUseDate}
        />
        <EquipmentDateField
          title="Data de aquisição"
          name="data-aquisicao"
          defaultValue={props?.equip.acquisitionDate}
        />

        <EquipmentTextField
          title="Detalhes"
          name="data-aquisicao"
          colSpan={3}
          rowSpan={2}
          defaultValue={props?.equip.description}
        />

        {tipoEquipamento === 'CPU' && (
          <>
            <EquipmentTextField title="Qtd. Memória RAM" name="ram" defaultValue={props?.equip.ram_size}/>
            <EquipmentTextField
              title="Qtd. Armazenamento"
              name="qtd-armazenamento"
              defaultValue={props?.equip.storageAmount}
            />
            <EquipmentSelectField<TipoArmazenamento>
              title="Tipo de Armazenamento"
              name="tipo-armazenamento"
              items={TIPOS_ARMAZENAMENTO}
              defaultValue={props?.equip.storageType}
              onChange={(event) => handleChange(event)}
            />
            <EquipmentTextField
              title="Processador"
              name="processador"
              defaultValue={props?.equip.processor}
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
              defaultValue={props?.equip.screenType}
            />
            <EquipmentTextField
              title="Tamanho do Monitor"
              name="tamanho-monitor"
              defaultValue={props?.equip.screenSize}
            />
          </>
        )}

        {(tipoEquipamento === 'Estabilizador' ||
          tipoEquipamento === 'Nobreak') && (
          <EquipmentTextField title="Potência" name="potencia" defaultValue={props?.equip.power} />
        )}
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