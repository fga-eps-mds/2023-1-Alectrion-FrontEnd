import { Flex } from '@chakra-ui/react';
import UserRegisterForm from '../user-register-form';
import { Modal } from '../modal';

type UserRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UserRegisterModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
}: UserRegisterModalProps) {
  return (
    <Modal
      title="Cadastro de Usuário"
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
        <UserRegisterForm
          onClose={onClose}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </Flex>
    </Modal>
  );
}
