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
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { FaFileAlt } from 'react-icons/fa';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { EquipmentRegisterModal } from '@/components/equipment-register-modal';
import { EquipmentViewModal } from '@/components/equipment-view-modal';
import { theme } from '@/styles/theme';
import { EquipmentEditModal } from '@/components/equipment-edit-modal';
import { ControlledSelect } from '@/components/form-fields/controlled-select';
import { STATUS, TIPOS_EQUIPAMENTO, Workstation } from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';

interface ISelectOption {
  label: string;
  value: number | string;
}

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
  acquisition: any;
  unit: {
    name: string;
    localization: string;
  };
}

type FilterValues = {
  type?: ISelectOption;
  brand?: string;
  lastModifiedDate?: string;
  unit?: ISelectOption;
  situation?: ISelectOption;
  search: string;
};

// função que define os eestados searchTerm e searchType com o useState, searchTerm é o termo de pesquisa que o usuário insere na caixa de entrada, enquanto searchType é o tipo de equipamento que o usuário seleciona no menu suspenso.//
function EquipmentTable() {
  const [equipaments, setEquipaments] = useState<EquipmentData[]>([]);
  const [nextEquipaments, setNextEquipaments] = useState<EquipmentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [selectedEquipmentToEdit, setSelectedEquipmentToEdit] =
    useState<EquipmentData>();
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [workstations, setWorkstations] = useState<Workstation[]>();
  const [searchId, setSearchId] = useState('');

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
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const handleFilterChange = () => {
    const { type, lastModifiedDate, situation, unit } = watchFilter;

    let formattedDate;
    if (
      lastModifiedDate !== null &&
      lastModifiedDate !== '' &&
      lastModifiedDate
    ) {
      formattedDate = new Date(lastModifiedDate).toLocaleDateString('en-us');
      console.log(formattedDate);
    }

    const dataFormatted = {
      type: type?.value,
      updatedAt: formattedDate,
      situation: situation?.value,
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

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>();

  const {
    isOpen: isOpenEditEquipment,
    onClose: onCloseEditEquipment,
    onOpen: onOpenEditEquipment,
  } = useDisclosure();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isRegisterOpen,
    onClose: onRegisterClose,
    onOpen: onRegisterOpen,
  } = useDisclosure();
  const {
    isOpen: isViewOpen,
    onClose: onViewClose,
    onOpen: onViewOpen,
  } = useDisclosure();

  // handleSearchTermChange atualiza o estado searchTerm com o valor inserido na caixa de entrada pelo usuário
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchId(event.target.value);
  };
  // handleSearchTypeChange atualiza o estado searchType com o valor selecionado no menu suspenso pelo usuário.
  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchType(event.target.value);
  };

  const formattedWorkstations = (data: Workstation[]): ISelectOption[] => {
    return data?.map((item: Workstation) => {
      return { label: item.name, value: item.name };
    });
  };

  const getWorkstations = async () => {
    apiSchedula
      .get<Workstation[]>('workstations')
      .then((response) => {
        setWorkstations(formattedWorkstations(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
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
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find?take=${limit}&skip=${offset}&${filter}`
      );
      setEquipaments(data);
    } catch (error) {
      setEquipaments([]);
      toast.error('Nenhum Equipamento encontrado');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find?take=${limit}&skip=${offset + limit}&${filter}`
      );
      setNextEquipaments(data);
    } catch (error) {
      setNextEquipaments([]);
      toast.error('Nenhum Equipamento encontrado');
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

  const handleEdit = (equipment: EquipmentData) => {
    if (equipment) setSelectedEquipmentToEdit(equipment);
    onOpenEditEquipment();
  };

  const handleView = (equipment: EquipmentData) => {
    if (equipment) setSelectedEquipment(equipment);
    onViewOpen();
  };

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
              Controle de Equipamento
            </Text>
            <Flex justifyContent="space-between" width="100%">
              <Text color="#00000" fontWeight="medium" fontSize="2xl">
                Últimos Equipamentos Modificados
              </Text>
              <Button colorScheme={theme.colors.primary} onClick={onOpen}>
                Cadastrar Equipamento
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
                  <ControlledSelect
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
                  <Datepicker
                    border={false}
                    placeholderText="Última modificicação"
                    name="lastModifiedDate"
                    control={control}
                  />
                  <ControlledSelect
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
                  <ControlledSelect
                    control={control}
                    name="situation"
                    id="situation"
                    options={STATUS}
                    placeholder="Situação"
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
                      {equipaments.map((equipment) => (
                        <Tr
                          onClick={() => {
                            handleView(equipment);
                          }}
                          key={equipment.id}
                          cursor="pointer"
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
                          <Td
                            onClick={(event) => {
                              event.stopPropagation();
                              handleEdit(equipment);
                            }}
                          >
                            <button>
                              <BiEditAlt size={23} />
                            </button>
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
                  {nextEquipaments.length > 0 && (
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
        <EquipmentRegisterModal
          onClose={onClose}
          isOpen={isOpen}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
        <EquipmentEditModal
          onClose={onCloseEditEquipment}
          isOpen={isOpenEditEquipment}
          equip={selectedEquipmentToEdit}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
        <EquipmentViewModal
          onClose={onViewClose}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
          selectedEquipment={selectedEquipment}
          isOpen={isViewOpen}
          handleEdit={handleEdit}
        />
      </GridItem>
    </Grid>
  );
}
export { EquipmentTable };
