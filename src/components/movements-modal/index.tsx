import { useForm } from 'react-hook-form';
import {
  Flex,
  Text,
  Grid,
  GridItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Checkbox,
  TableContainer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Modal } from '../modal';
import { Input } from '../form-fields/input';
import { movement, movementEquipment } from '@/pages/movements/MovementControl';
import { MovimentacaoTipoMap } from '@/constants/movements';

type MovementsModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedMoviment: movement;
};

type FormValues = {
  name: string;
  localization: string;
  type: number;
  chiefName: string;
  chiefRole: string;
  inChargeName: string;
  inChargeRole: string;
};

export function MovementsModal({
  isOpen,
  onClose,
  selectedMoviment,
}: MovementsModalProps) {
  const [materiais, setMateriais] = useState<string[]>([]);
  const {
    register,
    formState: { errors },
  } = useForm<FormValues>();

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

  return (
    <Modal
      title="Movimentação"
      isOpen={isOpen}
      onClose={onCloseCallback}
      size="4xl"
    >
      {selectedMoviment && (
        <Flex
          height="100%"
          justifyContent="center"
          flexDirection="column"
          gap="16px"
        >
          <Flex width="100%" justifyContent="space-between">
            <Text>
              <strong>Nº Termo:</strong> 010101
            </Text>
            <Text>
              <strong>Data: </strong>
              {new Date(selectedMoviment?.date).toLocaleDateString('pt-BR')}
            </Text>
            <Text>
              <>
                <strong>Total Equipamentos:</strong>{' '}
                {selectedMoviment?.equipments.length}
              </>
            </Text>
          </Flex>

          <form>
            <Grid templateColumns="repeat(3, 3fr)" width="100%" gap={6}>
              <Input
                label="Posto de trabalho"
                errors={errors.name}
                isDisabled
                defaultValue={selectedMoviment?.destination.name}
                {...register('name', {
                  required: 'Campo Obrigatório',
                  maxLength: 50,
                })}
              />

              <Input
                label="Cidade"
                errors={errors.localization}
                isDisabled
                defaultValue={selectedMoviment?.destination.localization}
                {...register('localization', {
                  required: 'Campo Obrigatório',
                  maxLength: 50,
                })}
              />

              <Input
                label="Tipo de lotação"
                errors={errors.type}
                isDisabled
                defaultValue={MovimentacaoTipoMap.get(selectedMoviment?.type)}
                {...register('type', {
                  required: 'Campo Obrigatório',
                  maxLength: 50,
                })}
              />

              <GridItem colSpan={2}>
                <Input
                  label="Responsável"
                  errors={errors.chiefName}
                  isDisabled
                  defaultValue={selectedMoviment?.chiefName}
                  {...register('chiefName', {
                    required: 'Campo Obrigatório',
                    maxLength: 50,
                  })}
                />
              </GridItem>

              <Input
                label="Atribuição"
                errors={errors.chiefRole}
                isDisabled
                defaultValue={selectedMoviment?.chiefRole}
                {...register('chiefRole', {
                  required: 'Campo Obrigatório',
                  maxLength: 50,
                })}
              />
            </Grid>

            <Text fontWeight="bold" mt={10}>
              Especificação do material
            </Text>
            <Flex flexDirection="column" width="100%">
              <TableContainer
                justifyContent="center"
                alignItems="center"
                borderRadius="md"
                border="1px"
                borderColor="#F49320"
                minW="68%"
                style={{ maxHeight: '500px', overflowY: 'auto' }}
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
                      <Td textAlign="center" color="white">
                        Equipamento
                      </Td>
                      <Td textAlign="center" color="white">
                        Tombamento
                      </Td>
                      <Td textAlign="center" color="white">
                        N° Série
                      </Td>
                      <Td color="white" />
                    </Tr>
                  </Thead>
                  <Tbody fontWeight="normal">
                    {selectedMoviment?.equipments.map(
                      (equipment: movementEquipment) => (
                        <Tr
                          key={equipment.serialNumber}
                          background={
                            materiais.includes(equipment.serialNumber)
                              ? 'rgba(244, 147, 32, 0.2)'
                              : 'white'
                          }
                        >
                          <Td textAlign="center">
                            {equipment.type} {equipment.brand.name}
                          </Td>
                          <Td textAlign="center">{equipment.tippingNumber}</Td>
                          <Td textAlign="center">{equipment.serialNumber}</Td>
                          <Td textAlign="center">
                            <Checkbox
                              onChange={toggleMaterial(equipment.serialNumber)}
                              isChecked={equipment.selected}
                            />
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
            <Grid templateColumns="repeat(3, 3fr)" width="100%" gap={6} mt={6}>
              <GridItem colSpan={2}>
                <Input
                  label="Responsável pelo Termo de Responsabilidade"
                  errors={errors.inChargeName}
                  isDisabled
                  defaultValue={selectedMoviment?.inChargeName}
                  {...register('inChargeName', {
                    required: 'Campo Obrigatório',
                    maxLength: 50,
                  })}
                />
              </GridItem>

              <Input
                label="Atribuição"
                errors={errors.inChargeRole}
                isDisabled
                defaultValue={selectedMoviment?.inChargeRole}
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
              <Button type="submit" variant="primary">
                Gerar termo
              </Button>
            </Flex>
          </form>
        </Flex>
      )}
    </Modal>
  );
}
