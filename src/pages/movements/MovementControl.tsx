/* eslint-disable import/export */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
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
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { FaFileAlt } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';
import { debounce } from 'lodash';
import { toast } from '@/utils/toast';
import { api, schedulaApi } from '../../config/lib/axios';
import { SideBar } from '@/components/side-bar';
import { theme } from '@/styles/theme';
import { MovimentacaoTipoMap, TIPOS_MOVIMENTACAO } from '@/constants/movements';
import { MovementsModal } from '@/components/movements-modal';
import { ControlledSelect } from '@/components/form-fields/controlled-select';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';

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
  const [selectedMovement, setSelectedMovement] = useState<any>();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' });
  const watchedData = watch();
  const [filter, setFilter] = useState<string>('');

  const [destinations, setDestinations] = useState<ISelectOption[]>([]);
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
      const { data }: AxiosResponse<Unit[]> = await schedulaApi.get('');
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
        type: type?.value,
        inChargeName: inChargeName?.value,
        destinationId: destinationId?.value,
        equipmentId: equipmentId?.value,
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

  useEffect(() => {
    fetchItems();
    fetchNextItems();
  }, [currentPage, filter]);

  useEffect(() => {
    fetchUnits();
  }, []);

  useEffect(() => {
    handleChangeForm();
    handleSearch();
  }, [watchedData]);

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
                <form id="movement-filter" style={{ width: '100%' }}>
                  <Flex width="100%" gap="5px" mb="15px">
                    <ControlledSelect
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
                    />
                    <ControlledSelect
                      control={control}
                      name="destinationId"
                      id="destinationId"
                      options={destinations}
                      placeholder="Selecione"
                      variant="unstyled"
                      fontWeight="semibold"
                      size="sm"
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
                    <Input
                      minWidth="15vw"
                      errors={errors.searchTerm}
                      {...register('searchTerm')}
                      rightElement={<BiSearch />}
                      placeholder="Pesquisa"
                    />
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
    </>
  );
}
export { MovementsTable };
