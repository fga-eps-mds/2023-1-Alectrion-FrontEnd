import { Text, Flex } from '@chakra-ui/react';
import EquipmentRegisterModal from './EquipmentRegisterModal.tsx';

export function EquipRegister() {
  return (
    <Flex
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap="64px"
      pt="32px"
    >
      <Text variant="h4" fontWeight="bold">
        Cadastro de Equipamentos
      </Text>

      <EquipmentRegisterModal />
    </Flex>
  );
}
