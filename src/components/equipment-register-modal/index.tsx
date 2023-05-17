import { Flex } from '@chakra-ui/react';
import EquipmentForm from '../equipment-form';
import { Modal } from '../modal';

type EquipmentRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EquipmentRegisterModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
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
        <EquipmentForm
          onClose={onClose}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </Flex>
    </Modal>
  );
}
