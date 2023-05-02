
import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  TableContainer,
} from "@chakra-ui/react";

interface Equipment {
  id: number;
  name: string;
  stock: number;
}

const initialEquipments: Equipment[] = [
  { id: 1, name: "Roda", stock: 10 },
  { id: 2, name: "Pneu", stock: 15 },
  { id: 3, name: "Chave", stock: 20 },
];

const App = () => {
  const [equipments, setEquipments] = useState<Equipment[]>(initialEquipments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFilter(event.target.value);
  };

  const filteredEquipments = equipments.filter((equipment) => {
    if (filter === "all") {
      return true;
    }
    return equipment.stock > 0;
  });

  const searchedEquipments = filteredEquipments.filter((equipment) =>
    equipment.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer>
      <Table variant='striped' 
      colorScheme="orange"
      size= 'md'>
        <Thead>
          <Tr>
            <Th>Equipamento</Th>
            <Th>N Tombamento</Th>
            <Th>N Serie</Th>
            <Th>Última Modificação</Th>
          </Tr>
          <Tr>
            <Td></Td>
            <Td>
              <Input
                placeholder="Pesquisar"
                value={search}
                onChange={handleSearchChange}
              />
            </Td>
            <Td>
              <Select value={filter} onChange={handleFilterChange}>
                <option value="all">Todos</option>
                <option value="available">Disponíveis</option>
              </Select>
            </Td>
          </Tr>
        </Thead>
        <Tbody>
          {searchedEquipments.map((equipment) => (
            <Tr key={equipment.id}>
              <Td>{equipment.id}</Td>
              <Td>{equipment.name}</Td>
              <Td>{equipment.stock}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    );
  };

export default App;