import { Flex } from '@chakra-ui/react';
import EquipmentRegisterButtons from './EquipmentRegisterButtons';
import EquipmentRegisterForm from './EquipmentRegisterForm';
import EquipmentRegisterTitle from './EquipmentRegisterTitle';

export default function EquipmentRegisterModal() {
  return (
    <Flex flexDirection="column" boxShadow="lg" px="44px" pt="24px" pb="64px">
      <EquipmentRegisterTitle />
      <EquipmentRegisterForm />
      <EquipmentRegisterButtons />
    </Flex>
  );
}
