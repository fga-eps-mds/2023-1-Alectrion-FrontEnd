/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { Datepicker } from '../form-fields/date';

import {
  TIPOS_JOB,
  TIPOS_ROLE,
} from '@/constants/user';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';
import { NewControlledSelect } from '../form-fields/new-controlled-select';
import { Job, Role } from '@/constants/user';
import { LoginResponse } from '@/constants/user';

export type EditUserFormValues = {
  id: string,
  name: string
  email: string
  username: string
  cpf: string
  job: Job
  role: Role
  password: string
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

//   const watchType = watch('type');

//   useEffect(() => {
//     resetField('power');
//     resetField('screenSize');
//     resetField('screenType');
//     resetField('ram_size');
//     resetField('processor');
//     resetField('storageType');
//     resetField('storageAmount');
//   }, [resetField, watchType, setValue, userSelected]);

//   useEffect(() => {
//     resetField('type');
//   }, []);

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
        ...rest
      } = formData;

      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    //   const dateString = formatDate(acquisitionDate);

      const payload = {
        userId: formData.id,
        name,
        username,
        cpf,
        email,
        job,
        role,
        password,
        ...rest,
      };

      const loggedUser = JSON.parse(
        localStorage.getItem('@alectrion:user') || ''
      ) as unknown as LoginResponse;

      const response = await api.put('user/update', payload, 
      {
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
        {/* <NewControlledSelect
          label="Tipo de equipamento"
          control={control}
          name="type"
          id="type"
          options={TIPOS_EQUIPAMENTO}
          placeholder="Tipo"
          cursor="pointer"
          defaultValue={equip?.type}
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        /> */}

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


        {/* <Input
          label="Password"
          errors={errors.password}
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
