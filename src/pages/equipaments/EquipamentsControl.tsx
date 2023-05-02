import { useState } from "react";
import { Text, Table, Thead, Tbody, Tr, Th, Td, Input, Button, TableContainer, Center, Heading, SimpleGrid, Divider, Box } from "@chakra-ui/react";

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
  }
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
      <Text mb="39px" color="#605555" fontWeight="semibold" fontSize="4xl">
      Controle de Equipamento
      </Text>
      <Text mb="39px" color="#605555" fontWeight="medium" fontSize = "2xl">
        Últimos Equipamentos Modificados
      </Text>
    </Box>
    <Divider/>
      <Input placeholder="Pesquisa" value={searchTerm} onChange={handleSearchTermChange} />
      <select value={searchType} onChange={handleSearchTypeChange}>
        <option value="">Todos</option>
        <option value="Monitor">Monitor</option>
        <option value="Teclado">Teclado</option>
        <option value="Mouse">Mouse</option>
        <option value="Notebook">Notebook</option>
        <option value="Impressora">Impressora</option>
      </select>
      <Center bg='white' h= '716x'>
      <TableContainer>
      <Table variant = 'striped'
      colorScheme="orange">
        <Thead>
          <Tr>
            <Th>Equipamentos</Th>
            <Th>N Tombamento</Th>
            <Th>N Série</Th>
            <Th>Última Modificação</Th>
          </Tr>
        </Thead>
        <Tbody>
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
      </Center>

    </>
  );
};

export default EquipmentTable;