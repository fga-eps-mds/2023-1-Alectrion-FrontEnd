/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  Button,
  Flex,
  Box,
  Text,
	Grid,
} from '@chakra-ui/react';
import { theme } from '@/styles/theme';

import {
  Job,
  Role,
} from '@/constants/user';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { NewControlledSelect } from '../form-fields/new-controlled-select';

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
    formState: { errors },
  } = useForm<UserFormValues>({
    defaultValues: selectedUser,
  });

  return (
    <form id="selectedUser-view-form">
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
          <Input
            size="lg"
            name="name"
						label="Usuário"
            width="100%"
            readOnly
            placeholder={` ${selectedUser?.username}`}
            errors={undefined}
          />
          <Input
            size="lg"
            name="name"
						label="Nome"
            width="100%"
            readOnly
            placeholder={` ${selectedUser?.name}`}
            errors={undefined}
          />
          <Input
            size="lg"
            fontSize="lg"
            name="cpf"
						label="CPF"
            width="120%"
            readOnly
            placeholder={` ${selectedUser?.cpf}`}
            errors={undefined}
          />
          <Input
            size="lg"
            fontSize="lg"
            name="email"
						label="Email"
            width="120%"
            readOnly
            placeholder={` ${selectedUser?.email}`}
            errors={undefined}
          />
          <Input
            size="lg"
            fontSize="lg"
            name="selectedUser"
            width="120%"
						label="Perfil"
            readOnly
            placeholder={` ${selectedUser?.role}`}
            errors={undefined}
          />
          <Input
            size="lg"
            fontSize="lg"
            name="cargo"
						label="Cargo"
            readOnly
            placeholder={` ${selectedUser?.job}`}
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
