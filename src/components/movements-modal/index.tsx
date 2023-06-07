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
  TableContainer,
} from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useState } from 'react';
import { Modal } from '../modal';
import { Input } from '../form-fields/input';
import { movement, movementEquipment } from '@/pages/movements/MovementControl';
import { MovimentacaoTipoMap } from '@/constants/movements';
import { MovementsPDF } from '../movements-pdf/MovementsPdfDocument';

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

function mapMovementType(type: number): string {
  switch (type) {
    case 1:
      return 'Borrow';
    case 2:
      return 'Dismiss';
    case 3:
      return 'Ownership';
    default:
      return '';
  }
}

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
                defaultValue={selectedMoviment?.destination?.name}
                {...register('name', {
                  required: 'Campo Obrigatório',
                  maxLength: 50,
                })}
              />

              <Input
                label="Cidade"
                errors={errors.localization}
                isDisabled
                defaultValue={selectedMoviment?.destination?.localization}
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
              Especificação do equipamento
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
                        N° Tombamento
                      </Td>
                      <Td textAlign="center" color="white">
                        Equipamento
                      </Td>
                      <Td textAlign="center" color="white">
                        Marca
                      </Td>
                      <Td textAlign="center" color="white">
                        Modelo
                      </Td>
                      <Td textAlign="center" color="white">
                        N° Série
                      </Td>
                    </Tr>
                  </Thead>
                  <Tbody fontWeight="normal">
                    {selectedMoviment?.equipments.map(
                      (equipment?: movementEquipment) => (
                        <Tr
                          key={equipment?.serialNumber}
                          background={
                            materiais.includes(String(equipment?.serialNumber))
                              ? 'rgba(244, 147, 32, 0.2)'
                              : 'white'
                          }
                        >
                          <Td textAlign="center">{equipment?.tippingNumber}</Td>
                          <Td textAlign="center">{equipment?.type}</Td>
                          <Td textAlign="center">{equipment?.brand?.name}</Td>
                          <Td textAlign="center">{equipment?.model}</Td>
                          <Td textAlign="center">{equipment?.serialNumber}</Td>
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
              <PDFDownloadLink
                document={
                  <MovementsPDF
                    title={
                      MovimentacaoTipoMap.get(selectedMoviment?.type) as string
                    }
                    equipments={selectedMoviment.equipments}
                    date={selectedMoviment.date}
                    destination={selectedMoviment.destination.name}
                  />
                }
                fileName={`termo_de_${
                  MovimentacaoTipoMap.get(
                    parseInt(String(selectedMoviment?.type), 10) || 0
                  ) as string
                }`}
              >
                {({ loading }) => (
                  <Button isLoading={loading} variant="primary">
                    Gerar termo
                  </Button>
                )}
              </PDFDownloadLink>
            </Flex>
          </form>
        </Flex>
      )}
    </Modal>
  );
}
