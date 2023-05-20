import {
  Flex,
  TableContainer,
  Text,
  Table,
  Tbody,
  Thead,
  Tr,
  Td,
} from '@chakra-ui/react';

import EquipmentViewForm from '../equipment-view-form';
import { Modal } from '../modal';
import { EquipmentData } from '../../pages/equipments/EquipamentsControl';

type EquipmentViewModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedEquipment: EquipmentData | null;
};

function transformFields(data: any) {
  if (!data) return;
  const transformedData = { ...data };

  transformedData.type = {
    label: transformedData.type,
    value: transformedData.type,
  };

  transformedData.estado = {
    label: transformedData.estado,
    value: transformedData.estado,
  };

  transformedData.storageType = {
    label: transformedData.storageType,
    value: transformedData.storageType,
  };

  transformedData.screenType = {
    label: transformedData.screenType,
    value: transformedData.screenType,
  };

  transformedData.initialUseDate = {
    label: transformedData.initialUseDate.split('-')[0],
    value: transformedData.initialUseDate.split('-')[0],
  };

  transformedData.acquisitionDate = new Date(transformedData.acquisitionDate);

  return transformedData;
}

export function EquipmentViewModal({
  isOpen,
  onClose,
  selectedEquipment,
}: EquipmentViewModalProps) {
  return (
    <Modal
      title={`Equipamento #${selectedEquipment?.type}`}
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <EquipmentViewForm
          equipment={transformFields(selectedEquipment)}
          onClose={onClose}
        />
      </Flex>
    </Modal>
  );
}
