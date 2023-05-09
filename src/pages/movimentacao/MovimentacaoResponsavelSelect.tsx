import { Select, Input, Flex,Box,Text } from '@chakra-ui/react';

export function AtribuicaoDropdown() {
  return (
    <Flex
      position="absolute"
      left="666px"
      top="726px"
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
        <svg viewBox="0 0 10 10">
          <polygon points="0,0 10,0 5,10" fill="#212121" />
        </svg>
      </div>
    </Flex>
  );
}

export  function ResponsavelTermo() {
    return (
      <Box
        position="absolute"
        left="68px"
        top="752px"
        width="568px"
        height="35px"
        borderRadius="10px"
        backgroundColor="#FFFFFF"
        boxShadow="lg"
      >
        <Text
          position="absolute"
          left="68px"
          top="726px"
          width="357px"
          height="20px"
          fontSize="16px"
          color="#212121"
        >
          Responsável pelo Termo de Responsabilidade
        </Text>
        <Input
          position="absolute"
          left="91px"
          top="8px"
          width="468px"
          height="20px"
          borderRadius="10px"
          border="none"
          backgroundColor="#FFFFFF"
          color="#C6C6C6"
          placeholder="Nome da pessoa responsável"
        />
      </Box>
    );
  }