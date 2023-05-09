import { Select, Input, Flex,Box,Text } from '@chakra-ui/react';

export function AtribuicaoDropdown() {
  return (
    <Flex
      position="absolute"
      left="530px"
      top="600px"
      width="269px"
      height="55px"
      flexDirection="column"
    >
      <span style={{ fontSize: "16px", color: "#212121" }}>Atribuição</span>
      <Select
        mt="5px"
        placeholder="Selecione uma opção"
        borderRadius="10px"
        bg="#FFFFFF"
        color="#212121"
        width="269px"
        height="35px"
        _hover={{ borderColor: "#F49320" }}
        _focus={{ borderColor: "#F49320" }}
      >
        <option value="delegado de polícia">Delegado de Polícia</option>
        <option value="policial civil">Policial Civil</option>
        <option value="investigador">Investigador</option>
      </Select>
      <Flex
        mt="5px"
        width="269px"
        height="35px"
        bg="#FFFFFF"
        borderRadius="10px"
        alignItems="center"
        paddingLeft="5px"
        color="#212121"
      >
        <Input
          border="none"
          bg="#FFFFFF"
          color="#C6C6C6"
          placeholder="Delegado de Polícia"
          _focus={{ outline: "none" }}
        />
      </Flex>
      <div
        style={{
          position: "absolute",
          left: "915.93px",
          top: "766px",
          width: "15px",
          height: "10px",
        }}
      >
      </div>
    </Flex>
  );
}

export function ResponsavelTermo() {
  return (
    <Flex
      position="absolute"
      left="50px"
      top="600px"
      width="150px"
      height="55px"
      borderRadius="10px"
      backgroundColor="#FFFFFF"
      boxShadow="lg"
      flexDirection="column"
    >
      <span style={{ fontSize: "16px", color: "#212121", whiteSpace: "nowrap" }}>
        Responsável pelo Termo de Responsabilidade
      </span>
      <Box
        mt="5px"
        width="450px"
        height="100px"
        borderRadius="10px"
        backgroundColor="#FFFFFF"
        boxShadow="lg"
      >
        <Input
          border="none"
          bg="#FFFFFF"
          color="#C6C6C6"
          placeholder="Nome da pessoa responsável"
          _focus={{ outline: "none" }}
        />
      </Box>
    </Flex>
  );
}