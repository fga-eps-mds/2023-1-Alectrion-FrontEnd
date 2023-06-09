import { Flex } from '@chakra-ui/react';
import EquipmentEditForm from '../equipment-edit-form';
import { Modal } from '../modal';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';

type EquipmentEditModalProps = {
  isOpen: boolean;
  onClose(): void;
  equip: EquipmentData | undefined;
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

export function EquipmentEditModal({
  isOpen,
  onClose,
  equip,
  refreshRequest,
  setRefreshRequest,
}: EquipmentEditModalProps) {
  return (
    <Modal
      title="Edição de Equipamentos"
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
        <EquipmentEditForm
          onClose={onClose}
          equip={transformFields(equip)}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </Flex>
    </Modal>
  );
}
