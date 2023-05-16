import { useForm } from 'react-hook-form';
import { Flex, Text, Grid, GridItem, Box, Button } from '@chakra-ui/react';
import { Modal } from '../modal';
import { Input } from '../form-fields/input';

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
  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <Modal title="Movimentação" isOpen={isOpen} onClose={onClose} size="4xl">
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
              defaultValue={selectedMovimentacao?.postoTrabalho}
              {...register('postoTrabalho', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />

            <Input
              label="Cidade"
              errors={errors.cidade}
              defaultValue={selectedMovimentacao?.cidade}
              {...register('cidade', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />

            <Input
              label="Tipo de lotação"
              errors={errors.tipoLotacao}
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
              defaultValue={selectedMovimentacao?.atribuicao}
              {...register('atribuicao', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />
          </Grid>

          <Text fontWeight="bold" mt={8}>
            Especificação do material
          </Text>
          <Box height="384px" />

          <Grid templateColumns="repeat(3, 3fr)" width="100%" gap={6}>
            <GridItem colSpan={2}>
              <Input
                label="Responsável pelo Termo de Responsabilidade"
                errors={errors.responsavelTermo}
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
              defaultValue={selectedMovimentacao?.atribuicaoTermo}
              {...register('atribuicaoTermo', {
                required: 'Campo Obrigatório',
                maxLength: 50,
              })}
            />
          </Grid>

          <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
            <Button variant="secondary" onClick={onClose}>
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
