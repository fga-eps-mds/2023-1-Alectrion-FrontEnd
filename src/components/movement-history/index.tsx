import {
  Flex,
  Box,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
} from '@chakra-ui/react';

import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { api } from '../../config/lib/axios';

interface movement {
  id: string;

  equipmentId: string;

  type: number;

  date: string;

  destination: {
    name: string;
    localization: string;
  };
}

interface MovementHistoryProps {
  equipmentId: string | null;
}

function MovementHistory({ equipmentId }: MovementHistoryProps) {
  const [movements, setMovements] = useState<movement[]>([]);

  const fetchMovements = async () => {
    try {
      const { data }: AxiosResponse<movement[]> = await api.get(
        `equipment/findMovements`,
        { params: { equipmentid: equipmentId } }
      );

      setMovements(data);
    } catch (error) {
      setMovements([]);
      toast.error('Nenhuma moviementacao encontrada');
    }
  };

  useEffect(() => {
    fetchMovements();
  }, [equipmentId]);

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  return (
    <Box
      width="100%"
      bg="white"
      h="200px"
      border="1px solid #F49320"
      borderRadius="md"
    >
      <TableContainer
        borderRadius="md"
        minW="68%"
        style={{ height: '100%', overflowY: 'auto' }}
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
        <Table
          variant="striped"
          border="1px"
          borderColor="#F49320"
          colorScheme="orange"
          size="sm"
        >
          <Thead bg="#F49320" fontWeight="semibold" h="14">
            <Tr>
              <Td color="white">Movimentação </Td>
              <Td color="white">Data</Td>
              <Td color="white">Local</Td>
            </Tr>
          </Thead>
          <Tbody fontWeight="semibold">
            {movements.map((movement) => (
              <Tr key={movement.id}>
                <Td p={0} fontWeight="semibold">
                  {movement.type}
                </Td>

                <Td>{formatDate(new Date(movement.date))}</Td>

                <Td>{movement.destination.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MovementHistory;
