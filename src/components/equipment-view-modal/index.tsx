import { Flex } from '@chakra-ui/react';

import EquipmentViewForm from '../equipment-view-form';
import { Modal } from '../modal';
import { EquipmentData } from '../../pages/equipments/EquipmentsControl';

type EquipmentViewModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedEquipment: EquipmentData | undefined;
  handleEdit(equipment: EquipmentData | undefined): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

function transformFields(data: any) {
  if (!data) return;
  const transformedData = { ...data };

  transformedData.brandName = transformedData.brand.name;

  transformedData.acquisitionDate = new Date(transformedData.acquisitionDate);

  return transformedData;
}

export function EquipmentViewModal({
  isOpen,
  onClose,
  selectedEquipment,
  handleEdit,
  refreshRequest,
  setRefreshRequest,
}: EquipmentViewModalProps) {
  return (
    <Modal
      title={`Equipamento: ${selectedEquipment?.type.name} ${selectedEquipment?.brand.name} `}
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
          equipmentEdit={selectedEquipment as EquipmentData}
          equipment={transformFields(selectedEquipment)}
          onClose={onClose}
          handleEdit={handleEdit}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </Flex>
    </Modal>
  );
}
