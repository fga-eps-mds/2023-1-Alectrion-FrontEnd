/* eslint-disable prettier/prettier */

/* eslint-disable import/no-duplicates */
/* eslint-disable import/export */

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';
import { Text } from '@chakra-ui/react';
import {BackButton} from '../../components/action-buttons/back-button/index';
import EquipmentForm from '../../components/form-fields/equipment/equipment-form';
import {ConfirmEditButton} from '../../components/action-buttons/confirm-edit-button/index';

export function EquipmentTitle() {
  return (
    <Text fontSize="48px" textColor="#212121" mb="33px">
      Equipamento #2131213131
    </Text>
  );
}

type Equipment={
  tippingNumber: string
  id: string
  serialNumber: string
  type: string
  situacao: string
  estado: string
  model: string
  description?: string
  initialUseDate: string
  acquisitionDate: Date
  screenSize?: string
  invoiceNumber: string
  power?: string
  screenType?: string
  processor?: string
  storageType?: string
  storageAmount?: string
  brand: string
  acquisition: string
  unitId: string
  ram_size?: string
}

export default function EditEquipmentModal() {
  return (
    <Modal isOpen onClose={() => {}} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <EquipmentTitle />
        </ModalHeader>
        <ModalCloseButton as="a" href="/" />
        <ModalBody>
          <EquipmentForm />
        </ModalBody>

        <ModalFooter justifyContent="center">
          <BackButton />
          <ConfirmEditButton />

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
