import { Flex } from '@chakra-ui/react';
import EquipmentForm from '../equipment-form';
import { Modal } from '../modal';

type EquipmentViewModalProps = {
  isOpen: boolean;
  onClose(): void;
};

export function EquipmentViewModal({
  isOpen,
  onClose,
}: EquipmentViewModalProps) {
  return (
    <Modal
      title="Detalhes do Equipamento"
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
