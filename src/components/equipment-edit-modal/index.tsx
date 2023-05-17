import { Flex } from '@chakra-ui/react';
import EquipmentEditForm from '../equipment-edit-form';
import { Modal } from '../modal';
import { EquipamentData } from '@/pages/equipaments/EquipamentsControl';

export type EditEquipFormValues = {
  tippingNumber: string;
  serialNumber: string;
  type: { value: string; label: string };
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: { value: number; label: string };
  acquisitionDate: Date;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: { value: string; label: string };
  processor?: string;
  storageType?: { value: string; label: string };
  storageAmount?: string;
  brand: { name: string };
  acquisition: { name: string };
  unitId?: string;
  ram_size?: string;
  estado: { value: string; label: string };

};

type EquipmentEditModalProps = {
  isOpen: boolean;
  onClose(): void;
  equip: EquipamentData | undefined;
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
    label: transformedData.initialUseDate.split("-")[0],
    value: transformedData.initialUseDate.split("-")[0],
  };

  return transformedData;
}

export function EquipmentEditModal({
  isOpen,
  onClose,
  equip,
}: EquipmentEditModalProps) {
  console.log(equip)
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
        <EquipmentEditForm onClose={onClose} equip={transformFields(equip)}/>
      </Flex>
    </Modal>
  );
}
