import MovementForm from '@/components/movement-form';
import { Modal } from '../modal';

type MovementRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  lenghtMovements: number;
};

export function MovementRegisterModal({
  isOpen,
  onClose,
  lenghtMovements,
}: MovementRegisterModalProps) {
  return (
    <Modal
      title="Cadastro de Movimentação"
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <MovementForm onClose={onClose} lenghtMovements={lenghtMovements} />
    </Modal>
  );
}
