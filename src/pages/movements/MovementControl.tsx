/* eslint-disable import/export */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import { FaFileAlt } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { toast } from '@/utils/toast';
import { api, apiSchedula } from '../../config/lib/axios';
import { SideBar } from '@/components/side-bar';
import { theme } from '@/styles/theme';
import { MovimentacaoTipoMap, TIPOS_MOVIMENTACAO } from '@/constants/movements';
import { MovementsModal } from '@/components/movements-modal';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';
import { MovementRegisterModal } from '@/components/movement-register-modal';
import { TermModal } from '@/components/term-modal';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { PDF } from '@/components/movements-reports/pdf';
// import { Excel } from '@/components/movements-reports/xls';
// import { CSV } from '@/components/movements-reports/csv';

interface ISelectOption {
  label: string;
  value: number | string;
}

type FormValues = {
  type: ISelectOption;
  inChargeName: ISelectOption;
  destinationId: ISelectOption;
  equipmentId: ISelectOption;
  lowerDate: string;
  higherDate: string;
  searchTerm: string;
};

export interface movementEquipment {
  tippingNumber: string;

  serialNumber: string;

  brand: {
    name: string;
  };

  type: string;

  id: string;
  selected?: boolean;
  model: string;
  description?: string;
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

function MovementsTable() {
  const [movements, setMovements] = useState<movement[]>([]);
  const [nextMovements, setNextMovements] = useState<movement[]>([]);
  const [selectedMovement, setSelectedMovement] = useState<movement>();
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const {
    control,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });
  const watchedData = watch();

  const [filter, setFilter] = useState<string>('');

  const [destinations, setDestinations] = useState<ISelectOption[]>([]);
  const {
    isOpen: isOpenRegister,
    onClose: onCloseRegister,
    onOpen: onOpenRegister,
  } = useDisclosure();

  const {
    isOpen: isOpenTerm,
    onClose: onCloseTerm,
    onOpen: onOpenTerm,
  } = useDisclosure();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const openAndSelect = (movement: movement) => () => {
    setSelectedMovement(movement);
    onOpen();
  };

  const handleSearch = debounce(() => {
    setSearch(watchedData.searchTerm);
  }, 400);

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<movement[]> = await api.get(
        `equipment/findMovements?resultquantity=${limit}&page=${offset}&${filter}`
      );
      setMovements(data);
    } catch (error) {
      setMovements([]);
      toast.error('Não foi possível encontrar as movimentações');
    }
  };

  const generateDestinationOptions = (apiData: Unit[]): ISelectOption[] => {
    return (
      apiData?.map((item) => ({ label: item?.name, value: item?.id })) || []
    );
  };

  const fetchUnits = async () => {
    try {
      const { data }: AxiosResponse<Unit[]> = await apiSchedula.get(
        '/workstations'
      );
      setDestinations(generateDestinationOptions(data));
    } catch (error) {
      setDestinations([]);
      toast.error('Não foi possível encontrar destino');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<movement[]> = await api.get(
        `equipment/findMovements?resultquantity=${limit}&page=${
          offset + 1
        }&${filter}`
      );
      setNextMovements(data);
    } catch (error) {
      setNextMovements([]);
    }
  };

  const handleChangeForm = async () => {
    try {
      const {
        type,
        inChargeName,
        destinationId,
        equipmentId,
        lowerDate,
        higherDate,
      } = watchedData;

      let formattedLowerDate;

      if (lowerDate !== null && lowerDate !== '' && lowerDate) {
        formattedLowerDate = new Date(lowerDate).toLocaleDateString('en-us');
      }

      let formattedHigherDate;

      if (higherDate !== null && higherDate !== '' && higherDate) {
        formattedHigherDate = new Date(higherDate).toLocaleDateString('en-us');
      }

      const formattedFormData = {
        type,
        inChargeName,
        destinationId,
        equipmentId,
        lowerDate: formattedLowerDate,
        higherDate: formattedHigherDate,
        searchTerm: search,
      };

      const filteredFormData = [
        ...Object.entries(formattedFormData).filter(
          (field) => field[1] !== undefined && field[1] !== ''
        ),
      ];

      const queryFormMovements = filteredFormData
        .map((field) => `${field[0]}=${field[1]}`)
        .join('&');
      setFilter(queryFormMovements);
    } catch {
      console.log('erro');
    }
  };
  const cleanFilters = () => {
    setFilter('');
    setSearch('');
    reset();
  };

  useEffect(() => {
    fetchItems();
    fetchNextItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter, refreshRequest]);

  useEffect(() => {
    fetchUnits();
  }, []);

  useEffect(() => {
    handleChangeForm();
    handleSearch();
  }, [watchedData]);

  const handleDelete = async (id: string) => {
    try {
      const { data }: AxiosResponse<boolean> = await api.delete(
        `equipment/deleteMovement`,
        {
          params: {
            id,
          },
        }
      );
      toast.success('Movimentação deletada com sucesso');
    } catch (error) {
      toast.error('Não é mais possível deletar a movimentação');
    }
  };

  return (
    <>
      <MovementsModal
        isOpen={isOpen}
        onClose={onClose}
        selectedMoviment={selectedMovement!}
      />
      <MovementRegisterModal
        isOpen={isOpenRegister}
        onClose={onCloseRegister}
        lenghtMovements={movements.length}
        refreshRequest={refreshRequest}
        setRefreshRequest={setRefreshRequest}
        setSelectedMovement={setSelectedMovement}
        onOpenTerm={onOpenTerm}
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
              <Box>
                <Flex justifyContent="space-between" width="100%">
                  <Text color="#00000" fontWeight="medium" fontSize="2xl">
                    Últimas Movimentações
                  </Text>
                  <Flex flexDirection="column">
                    <Button colorScheme="#F49320" onClick={onOpenRegister}>
                      Cadastrar Movimentação
                    </Button>
                    <Flex
                      gap={5}
                      justifyContent="center"
                      width="100%"
                      alignItems="center"
                      padding={4}
                    >
                      {/* <CSV /> */}
                      {/* <Excel /> */}
                      <PDF movements={[]} />
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
              <Divider borderColor="#00000" margin="15px 0 15px 0" />
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <form id="movement-filter" style={{ width: '100%' }}>
                  <Flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Accordion allowMultiple>
                      <AccordionItem>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              Filtros
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel>
                          <Grid
                            templateColumns="repeat(auto-fit, minmax(0, 1fr))"
                            gap="5px"
                          >
                            <NewControlledSelect
                              filterStyle
                              control={control}
                              name="type"
                              id="type"
                              options={TIPOS_MOVIMENTACAO}
                              placeholder="Tipos"
                              cursor="pointer"
                              variant="unstyled"
                              _placeholder={{ opacity: 0.4, color: 'inherit' }}
                              fontWeight="semibold"
                              size="sm"
                              minWidth="1200px"
                            />
                            <NewControlledSelect
                              filterStyle
                              control={control}
                              name="destinationId"
                              id="destinationId"
                              options={destinations}
                              placeholder="Destino"
                              variant="unstyled"
                              fontWeight="semibold"
                              size="sm"
                              minWidth="1200px"
                            />
                            <Datepicker
                              name="lowerDate"
                              control={control}
                              border={false}
                              placeholderText="Data inicial"
                            />
                            <Datepicker
                              name="higherDate"
                              control={control}
                              border={false}
                              placeholderText="Data final"
                            />
                          </Grid>
                          {/* <Grid
                            templateColumns="repeat(2, minmax(0, 1fr))"
                            gap="5px"
                          >
                            
                          </Grid> */}
                          {filter !== '' ? (
                            <Flex alignItems="center" justifyContent="start">
                              <Button
                                variant="unstyled"
                                fontSize="14px"
                                leftIcon={
                                  <CloseIcon mr="0.5rem" boxSize="0.6rem" />
                                }
                                onClick={cleanFilters}
                              >
                                Limpar filtros aplicados
                              </Button>
                            </Flex>
                          ) : null}
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                    <Box marginLeft="10px" marginRight="10px">
                      <Input
                        errors={errors.searchTerm}
                        {...register('searchTerm')}
                        rightElement={<BiSearch />}
                        placeholder="Pesquisa"
                        minWidth="15vw"
                      />
                    </Box>
                  </Flex>
                </form>
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
                        position="sticky"
                        top="0"
                        zIndex={+1}
                      >
                        <Tr width="100%" color={theme.colors.white}>
                          <Td>Tipo</Td>
                          <Td>Destino</Td>
                          <Td>Data</Td>
                          <Td>Quantidade</Td>
                          <Td> </Td>
                          <Td> </Td>
                        </Tr>
                      </Thead>
                      <Tbody fontWeight="semibold" maxHeight="200px">
                        {movements.map((movement) => (
                          <Tr
                            onClick={openAndSelect(movement)}
                            key={movement.id}
                            cursor="pointer"
                          >
                            <Td fontWeight="medium">
                              {MovimentacaoTipoMap.get(movement.type)}
                            </Td>
                            <Td fontWeight="medium">
                              {movement.destination?.name} -{' '}
                              {movement.destination?.localization}
                            </Td>
                            <Td>
                              {new Date(movement.date).toLocaleDateString(
                                'pt-Br',
                                { timeZone: 'UTC' }
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
                            <Td>
                              <IconButton
                                aria-label="Deletar movimentação"
                                variant="ghost"
                                icon={<MdDeleteForever />}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handleDelete(movement.id);
                                  setRefreshRequest(!refreshRequest);
                                }}
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
                          setOffset(offset - 1);
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
                          setOffset(offset + 1);
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
      <TermModal
        isOpen={isOpenTerm}
        onClose={onCloseTerm}
        selectedMoviment={selectedMovement}
        refreshRequest={refreshRequest}
        setRefreshRequest={setRefreshRequest}
      />
    </>
  );
}
export { MovementsTable };
