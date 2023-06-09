/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, Flex, Grid, Box, GridItem, Checkbox } from '@chakra-ui/react';

import {
  TIPOS_JOB,
  TIPOS_ROLE,
  Job,
  Role,
  LoginResponse,
} from '@/constants/user';
import { Input } from '../form-fields/input';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { NewControlledSelect } from '../form-fields/new-controlled-select';

export type EditUserFormValues = {
  id: string;
  name: string;
  email: string;
  username: string;
  cpf: string;
  job: Job;
  role: Role;
  password?: string;
  actualPassword?: string;
};

interface EditUserFormProps {
  onClose: () => void;
  userSelected: EditUserFormValues;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UserEditForm({
  onClose,
  userSelected,
  refreshRequest,
  setRefreshRequest,
}: EditUserFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
    setValue,
  } = useForm<EditUserFormValues>({
    defaultValues: userSelected,
  });

  const [editarSenha, setEditarSenha] = useState<boolean>(false);

  const listOfYears: Array<{ value: number; label: string }> = (() => {
    const endYear: number = new Date().getFullYear();
    const startYear: number = endYear - 30;

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: year, label: year.toString() };
    }).reverse();
  })();

  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const handleCheckboxClick = () => {
    setEditarSenha(!editarSenha);
  };

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const {
        name,
        username,
        cpf,
        email,
        job,
        role,
        password,
        actualPassword,
        ...rest
      } = formData;

      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

      const payload = {
        userId: formData.id,
        name,
        username,
        cpf,
        email,
        job,
        role,
        password,
        actualPassword,
        ...rest,
      };

      const loggedUser = JSON.parse(
        localStorage.getItem('@alectrion:user') || ''
      ) as unknown as LoginResponse;

      // if (editarSenha) {
      //   const data = {
      //     // userId: loggedUser?.id,
      //     username: loggedUser?.email,
      //     password: payload.password,
      //     actualPassword,
      //   };
      //   const apiUrl = 'user/updatePassword';
      //   const responsePwd = await api.put('user/updatePassword', data)
      //   if (responsePwd.status === 200) {
      //     toast.success('Senha do usuário atualizada com sucesso', 'Sucesso');
      //     // setRefreshRequest(!refreshRequest);
      //     onClose();
      //   } else {
      //     toast.error('Ocorreu um erro ao atualizar a senha do usuário. Por favor, tente novamente.');
      //   }
      // }

      // delete payload.password

      if (!editarSenha) {
        delete payload.password;
      }

      const response = await api.put('user/update', payload, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Usuário editado com sucesso', 'Sucesso');
        setRefreshRequest(!refreshRequest);
        onClose();
        return;
      }

      toast.error('Erro ao tentar editar o usuário', 'Erro');
    } catch {
      toast.error('Erro ao tentar editar o usuário', 'Erro');
    }
  });

  return (
    <form id="user-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <Input
          label="Username"
          errors={errors.username}
          {...register('username', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
        />

        <Input
          label="Name"
          errors={errors.name}
          {...register('name', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
        />

        <Input
          label="Email"
          errors={errors.email}
          {...register('email', {
            required: 'Campo Obrigatório',
            maxLength: 50,
          })}
        />

        <Input
          label="Cpf"
          errors={errors.cpf}
          {...register('cpf', {
            required: 'Campo Obrigatório',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Por favor, digite apenas números.',
            },
            maxLength: 11,
          })}
        />

        <NewControlledSelect
          control={control}
          name="job"
          id="job"
          options={TIPOS_JOB}
          placeholder="Selecione uma opção"
          label="Cargo do usuário"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          cursor="pointer"
          defaultValue={userSelected.job}
        />

        <NewControlledSelect
          control={control}
          name="role"
          id="role"
          options={TIPOS_ROLE}
          placeholder="Selecione uma opção"
          label="Perfil do usuário"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
          cursor="pointer"
          defaultValue={userSelected.role}
        />

        <GridItem gridColumn="1 / span 3">
          <Checkbox
            value="ADMIN"
            colorScheme="orange"
            onChange={() => {
              handleCheckboxClick();
            }}
          >
            Editar senha
          </Checkbox>
        </GridItem>
        <Input
          type="password"
          label="Nova senha do usuário"
          placeholder="Nova senha do usuário"
          errors={errors.password}
          disabled={!editarSenha}
          {...register('password', {
            maxLength: 50,
          })}
        />
        {/* <Input
          type="password"
          label="Senha de admin atual"
          placeholder="Senha de admin atual"
          errors={errors.password}
          disabled={!editarSenha}
          {...register('password', {
            maxLength: 50,
          })}
        /> */}
      </Grid>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>

        <Button type="submit" form="user-register-form" variant="primary">
          Editar
        </Button>
      </Flex>
    </form>
  );
}
