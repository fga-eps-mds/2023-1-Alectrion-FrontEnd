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
import EditEquipmentForm from '../../components/form-fields/equipment/edit-equipment-form';
import {ConfirmEditButton} from '../../components/action-buttons/confirm-edit-button/index';

type EquipmentTitleProps = {
  id: string;
}

export function EquipmentTitle({ id }: EquipmentTitleProps) {
  return (
    <Text fontSize="48px" textColor="#212121" mb="33px">
      Equipamento {`#${id}`}
    </Text>
  );
}

export type Equipment = {
  tippingNumber: string
  id: string
  serialNumber: string
  type: string
  situacao: string
  estado: string
  model: string
  description?: string
  initialUseDate: string
  acquisitionDate: string
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

  const equip:Equipment = {
    tippingNumber: "teste123",
    id: "19b9b9dc-7e8b-49fd-b0df-b8dd05cfce40",
    serialNumber: "teste123",
    type: "Monitor",
    situacao: "teste123",
    estado: "USADO",
    model: "teste123",
    description: "teste123",
    initialUseDate: "teste123",
    acquisitionDate: "2022-02-23",
    screenSize: "teste123",
    invoiceNumber: "teste123",
    power: "teste123",
    screenType: "teste123",
    processor: "teste123",
    storageType: "SSD",
    storageAmount: "teste123",
    brand: "teste123",
    acquisition: "teste123",
    unitId: "teste123",
    ram_size: "teste123",
  }

  return (
    <Modal isOpen onClose={() => {}} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <EquipmentTitle id={equip.id}/>
        </ModalHeader>
        <ModalCloseButton as="a" href="/" />
        <ModalBody>
          <EditEquipmentForm equip={equip}/>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <BackButton />
          <ConfirmEditButton />

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
