/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-redeclare */
/* eslint-disable import/export */
import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import { SideBar } from '@/components/side-bar';
import { api } from '../../config/lib/axios';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify'
import { config } from '../../config/env';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('');
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

  const getEquipaments = async () => {
    try {
      console.log("fazer requisição para:", config.url)
      console.log("fazer requisição para: ", api.toString)
      const queryParams = new URLSearchParams('')
      // if (query) {
        //   Object.entries(query).forEach((value) =>
        //     queryParams.append(value[0], value[1])
        //   )
        // }
      
        const { data }: AxiosResponse<equipament[]> = await api.get(
          'equipment/find',
          {
            params: queryParams
          }
          );
          setEquipaments(data);
         console.log("DADOS equipamentossssss", data)

        } catch (error) {
          setEquipaments([]);
          toast.error('Nenhum Equipamento encontrado');
    }
  };
  
  useEffect(() => {
    getEquipaments()
  }, [])
  



  return (
    <>
      <SideBar />
      <Box paddingY="10" paddingX="20">
        <Text mb="10px" color="#000000" fontWeight="semibold" fontSize="4xl">
          Controle de Equipamento
        </Text>
        <Text color="#00000" fontWeight="medium" fontSize="2xl">
          Últimos Equipamentos Modificados
        </Text>
        <Box paddingX="720" mb="-5">
          <Button colorScheme="#F49320">Cadastrar Equipamento</Button>
        </Box>
      </Box>
      <Box paddingX="20">
        <Divider borderColor="#00000" />
      </Box>
      <Box p={4}>
        <Box paddingLeft="165" h="0">
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
        <Box paddingLeft="250" h="0">
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
        <Box paddingLeft="345" h="0">
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
        <Box paddingLeft="440" h="0">
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
        <Box paddingLeft="535" h="0">
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
        <Box paddingLeft="630" h="0">
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
        <Box paddingLeft="820" paddingRight="270">
          <Input
            placeholder="Pesquisa"
            size="sm"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <select value={searchType} onChange={handleSearchTypeChange}>
            <option value="">Todos</option>
            <option value="Monitor">Monitor</option>
            <option value="Teclado">Teclado</option>
            <option value="Mouse">Mouse</option>
            <option value="Notebook">Notebook</option>
            <option value="Impressora">Impressora</option>
          </select>
        </Box>
      </Box>
      <Center>
        <Box width="100%" bg="white" h="716x" w="1100x">
          <TableContainer
            borderRadius="md"
            style={{ height: '500px', overflowY: 'auto' }}
          >
            <Table
              variant="striped"
              border="1px"
              borderColor="#F49320"
              colorScheme="orange"
            >
              <Thead bg="#F49320">
                <Tr>
                  <Th color="white">Equipamentos</Th>
                  <Th color="white">N Tombamento</Th>
                  <Th color="white">N Série</Th>
                  <Th color="white">Última Modificação</Th>
                </Tr>
              </Thead>
              <Tbody>
              {equipaments.map((equipment) => (
                  <Tr key={equipment.id}>
                    <Td>{equipment.type}</Td>
                    <Td>{equipment.tippingNumber}</Td>
                    <Td>{equipment.serialNumber}</Td>
                    <Td>{equipment.updatedAt}</Td>
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
        </Box>
      </Center>
    </>
  );
}
export { EquipmentTable };
