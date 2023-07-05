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
import { MdDelete } from 'react-icons/md';
import { LoginResponse, Job, Role } from '@/constants/user';
import { UserRegisterModal } from '@/components/user-register-modal';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { theme } from '@/styles/theme';
import { SelectItem } from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';
import { OSStatusMap, OSStatusStyleMap } from '@/constants/orderservice';

export interface UserData {
  id?: string;
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

function UsersTable() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [nextUsers, setNextUsers] = useState<UserData[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);

  /*
  const handleEdit = (user: OrderServiceData) => {
    if (orderService) {
      setSelectedOrderServiceToEdit(orderService);
    }

    onOpenEditOrderService();
  };
*/

  const loggedUser = JSON.parse(
    localStorage.getItem('@alectrion:user') || ''
  ) as unknown as LoginResponse;

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<UserData[]> = await api.get(
        `user/get?allUsers=true`,
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
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
        `user/get?allUsers=true`,
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          },
        }
      );
      setNextUsers(data);
    } catch (error) {
      setNextUsers([]);
    }
  };

  useEffect(() => {
    fetchItems();
    fetchNextItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshRequest]);

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
            <Divider borderColor="#00000" margin="15px 0 15px 0" p={2} />
            <Flex p={3} />
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
                        <Tr key={user.id}>
                          <Td fontWeight="semibold">{user.name}</Td>
                          <Td fontWeight="semibold">{user.job}</Td>
                          <Td fontWeight="semibold">{user.role}</Td>
                          <Td>{user.cpf}</Td>
                          <Td>
                            <button>
                              <IconButton
                                aria-label="Editar Usuário"
                                variant="ghost"
                                icon={<FaTools />}
                                width="5%"
                              />
                            </button>
                          </Td>
                          <Td>
                            <IconButton
                              aria-label="Excluir Usuário"
                              variant="ghost"
                              icon={<MdDelete />}
                              width="5%"
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
      <UserRegisterModal
        onClose={onClose}
        isOpen={isOpen}
        refreshRequest={refreshRequest}
        setRefreshRequest={setRefreshRequest}
      />
    </Grid>
  );
}
export { UsersTable };
