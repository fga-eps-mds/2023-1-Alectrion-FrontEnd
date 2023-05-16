import { useState, useEffect } from 'react';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  AttachmentIcon,
} from '@chakra-ui/icons';
import { MdBuild, MdCall } from 'react-icons/md';
import {
  Select,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Center,
  Divider,
  Box,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { SideBar } from '@/components/side-bar';
import { MovementsModal } from '@/components/movements-modal';

function Movimentacoes() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const mockData = [
    {
      Id: 13276989755488998,
      tipo: 'Emprestimo',
      destino: 'Divisão de Suporte Técnico',
      data: '01/05/2023',
      quantidade: 2,
    },
    {
      id: 7798791893792675,
      tipo: 'Responsabilidade',
      destino: 'Escola Superior de Polícia Civil',
      data: '03/05/2023',
      quantidade: 1,
    },
    {
      id: 34367686545435764,
      tipo: 'Emprestimo',
      destino: 'Escola Superior de Polícia Civil',
      data: '05/05/2023',
      quantidade: 3,
    },
  ];

  return (
    <>
      <SideBar />
      <MovementsModal isOpen={isOpen} onClose={onClose} />
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
                      onClick={onOpen}
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
