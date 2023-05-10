import { Flex } from '@chakra-ui/react';
import EquipmentForm from '../equipment-form';
import { Modal } from '../modal';

type EquipmentRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
};

export function EquipmentRegisterModal({
  isOpen,
  onClose,
}: EquipmentRegisterModalProps) {
  return (
    <Modal
      title="Cadastro de Equipamentos"
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <EquipmentForm onClose={onClose} />
      </Flex>
    </Modal>
  );
}
