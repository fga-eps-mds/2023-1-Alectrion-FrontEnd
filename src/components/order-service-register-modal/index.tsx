import { Flex } from '@chakra-ui/react';
import OrderServiceRegisterForm from '../order-service-register-form';
import { Modal } from '../modal';

type OrderServiceRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function OrderServiceRegisterModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
}: OrderServiceRegisterModalProps) {
  return (
    <Modal
      title="Cadastro de Ordem Servico"
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
        <OrderServiceRegisterForm
          onClose={onClose}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </Flex>
    </Modal>
  );
}
