/* eslint-disable import/export */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { FaFileAlt } from 'react-icons/fa';
import { toast } from '@/utils/toast';
import { api } from '../../config/lib/axios';
import { SideBar } from '@/components/side-bar';
import { theme } from '@/styles/theme';
import { MovimentacaoTipoMap } from '@/constants/movements';
import { MovementsModal } from '@/components/movements-modal';

export interface movementEquipment {
  tippingNumber: string;

  serialNumber: string;

  brand: {
    name: string;
  };

  type: string;

  id: string;
  selected?: boolean;
}
export interface movement {
  updatedAt: string | number | Date;

  id: string;

  date: string;

  userId: string;

  type: number;

  description: string;

  inChargeName: string;

  inChargeRole: string;

  chiefName: string;

  chiefRole: string;

  destination: {
    name: string;
    localization: string;
  };

  equipments: movementEquipment[];
}

export function MovementsTable() {
  const [movements, setMovements] = useState<movement[]>([]);
  const [nextMovements, setNextMovements] = useState<movement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [selectedMovement, setSelectedMovement] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const openAndSelect = (movement: movement) => () => {
    setSelectedMovement(movement);
    onOpen();
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchType(event.target.value);
  };

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<movement[]> = await api.get(
        `equipment/findMovements?resultquantity=${limit}&page=${offset}`
      );
      setMovements(data);
    } catch (error) {
      setMovements([]);
      toast.error('Nenhuma movimentação registrada');
    }
  };
  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<movement[]> = await api.get(
        `equipment/findMovements?resultquantity=${limit}&page=${offset + limit}`
      );
      setNextMovements(data);
    } catch (error) {
      setNextMovements([]);
      toast.error('Nenhuma movimentação registrada');
    }
  };

  useEffect(() => {
    fetchItems();
    fetchNextItems();
  }, [currentPage]);

  return (
    <>
      <MovementsModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMoviment={selectedMovement}
      />
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
                Movimentações
              </Text>
              <Flex justifyContent="left" width="100%">
                <Text color="#00000" fontWeight="medium" fontSize="2xl">
                  Últimas Movimentações
                </Text>
              </Flex>
              <Divider borderColor="#00000" margin="15px 0 15px 0" />
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <Flex width="100%" gap="5px" mb="15px">
                  <Select
                    cursor="pointer"
                    variant="unstyled"
                    placeholder="Tipos"
                    fontWeight="semibold"
                    size="xs"
                  >
                    <option value="option1">CPU</option>
                    <option value="option2">Monitor</option>
                    <option value="option3">Estabilizador</option>
                    <option value="option4">Nobreak</option>
                    <option value="option5">Hub</option>
                    <option value="option6">Switch</option>
                    <option value="option7">Notebook</option>
                    <option value="option8">Datashow</option>
                    <option value="option9">Scanner</option>
                    <option value="option10">Impressora</option>
                    <option value="option11">Roteador</option>
                    <option value="option12">Tablet</option>
                    <option value="option13">TV</option>
                    <option value="option14">Fax</option>
                    <option value="option15">Telefone</option>
                    <option value="option16">Smartphone</option>
                    <option value="option17">Projetor</option>
                    <option value="option18">Tela de Projeção</option>
                    <option value="option19">Câmera</option>
                    <option value="option20">Webcam</option>
                    <option value="option21">Caixa de Som</option>
                    <option value="option22">Impressora Térmica</option>
                    <option value="option23">
                      Leitor de Código de Barras/ CCD
                    </option>
                    <option value="option24">Mesa Digitalizadora</option>
                    <option value="option25">Leitor Biométrico</option>
                    <option value="option26">Receptor</option>
                    <option value="option27">Extrator de Dados</option>
                    <option value="option28">Transformador</option>
                    <option value="option29">Coletor de Assinatura</option>
                    <option value="option30">Kit Cenário</option>
                    <option value="option31">
                      Dispositivo de Biometria Facial
                    </option>
                    <option value="option32">Servidor de Rede</option>
                    <option value="option33">HD Externo</option>
                    <option value="option34">Protetor Eletrônico</option>
                  </Select>

                  <Select
                    cursor="pointer"
                    variant="unstyled"
                    placeholder="Marcas"
                    fontWeight="semibold"
                    size="xs"
                  >
                    <option value="option1">Dell</option>
                    <option value="option2">LG</option>
                    <option value="option3">Galaxy</option>
                    <option value="option4">HP</option>
                    <option value="option5">Lenovo</option>
                    <option value="option6">Logitech</option>
                  </Select>

                  <Select
                    cursor="pointer"
                    variant="unstyled"
                    placeholder="Modelos"
                    fontWeight="semibold"
                    size="xs"
                  >
                    <option value="option1">Ink 416</option>
                    <option value="option2">16520</option>
                    <option value="option3">1080p24</option>
                    <option value="option4">Book2</option>
                    <option value="option5">Thinkpad</option>
                  </Select>

                  <Select
                    cursor="pointer"
                    variant="unstyled"
                    placeholder="Datas"
                    fontWeight="semibold"
                    size="xs"
                  >
                    <option value="option1">Janeiro</option>
                    <option value="option2">Fevereiro</option>
                    <option value="option3">Março</option>
                    <option value="option4">Abril</option>
                    <option value="option5">Maio</option>
                    <option value="option6">Junho</option>
                    <option value="option7">Julho</option>
                    <option value="option8">Agosto</option>
                    <option value="option9">Setembro</option>
                    <option value="option10">Outubro</option>
                    <option value="option11">Novembro</option>
                    <option value="option12">Dezembro</option>
                  </Select>

                  <Select
                    cursor="pointer"
                    variant="unstyled"
                    placeholder="Local"
                    fontWeight="semibold"
                    size="xs"
                  >
                    <option value="option1">1dp Goiânia</option>
                    <option value="option2">2dp Goiânia</option>
                  </Select>

                  <Select
                    cursor="pointer"
                    variant="unstyled"
                    placeholder="Status"
                    fontWeight="semibold"
                    size="xs"
                  >
                    <option value="option1">Novo</option>
                    <option value="option2">Usado</option>
                  </Select>

                  <Input
                    placeholder="Pesquisa"
                    size="sm"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    minWidth="max-content"
                  />
                </Flex>
                <Flex flexDirection="column" width="100%">
                  <TableContainer
                    borderRadius="15px"
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
                      >
                        <Tr width="100%" color={theme.colors.white}>
                          <Td>Tipo</Td>
                          <Td>Destino</Td>
                          <Td>Data</Td>
                          <Td>Quantidade</Td>
                          <Td> </Td>
                        </Tr>
                      </Thead>
                      <Tbody
                        fontWeight="semibold"
                        maxHeight="200px"
                        height="200px"
                      >
                        {movements.map((movement) => (
                          <Tr
                            key={movement.id}
                            onClick={openAndSelect(movement)}
                            cursor="pointer"
                          >
                            <Td fontWeight="medium">
                              {MovimentacaoTipoMap.get(movement.type)}
                            </Td>
                            <Td fontWeight="medium">
                              {movement.destination.name} -{' '}
                              {movement.destination.localization}
                            </Td>
                            <Td>
                              {new Date(movement.date).toLocaleDateString(
                                'pt-Br'
                              )}
                            </Td>
                            <Td fontWeight="medium">
                              {movement.equipments.length}
                            </Td>
                            <Td>
                              <IconButton
                                aria-label="Abrir detalhes da movimentação"
                                variant="ghost"
                                icon={<FaFileAlt />}
                              />
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
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
                    {nextMovements.length > 0 && (
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
    </>
  );
}
export default { MovementsTable };
