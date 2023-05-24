import {
  Flex,
  Text,
  Checkbox,
  Table,
  Td,
  Thead,
  Tr,
  Grid,
  GridItem,
  Button,
  TableContainer,
  Tbody,
} from '@chakra-ui/react';

import {
  TIPOS_LOTACAO,
} from '@/constants/movements';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../config/lib/axios';
import { ControlledSelect } from '../form-fields/controlled-select';
import { Input } from '../form-fields/input';

enum movementType {
  Borrow,
  Dismiss,
  Ownership,
}

interface equipamentData {
  tippingNumber: string;

  serialNumber: string;

  id: string;
}

interface movementEquipment {
  tippingNumber: string;

  serialNumber: string;

  id: string;
  selected?: boolean;
}

interface unit {
  id?: string;
  name: string;
  localization: string;
}

type FormValues = {
  date: Date;
  userId: string;
  equipments: [];
  type: string;
  inChargeName: string;
  inChargeRole: string;
  chiefName: string;
  chiefRole: string;
  equipmentSnapshots?: any;
  description?: string;
  destination: unit;
};

interface MovementFormProps {
  onClose: () => void;
  lenghtMovements: number;
}

export default function MovementForm({
  onClose,
  lenghtMovements,
}: MovementFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [equipments, setEquipments] = useState<equipamentData[]>([]);
  const [units, setUnits] = useState<unit[]>([]);
  const [unit, setUnit] = useState<unit>();
  const [materiais, setMateriais] = useState<string[]>([]);

  const date = new Date();

  const onCloseCallback = () => {
    setMateriais([]);
    onClose();
  };

  const toggleMaterial = (serialNumber: string) => () => {
    if (materiais.includes(serialNumber)) {
      setMateriais(materiais.filter((material) => material !== serialNumber));
    } else {
      setMateriais([...materiais, serialNumber]);
    }
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const body = {
        date: formData.date,
        userId: formData.userId,
        equipments: formData.equipments,
        type: formData.type,
        inChargeName: formData.inChargeName,
        inChargeRole: formData.inChargeRole,
        chiefName: formData.chiefName,
        chiefRole: formData.chiefRole,
        equipmentSnapshots: formData?.equipmentSnapshots || null,
        description: formData?.description || null,
        destination: formData?.destination || '',
      };

      const response = await api.post('equipment/createMovement', body);

      if (response.status === 200) {
        toast.success('Movimentação cadastrada com sucesso');
        onClose();
        return;
      }
      toast.error('Erro ao tentar cadastrar o equipamento');
    } catch {
      toast.error('Erro ao tentar cadastrar o equipamento');
    }
  });

  const getEquipments = async () => {
    try {
      const { data }: AxiosResponse<equipamentData[]> = await api.get(
        `equipment/find`
      );
      setEquipments(data);
    } catch (error) {
      setEquipments([]);
      toast.error('Nenhuma movimentação registrada');
    }
  };

  const getUnits = async () => {
    try {
      const { data }: AxiosResponse<unit[]> = await api.get(
        `equipment/getAllUnits`
      );
      setUnits(data);
    } catch (error) {
      setUnits([]);
      toast.error('Nenhuma movimentação registrada');
    }
  };

  useEffect(() => {
    getEquipments();
    getUnits();
  }, []);

  return (
    <>
      <Flex
        height="100%"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <Flex width="100%" justifyContent="space-between">
          <Text>
            <strong>Nº Termo:</strong> {lenghtMovements}
          </Text>
          <Text>
            <strong>Data:</strong>
            {format(date, ' dd/MM/yyyy HH:mm:ss')}
          </Text>
          <Text>
            <>
              <strong>Total Equipamentos:</strong> {1}
            </>
          </Text>
        </Flex>
      </Flex>

      <form id="movement-register-form" onSubmit={onSubmit}>
        <Grid templateColumns="repeat(3, 3fr)" width="100%" gap={6}>
          <ControlledSelect
            control={control}
            name="destination"
            id="destination"
            options={units}
            onChange={(it) => {
              setUnit(it);
            }}
            placeholder="Selecione uma opção"
            label="Posto de trabalho"
            rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          />

          <Input
            label="Cidade"
            errors={errors.destination?.localization}
            isDisabled
            defaultValue={unit?.localization}
          />

          <ControlledSelect
            control={control}
            name="type"
            id="type"
            options={TIPOS_LOTACAO}
            placeholder="Selecione uma opção"
            label="Tipo de lotação"
            rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          />

          <GridItem colSpan={2}>
            <Input
              label="Responsável"
              errors={errors.chiefName}
              {...register('chiefName', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />
          </GridItem>

          <Input
            label="Atribuição"
            errors={errors.chiefRole}
            {...register('chiefRole', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
        </Grid>

        <Text fontWeight="bold" mt={10}>
          Especificação do material
        </Text>

        <TableContainer
          borderRadius="md"
          border="1px"
          borderColor="#F49320"
          minW="68%"
          style={{ height: '500px', overflowY: 'auto' }}
          css={{
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
              background: '#C6C6C6',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#F49320',
              borderRadius: '24px',
            },
          }}
        >
          <Table colorScheme="orange" size="sm">
            <Thead bg="#F49320" fontWeight="semibold" h="14">
              <Tr>
                <Td color="white">Equipamento</Td>
                <Td color="white">Tombamento</Td>
                <Td color="white">N° Série</Td>
                <Td color="white" />
              </Tr>
            </Thead>
            <Tbody fontWeight="semibold">
              {equipments.map((equipment: movementEquipment) => (
                <Tr
                  key={equipment.serialNumber}
                  background={
                    materiais.includes(equipment.serialNumber)
                      ? 'rgba(244, 147, 32, 0.2)'
                      : 'white'
                  }
                >
                  <Td>{equipment.id}</Td>
                  <Td>{equipment.tippingNumber}</Td>
                  <Td>{equipment.serialNumber}</Td>
                  <Td>
                    <Checkbox
                      onChange={toggleMaterial(equipment.serialNumber)}
                      isChecked={equipment.selected}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <Grid templateColumns="repeat(3, 3fr)" width="100%" gap={6} mt={6}>
          <GridItem colSpan={2}>
            <Input
              label="Responsável pelo Termo de Responsabilidade"
              errors={errors.inChargeName}
              {...register('inChargeName', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />
          </GridItem>

          <Input
            label="Atribuição"
            errors={errors.inChargeRole}
            {...register('inChargeRole', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
        </Grid>

        <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
          <Button variant="secondary" onClick={onCloseCallback}>
            Cancelar
          </Button>
          <Button type="submit" form="movement-register-form" variant="primary">
            Gerar Movimentação
          </Button>
        </Flex>
      </form>
    </>
  );
}
