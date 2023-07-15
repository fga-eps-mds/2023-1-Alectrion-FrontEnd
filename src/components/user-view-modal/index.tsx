import { Flex } from '@chakra-ui/react';
import UserViewForm from '../user-view-form';
import { Modal } from '../modal';
import { UserData } from '@/pages/users/UsersControl';

type UserViewModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedUser: UserData | undefined;
};

function transformFields(data: any) {
  if (!data) return;
  const transformedData = { ...data };

  return transformedData;
}

export function UserViewModal({
  isOpen,
  onClose,
  selectedUser,
}: UserViewModalProps) {
  return (
    <Modal
      title="Informações de Usuário"
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <UserViewForm
          onClose={onClose}
          selectedUser={transformFields(selectedUser)}
        />
      </Flex>
    </Modal>
  );
}
