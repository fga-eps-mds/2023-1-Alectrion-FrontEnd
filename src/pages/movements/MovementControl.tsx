import { useState } from 'react';
import { AttachmentIcon } from '@chakra-ui/icons';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { SideBar } from '@/components/side-bar';
import { MovementsModal } from '@/components/movements-modal';
import { mockData } from '@/constants/movements';

function Movimentacoes() {
  const [selectedMovimentacao, setSelectedMovimentacao] = useState(null);

  const onOpen = (movimentacao: any) => setSelectedMovimentacao(movimentacao);
  const onClose = () => setSelectedMovimentacao(null);
  const isOpen = Boolean(selectedMovimentacao);

  return (
    <>
      <SideBar />
      <MovementsModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMovimentacao={selectedMovimentacao}
      />
      <Box paddingY="10" paddingX="300">
        <Box mb="10px">
          <Text color="#000000" fontWeight="semibold" fontSize="4xl">
            Movimentações
          </Text>
          <Text color="#000000" fontWeight="medium" fontSize="2xl">
            Últimas Movimentações
          </Text>
        </Box>
        <Box paddingLeft="300">
          <Divider borderColor="#000000" />
        </Box>
        <Box p={4}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID Movimentação</Th>
                <Th>Tipo</Th>
                <Th>Destino</Th>
                <Th>Data</Th>
                <Th>Quantidade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mockData.map((data) => (
                <Tr key={data.id}>
                  <Td>{data.id}</Td>
                  <Td>{data.tipo}</Td>
                  <Td>{data.destino}</Td>
                  <Td>{data.data}</Td>
                  <Td>{data.quantidade}</Td>
                  <Td>
                    <IconButton
                      aria-label="Abrir detalhes da movimentação"
                      variant="ghost"
                      onClick={() => onOpen(data)}
                      icon={<AttachmentIcon />}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </>
  );
}

export default Movimentacoes;
