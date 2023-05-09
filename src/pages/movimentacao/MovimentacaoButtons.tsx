
import { Button, Flex } from '@chakra-ui/react';
  
export  function MovimentacaoCancelButton() {
  return (
    <Flex gap="60px" mt="64px" alignSelf="center">
      <Button background="#212121" borderRadius="50px">
        Cancelar
      </Button>
      <Button borderRadius="50px">REGISTRAR</Button>
    </Flex>
  );
}

export  function MovimentacaoConfirmButton() {
  return (
    <Flex gap="60px" mt="64px" alignSelf="center">
      <Button background="#F49320" borderRadius="50px">
        Confirmar
      </Button>
      <Button borderRadius="50px">REGISTRAR</Button>
    </Flex>
  );
}