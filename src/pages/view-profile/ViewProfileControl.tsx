import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
import { BiSearch } from 'react-icons/bi';
import { useAuth } from '@/contexts/AuthContext';
import {
  Input,
  Text,
  Box,
  Center,
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
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { FaTools } from 'react-icons/fa';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { theme } from '@/styles/theme';
import { ControlledSelect } from '@/components/form-fields/controlled-select/index';
import {
  SelectItem,
  TIPOS_EQUIPAMENTO,
  Workstation,
} from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
// import { Input } from '@/components/form-fields/input';
import { OSStatusMap, OSStatusStyleMap } from '@/constants/orderservice';

interface ISelectOption {
  label: string;
  value: number | string;
}

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

function ViewProfile() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const [orderServices, setOrderServices] = useState<OrderServiceData[]>([]);
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

  const {
    control,
    watch,
    register,
    formState: { errors },
    reset,
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const handleFilterChange = () => {
    const { type, dateOS, status, unit } = watchFilter;

    let formattedDate;
    if (dateOS !== null && dateOS !== '' && dateOS) {
      formattedDate = new Date(dateOS).toLocaleDateString('en-us');
    }

    const dataFormatted = {
      type: type?.value,
      date: formattedDate,
      status: status?.value,
      unit: unit?.value,
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
      <form  aria-label="form">
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
                  Perfil de Usuário
                </Text>
                <Flex justifyContent="space-between" width="100%">
                  <Text color="#00000" fontWeight="medium" fontSize="2xl">
                    Dados Cadastrais
                  </Text>
                </Flex>
                <Divider borderColor="#00000" margin="15px 0 15px 0" />
                <Text
                  margin="20px 0 15px 0"
                  color={theme.colors.black}
                  fontWeight="semibold"
                  fontSize="4xl"
                >
                  {user?.name}
                </Text>
                <Box
                  bg="white"
                  borderRadius="10px"
                  borderWidth="1.9px"
                  borderColor="rgba(255, 165, 0, 1)"
                  boxShadow="0px 0px 15px grey;"
                  color="black"
                  paddingY="5%"
                  paddingX="5%"
                  width="1000px"
                >
                    <Flex>
                      <Box>
                        <Text
                          pl="2%"
                          pb="1%"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          Nome
                        </Text>
                        <Input size="lg" fontSize="lg" name='name' width='120%' marginRight="75px" readOnly placeholder={` ${user?.name}`}/>
                      </Box>
                      <Box marginLeft="5px">
                        <Text
                          pl="22%"
                          pb="1%"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          CPF
                        </Text>
                        <Input size="lg" fontSize="lg" name='cpf' width='120%' marginLeft="75px" readOnly placeholder={'cpf'}/>
                      </Box>
                    </Flex>
                    <Flex>
                      <Box>
                        <Text
                           pl="2%"
                           pb="1%"
                           color="#605555"
                           fontWeight="medium"
                           fontSize="lg"
                           marginTop="3%"
                        >
                          Email
                        </Text>
                        <Input size="lg" fontSize="lg" name='email' width='120%' marginRight="75px" readOnly placeholder={` ${user?.email}`}/>
                      </Box>
                      <Box marginLeft="5px">
                        <Text
                          pl="22%"
                          pb="1%"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                          marginTop="3%"
                        >
                          Tipo de Usuário
                        </Text>
                        <Input size="lg" fontSize="lg" name='user' width='120%' marginLeft="75px" readOnly placeholder={` ${user?.role}`}/>
                      </Box>
                    </Flex>
                    <Flex>
                      <Box>
                        <Text
                          pl="5px"
                          pb="8px"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                          marginTop="3%"
                        >
                          Telefone
                        </Text>
                        <Input size="lg" fontSize="lg" name='telefone' width='120%' readOnly placeholder={'telefone'}/>
                      </Box>
                    </Flex>
                    <Flex justify="space-between">
                      <Button
                        marginTop="100px"
                        paddingX="24"
                        width="20px"
                        color="white"
                        bg="black"
                        onClick={() => window.history.back()}
                      >
                        Voltar
                      </Button>
                      <Button
                        marginTop="100px"
                        paddingX="24"
                        width="20px"
                        color="white"
                        bg="black"
                        onClick={() => navigate('/change-password')}
                      >
                        Alterar senha
                      </Button>
                    </Flex>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </form>
  );
}
export { ViewProfile };
