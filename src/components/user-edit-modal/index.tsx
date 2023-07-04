import { Flex } from '@chakra-ui/react';
import UserEditForm from '../user-edit-form';
import { Modal } from '../modal';
import { UserData } from '@/pages/users/UsersControl';

type UserEditModalProps = {
  isOpen: boolean;
  onClose(): void;
  userSelected: UserData | undefined;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UserEditModal({
  isOpen,
  onClose,
  userSelected,
  refreshRequest,
  setRefreshRequest,
}: UserEditModalProps) {
  return (
    <Modal
      title="Edição de Usuário"
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
        <UserEditForm
          onClose={onClose}
          userSelected={userSelected}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </Flex>
    </Modal>
  );
}
