import MovementForm from '@/components/movement-form';
import { Modal } from '../modal';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { movement } from '@/pages/movements/MovementControl';

type MovementRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  lenghtMovements?: number;
  refreshRequest: boolean;
  selectedEquipmentToMovement?: EquipmentData[];
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMovement: React.Dispatch<
    React.SetStateAction<movement | undefined>
  >;
  onOpenTerm: () => void;
};

export function MovementRegisterModal({
  isOpen,
  onClose,
  lenghtMovements,
  refreshRequest,
  setRefreshRequest,
  selectedEquipmentToMovement,
  setSelectedMovement,
  onOpenTerm,
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
        setSelectedMovement={setSelectedMovement}
        onOpenTerm={onOpenTerm}
      />
    </Modal>
  );
}
