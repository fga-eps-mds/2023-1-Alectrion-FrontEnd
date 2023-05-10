import { Box, Flex, Text, Checkbox, Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";

export function MovimentacaoTable() {
  return (
    <Box className="material-specs-container" position="relative">
   <Text
   fontSize="20px"
   color="#000000"
   w="277.33px"
   h="24px"
   position="absolute"
   top="-550px"
   left="10px"
   textTransform="uppercase"
  >
  Especificação do Material
  </Text>
      <Box
        w="895px"
        h="342px"
        backgroundColor="#ffffff"
        border="1px solid #f49320"
        borderRadius="10px"
        mt="-515px"
        overflow="auto"
        maxH="300px"
      >
        <Table w="936.91px">
          <Thead>
            <Tr>
              <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320">
                Equipamento
              </Th>
              <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320">
                Tombamento
              </Th>
              <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320">
                N° de Serie
              </Th>
              <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320"></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Equipamento 1</Td>
              <Td>Tombamento 1</Td>
              <Td>{'000001'.padStart(6, '0')}</Td>
              <Td>
                <Checkbox size="lg" colorScheme="orange" />
              </Td>
            </Tr>
            <Tr>
              <Td>Equipamento 2</Td>
              <Td>Tombamento 2</Td>
              <Td>{'000002'.padStart(6, '0')}</Td>
              <Td>
                <Checkbox size="lg" colorScheme="orange" />
              </Td>
            </Tr>
            {/* Adicione mais linhas aqui */}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default MovimentacaoTable;