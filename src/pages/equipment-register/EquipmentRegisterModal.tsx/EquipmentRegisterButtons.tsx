import { Button, Flex } from '@chakra-ui/react';

export default function EquipmentRegisterButtons() {
  return (
    <Flex gap="60px" mt="64px" alignSelf="center">
      <Button background="#212121" borderRadius="50px">
        Cancelar
      </Button>
      <Button borderRadius="50px">REGISTRAR</Button>
    </Flex>
  );
}
