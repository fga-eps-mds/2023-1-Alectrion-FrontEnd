import {
  Flex,
  TableContainer,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
} from '@chakra-ui/react';

import EquipmentViewForm from '../equipment-view-form';
import { Modal } from '../modal';

type EquipmentViewModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedEquipmentId: string | null;
};

export type Equipment = {
  id: string;
  serialNumber: string;
  type: string;
  situacao: string;
  estado: string;
  model: string;
  brand: {
    id: string;
    name: string;
  };
  acquisitionName: string;
  acquisition: {
    id: string;
    name: string;
  };
  description?: string;
  initialUseDate: string;
  acquisitionDate: string;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  ram_size?: string;
  tippingNumber: string;
};

export function EquipmentViewModal({
  isOpen,
  onClose,
  selectedEquipmentId,
}: EquipmentViewModalProps) {
  return (
    <Modal
      title={`Equipamento #${selectedEquipmentId}`}
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
        <EquipmentViewForm
          equipmentId={selectedEquipmentId}
          onClose={onClose}
        />
      </Flex>
    </Modal>
  );
}
