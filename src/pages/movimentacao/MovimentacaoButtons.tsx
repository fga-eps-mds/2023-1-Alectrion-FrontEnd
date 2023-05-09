import { Button, Flex } from '@chakra-ui/react';
  
export function MovimentacaoCancelButton() {
  return (
    <Flex gap="60px" mt="600px" alignSelf="flex-start" marginLeft="200px">
      <Button background="#212121" borderRadius="50px">
        Cancelar
      </Button>
      <Button borderRadius="50px">Confirmar</Button>
    </Flex>
  );
}

