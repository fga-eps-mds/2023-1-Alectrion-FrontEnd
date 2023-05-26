import MovementForm from '@/components/movement-form';
import { Modal } from '../modal';

type MovementRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  lenghtMovements: number;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function MovementRegisterModal({
  isOpen,
  onClose,
  lenghtMovements,
  refreshRequest,
  setRefreshRequest,
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
      />
    </Modal>
  );
}
