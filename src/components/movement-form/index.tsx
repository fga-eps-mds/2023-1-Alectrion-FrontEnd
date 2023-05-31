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

import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { TIPOS_LOTACAO } from '@/constants/movements';
import { api } from '../../config/lib/axios';
import { ControlledSelect } from '../form-fields/controlled-select';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { movementEquipment } from '@/pages/movements/MovementControl';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';

interface equipamentData {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  estado: string;
  model: string;
  acquisitionDate: Date;
  description?: string;
  initialUseDate: Date;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  ram_size?: string;
  createdAt?: string;
  updatedAt: string;
  id: string;
  brand: {
    name: string;
  };
  acquisition: { name: string };
  unit: {
    name: string;
    localization: string;
  };
}

interface unit {
  id?: string;
  name: string;
  localization: string;
}

type FormValues = {
  date: Date;
  userId: string;
  equipments: string[];
  type: SelectOption<number>;
  inChargeName: string;
  inChargeRole: string;
  chiefName: string;
  chiefRole: string;
  description?: string;
  destination: SelectOption<string>;
};

interface MovementFormProps {
  onClose: () => void;
  lenghtMovements?: number;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
  selectedEquipmentToMovement?: EquipmentData[];
}

export default function MovementForm({
  onClose,
  lenghtMovements,
  refreshRequest,
  setRefreshRequest,
  selectedEquipmentToMovement,
}: MovementFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const [equipments, setEquipments] = useState<equipamentData[]>([]);
  const [units, setUnits] = useState<unit[]>([]);
  const [materiais, setMateriais] = useState<string[]>([]);

  const date = new Date();

  const selectedUnit: SelectOption<string> = watch('destination');

  const onCloseCallback = useCallback(() => {
    setMateriais([]);
    onClose();
  }, [onClose]);

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
        // TODO: Alterar userid de acordo com a necessidade, inclusive para DEPLOY
        userid: '162fba6b-1a56-4960-abf1-43be5b753697',
        date: formData.date,
        userId: formData.userId,
        type: formData.type?.value,
        inchargename: formData.inChargeName,
        inchargerole: formData.inChargeRole,
        chiefname: formData.chiefName,
        chiefrole: formData.chiefRole,
        equipments: materiais || [],
        description: formData?.description || null,
        destination: formData?.destination?.value || '',
      };

      const response = await api.post('equipment/createMovement', body);

      if (response.status === 200) {
        toast.success('Movimentação cadastrada com sucesso');
        setRefreshRequest(!refreshRequest);
        onClose();
        return;
      }
      toast.error('Erro ao tentar cadastrar o movimentação');
    } catch {
      toast.error('Erro ao tentar cadastrar o movimentação');
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

  const listEquipments = () => {
    let listEquipments: EquipmentData[];
    if (selectedEquipmentToMovement) {
      listEquipments = selectedEquipmentToMovement;
    } else {
      listEquipments = equipments;
    }

    return listEquipments.map((equipment: movementEquipment) => (
      <Tr
        key={equipment.id}
        background={
          materiais.includes(equipment.id) ? 'rgba(244, 147, 32, 0.2)' : 'white'
        }
      >
        <Td>{equipment.type}</Td>
        <Td>{equipment.brand.name}</Td>
        <Td>{equipment.model}</Td>
        <Td>{equipment.tippingNumber}</Td>
        <Td>{equipment.serialNumber}</Td>
        <Td>
          <Checkbox
            onChange={toggleMaterial(equipment.id)}
            isChecked={equipment.selected}
          />
        </Td>
      </Tr>
    ));
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
            options={units.map((unit) => ({
              value: unit.id,
              label: unit.name,
            }))}
            placeholder="Selecione uma opção"
            label="Posto de trabalho"
            rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          />

          <Input
            label="Cidade"
            errors={errors.destination?.value}
            isDisabled
            defaultValue={
              units.find(
                (iterationUnit) => iterationUnit.id === selectedUnit?.value
              )?.localization
            }
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
          Especificação do equipamento
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
                <Td color="white">N° Tombamento</Td>
                <Td color="white">Equipamento</Td>
                <Td color="white">Marca</Td>
                <Td color="white">Modelo</Td>
                <Td color="white">N° Série</Td>
                <Td color="white" />
              </Tr>
            </Thead>
            <Tbody fontWeight="semibold">{listEquipments()}</Tbody>
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
