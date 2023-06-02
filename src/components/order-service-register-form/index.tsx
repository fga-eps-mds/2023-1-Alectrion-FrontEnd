/* eslint-disable no-empty-pattern */
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { Select, SingleValue } from 'chakra-react-select';
import { Box } from '@chakra-ui/react'

import { Input } from '../form-fields/input';
import { ControlledSelect } from '@/components/form-fields/controlled-select';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/order-service/order-service-control';

type FormValues = {
  tippingNumber: string;
  description?: string;
  power?: string;
  storageAmount?: string;
  responsavelEntrega: {
    telefone:string,
    nome: string, 
    atribuicao: string
  },
  model: string;
  acquisitionName: string;
  unitId?: string;
  estado: { value: string; label: string }; 
};

interface ISelectOption {
  label: string;
  value: number | string;
}

interface OrderServiceFormProps {
  onClose: () => void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderServiceregisterForm({
  onClose,
  refreshRequest,
  setRefreshRequest,
}: OrderServiceFormProps) {

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>()
  const [equipments, setEquipments] = useState<EquipmentData[]>([])

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  useEffect(() => {
    console.log(selectedEquipment)
  }, [selectedEquipment])
  const fetchItems = async (str: string) => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find?searchTipping=${str}`
      );
      setEquipments(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  const formattedOptions = (data: EquipmentData[]): ISelectOption[] => {
    return data?.map((item: EquipmentData) => {
      return { label: item.tippingNumber, value: item.tippingNumber };
    });
  };

  const handleSearch = debounce(async (str) => {
    if (str !== '') {
      fetchItems(str);
    }
  }, 500);

  const handleChange = (event: SingleValue<ISelectOption>) => {    
    const selectedOption = equipments.find(
      (equipment) => equipment.tippingNumber === event?.value
    );
    setSelectedEquipment(selectedOption)
  }
  
  return (
    <form id="equipment-register-form">
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem gridColumn="1 / span 3" display="flex" alignItems="center" gap={4}>
            <strong>Nº de tombamento do equipamento:</strong>
            <Box flex="1">

            <Select
              placeholder="Pesquisa"
              onInputChange={handleSearch}
              onChange={handleChange}
              options={formattedOptions(equipments)}
              
              />
              </Box>
        </GridItem>
        <GridItem>
          <strong>Tipo:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Tipo"
            defaultValue={selectedEquipment?.type || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Nº de série:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Nº de série"
            defaultValue={selectedEquipment?.serialNumber || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Marca:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Marca"
            defaultValue={selectedEquipment?.brand.name || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Modelo:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Modelo"
            {...register('model')}
            defaultValue={selectedEquipment?.model || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Lotação:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Lotação"
            {...register('unitId')}
            defaultValue={selectedEquipment?.unit.localization || ''}
            readOnly
          />
        </GridItem>
        <GridItem>
          <strong>Situação:</strong>
          <Input
            errors={undefined}
            type="text"
            placeholder="Situação"
            defaultValue={selectedEquipment?.situacao || ''}
            readOnly
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <strong> Ordem de serviço</strong>
          </GridItem>
        <GridItem>
          <strong>Funcional:</strong>
          <select
          placeholder='Funcional'
          name='funcional'
          className="select-input">
            <option value=''>Selecione</option>
            <option value='sim'>Sim</option>
            <option value='nao'>Não</option>

          </select>
        </GridItem>
        <GridItem>
          <strong>Responsável pela entrega:</strong>
          <Input
            errors={errors.responsavelEntrega?.nome}
            placeholder='Responsável'
            type="text"
            {...register('responsavelEntrega', {
            required: 'Campo Obrigatório',
            maxLength: 50,
            })}
            />
        </GridItem>
        <GridItem>
          <strong>Atribuição:</strong>
          <select
          placeholder='Atribuição'
          name='atribuicao'
          className="select-input">
            <option value=''>Selecione</option>
            <option value='sim'>Sim</option>
            <option value='nao'>Não</option>

          </select>
        </GridItem>
      
        <GridItem>
          <strong>Posto de trabalho:</strong>
          <select
          placeholder='Posto de trabalho'
          name='Posto de trabalho'
          className="select-input">
            <option value=''>Selecione</option>
            <option value='sim'>Sim</option>
            <option value='nao'>Não</option>

          </select>
        </GridItem>
        <GridItem>
          <strong>Cidade:</strong>
          <select
          placeholder='Cidade'
          name='cidade'
          className="select-input">
            <option value=''>Selecione</option>
            <option value='sim'>Sim</option>
            <option value='nao'>Não</option>

          </select>
        </GridItem>
        <GridItem>
          <strong>Telefone:</strong>
          <Input
            placeholder='Telefone'
            type="text"
            errors={errors.responsavelEntrega?.telefone}
            {...register('responsavelEntrega.telefone', {
            required: 'Campo Obrigatório',
            maxLength: 15,
            pattern: {
            value: /^[0-9]+$/,
            message: 'Por favor, digite apenas números.',
            },
            })}
          />
        </GridItem>
        <GridItem gridColumn="1 / span 3">
          <strong>Descrição:</strong>
          <Input
          errors={errors.description}
            placeholder='Descrição'
            type="text"
            {...register('description')}
            />
        </GridItem>
        
      </Grid>

      <Grid templateColumns="repeat(3, 3fr)" gap={6} />
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form="equipment-register-form"
          variant="primary"
        >
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}
