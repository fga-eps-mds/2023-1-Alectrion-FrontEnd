import { MdUpload } from 'react-icons/md';
import { Button, Flex } from '@chakra-ui/react';
import EquipmentForm from '../equipment-form';
import { Modal } from '../modal';

type EquipmentRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  onUploadOpen(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EquipmentRegisterModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
  onUploadOpen,
}: EquipmentRegisterModalProps) {
  const onClickUploadXLS = () => {
    onClose();
    onUploadOpen();
  };
  return (
    <Modal
      title="Cadastro de Equipamentos"
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      headerButton={
        <Button
          leftIcon={<MdUpload size={20} />}
          variant="outline"
          borderColor="orange"
          color="orange"
          onClick={onClickUploadXLS}
        >
          Adicionar Arquivo XLS
        </Button>
      }
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
