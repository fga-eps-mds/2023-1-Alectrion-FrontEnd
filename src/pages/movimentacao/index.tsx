import { Flex } from '@chakra-ui/react';
import {MovimentacaoForm} from '../../components/movimentacao/cadastro-movimentacao/MovimentacaoForm'

export function MovimentacaoModal() {
  const numeroTermo = '010101';
  const dataProps = new Date();
  const totalEquipamentosProps = '10';

  return (
    <Flex flexDirection="column" boxShadow="lg" px="44px" pt="24px" pb="64px">
        <MovimentacaoForm />
        
    </Flex>
  );
}