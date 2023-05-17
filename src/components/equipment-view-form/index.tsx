import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useState, useEffect, SetStateAction } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import MovementHistory  from '../movement-history'
import { Equipment } from '../equipment-view-modal';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api } from '@/services/api';

import { format, addDays } from 'date-fns';

type FormValues = {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: string;
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
  estado: string;
};



interface EquipmentFormProps {
  equipmentId: string | null,
  onClose: () => void
}

export default function EquipmentViewForm({ 
  equipmentId, 
  onClose 
}: EquipmentFormProps) {

  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  
  const [equipmentType, setEquipmentType] = useState('');

  useEffect(() => {
    const fetchEquipmentData = async () => {
      try {
        const { data }: AxiosResponse<Equipment[]> = await api.get(
          'equipment/find',
          {params: {id: equipmentId}},
        )
        
        const equipment = data[0];
        setEquipmentType(equipment.type);
        console.log(equipment);
      
        const acquisitionDate = equipment?.acquisitionDate;
        const formattedAcquisitionDate = acquisitionDate ? format(addDays(new Date(acquisitionDate), 1), 'dd-MM-yyyy') : '';

        setValue('tippingNumber', equipment?.tippingNumber ?? '');
        setValue('serialNumber', equipment?.serialNumber ?? '');
        setValue('type', equipment?.type ?? '');
        setValue('situacao', equipment?.situacao ?? '');
        setValue('model', equipment?.model ?? '');
        setValue('description', equipment?.description ?? '');
        setValue('screenSize', equipment?.screenSize ?? '');
        setValue('invoiceNumber', equipment?.invoiceNumber ?? '');
        setValue('power', equipment?.power ?? '');
        setValue('screenType', equipment?.screenType);
        setValue('processor', equipment?.processor ?? '');
        setValue('storageType', equipment?.storageType );
        setValue('storageAmount', equipment?.storageAmount ?? '');
        setValue('brandName', equipment?.brand.name ?? '');
        setValue('acquisitionName', equipment?.acquisition.name ?? '');
        setValue('initialUseDate',equipment?.initialUseDate ?? '');
        setValue('acquisitionDate',formattedAcquisitionDate ?? '');
        setValue('ram_size', equipment?.ram_size ?? '');
        setValue('estado',equipment?.estado ?? '');

      } catch (error) {
        console.error('Erro ao obter os dados do equipamento:', error);
      }
    };

    fetchEquipmentData();
  }, [equipmentId, setValue]);

 
  
  return (
    <form id="equipment?-register-form">
      <Grid templateColumns="repeat(3, 3fr)" gap={4} height={"-moz-max-content"}>
        <Input
          id="type"
          label="Tipo de equipamento"
          errors={errors.type}
          {...register('type')}
          isReadOnly
        />
        <Input
          label="Marca"
          errors={errors.brandName}
          {...register('brandName')}
          isReadOnly
        />

        <Input
          label="Modelo"
          errors={errors.model}
          {...register('model')}
          isReadOnly
        />

        <Input
          label="Nº Tombamento"
          errors={errors.tippingNumber}
          {...register('tippingNumber')}
          isReadOnly
        />

        <Input
          label="Nº Serie"
          errors={errors.serialNumber}
          {...register('serialNumber')}
          
          isReadOnly
        />

        <Input
          label="Tipo de aquisição"
          errors={errors.acquisitionName}
          {...register('acquisitionName')}
          isReadOnly
        />

        <Input
          {...register('estado')}
          id="estado"
          label="Estado do equipamento"
          errors={errors.estado}
          isReadOnly
        />

        <Input
          {...register('initialUseDate')}
          id="initialUseDate"
          errors={errors.initialUseDate}
          label="Ano da aquisição"
          isReadOnly
        />

        <Input
          label="Data de aquisição"
          {...register('acquisitionDate')}
          errors={errors.acquisitionDate}
          disabled
        />
        {equipmentType === 'CPU' && (
          <>
            <Input
              label="Qtd. Memória RAM (GB)"
              errors={errors.ram_size}
              {...register('ram_size')}
              isReadOnly
            />
            <Input
              {...register('storageType')}
              id="storageType"
              label="Tipo de armazenamento"
              errors={errors.storageType}
              isReadOnly
            />
            <Input
              label="Qtd. Armazenamento (GB)"
              errors={errors.storageAmount}
              {...register('storageAmount')}
              isReadOnly
            />
            <Input
              label="Processador"
              errors={errors.processor}
              {...register('processor', {
                required: 'Campo Obrigatório',
              })}
              isReadOnly
            />
          </>
        )}

        {equipmentType === 'Monitor' && (
          <>
            <Input
              {...register('screenType')}
              id="screenType"
              placeholder="Selecione uma opção"
              label="Tipo de monitor"
              errors={errors.screenType}
            />
            <Input
              label="Tamanho do Monitor"
              errors={errors.storageAmount}
              {...register('screenSize')}
            />
          </>
        )}

        {(equipmentType === 'Estabilizador' ||
          equipmentType === 'Nobreak') && (
          <Input
            label="Potência (VA)"
            errors={errors.storageAmount}
            {...register('power')}
          />
        )}
        <GridItem gridColumn="1 / span 3">
          <TextArea

            label="Descrição"
            errors={errors.description}
            maxChars={255}
            {...register('description')}
            readOnly
          />
        </GridItem>
      </Grid>
      <MovementHistory equipmentId = {equipmentId}/>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Voltar
        </Button>
        <Button variant="primary">
          Editar
        </Button>
      </Flex>
    </form>
  );
}
