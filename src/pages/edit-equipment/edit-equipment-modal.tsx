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
  id: string
  serialNumber: string
  type: string
  situacao: string
  estado: string
  model: string
  brandName: string
  acquisitionName: string
  description?: string
  acquisitionDate: string
  screenSize?: string
  power?: string
  screenType?: string
  processor?: string
  storageType?: string
  storageAmount?: string
  ram_size?: string
  tippingNumber: string
}

export default function EditEquipmentModal() {

  const equip: Equipment = {
    tippingNumber: "teste123",
    id: "b4809047-638e-4001-830d-b538ea1f01a4",
    serialNumber: "teste123",
    type: "Monitor",
    situacao: "Ativo",
    estado: "Novo",
    model: "teste123",
    description: "teste123",
    acquisitionDate: "2022-02-23",
    screenSize: "teste123",
    power: "teste123",
    screenType: "LED",
    processor: "teste123",
    storageType: "SSD",
    storageAmount: "teste123",
    brandName: "teste123",
    acquisitionName: "teste123",
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

      </ModalContent>
    </Modal>
  );
}
