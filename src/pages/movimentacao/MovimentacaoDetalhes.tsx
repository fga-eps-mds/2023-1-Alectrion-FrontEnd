import { Select, Input, Flex,Box,Text } from '@chakra-ui/react';

export function PostoDeTrabalhoDropdown() {
    return (
      <Flex
        position="absolute"
        left="913px" 
        top="3300px"  
        width="269px"
        height="35px"
        flexDirection="column"
      >
        <span style={{ fontSize: "16px", color: "#212121" }}>Posto de Trabalho</span>
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
          <option value="01° Delegacia de policia">01° Delegacia de policia</option>
          <option value="02° Delegacia de policia">02° Delegacia de policia</option>
          <option value="03° Delegacia de policia">03° Delegacia de policia</option>
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
            placeholder="01° Delegacia de Policia"
            _focus={{ outline: "none" }}
          />
        </Flex>
        <div
          style={{
            position: "absolute",
            left: "1162.93px",
            top: "3340px",
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

export function CidadeDropdown() {
    return (
        <Flex
        position="absolute"
        left="1212px" 
        top="1212px"  
        width="269px"
        height="35px"
        flexDirection="column"
      >
        <span style={{ fontSize: "16px", color: "#212121" }}>Cidade</span>
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
          <option value="Águas Lindas">Águas Lindas</option>
          <option value="Goiania">Goiania</option>
          
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
            placeholder="Cidade"
            _focus={{ outline: "none" }}
          />
        </Flex>
        <div
          style={{
            position: "absolute",
            left: "1461.93px",
            top: "3340px",
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

export function TipoDeLotaçãoDropdown() {
    return (
      <Flex
        position="absolute"
        left="913px" 
        top="3326px"  
        width="269px"
        height="35px"
        flexDirection="column"
      >
        <span style={{ fontSize: "16px", color: "#212121" }}>Tipo de Lotação</span>
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
          <option value="Empréstimo">Empréstimo</option> 
          <option value="Doação">Doação</option>
          
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
            placeholder="Tipo de Lotação"
            _focus={{ outline: "none" }}
          />
        </Flex>
        <div
          style={{
            position: "absolute",
            left: "1760.93px",
            top: "3340px",
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

export function AtribuicaoDropdown2() {
    return (
      <Flex
        position="absolute"
        left="1511px"
        top="3399px"
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
            left: "1760.93px",
            top: "3413px",
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

export  function ResponsavelTexto() {
    return (
      <Box
        position="absolute"
        left="913x"
        top="3373px"
        width="568px"
        height="61px"
        borderRadius="10px"
        backgroundColor="#FFFFFF"
        boxShadow="lg"
      >
        <Text
          position="absolute"
          left="913x"
          top="3373px"
          width="568px"
          height="61px"
          fontSize="16px"
          color="#212121"
        >
          Responsável
        </Text>
        <Input
          position="absolute"
          left="913x"
          top="3373px"
          width="568px"
          height="61px"
          borderRadius="10px"
          border="none"
          backgroundColor="#FFFFFF"
          color="#C6C6C6"
          placeholder="Nome da pessoa responsável"
        />
      </Box>
    );
  }