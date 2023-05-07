import { useState } from "react";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay,DrawerContent, 
  DrawerCloseButton,HStack, Text, Table, Thead, Tbody, Tr, Th, Td, Input, Button, TableContainer, 
  Center, Heading, SimpleGrid, Divider, Box, Tfoot, Stack } from "@chakra-ui/react";

//Declaracao lista de equipamentos e equipamentos exemplo
type Equipment = {
  id: number;
  type: string;
  NumSerie: string;
  NumTombamento: string;
  DataMovimento: Date;
};
//pré-set dos equipamentos
const equipmentList: Equipment[] = [
  {
    id: 1,
    type: "Monitor LG 22MK400H",
    NumSerie: "123456789",
    NumTombamento: "ABC123456",
    DataMovimento: new Date("2022-01-10"),
  },
  {
    id: 2,
    type: "Estabilizador 16520",
    NumSerie: "987654321",
    NumTombamento: "DEF654321",
    DataMovimento: new Date("2022-01-15"),
  },
  {
    id: 3,
    type: "Monitor Dell 1080p24",
    NumSerie: "246810121",
    NumTombamento: "GHI789456",
    DataMovimento: new Date("2022-01-20"),
  },
  {
    id: 4,
    type: "Notebook Galaxy Book2",
    NumSerie: "135792468",
    NumTombamento: "JKL123789",
    DataMovimento: new Date("2022-01-25"),
  },
  {
    id: 5,
    type: "Impressora Hp Ink 416",
    NumSerie: "369121518",
    NumTombamento: "MNO456123",
    DataMovimento: new Date("2022-01-30"),
  },
  {
    id: 5,
    type: "Monitor Dell 1080p24",
    NumSerie: "012345678",
    NumTombamento: "R42KXD546",
    DataMovimento: new Date("2022-01-30"),
  },
  {
    id: 6,
    type: "Teclado Sem Fio Logitech",
    NumSerie: "124680246",
    NumTombamento: "R42KXD546",
    DataMovimento: new Date("2022-02-05"),
  },
  {
    id: 7,
    type: "Teclado Sem Fio Logitech",
    NumSerie: "1246802468",
    NumTombamento: "VZX231SD6",
    DataMovimento: new Date("2022-02-05"),
  },
  {
    id: 8,
    type: "Mouse Óptico HP",
    NumSerie: "999999999",
    NumTombamento: "ABC098765",
    DataMovimento: new Date("2022-02-10"),
  },
  {
    id: 9,
    type: "Notebook Lenovo Thinkpad",
    NumSerie: "147258369",
    NumTombamento: "YUT321XYZ",
    DataMovimento: new Date("2022-02-15"),
  },
  {
    id: 10,
    type: "Monitor LG 4K UHD",
    NumSerie: "222222222",
    NumTombamento: "FDS789REW",
    DataMovimento: new Date("2022-02-20"),
  },
  {
    id: 11,
    type: "Impressora Epson EcoTank",
    NumSerie: "777777777",
    NumTombamento: "IOP456QWE",
    DataMovimento: new Date("2022-02-25"),
  },
];
//função que define os eestados searchTerm e searchType com o useState, searchTerm é o termo de pesquisa que o usuário insere na caixa de entrada, enquanto searchType é o tipo de equipamento que o usuário seleciona no menu suspenso.//
const EquipmentTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("");
//handleSearchTermChange atualiza o estado searchTerm com o valor inserido na caixa de entrada pelo usuário
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
//handleSearchTypeChange atualiza o estado searchType com o valor selecionado no menu suspenso pelo usuário.
  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value);
  };
// verificar se o número de série do equipamento inclui o termo de pesquisa inserido pelo usuário e se o tipo de equipamento corresponde ao tipo selecionado pelo usuário no menu suspenso
  const filteredEquipment = equipmentList.filter((equipment) =>
    equipment.NumSerie.includes(searchTerm) &&
    (searchType === "" || equipment.type === searchType)
  );

  return (
    <>
    <Box
      paddingY="10"
      paddingX="20"
    >
      <Text mb="10px" color="#000000" fontWeight="semibold" fontSize="4xl">
      Controle de Equipamento
      </Text>
      <Text color="#00000" fontWeight="medium" fontSize = "2xl">
        Últimos Equipamentos Modificados
      </Text>
      <Box paddingX="720" mb="-5">
        <Button colorScheme="#F49320">Cadastrar Equipamento</Button>
      </Box>
    </Box>
    <Box
    paddingX="20">
      <Divider borderColor="#00000"/>
    </Box>
    <Box p={4} paddingLeft= "800" paddingRight="200">
      <Input placeholder="Pesquisa" value={searchTerm} onChange={handleSearchTermChange} />
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="">Todos</option>
        <option value="Monitor">Monitor</option>
        <option value="Teclado">Teclado</option>
        <option value="Mouse">Mouse</option>
        <option value="Notebook">Notebook</option>
        <option value="Impressora">Impressora</option>
      </select>
    </Box>
    <Center>
      <Box width="100%" bg='white' h= '716x' w='1100x'>
      <TableContainer borderRadius='md' style={{height:'500px', overflowY:'auto'}}>
      <Table variant = 'striped' border="1px" borderColor="#F49320"
      colorScheme="orange" >
        <Thead bg="#F49320">
          <Tr>
            <Th color="white">Equipamentos</Th>
            <Th color="white">N Tombamento</Th>
            <Th color="white">N Série</Th>
            <Th color="white">Última Modificação</Th>
          </Tr>
        </Thead>
        <Tbody >
          {filteredEquipment.map((equipment) => (
            <Tr key={equipment.id}>
              <Td>{equipment.type}</Td>
              <Td>{equipment.NumTombamento}</Td>
              <Td>{equipment.NumSerie}</Td>
              <Td>{equipment.DataMovimento.toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
      <Box as='button' borderRadius='md' w="100%" p={3} 
      bg="#F49320" mb='86px' color="white" fontWeight="semibold">
        Movimentar
      </Box>
    </Box>
    </Center>
    </>
    
  );
};

export default EquipmentTable;