import MovementForm from '@/components/movement-form';
import { Modal } from '../modal';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';

type MovementRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  lenghtMovements?: number;
  refreshRequest: boolean;
  selectedEquipmentToMovement?: EquipmentData[];
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MovementRegisterModal({
  isOpen,
  onClose,
  lenghtMovements,
  refreshRequest,
  setRefreshRequest,
  selectedEquipmentToMovement,
}: MovementRegisterModalProps) {
  return (
    <Modal
      title="Cadastro de Movimentação"
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <MovementForm
        onClose={onClose}
        lenghtMovements={lenghtMovements}
        refreshRequest={refreshRequest}
        setRefreshRequest={setRefreshRequest}
        selectedEquipmentToMovement={selectedEquipmentToMovement}
      />
    </Modal>
  );
}
