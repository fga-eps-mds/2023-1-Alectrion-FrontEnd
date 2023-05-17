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
  Th,
  Td,
  Divider,
  IconButton,
  Checkbox,
  TableContainer,
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { Modal } from '../modal';
import { Input } from '../form-fields/input';
import { mockData } from '@/constants/movements';
import { EspecificacaoMaterial } from '@/types/types';

type MovementsModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedMovimentacao: any;
};

type FormValues = {
  postoTrabalho: string;
  cidade: string;
  tipoLotacao: string;
  responsavel: string;
  atribuicao: string;
  responsavelTermo: string;
  atribuicaoTermo: string;
};

export function MovementsModal({
  isOpen,
  onClose,
  selectedMovimentacao,
}: MovementsModalProps) {
  const [materiais, setMateriais] = useState<string[]>([]);
  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<FormValues>();

  const onCloseCallback = () => {
    setMateriais([]);
    onClose();
  };

  const toggleMaterial = (data: EspecificacaoMaterial) => () => {
    if (materiais.includes(data.nmrSerie)) {
      setMateriais(materiais.filter((material) => material !== data.nmrSerie));
    } else {
      setMateriais([...materiais, data.nmrSerie]);
    }
  };

  return (
    <Modal
      title="Movimentação"
      isOpen={isOpen}
      onClose={onCloseCallback}
      size="4xl"
    >
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
            <strong>Data:</strong> {selectedMovimentacao?.data}
          </Text>
          <Text>
            <strong>Total Equipamentos:</strong>{' '}
            {selectedMovimentacao?.quantidade}
          </Text>
        </Flex>

        <form>
          <Grid templateColumns="repeat(3, 3fr)" width="100%" gap={6}>
            <Input
              label="Posto de trabalho"
              errors={errors.postoTrabalho}
              isDisabled
              defaultValue={selectedMovimentacao?.postoTrabalho}
              {...register('postoTrabalho', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />

            <Input
              label="Cidade"
              errors={errors.cidade}
              isDisabled
              defaultValue={selectedMovimentacao?.cidade}
              {...register('cidade', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />

            <Input
              label="Tipo de lotação"
              errors={errors.tipoLotacao}
              isDisabled
              defaultValue={selectedMovimentacao?.tipoLotacao}
              {...register('tipoLotacao', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />

            <GridItem colSpan={2}>
              <Input
                label="Responsável"
                errors={errors.responsavel}
                isDisabled
                defaultValue={selectedMovimentacao?.responsavel}
                {...register('responsavel', {
                  required: 'Campo Obrigatório',
                  maxLength: 50,
                })}
              />
            </GridItem>

            <Input
              label="Atribuição"
              errors={errors.atribuicao}
              isDisabled
              defaultValue={selectedMovimentacao?.atribuicao}
              {...register('atribuicao', {
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
                {selectedMovimentacao?.materiais.map(
                  (data: EspecificacaoMaterial) => (
                    <Tr
                      key={data.nmrSerie}
                      background={
                        materiais.includes(data.nmrSerie)
                          ? 'rgba(244, 147, 32, 0.2)'
                          : 'white'
                      }
                    >
                      <Td>{data.equipamento}</Td>
                      <Td>{data.tombamento}</Td>
                      <Td>{data.nmrSerie}</Td>
                      <Td>
                        <Checkbox
                          onChange={toggleMaterial(data)}
                          isChecked={data.selected}
                        />
                      </Td>
                    </Tr>
                  )
                )}
              </Tbody>
            </Table>
          </TableContainer>

          <Grid templateColumns="repeat(3, 3fr)" width="100%" gap={6} mt={6}>
            <GridItem colSpan={2}>
              <Input
                label="Responsável pelo Termo de Responsabilidade"
                errors={errors.responsavelTermo}
                isDisabled
                defaultValue={selectedMovimentacao?.responsavelTermo}
                {...register('responsavelTermo', {
                  required: 'Campo Obrigatório',
                  maxLength: 50,
                })}
              />
            </GridItem>

            <Input
              label="Atribuição"
              errors={errors.atribuicaoTermo}
              isDisabled
              defaultValue={selectedMovimentacao?.atribuicaoTermo}
              {...register('atribuicaoTermo', {
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
    </Modal>
  );
}
