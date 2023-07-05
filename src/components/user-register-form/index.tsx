import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Center, Text, Flex, Spacer, Grid, GridItem, Radio, RadioGroup, HStack } from '@chakra-ui/react';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import { LoginResponse,TIPOS_JOB, TIPOS_ROLE, Job, Role} from '../../constants/user';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { Input } from '../form-fields/input';

  type FormValues = {
  id?: string
  name: string
  email: string
  username: string
  cpf: string
  job: Job
  role: Role
  password: string
  confirmPassword: string
  };
  
  interface UserFormProps {
    onClose: () => void;
    refreshRequest: boolean;
    setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function UserRegisterForm({
    onClose,
    refreshRequest,
    setRefreshRequest,
  }: UserFormProps) {
    const {
      control,
      register,
      handleSubmit,
      resetField,
      setValue,
      formState: { errors },
    } = useForm<FormValues>();

    const [selectedUserRegister, setSelectedUserRegister] = useState<RegisterUserPayload>();
    const [statusModal, setStatusModal] = useState<boolean>(false);

    const onSubmit = handleSubmit(async (formData) => {
      try {
        const { username,email,name,cpf,role,job,password,confirmPassword,...rest } =
          formData;

          if (password !== formData.confirmPassword) {
            toast.error('A senha e a confirmação de senha não correspondem', 'Erro');
            return;
          }

        const payload = {
          username: formData.username,
          email: formData.email,
          name: formData.name,
          cpf: formData.cpf,
          role: formData.role,
          jobFunction: formData.job,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          ...rest,
        };

        const loggedUser = JSON.parse(
          localStorage.getItem('@alectrion:user') || ''
        ) as unknown as LoginResponse;
        const response = await api.post('user/create', payload, {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          }});
        
        if (response.status === 200) {
          setRefreshRequest(!refreshRequest);
          onClose()
          toast.success('Usuário cadastrado com sucesso', 'Sucesso');
          return;
        }
        toast.error('Erro ao tentar cadastrar o usuario', 'Erro');
      } catch (error: any) {
        toast.error(error.response.data.error, 'Erro');
       }
    });

  return (
    <form id="user-register-form" onSubmit={onSubmit}>
      <Grid templateColumns="repeat(2, 2fr)" gap={6}>
        <Input 
        placeholder="Nome" 
        defaultValue={selectedUserRegister?.name}
        errors={errors.name}
        label="Nome"
        {...register('name', {
            required: 'Campo Obrigatório',
            maxLength: 50
          })}
        />
        <Input 
        placeholder="UserName"
        defaultValue={selectedUserRegister?.username}
        errors={errors.username}
        label="Username"
        {...register('username', {
        required: 'Campo Obrigatório',
        maxLength: 50
        })}
        />
        <Input
        placeholder="Apenas números"
        errors={errors.cpf}
        label="CPF"
        {...register('cpf', {
        required: 'Campo Obrigatório',
        maxLength: 11,
        pattern: {
            value: /^[0-9]+$/,
            message: 'Por favor, digite apenas números.',
            }
        })}
        />
        <Input 
        placeholder="Digite seu E-mail" 
        defaultValue={selectedUserRegister?.email}
        errors={errors.email}
        label="E-mail Funcional"
        {...register('email', {
        required: 'Campo Obrigatório',
        maxLength: 50,
        })}
        />
        <Input 
        type="password"
        placeholder="Digite sua Senha" 
        defaultValue={selectedUserRegister?.password}
        errors={errors.password}
        label="Senha"
        {...register('password', {
        required: 'Campo Obrigatório',
        maxLength: 12,
        })}
        />
        <Input 
        type="password"
        placeholder="Confirme sua senha"
        errors={errors.confirmPassword}
        label="Confirmar Senha"
        {...register('confirmPassword', {
        required: 'Campo Obrigatório',
        maxLength: 12,
        })}
        />
        <NewControlledSelect
        control={control}
        name="job"
        id="job"
        options={TIPOS_JOB}
        placeholder="Selecione uma opção"
        label="Tipo de Cargo"
        rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        />
        <NewControlledSelect
        control={control}
        name="role"
        id="role"
        options={TIPOS_ROLE}
        placeholder="Selecione uma opção"
        label="Tipo de usuário"
        rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        />
      </Grid>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={() => window.history.back()}>
          Cancelar
        </Button>
        <Button type="submit" form="user-register-form" variant="primary">
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}