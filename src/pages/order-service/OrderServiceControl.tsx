import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BiSearch } from 'react-icons/bi';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  IconButton,
  TableContainer,
  Divider,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { FaTools } from 'react-icons/fa';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { theme } from '@/styles/theme';
import {
  SelectItem,
  TIPOS_EQUIPAMENTO,
  Workstation,
} from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';
import { OSStatusMap, OSStatusStyleMap } from '@/constants/orderservice';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { OrderServiceRegisterModal } from '@/components/order-service-register-modal';

interface ISelectOption {
  label: string;
  value: number | string;
}
export const mockData = {
  equipment: 'EquipmentData',
  equipmentId: 'c2a7ac1f-b8d1-4a69-88a7-60f6fc8d1ec8',
  seiProcess: '123456789789562',
  id: '',
  status: 'concluido',
  description: 'nada',
  finishDate: '2022-06-18',
  senderName: 'maria',
  senderDocument: '12345678912',
};

export interface Equipment {
  tippingNumber: string;
  serialNumber: string;
  brand: {
    name: string;
  };
  type: string;
  id: string;
  model: string;
  unit: {
    name: string;
    localization: string;
  };
}

export interface OrderServiceData {
  id: string;
  date: Date;
  description?: string;
  authorId: string;
  receiverName: string;
  sender?: string;
  equipmentSnapshot: any;
  senderFunctionalNumber: string;
  createdAt: Date;
  updatedAt: Date;
  equipment: Equipment;
  history: History;
  receiverFunctionalNumber: string;
  technicians?: string[];
  status: string;
  unit: {
    name: string;
    localization: string;
  };
  brand: {
    name: string;
  };
  receiverDate?: Date;
}

type FilterValues = {
  type?: ISelectOption;
  brand?: string;
  dateOS?: string;
  unit?: ISelectOption;
  status: ISelectOption;
  search: string;
};

export type StatusOS = 'Em manutenção' | 'Concluída' | 'Garantia';

const STATUS_OS: SelectItem<StatusOS>[] = [
  { label: 'Em manutenção', value: 'MAINTENANCE' },
  { label: 'Concluída', value: 'CONCLUDED' },
  { label: 'Garantia', value: 'WARRANTY' },
];

function OrderServiceTable() {
  const [orderServices, setOrderServices] = useState<OrderServiceData[]>([]);
  const [selectedOrderServiceToEdit, setSelectedOrderServiceToEdit] =
    useState<OrderServiceData>();
  const [nextOrderServices, setNextOrderServices] = useState<
    OrderServiceData[]
  >([]);

  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [workstations, setWorkstations] = useState<ISelectOption[]>();
  const [brands, setBrands] = useState<ISelectOption[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const handleEdit = (orderService: OrderServiceData) => {
    if (orderService) setSelectedOrderServiceToEdit(orderService);
    onOpenEditOrderService();
  };

  const handleFilterChange = () => {
    const { type, dateOS, status, unit } = watchFilter;

    let formattedDate;
    if (dateOS !== null && dateOS !== '' && dateOS) {
      formattedDate = new Date(dateOS).toLocaleDateString('en-us');
    }

    const dataFormatted = {
      type,
      date: formattedDate,
      status,
      unit,
      search,
    };

    const filteredDataFormatted = [
      ...Object.entries(dataFormatted).filter(
        (field) => field[1] !== undefined && field[1] !== ''
      ),
    ];

    const query = `${filteredDataFormatted
      .map((field) => `${field[0]}=${field[1]}`)
      .join('&')}`;
    setFilter(query);
  };

  const cleanFilters = () => {
    setFilter('');
    setSearch('');
    reset();
  };

  const formattedWorkstations = (data: Workstation[]): ISelectOption[] => {
    return data?.map((item) => {
      return { label: item.name, value: item.name };
    });
  };

  const getWorkstations = async () => {
    apiSchedula
      .get<Workstation[]>('workstations')
      .then((response) => {
        setWorkstations(formattedWorkstations(response.data));
      })
      .catch((error) => {});
  };

  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };
  const handleSearch = debounce(() => {
    setSearch(watchFilter.search);
  }, 400);

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<OrderServiceData[]> = await api.get(
        `equipment/listOrderService?take=${limit}&skip=${offset}&${filter}`
      );
      setOrderServices(data);
    } catch (error) {
      setOrderServices([]);
      toast.error('Nenhuma Ordem de Serviço encontrada');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<OrderServiceData[]> = await api.get(
        `equipment/listOrderService?take=${limit}&skip=${
          offset + limit
        }&${filter}`
      );
      setNextOrderServices(data);
    } catch (error) {
      setNextOrderServices([]);
    }
  };

  useEffect(() => {
    getWorkstations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleSearch();
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFilter]);

  useEffect(() => {
    fetchItems();
    fetchNextItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, refreshRequest, filter]);

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
              <Button colorScheme={theme.colors.primary} onClick={onOpen}>
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
              <form id="orderService-filter" style={{ width: '100%' }}>
                <Flex gap="5px" alignItems="5px" mb="15px">
                  <NewControlledSelect
                    filterStyle
                    control={control}
                    name="type"
                    id="type"
                    options={TIPOS_EQUIPAMENTO}
                    placeholder="Tipo"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                  />
                  <NewControlledSelect
                    filterStyle
                    control={control}
                    name="unit"
                    id="unit"
                    options={workstations}
                    placeholder="Localização"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                  />
                  <Datepicker
                    border={false}
                    placeholderText="Data OS"
                    name="dateOS"
                    control={control}
                  />
                  <NewControlledSelect
                    filterStyle
                    control={control}
                    name="status"
                    id="status"
                    options={STATUS_OS}
                    placeholder="Status OS"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                  />
                  <Input
                    placeholder="Pesquisa"
                    minWidth="15vw"
                    errors={errors.search}
                    {...register('search')}
                    rightElement={<BiSearch />}
                  />
                </Flex>
              </form>
              {filter !== '' ? (
                <Flex w="100%" alignItems="center" justifyContent="start">
                  <Button
                    variant="unstyled"
                    fontSize="14px"
                    leftIcon={<CloseIcon mr="0.5rem" boxSize="0.6rem" />}
                    onClick={cleanFilters}
                  >
                    Limpar filtros aplicados
                  </Button>
                </Flex>
              ) : null}
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
                        <Td>Equipamento</Td>
                        <Td>Status da OS</Td>
                        <Td>Data da OS</Td>
                        <Td />
                      </Tr>
                    </Thead>
                    <Tbody fontWeight="semibold" maxHeight="200px">
                      {orderServices.map((orderService) => (
                        <Tr key={orderService.id}>
                          <Td fontWeight="medium">
                            Tombamento - {orderService.equipment.tippingNumber}
                            <Td p={0} fontWeight="semibold">
                              {orderService.equipment.type}{' '}
                              {orderService.equipment.brand.name}{' '}
                              {orderService.equipment.serialNumber}
                            </Td>
                          </Td>
                          <Td fontWeight="medium">
                            {orderService.equipment.unit.name} -{' '}
                            {orderService.equipment.unit.localization}
                            <Td
                              p={0}
                              fontWeight="semibold"
                              style={OSStatusStyleMap.get(orderService.status)}
                            >
                              {OSStatusMap.get(orderService.status)}
                            </Td>
                          </Td>

                          <Td>
                            {new Date(orderService.date).toLocaleDateString(
                              'pt-BR'
                            )}
                          </Td>
                          <Td>
                            <IconButton
                              aria-label="Mudar status da ordem de serviço"
                              variant="ghost"
                              icon={<FaTools />}
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
                  {nextOrderServices.length > 0 && (
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
        <OrderServiceRegisterModal
          onClose={onClose}
          isOpen={isOpen}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </GridItem>
    </Grid>
  );
}
export { OrderServiceTable };
