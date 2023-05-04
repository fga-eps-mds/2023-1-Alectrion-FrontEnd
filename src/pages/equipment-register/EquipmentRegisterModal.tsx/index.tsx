import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import EquipmentRegisterButtons from './EquipmentRegisterButtons';
import EquipmentRegisterForm from './EquipmentRegisterForm';
import EquipmentRegisterTitle from './EquipmentRegisterTitle';

export default function EquipmentRegisterModal() {
  return (
    <Modal isOpen onClose={() => {}} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <EquipmentRegisterTitle />
        </ModalHeader>
        <ModalCloseButton as="a" href="/" />
        <ModalBody>
          <EquipmentRegisterForm />
        </ModalBody>

        <ModalFooter justifyContent="center">
          <EquipmentRegisterButtons />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
