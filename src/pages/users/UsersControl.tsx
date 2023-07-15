import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BiSearch, BiEditAlt } from 'react-icons/bi';
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
  AccordionPanel,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Checkbox,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import {
  LoginResponse,
  Job,
  Role,
  TIPOS_JOB,
  TIPOS_ROLE,
} from '@/constants/user';
import { UserRegisterModal } from '@/components/user-register-modal';
import { UserViewModal } from '@/components/user-view-modal';
import { UserEditModal } from '@/components/user-edit-modal';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api } from '../../config/lib/axios';
import { theme } from '@/styles/theme';
import { Input } from '@/components/form-fields/input';
import { DeleteExtensiveIcon } from '../../components/action-buttons/delete-extensive-icon';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';

export interface UserData {
  id: string;
  name: string;
  email: string;
  username: string;
  cpf: string;
  job: Job;
  role: Role;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  temporaryPassword: boolean;
  isDeleted?: boolean;
}

type FilterValues = {
  role: string;
  job: string;
  username: string;
  deletedUsers: boolean;
  search: string;
};

function UsersTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUser, setSeletedUser] = useState<UserData>();
  const [nextUsers, setNextUsers] = useState<UserData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const [selectedUserToEdit, setSelectedUserToEdit] = useState<UserData>();
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const {
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isOpenEditUser,
    onClose: onCloseEditUser,
    onOpen: onOpenEditUser,
  } = useDisclosure();

  const {
    isOpen: isViewOpen,
    onClose: onViewClose,
    onOpen: onViewOpen,
  } = useDisclosure();

  const cleanFilters = () => {
    setFilter('');
    setSearch('');
    reset();
  };

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<UserData[]> = await api.get(
        `user/get?allUsers=true&take=${limit}&skip=${offset}&${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@alectrion:token')}`,
          },
        }
      );
      setUsers(data);
    } catch (error) {
      setUsers([]);
      toast.error('Nenhum Usuário Encontrado');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<UserData[]> = await api.get(
        `user/get?allUsers=true&take=${limit}&skip=${offset + limit}&${filter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('@alectrion:token')}`,
          },
        }
      );
      setNextUsers(data);
    } catch (error) {
      setNextUsers([]);
    }
  };

  const handleEdit = (user: UserData) => {
    if (user) setSelectedUserToEdit(user);
    onOpenEditUser();
  };

  const handleView = (user: UserData) => {
    if (user) setSeletedUser(user);
    onViewOpen();
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

  const handleFilterChange = () => {
    const { role, job, deletedUsers } = watchFilter;

    const data = {
      role,
      job,
      search,
      deletedUsers,
    };

    const filteredDataFormatted = [
      ...Object.entries(data).filter(
        (field) => field[1] !== undefined && field[1] !== ''
      ),
    ];

    const query = `${filteredDataFormatted
      .map((field) => `${field[0]}=${field[1]}`)
      .join('&')}`;
    setFilter(query);
  };

  const handleDelete = async (userId: string) => {
    try {
      const { data }: AxiosResponse<boolean> = await api.delete(`user/delete`, {
        params: {
          userId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@alectrion:token')}`,
        },
      });
      toast.success('Usuário deletado com sucesso');
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchNextItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, refreshRequest, filter]);

  useEffect(() => {
    handleSearch();
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFilter]);

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
              Controle de Acesso
            </Text>
            <Flex justifyContent="space-between" width="100%">
              <Text color="#00000" fontWeight="medium" fontSize="2xl">
                Usuários Cadastrados
              </Text>
              <Button colorScheme={theme.colors.primary} onClick={onOpen}>
                Cadastrar Usuário
              </Button>
            </Flex>
            <Divider borderColor="#00000" margin="15px 0 15px 0" />
            <Flex p={3} />
            <form id="user-filter" style={{ width: '100%' }}>
              <Flex gap="10px" alignItems="5px" mb="15px">
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
                    <AccordionPanel position="relative" zIndex="1">
                      <Flex gap="15px" alignItems="center">
                        <NewControlledSelect
                          filterStyle
                          control={control}
                          name="role"
                          id="role"
                          options={TIPOS_ROLE}
                          placeholder="Perfil"
                          cursor="pointer"
                          variant="unstyled"
                          fontWeight="semibold"
                          size="sm"
                        />
                        <NewControlledSelect
                          filterStyle
                          control={control}
                          name="job"
                          id="job"
                          options={TIPOS_JOB}
                          placeholder="Cargo"
                          cursor="pointer"
                          variant="unstyled"
                          fontWeight="semibold"
                          size="sm"
                        />
                        <Checkbox
                          value="true"
                          colorScheme="red"
                          {...register('deletedUsers')}
                        >
                          Desabilitados
                        </Checkbox>
                        <Input
                          placeholder="Pesquisa"
                          minWidth="15vw"
                          errors={errors.search}
                          {...register('search')}
                          rightElement={<BiSearch />}
                        />
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Flex>
            </form>
            {filter !== 'deletedUsers=false' ? (
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
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
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
                        <Td>Perfil</Td>
                        <Td>CPF</Td>
                        <Td />
                        <Td />
                      </Tr>
                    </Thead>
                    <Tbody fontWeight="semibold" maxHeight="200px">
                      {users.map((user) => (
                        <Tr
                          onClick={(event) => {
                            handleView(user);
                            event.stopPropagation();
                          }}
                          cursor="pointer"
                          key={user.id}
                        >
                          <Td fontWeight="semibold">{user.username}</Td>
                          <Td fontWeight="semibold">{user.job}</Td>
                          <Td fontWeight="semibold">{user.role}</Td>
                          <Td>{user.cpf}</Td>
                          <Td>
                            {user.role !== 'administrador' &&
                              !user.isDeleted && (
                                <button>
                                  <IconButton
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleEdit(user);
                                    }}
                                    aria-label="Editar Usuário"
                                    variant="ghost"
                                    icon={<BiEditAlt />}
                                    width="5%"
                                  />
                                </button>
                              )}
                          </Td>
                          <Td>
                            {user.role !== 'administrador' &&
                              !user.isDeleted && (
                                <DeleteExtensiveIcon
                                  onClick={() => {
                                    handleDelete(user.id);
                                    setRefreshRequest(!refreshRequest);
                                  }}
                                  label="usuário"
                                  name="Excluir"
                                />
                              )}
                            {user.isDeleted && (
                              <Text color="red">Desabilitado</Text>
                            )}
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
        <UserEditModal
          onClose={onCloseEditUser}
          isOpen={isOpenEditUser}
          userSelected={selectedUserToEdit}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </GridItem>
      <UserRegisterModal
        onClose={onClose}
        isOpen={isOpen}
        refreshRequest={refreshRequest}
        setRefreshRequest={setRefreshRequest}
      />
      <UserViewModal
        onClose={onViewClose}
        isOpen={isViewOpen}
        selectedUser={selectedUser}
      />
    </Grid>
  );
}
export { UsersTable };
