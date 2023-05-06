/* eslint-disable prettier/prettier */
import { Text, Flex } from '@chakra-ui/react';
import EditEquipmentModal from './edit-equipment-modal';

export default function Equip() {
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
        Equipamento #2131213131
      </Text>

      <EditEquipmentModal />
    </Flex>
  );
}