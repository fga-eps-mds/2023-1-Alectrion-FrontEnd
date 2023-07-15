import { useForm } from 'react-hook-form';

import { Button, Flex, Grid } from '@chakra-ui/react';

import { Job, Role } from '@/constants/user';
import { Input } from '../form-fields/input';

export type UserFormValues = {
  name: string;
  email: string;
  username: string;
  cpf: string;
  job: Job;
  role: Role;
};

interface UserFormProps {
  onClose: () => void;
  selectedUser: UserFormValues;
}

export default function UserViewForm({ onClose, selectedUser }: UserFormProps) {
  const {
    register,
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: selectedUser,
  });

  return (
    <form id="selectedUser-view-form">
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <Input
          size="lg"
          label="Usuário"
          width="100%"
          readOnly
          {...register('username')}
          errors={undefined}
        />
        <Input
          size="lg"
          label="Nome"
          width="100%"
          readOnly
          {...register('name')}
          errors={undefined}
        />
        <Input
          size="lg"
          fontSize="lg"
          label="CPF"
          width="120%"
          readOnly
          {...register('cpf')}
          errors={undefined}
        />
        <Input
          size="lg"
          fontSize="lg"
          label="Email"
          width="120%"
          readOnly
          {...register('email')}
          errors={undefined}
        />
        <Input
          size="lg"
          fontSize="lg"
          width="120%"
          label="Perfil"
          readOnly
          {...register('role')}
          errors={undefined}
        />
        <Input
          size="lg"
          fontSize="lg"
          label="Cargo"
          readOnly
          {...register('job')}
          errors={undefined}
        />
      </Grid>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Fechar
        </Button>
      </Flex>
    </form>
  );
}
