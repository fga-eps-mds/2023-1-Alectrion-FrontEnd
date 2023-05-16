import { Flex } from '@chakra-ui/react';
import EquipmentEditForm from '../equipment-edit-form';
import { Modal } from '../modal';

export type FormValues = {
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
  brandName: string;
  acquisitionName: string;
  unitId?: string;
  ram_size?: string;
  estado: { value: string; label: string };
};

type EquipmentEditModalProps = {
  isOpen: boolean;
  onClose(): void;
  equip: FormValues;
};

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
        <EquipmentEditForm onClose={onClose} equip={equip}/>
      </Flex>
    </Modal>
  );
}
