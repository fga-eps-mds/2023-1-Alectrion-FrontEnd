import { Select, Input, Flex,Box,Text } from '@chakra-ui/react';

export function PostoDeTrabalhoDropdown() {
    return (
      <Flex
        position="absolute"
        left="50px" 
        top="143px"  
        width="170px"
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
            left: "68px",
            top: "115px",
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
        left="350px" 
        top="143px"  
        width="170px"
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
        left="650px" 
        top="143px"  
        width="170px"
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
        left="650px"
        top="260px"
        width="170px"
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

export function ResponsavelTexto() {
  return (
    <Flex
      position="absolute"
      left="50px"
      top="260px" 
      width="170px"
      height="55px"
      borderRadius="10px"
      backgroundColor="#FFFFFF"
      boxShadow="lg"
      flexDirection="column"
    >
      <span style={{ fontSize: "16px", color: "#212121" }}>Responsável</span>
      <Box
        mt="5px"
        width="580px"
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