/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/export */
import { useState, useEffect } from 'react';
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
import { SideBar } from '@/components/side-bar';
import { api } from '../../config/lib/axios';
import { EquipmentRegisterModal } from '@/components/equipment-register-modal';
import { theme } from '@/styles/theme';
import { EquipmentEditModal } from '@/components/equipment-edit-modal';

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

  brand: {
    name: string;
  };

  acquisition: any;

  unit: {
    name: string;
    localization: string;
  };

  ram_size?: string;

  createdAt?: string;

  updatedAt: string;

  id: string;
}

// função que define os eestados searchTerm e searchType com o useState, searchTerm é o termo de pesquisa que o usuário insere na caixa de entrada, enquanto searchType é o tipo de equipamento que o usuário seleciona no menu suspenso.//
function EquipmentTable() {
  const [equipaments, setEquipaments] = useState<EquipmentData[]>([]);
  const [nextEquipaments, setNextEquipaments] = useState<EquipmentData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
  const [selectedEquipmentToEdit, setSelectedEquipmentToEdit] =
    useState<EquipmentData>();
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const {
    isOpen: isOpenEditEquipment,
    onClose: onCloseEditEquipment,
    onOpen: onOpenEditEquipment,
  } = useDisclosure();

  const { isOpen, onClose, onOpen } = useDisclosure();

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
    fetchItems();
    fetchNextItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, refreshRequest]);

  const handleEdit = (equipment: EquipmentData) => {
    if (equipment) setSelectedEquipmentToEdit(equipment);
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
              <Flex width="100%" gap="5px" mb="15px">
                <Select
                  cursor="pointer"
                  variant="unstyled"
                  placeholder="Tipos"
                  fontWeight="semibold"
                  size="xs"
                >
                  <option value="option1">CPU</option>
                  <option value="option2">Monitor</option>
                  <option value="option3">Estabilizador</option>
                  <option value="option4">Nobreak</option>
                  <option value="option5">Hub</option>
                  <option value="option6">Switch</option>
                  <option value="option7">Notebook</option>
                  <option value="option8">Datashow</option>
                  <option value="option9">Scanner</option>
                  <option value="option10">Impressora</option>
                  <option value="option11">Roteador</option>
                  <option value="option12">Tablet</option>
                  <option value="option13">TV</option>
                  <option value="option14">Fax</option>
                  <option value="option15">Telefone</option>
                  <option value="option16">Smartphone</option>
                  <option value="option17">Projetor</option>
                  <option value="option18">Tela de Projeção</option>
                  <option value="option19">Câmera</option>
                  <option value="option20">Webcam</option>
                  <option value="option21">Caixa de Som</option>
                  <option value="option22">Impressora Térmica</option>
                  <option value="option23">
                    Leitor de Código de Barras/ CCD
                  </option>
                  <option value="option24">Mesa Digitalizadora</option>
                  <option value="option25">Leitor Biométrico</option>
                  <option value="option26">Receptor</option>
                  <option value="option27">Extrator de Dados</option>
                  <option value="option28">Transformador</option>
                  <option value="option29">Coletor de Assinatura</option>
                  <option value="option30">Kit Cenário</option>
                  <option value="option31">
                    Dispositivo de Biometria Facial
                  </option>
                  <option value="option32">Servidor de Rede</option>
                  <option value="option33">HD Externo</option>
                  <option value="option34">Protetor Eletrônico</option>
                </Select>

                <Select
                  cursor="pointer"
                  variant="unstyled"
                  placeholder="Marcas"
                  fontWeight="semibold"
                  size="xs"
                >
                  <option value="option1">Dell</option>
                  <option value="option2">LG</option>
                  <option value="option3">Galaxy</option>
                  <option value="option4">HP</option>
                  <option value="option5">Lenovo</option>
                  <option value="option6">Logitech</option>
                </Select>

                <Select
                  cursor="pointer"
                  variant="unstyled"
                  placeholder="Modelos"
                  fontWeight="semibold"
                  size="xs"
                >
                  <option value="option1">Ink 416</option>
                  <option value="option2">16520</option>
                  <option value="option3">1080p24</option>
                  <option value="option4">Book2</option>
                  <option value="option5">Thinkpad</option>
                </Select>

                <Select
                  cursor="pointer"
                  variant="unstyled"
                  placeholder="Datas"
                  fontWeight="semibold"
                  size="xs"
                >
                  <option value="option1">Janeiro</option>
                  <option value="option2">Fevereiro</option>
                  <option value="option3">Março</option>
                  <option value="option4">Abril</option>
                  <option value="option5">Maio</option>
                  <option value="option6">Junho</option>
                  <option value="option7">Julho</option>
                  <option value="option8">Agosto</option>
                  <option value="option9">Setembro</option>
                  <option value="option10">Outubro</option>
                  <option value="option11">Novembro</option>
                  <option value="option12">Dezembro</option>
                </Select>

                <Select
                  cursor="pointer"
                  variant="unstyled"
                  placeholder="Local"
                  fontWeight="semibold"
                  size="xs"
                >
                  <option value="option1">1dp Goiânia</option>
                  <option value="option2">2dp Goiânia</option>
                </Select>

                <Select
                  cursor="pointer"
                  variant="unstyled"
                  placeholder="Status"
                  fontWeight="semibold"
                  size="xs"
                >
                  <option value="option1">Novo</option>
                  <option value="option2">Usado</option>
                </Select>

                <Input
                  placeholder="Pesquisa"
                  size="sm"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  minWidth="max-content"
                />
              </Flex>
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
                        <Tr key={equipment.id}>
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
                          <Td>
                            <button
                              onClick={() => {
                                handleEdit(equipment);
                                onOpenEditEquipment();
                              }}
                            >
                              <BiEditAlt />
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
      </GridItem>
    </Grid>
  );
}
export { EquipmentTable };
