/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/export */
import { useState, useEffect, SetStateAction } from 'react';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { MdBuild , MdCall } from "react-icons/md"
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
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { SideBar } from '@/components/side-bar';
import { api } from '../../config/lib/axios';
import { EquipmentRegisterModal } from '@/components/equipment-register-modal';
import { EquipmentViewModal } from '@/components/equipment-view-modal';

interface equipament {
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
  const [equipaments, setEquipaments] = useState<equipament[]>([]);
  const [nextEquipaments, setNextEquipaments] = useState<equipament[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);

  const { isOpen: isRegisterOpen, onClose: onRegisterClose, onOpen: onRegisterOpen } = useDisclosure();
  const { isOpen: isViewOpen, onClose: onViewClose, onOpen: onViewOpen } = useDisclosure();

  const handleView = (equipmentId: string) => {
    if(equipmentId)
      setSelectedEquipmentId(equipmentId);
    onViewOpen();
  };
  
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
      const { data }: AxiosResponse<equipament[]> = await api.get(
        `equipment/find`
      );
      setEquipaments(data);
    } catch (error) {
      setEquipaments([]);
      toast.error('Nenhum Equipamento encontrado');
    }
  };

  const fetchNextItems = async () => {
    try {
      const { data }: AxiosResponse<equipament[]> = await api.get(
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
  }, [currentPage]);

  return (
    <>
      <SideBar />
      <Box paddingY="10" paddingX="300">
        <Text mb="10px" color="#000000" fontWeight="semibold" fontSize="4xl">
          Controle de Equipamento {nextEquipaments.length}
        </Text>
        <Text color="#00000" fontWeight="medium" fontSize="2xl">
          Últimos Equipamentos Modificados
        </Text>
        <Box paddingX="550" mb="-5">
          <Button colorScheme="#F49320" onClick={onRegisterOpen}>
            Cadastrar Equipamento
          </Button>
        </Box>
      </Box>
      <Box paddingLeft="300">
        <Divider borderColor="#00000" />
      </Box>
      <Box p={4}>
        <Box paddingLeft="190" h="0">
          <Select
            variant="unstyled"
            placeholder="Tipos"
            fontWeight="semibold"
            size="xs"
            w="170px"
            paddingLeft="100"
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
            <option value="option23">Leitor de Código de Barras/ CCD</option>
            <option value="option24">Mesa Digitalizadora</option>
            <option value="option25">Leitor Biométrico</option>
            <option value="option26">Receptor</option>
            <option value="option27">Extrator de Dados</option>
            <option value="option28">Transformador</option>
            <option value="option29">Coletor de Assinatura</option>
            <option value="option30">Kit Cenário</option>
            <option value="option31">Dispositivo de Biometria Facial</option>
            <option value="option32">Servidor de Rede</option>
            <option value="option33">HD Externo</option>
            <option value="option34">Protetor Eletrônico</option>
          </Select>
        </Box>
        <Box paddingLeft="270" h="0">
          <Select
            variant="unstyled"
            placeholder="Marcas"
            fontWeight="semibold"
            size="xs"
            w="180px"
            paddingLeft="100"
          >
            <option value="option1">Dell</option>
            <option value="option2">LG</option>
            <option value="option3">Galaxy</option>
            <option value="option4">HP</option>
            <option value="option5">Lenovo</option>
            <option value="option6">Logitech</option>
          </Select>
        </Box>
        <Box paddingLeft="365" h="0">
          <Select
            variant="unstyled"
            placeholder="Modelos"
            fontWeight="semibold"
            size="xs"
            w="180px"
            paddingLeft="100"
          >
            <option value="option1">Ink 416</option>
            <option value="option2">16520</option>
            <option value="option3">1080p24</option>
            <option value="option4">Book2</option>
            <option value="option5">Thinkpad</option>
          </Select>
        </Box>
        <Box paddingLeft="460" h="0">
          <Select
            variant="unstyled"
            placeholder="Datas"
            fontWeight="semibold"
            size="xs"
            w="180px"
            paddingLeft="100"
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
        </Box>
        <Box paddingLeft="550" h="0">
          <Select
            variant="unstyled"
            placeholder="Local"
            fontWeight="semibold"
            size="xs"
            w="180px"
            paddingLeft="100"
          >
            <option value="option1">1dp Goiânia</option>
            <option value="option2">2dp Goiânia</option>
          </Select>
        </Box>
        <Box paddingLeft="640" h="0">
          <Select
            variant="unstyled"
            placeholder="Status"
            fontWeight="semibold"
            size="xs"
            w="180px"
            paddingLeft="100"
          >
            <option value="option1">Novo</option>
            <option value="option2">Usado</option>
          </Select>
        </Box>
        <Box paddingLeft="820" paddingRight="180">
          <Input
            placeholder="Pesquisa"
            size="sm"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </Box>
      </Box>
      <Center>
        <Box width="68%" bg="white" paddingLeft={100} h="500px">
          <TableContainer
            borderRadius="md"
            minW="68%"
            style={{ height: '500px', overflowY: 'auto' }}
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
            <Table
              variant="striped"
              border="1px"
              borderColor="#F49320"
              colorScheme="orange"
              size="sm"
            >
              <Thead bg="#F49320" fontWeight="semibold" h="14">
                <Tr>
                  <Td color="white">Equipamento</Td>
                  <Td color="white">N Tombamento</Td>
                  <Td color="white">N Série</Td>
                  <Td color="white">Última Modificação</Td>
                </Tr>
              </Thead>
              <Tbody fontWeight="semibold">
                {equipaments.map((equipment) => (
                  <Tr onClick = {()=>{handleView(equipment.id)}} key={equipment.id}>
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
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Box
            as="button"
            borderRadius="md"
            w="100%"
            p={3}
            bg="#F49320"
            mb="86px"
            color="white"
            fontWeight="semibold"
          >
            Movimentar
          </Box>
          <Center>
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
          </Center>
        </Box>
      </Center>
      <EquipmentRegisterModal onClose={onRegisterClose} isOpen={isRegisterOpen} />
      <EquipmentViewModal onClose={onViewClose} selectedEquipmentId={selectedEquipmentId} isOpen={isViewOpen}/>
    </>
  );
}
export { EquipmentTable };
