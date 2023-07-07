import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, ArrowLeftIcon, CloseIcon } from '@chakra-ui/icons';
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
  Checkbox,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { MdPictureAsPdf } from 'react-icons/md';
import { BsFiletypeXlsx } from 'react-icons/bs';
import { GrDocumentCsv } from 'react-icons/gr';
import { toast } from '@/utils/toast';
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
import { MovementRegisterModal } from '@/components/movement-register-modal';
import { TermModal } from '@/components/term-modal';
import { movement } from '../movements/MovementControl';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { ReportModal } from '@/components/report-modal';
import { getEquipments } from '@/services/requests/equipment';
import { useAuth } from '@/contexts/AuthContext';

interface ISelectOption {
  label: string;
  value: number | string;
}

interface TypeData {
  id: number;
  name: string;
}

export interface EquipmentData {
  equipment: any;
  tippingNumber: string;
  serialNumber: string;
  type: {
    id: string;
    name: string;
  };
  situacao: string;
  estado: string;
  model: string;
  acquisitionDate: Date;
  description?: string;
  screenSize?: string;
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

type FilterValues = {
  type?: string;
  brand?: string;
  lastModifiedDate?: string;
  unit?: ISelectOption;
  situation?: ISelectOption;
  search: string;
  model?: ISelectOption;
  ram_size?: string;
  description?: string;
  processor?: string;
  storageType?: string;
  initialDate?: string;
  finalDate?: string;
};

// função que define os eestados searchTerm e searchType com o useState, searchTerm é o termo de pesquisa que o usuário insere na caixa de entrada, enquanto searchType é o tipo de equipamento que o usuário seleciona no menu suspenso.//
function EquipmentTable() {
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);
  const [nextEquipments, setNextEquipments] = useState<EquipmentData[]>([]);
  const [models, setModels] = useState<ISelectOption[]>();
  const [brands, setBrands] = useState<ISelectOption[]>();
  const [ram_sizes, setRam_sizes] = useState<ISelectOption[]>();
  const [storageTypes, setStorageTypes] = useState<ISelectOption[]>();
  const [processors, setProcessors] = useState<ISelectOption[]>();
  const [selectedMovement, setSelectedMovement] = useState<movement>();
  const [selectedEquipmentToEdit, setSelectedEquipmentToEdit] =
    useState<EquipmentData>();
  const [selectedEquipmentToMovement, setSelectedEquipmentToMovement] =
    useState<EquipmentData[]>([]);
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [workstations, setWorkstations] = useState<ISelectOption[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [equipsToExport, setEquipsToExport] = useState<EquipmentData[]>([]);
  const { user } = useAuth();

  const {
    control,
    watch,
    register,
    formState: { errors },
    reset,
    resetField,
    setValue,
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const handleFilterChange = () => {
    const {
      type,
      lastModifiedDate,
      situation,
      unit,
      model,
      brand,
      ram_size,
      processor,
      storageType,
    } = watchFilter;

    let formattedDate;
    if (
      lastModifiedDate !== null &&
      lastModifiedDate !== '' &&
      lastModifiedDate
    ) {
      formattedDate = new Date(lastModifiedDate).toLocaleDateString('en-us');
    }
  const formattedDate = (date: string | undefined) => {
    if (date !== null && date !== '' && date) {
      return new Date(date).toLocaleDateString('en-us');
    }
  };

  const handleFilterChange = () => {
    const {
      type,
      lastModifiedDate,
      situation,
      unit,
      model,
      brand,
      ram_size,
      initialDate,
      finalDate,
      processor,
      storageType,
    } = watchFilter;

    const dataFormatted = {
      type,
      updatedAt: formattedDate(lastModifiedDate),
      situation,
      unit,
      search,
      model,
      brand,
      ram_size,
      processor,
      storageType,
      initialDate: formattedDate(initialDate),
      finalDate: formattedDate(finalDate),
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

  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>();

  const {
    isOpen: isOpenEditEquipment,
    onClose: onCloseEditEquipment,
    onOpen: onOpenEditEquipment,
  } = useDisclosure();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isOpenTerm,
    onClose: onCloseTerm,
    onOpen: onOpenTerm,
  } = useDisclosure();

  const {
    isOpen: isOpenRegister,
    onClose: onCloseRegister,
    onOpen: onOpenRegister,
  } = useDisclosure();

  const {
    isOpen: isReportOpen,
    onClose: onReportClose,
    onOpen: onReportOpen,
  } = useDisclosure();

  const {
    isOpen: isViewOpen,
    onClose: onViewClose,
    onOpen: onViewOpen,
  } = useDisclosure();

  const formattedWorkstations = (data: Workstation[]): ISelectOption[] => {
    return data?.map((item: Workstation) => {
      return { label: item.name, value: item.name };
    });
  };

  const formattedModels = (data: EquipmentData[]): ISelectOption[] => {
    const uniqueModels = new Set<string>();

    data?.forEach((item) => {
      uniqueModels.add(item.model);
    });

    const uniqueOptions: ISelectOption[] = Array.from(uniqueModels)
      .filter((model) => !!model)
      .map((model) => ({
        label: model,
        value: model,
      }));

    return uniqueOptions;
  };

  const getModels = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/listEquipments`
      );
      setModels(formattedModels(data));
    } catch (error) {
      setModels([]);
    }
  };

  const formattedBrands = (data: EquipmentData[]): ISelectOption[] => {
    const uniqueBrands = new Set<string>();

    data?.forEach((item) => {
      uniqueBrands.add(item.equipment.brand);
    });

    const uniqueOptions: ISelectOption[] = Array.from(uniqueBrands).map(
      (brand) => ({
        label: brand,
        value: brand,
      })
    );

    return uniqueOptions;
  };

  const getBrands = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find`
      );
      setBrands(formattedBrands(data));
    } catch (error) {
      setBrands([]);
    }
  };

  const formattedRam_sizes = (data: EquipmentData[]): ISelectOption[] => {
    const uniqueRam_sizes = new Set<string>();

    data?.forEach((item) => {
      uniqueRam_sizes.add(item.equipment.ram_size);
    });

    const uniqueOptions: ISelectOption[] = Array.from(uniqueRam_sizes).map(
      (ram_size) => ({
        label: ram_size,
        value: ram_size,
      })
    );

    return uniqueOptions;
  };

  const getRam_sizes = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/listEquipments`
      );
      setRam_sizes(formattedRam_sizes(data));
    } catch (error) {
      setRam_sizes([]);
    }
  };

  const formattedProcessors = (data: EquipmentData[]): ISelectOption[] => {
    const uniqueProcessors = new Set<string>();

    data?.forEach((item) => {
      uniqueProcessors.add(item.equipment.Processor);
    });

    const uniqueOptions: ISelectOption[] = Array.from(uniqueProcessors).map(
      (processor) => ({
        label: processor,
        value: processor,
      })
    );

    return uniqueOptions;
  };

  const getProcessors = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/listEquipments`
      );
      setProcessors(formattedProcessors(data));
    } catch (error) {
      setProcessors([]);
    }
  };

  const formattedStorageTypes = (data: EquipmentData[]): ISelectOption[] => {
    const uniqueStorageTypes = new Set<string>();

    data?.forEach((item) => {
      uniqueStorageTypes.add(item.equipment.storageType);
    });

    const uniqueOptions: ISelectOption[] = Array.from(uniqueStorageTypes).map(
      (storageType) => ({
        label: storageType,
        value: storageType,
      })
    );

    return uniqueOptions;
  };

  const getStorageTypes = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find`
      );
      setStorageTypes(formattedStorageTypes(data));
    } catch (error) {
      setStorageTypes([]);
    }
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
      setEquipments(data);
    } catch (error) {
      setEquipments([]);
      toast.error('Nenhum Equipamento encontrado');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find?take=${limit}&skip=${offset + limit}&${filter}`
      );
      setNextEquipments(data);
    } catch (error) {
      setNextEquipments([]);
      toast.error('Nenhum Equipamento encontrado');
    }
  };

  const [description, setDescription] = useState('');
  const watchType = watch('type', '');

  useEffect(() => {
    resetField('ram_size');
    resetField('description');
  }, [resetField, watchType]);

  useEffect(() => {
    resetField('processor');
    resetField('description');
  }, [resetField, watchType]);

  useEffect(() => {
    if (watchType === 'CPU') {
      setDescription(`${watchType}`);
    }

    setValue('description', description);
  }, [setValue, description, watchType]);

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

  useEffect(() => {
    getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getRam_sizes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getProcessors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getStorageTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (equipment: EquipmentData) => {
    if (equipment) setSelectedEquipmentToEdit(equipment);
    onOpenEditEquipment();
  };

  const handleView = (equipment: EquipmentData) => {
    if (equipment) setSelectedEquipment(equipment);
    onViewOpen();
  };

  const handleMovement = () => {
    if (
      selectedEquipmentToMovement === undefined ||
      selectedEquipmentToMovement.length === 0
    ) {
      toast.error('Selecione ao menos um equipamento para movimentar');
    } else {
      onOpenRegister();
    }
  };
  const handleCheckboxClick = (equipment: EquipmentData) => {
    if (selectedEquipmentToMovement.includes(equipment)) {
      setSelectedEquipmentToMovement(
        selectedEquipmentToMovement.filter((equip) => equip.id !== equipment.id)
      );
    } else {
      setSelectedEquipmentToMovement([
        ...selectedEquipmentToMovement,
        equipment,
      ]);
    }
  };

  const [types, setTypes] = useState<TypeData[]>([]);

  const fetchTypes = async (str: string) => {
    try {
      const { data }: AxiosResponse<TypeData[]> = await api.get(
        `equipment/type?search=${str}`
      );
      setTypes(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  useEffect(() => {
    fetchTypes('');
  }, []);

  const handleReportExport = async (selectedType: string) => {
    setType(selectedType);
    setEquipsToExport(await getEquipments(filter));
    onReportOpen();
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
            <Flex
              justifyContent="space-between"
              width="100%"
              alignItems="center"
            >
              <Text
                margin="20px 0 15px 0"
                color={theme.colors.black}
                fontWeight="semibold"
                fontSize="4xl"
              >
                Controle de Equipamento
              </Text>
              {user?.role !== 'consulta' && (
                <Button colorScheme={theme.colors.primary} onClick={onOpen}>
                  Cadastrar Equipamento
                </Button>
              )}
            </Flex>
            <Flex justifyContent="space-between" width="100%">
              <Text color="#00000" fontWeight="medium" fontSize="2xl">
                Últimos Equipamentos Modificados
              </Text>
              <Flex flexDirection="column">
                <Flex
                  gap={5}
                  justifyContent="center"
                  width="100%"
                  alignItems="center"
                  padding={4}
                >
                  <GrDocumentCsv
                    size="2.2rem"
                    cursor="pointer"
                    onClick={() => {
                      handleReportExport('csv');
                    }}
                  />
                  <BsFiletypeXlsx
                    size="2.2rem"
                    cursor="pointer"
                    onClick={() => {
                      handleReportExport('xls');
                    }}
                  />
                  <MdPictureAsPdf
                    size="2.2rem"
                    cursor="pointer"
                    onClick={() => {
                      handleReportExport('pdf');
                    }}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Divider borderColor="#00000" margin="5px 0 5px 0" />
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <form id="equipment-filter" style={{ width: '100%' }}>
                <Grid
                  templateColumns="repeat(5, 5fr)"
                  gap="5px"
                  alignItems="5px"
                  mb="15px"
                >
                  <NewControlledSelect
                    control={control}
                    name="type"
                    id="type"
                    options={types.map((type) => ({
                      label: type?.name ?? '',
                      value: type?.name ?? '',
                    }))}
                    placeholder="Tipo"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                    filterStyle
                  />
                  <Datepicker
                    border={false}
                    placeholderText="Última modificação"
                    name="lastModifiedDate"
                    control={control}
                  />
                  <Datepicker
                    border={false}
                    placeholderText="Cadastrado depois de"
                    name="initialDate"
                    control={control}
                  />
                  <Datepicker
                    border={false}
                    placeholderText="Cadastrado antes de"
                    name="finalDate"
                    control={control}
                  />
                  <NewControlledSelect
                    control={control}
                    name="unit"
                    id="unit"
                    options={workstations}
                    placeholder="Localização"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                    filterStyle
                  />
                  <NewControlledSelect
                    control={control}
                    name="situation"
                    id="situation"
                    options={STATUS}
                    placeholder="Situação"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                    filterStyle
                  />
                  <NewControlledSelect
                    filterStyle
                    control={control}
                    name="brand"
                    id="brand"
                    options={brands}
                    placeholder="Marca "
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                  />
                  <NewControlledSelect
                    filterStyle
                    control={control}
                    name="model"
                    id="model"
                    options={models}
                    placeholder="Modelos"
                    cursor="pointer"
                    variant="unstyled"
                    fontWeight="semibold"
                    size="sm"
                  />
                  <NewControlledSelect
                    filterStyle
                    control={control}
                    name="ram_size"
                    id="ram_size"
                    options={ram_sizes}
                    placeholder="Ram "
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
                {watchType === 'CPU' && (
                  <Flex gap="5px" alignItems="5px" mb="15px">
                    <NewControlledSelect
                      filterStyle
                      control={control}
                      name="ram_size"
                      id="ram_size"
                      options={ram_sizes}
                      placeholder="Ram"
                      cursor="pointer"
                      variant="unstyled"
                      fontWeight="semibold"
                      size="sm"
                    />
                    <NewControlledSelect
                      filterStyle
                      control={control}
                      name="processor"
                      id="processor"
                      options={processors}
                      placeholder="Processador"
                      cursor="pointer"
                      variant="unstyled"
                      fontWeight="semibold"
                      size="sm"
                    />
                    <NewControlledSelect
                      filterStyle
                      control={control}
                      name="storageType"
                      id="storageType"
                      options={storageTypes}
                      placeholder="Tipo de armazenamento"
                      cursor="pointer"
                      variant="unstyled"
                      fontWeight="semibold"
                      size="sm"
                    />
                  </Flex>
                )}
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
                        <Td />
                      </Tr>
                    </Thead>
                    <Tbody fontWeight="semibold" maxHeight="200px">
                      {equipments.map((equipment) => (
                        <Tr
                          onClick={(event) => {
                            handleView(equipment);
                            event.stopPropagation();
                          }}
                          key={equipment.id}
                          cursor="pointer"
                        >
                          <Td fontWeight="medium">
                            {equipment.situacao} - {equipment.unit.name}
                            <Td p={0} fontWeight="semibold">
                              {equipment.type.name} {equipment.brand.name}
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
                            width="5%"
                          >
                            <button>
                              <BiEditAlt size={23} />
                            </button>
                          </Td>
                          <Td
                            width="5%"
                            onClick={(event) => {
                              event.stopPropagation();
                            }}
                          >
                            <Checkbox
                              onChange={() => {
                                handleCheckboxClick(equipment);
                              }}
                            />
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
                  onClick={handleMovement}
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
        <EquipmentRegisterModal
          onClose={onClose}
          isOpen={isOpen}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
          onUploadOpen={function (): void {
            throw new Error('Function not implemented.');
          }}
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
        <MovementRegisterModal
          isOpen={isOpenRegister}
          onClose={onCloseRegister}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
          selectedEquipmentToMovement={selectedEquipmentToMovement}
          setSelectedMovement={setSelectedMovement}
          onOpenTerm={onOpenTerm}
        />
        <TermModal
          isOpen={isOpenTerm}
          onClose={onCloseTerm}
          selectedMoviment={selectedMovement}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
        <ReportModal
          isOpen={isReportOpen}
          onClose={onReportClose}
          type={type}
          equipments={equipsToExport}
        />
      </GridItem>
    </Grid>
  );
}
export { EquipmentTable };
