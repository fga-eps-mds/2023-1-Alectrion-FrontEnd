/* eslint-disable prettier/prettier */
/* eslint-disable import/no-useless-path-segments */

import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { AxiosResponse } from 'axios';
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
import { Equipment } from '@/pages/edit-equipment/edit-equipment-modal';
import EquipmentDateField from './equipment-date-field';
import { api } from '@/config/lib/axios';

type FormValues = Equipment

export default function EditEquipmentForm(props?: {equip: Equipment}) {
  const [tipoEquipamento, setTipoEquipamento] = useState<TipoEquipamento>(
    TIPOS_EQUIPAMENTO[0].value
  );

  const { control, handleSubmit, register } = useForm<FormValues>({
    defaultValues: props?.equip,
  });

  const onSubmit = handleSubmit(async (formData: Equipment) => {
    console.log(formData)
    try {
      const response: AxiosResponse<any> = await api.put('equipment/updateEquipment',formData);

      } catch (error) {
          console.log(`aqui erro: ${error}`);
      }
  })

  return (
    <form id="equipment-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        
        <Controller
          name="type"
          control={control}
          render={({field}) => (
            <EquipmentSelectField<TipoEquipamento>
            title="Tipo de Equipamento"
            items={TIPOS_EQUIPAMENTO}
            defaultValue={props?.equip.type}
            {...field}
          />
          )}
        />
        
        <Controller
          name="brandName"
          control={control}
          render={({ field }) => (
            <EquipmentTextField
              defaultValue={props?.equip.brandName}
              title="Marca"
              {...field}
            />
          )}
        />
        
        <Controller
          name="model"
          control={control}
          render={({ field }) => (
            <EquipmentTextField
              defaultValue={props?.equip.model}
              title="Modelo"
              {...field}
            />
          )}
        />

        <Controller
          name="tippingNumber"
          control={control}
          render={({ field }) => (
            <EquipmentTextField
              defaultValue={props?.equip.tippingNumber}
              title="Nº de tombamento"
              {...field}
            />
          )}
        />
        
        <Controller
          name="acquisitionName"
          control={control}
          render={({ field }) => (
            <EquipmentTextField
              defaultValue={props?.equip.acquisitionName}
              title="Tipo de aquisição"
              {...field}
            />
          )}
        />

        <Controller
          name="serialNumber"
          control={control}
          render={({ field }) => (
            <EquipmentTextField
              defaultValue={props?.equip.serialNumber}
              title="Nº de série"
              {...field}
            />
          )}
        />

        <Controller
          name="estado"
          control={control}
          render={({ field }) => (
            <EquipmentSelectField
            title="Estado do equipamento"
            items={ESTADOS_EQUIPAMENTO}
            defaultValue={props?.equip.estado}
            {...field}
          />
          )}
        />
        
        <Controller
          name="initialUseDate"
          control={control}
          render={({ field }) => (
            <EquipmentTextField
              defaultValue={props?.equip.initialUseDate}
              title="Ano de equipamento"
              {...field}
            />
          )}
        />
        
        <Controller
          name = "acquisitionDate"
          control={control}
          render={({ field }) => (
            <EquipmentDateField
              defaultValue={props?.equip.acquisitionDate}
              title="Data de aquisição"
              {...field}
            />
          )}
        />
     
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <EquipmentTextField
            title="Detalhes"
            colSpan={3}
            rowSpan={2}
            defaultValue={props?.equip.description}
            {...field}
            />
          )}
        />
        
        {tipoEquipamento === 'CPU' && (
          <>
            <Controller
              name="ram_size"
              control={control}
              render={({ field }) => (
                <EquipmentTextField
                defaultValue={props?.equip.ram_size}
                title="Qtd. Memória RAM"
                {...field}
                />
              )}
            />
            
            <Controller
              name="storageAmount"
              control={control}
              render={({ field }) => (
                <EquipmentTextField
                defaultValue={props?.equip.storageAmount}
                title="Qtd. Armazenamento"
                {...field}
                />
              )}
            />

            <Controller
              name="storageType"
              control={control}
              render={({ field }) => (
                <EquipmentSelectField<TipoArmazenamento>
                defaultValue={props?.equip.storageType}
                title="Tipo de Armazenamento"
                items={TIPOS_ARMAZENAMENTO}
                {...field}
                />
              )}
            />

            <Controller
              name="processor"
              control={control}
              render={({ field }) => (
                <EquipmentTextField
                  title="Processador"
                  defaultValue={props?.equip.processor}
                  {...field}
                />
              )}
            />
          </>
        )}

        {tipoEquipamento === 'Monitor' && (
          <>
            <Controller
              name="screenType"
              control={control}
              render={({ field }) => (
                <EquipmentSelectField<TipoMonitor>
                  title="Tipo de Monitor"
                  items={TIPOS_MONITOR}
                  defaultValue={props?.equip.screenType}
                  {...field}
                />
              )}
            />

            <Controller
              name="screenSize"
              control={control}
              render={({ field }) => (
                <EquipmentTextField
                  title="Tamanho do Monitor"
                  id="screenSize"
                  defaultValue={props?.equip.screenSize}
                  {...field}
                />
              )}
            />
            
          </>
        )}

        {(tipoEquipamento === 'Estabilizador' ||
          tipoEquipamento === 'Nobreak') && (

          <Controller
            name="power"
            control={control}
            render={({ field }) => (
            <EquipmentTextField
            title="power"
            defaultValue={props?.equip.power}
            {...field}
            />
            )}
          />
        )}
        
      </Grid>

      <Flex gap="4rem" mt="2rem" mb="1rem" justifyContent="space-around">
        <Button variant="secondary">Cancelar</Button>
        <Button type="submit" form="equipment-register-form" variant="primary">
          Confirmar
        </Button>
      </Flex>
      
    </form>
  );
}

