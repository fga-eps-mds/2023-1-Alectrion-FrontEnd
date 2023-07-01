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
import { FaFileAlt, FaTools } from 'react-icons/fa';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { theme } from '@/styles/theme';
import { SelectItem } from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';
import { OSStatusMap, OSStatusStyleMap } from '@/constants/orderservice';
import { MdDelete} from 'react-icons/md';
import { Job, Role } from '@/constants/user';

interface ISelectOption {
  label: string;
  value: number | string;
}

export interface UserData {
  id?: string
  name: string
  email: string
  username: string
  cpf: string
  job: Job
  role: Role
  password: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
  temporaryPassword: boolean
  isDeleted?: boolean
}

type FilterValues = {
  type?: ISelectOption;
  brand?: string;
  dateOS?: string;
  unit?: ISelectOption;
  status: ISelectOption;
  search: string;
};


function UsersTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [nextUsers, setNextUsers] = useState<
    UserData[]
  >([]);

  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isOpenEditOrderService,
    onClose: onCloseEditOrderService,
    onOpen: onOpenEditOrderService,
  } = useDisclosure();
  const {
    isOpen: isOpenPrintOrderService,
    onClose: onClosePrintOrderService,
    onOpen: onOpenPrintOrderService,
  } = useDisclosure();

  const {
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();
/*
  const handleEdit = (user: OrderServiceData) => {
    if (orderService) {
      setSelectedOrderServiceToEdit(orderService);
    }

    onOpenEditOrderService();
  };
*/

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
      const { data }: AxiosResponse<UserData[]> = await api.get(
        `user/get?take=${limit}&skip=${offset}&${filter}`
      );
      setNextUsers(data);
    } catch (error) {
      setUsers([]);
      toast.error('Nenhum Usuário Encontrado');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<UserData[]> = await api.get(
        `user/get?take=${limit}&skip=${
          offset + limit
        }&${filter}`
      );
      setNextUsers(data);
    } catch (error) {
      setNextUsers([]);
    }
  };

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
              Usuários
            </Text>
            <Flex justifyContent="space-between" width="100%">
              <Text color="#00000" fontWeight="medium" fontSize="2xl">
                Todos os Usuários Cadastrados
              </Text>
              <Button colorScheme={theme.colors.primary} onClick={onOpen}>
                Cadastrar Usuário
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
                <Flex gap="5px" alignItems="5px" mb="15px" >
                  
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
                        <Td>Usuário</Td>
                        <Td>Cargo</Td>
                        <Td>Tipo de Acesso</Td>
                        <Td />
                        <Td />
                      </Tr>
                    </Thead>
                    <Tbody fontWeight="semibold" maxHeight="200px">
                      {users.map((users) => (
                        <Tr key={users.id}>
                          <Td p={0} fontWeight="semibold">
                            {users.name}{' '}
                          </Td>
                          <Td
                            p={0}
                            fontWeight="semibold"
                          >
                            {users.job} -{' '}
                          </Td>
                          <Td>
                            {users.role}
                          </Td>
                          <Td>
                            <button >
                              <IconButton
                                aria-label="Editar Usuário"
                                variant="ghost"
                                icon={<FaTools />}
                              />
                            </button>
                          </Td>
                          <Td>
                            <IconButton
                              aria-label="Excluir Usuário"
                              variant="ghost"
                              icon={<MdDelete />}
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
                  {nextUsers.length > 0 && (
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
export { UsersTable };