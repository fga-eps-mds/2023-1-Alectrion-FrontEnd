import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { BiEditAlt, BiSearch } from 'react-icons/bi';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  TableContainer,
  Divider,
  Box,
  useDisclosure,
  Flex,
  Grid,
  GridItem,
  Select,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { theme } from '@/styles/theme';
import { ControlledSelect } from '@/components/form-fields/controlled-select';
import { STATUS, TIPOS_EQUIPAMENTO, Workstation } from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';


export interface EquipmentData {
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

function OrderServiceTable() {
    const [equipments, setEquipments] = useState<EquipmentData[]>([]);
    const [nextEquipments, setNextEquipments] = useState<EquipmentData[]>([]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    const fetchItems = async () => {
        try {
          const { data }: AxiosResponse<EquipmentData[]> = await api.get(
            `equipment/find?take=${limit}&skip=${offset}`
          );
          setEquipments(data);
        } catch (error) {
          setEquipments([]);
          toast.error('Nenhum Equipamento encontrado');
        }
      };
    
      const fetchNextItems = async () => {
        try {
          const { data }: AxiosResponse<EquipmentData[]> = await api.get(
            `equipment/find?take=${limit}&skip=${offset + limit}`
          );
          setNextEquipments(data);
        } catch (error) {
          setNextEquipments([]);
          toast.error('Nenhum Equipamento encontrado');
        }
      };

      useEffect(() => {
        fetchItems();
        fetchNextItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currentPage]);


    return (
        <Grid templateColumns="1fr 5fr" gap={6}>
          <GridItem>
            <SideBar />
          </GridItem>
          <GridItem>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignContent="center"
              alignItems="center"
              width="100%"
            >
              <Flex flexDirection="column" width="80%">
                <Text
                  margin="20px 0 15px 0"
                  color={theme.colors.black}
                  fontWeight="semibold"
                  fontSize="4xl"
                >
                  Ordem de Serviço
                </Text>
                <Flex justifyContent="space-between" width="100%">
                  <Text color="#00000" fontWeight="medium" fontSize="2xl">
                    Últimas Ordens de Serviço
                  </Text>
                  <Button colorScheme={theme.colors.primary} //onClick={onOpen}
                  >
                    Nova Ordem de Serviço
                  </Button>
                </Flex>
                <Divider borderColor="#00000" margin="15px 0 15px 0" />
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <form id="equipment-filter" style={{ width: '100%' }}>
                    <Flex gap="5px" alignItems="5px" mb="15px">
                      <Select
                        placeholder="Tipo"
                        size="sm"
                        variant="unstyled"
                      >
                        <option value="option1">CPU</option>
                      </Select>
                      
                      <Select
                        placeholder="Localização"
                        cursor="pointer"
                        variant="unstyled"
                        fontWeight="semibold"
                        size="sm"
                      >
                        <option value="option1">Goiania</option>
                      </Select>
                      <Select
                        placeholder="Situação"
                        cursor="pointer"
                        variant="unstyled"
                        fontWeight="semibold"
                        size="sm"
                      >
                        <option value="option1">Ativo</option>
                      </Select>
                    </Flex>
                  </form>
                  <Flex flexDirection="column" width="100%">
                    <TableContainer
                      borderRadius="15px 15px 0 0 "
                      height="55vh"
                      whiteSpace="inherit"
                      fontSize="sm"
                      border="1px"
                      borderColor={theme.colors.primary}
                      overflowY="auto"
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
                      <Table variant="striped" colorScheme="orange" width="100%">
                        <Thead
                          bg={theme.colors.primary}
                          fontWeight="semibold"
                          order={theme.colors.primary}
                          position="sticky"
                          top="0"
                          zIndex={+1}
                        >
                          <Tr width="100%" color={theme.colors.white}>
                            <Td>Equipamento</Td>
                            <Td>N Tombamento</Td>
                            <Td>N Série</Td>
                            <Td>Última Modificação</Td>
                            <Td />
                          </Tr>
                        </Thead>
                        <Tbody
                          fontWeight="semibold"
                          maxHeight="200px"
                          height="200px"
                        >
                          {equipments.map((equipment) => (
                            <Tr
                              key={equipment.id}
                            >
                              <Td fontWeight="medium">
                                {equipment.situacao} - {equipment.unit.name}
                                <Td p={0} fontWeight="semibold">
                                  {equipment.type} {equipment.brand.name}
                                </Td>
                              </Td>
                              <Td>{equipment.tippingNumber}</Td>
                              <Td>{equipment.serialNumber}</Td>
                              <Td>
                                {new Date(equipment.updatedAt).toLocaleDateString(
                                  'pt-BR'
                                )}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <Box
                      bgColor={theme.colors.primary}
                      cursor="pointer"
                      fontSize="sm"
                      fontWeight="semibold"
                      width="100%"
                      textAlign="center"
                      color={theme.colors.white}
                      padding="1rem 0 1rem 0"
                      borderRadius=" 0  0 15px 15px"
                    >
                      Movimentar
                    </Box>
                    <Flex justifyContent="center" mt="15px">
                      {currentPage > 1 && (
                        <Button
                          variant="link"
                          color="#00000"
                          p={2}
                          leftIcon={<ArrowLeftIcon />}
                          _hover={{ cursor: 'pointer', color: 'orange.500' }}
                          onClick={() => {
                            setCurrentPage(currentPage - 1);
                            setOffset(offset - limit);
                          }}
                        >
                          Anterior
                        </Button>
                      )}
                      {nextEquipments.length > 0 && (
                        <Button
                          variant="link"
                          color="#00000"
                          p={2}
                          rightIcon={<ArrowRightIcon />}
                          _hover={{ cursor: 'pointer', color: 'orange.500' }}
                          onClick={() => {
                            setCurrentPage(currentPage + 1);
                            setOffset(offset + limit);
                          }}
                        >
                          Próximo
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
        </GridItem>
    </Grid>
  );
}
export { OrderServiceTable };