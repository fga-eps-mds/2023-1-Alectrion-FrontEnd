import { Button, useDisclosure } from '@chakra-ui/react';
import { EquipmentRegisterModal } from '@/components/equipment-register-modal';

export function EquipRegister() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Abrir modal temporário</Button>
      <EquipmentRegisterModal onClose={onClose} isOpen={isOpen} />
    </>
  );
}
