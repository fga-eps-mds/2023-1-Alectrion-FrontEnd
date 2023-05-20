/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/export */
import { useState, useEffect, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { MdBuild, MdCall } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import {
  Select,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  IconButton,
  Button,
  TableContainer,
  Center,
  Divider,
  Box,
  useDisclosure,
  Flex,
  Grid,
  GridItem,
  Tfoot,
  TableCaption,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { FaFileAlt } from 'react-icons/fa';
import { SideBar } from '@/components/side-bar';
import { api } from '../../config/lib/axios';
import { EquipmentRegisterModal } from '@/components/equipment-register-modal';
import { EquipmentViewModal } from '@/components/equipment-view-modal';
import { theme } from '@/styles/theme';
import { EquipmentEditModal } from '@/components/equipment-edit-modal';
import { ControlledSelect } from '@/components/form-fields/controlled-select';
import { STATUS, TIPOS_EQUIPAMENTO } from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';

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
  type?: { label: string; value: string };
  // brand?: string;
  lastModifiedDate?: string;
  location?: { label: string; value: string };
  situacao?: { label: string; value: string };
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
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [filter, setFilter] = useState<FilterValues>();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const handleFilterChange = () => {
    const { type, lastModifiedDate, situacao, location } = watchFilter;

    const dataFormatted = {
      type: type?.value,
      lastModifiedDate,
      situacao: situacao?.value,
      location: location?.value,
    };

    const filteredDataFormatted = [
      ...Object.entries(dataFormatted).filter(
        (field) => field[1] !== undefined && field[1] !== ''
      ),
    ];
    // const filteredDataFormatted = Object.values(dataFormatted).filter(
    //   (key, value) => value !== undefined
    // );

    const query = `{${filteredDataFormatted
      .map((field) => `"${field[0]}":"${field[1]}"`)
      .join(', ')}}`;
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
    setSearchTerm(event.target.value);
  };
  // handleSearchTypeChange atualiza o estado searchType com o valor selecionado no menu suspenso pelo usuário.
  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchType(event.target.value);
  };
  // verificar se o número de série do equipamento inclui
  // o termo de pesquisa inserido pelo usuário e se o tipo de equipamento corresponde ao tipo selecionado pelo usuário no menu suspenso
  // const filteredEquipment = equipmentList.filter(
  //   (equipment) =>
  //     equipment.NumSerie.includes(searchTerm) &&
  //     (searchType === '' || equipment.type === searchType)
  // );

  const fetchItems = async () => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find?take=${limit}&skip=${offset}`
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
        `equipment/find?take=${limit}&skip=${offset + limit}`
      );
      setNextEquipaments(data);
    } catch (error) {
      setNextEquipaments([]);
      toast.error('Nenhum Equipamento encontrado');
    }
  };
  useEffect(() => {
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchFilter]);
  useEffect(() => {
    fetchItems();
    fetchNextItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, refreshRequest]);

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
              <form id="equipment-filter" onSubmit={onSubmit}>
                <Flex width="100%" gap="5px" mb="15px">
                  <ControlledSelect
                    control={control}
                    name="type"
                    id="type"
                    options={TIPOS_EQUIPAMENTO}
                    placeholder="Tipo de equipamento"
                  />
                  <Datepicker
                    // label="Data da última modificação"
                    placeHolder="Última modificicação"
                    name="lastModifiedDate"
                    control={control}
                  />
                  <ControlledSelect
                    control={control}
                    name="location"
                    id="location"
                    options={TIPOS_EQUIPAMENTO}
                    placeholder="Localização"
                  />
                  <ControlledSelect
                    control={control}
                    name="situacao"
                    id="situacao"
                    options={STATUS}
                    placeholder="situacao"
                  />
                  <Input
                    placeholder="Pesquisa"
                    size="sm"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    minWidth="max-content"
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
                            {new Date(equipment.updatedAt).toLocaleDateString()}
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
