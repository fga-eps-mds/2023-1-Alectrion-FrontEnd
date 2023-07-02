import { Button, Flex, Text } from '@chakra-ui/react';
import EquipmentForm from '../equipment-form';
import { Modal } from '../modal';

type EquipmentsUploadModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EquipmentsUploadModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
}: EquipmentsUploadModalProps) {
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
        <Text fontWeight="bold" alignSelf="self-start">
          Upload XLS
        </Text>
        <Flex
          width="100%"
          height={374}
          borderStyle="dashed"
          borderWidth={2}
          borderColor="black"
        />
        <Flex gap="60px" paddingY="64px">
          <Button variant="secondary">Cancelar</Button>
          <Button>Registrar</Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
