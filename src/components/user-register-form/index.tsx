import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Center,
  Text,
  Flex,
  Spacer,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  HStack,
} from '@chakra-ui/react';
import { api } from '@/config/lib/axios';
import { toast } from '@/utils/toast';
import {
  LoginResponse,
  TIPOS_JOB,
  TIPOS_ROLE,
  Job,
  Role,
} from '../../constants/user';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { Input } from '../form-fields/input';
import { AlectrionIcon } from '../icons/AlectrionIcon';

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
  const [selectedUserRegister, setSelectedUserRegister] =
    useState<RegisterUserPayload>();

  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setStatusModal(!statusModal);
  };

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserPayload>();

  const watchRole = watch('role');

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true);
    try {
      const { username, email, name, cpf, role, jobFunction, ...rest } =
        formData;

      const payload = {
        username: formData.username,
        email: formData.email,
        name: formData.name,
        cpf: formData.cpf,
        role: formData.role,
        jobFunction: formData.jobFunction,
        ...rest,
      };
      const loggedUser = JSON.parse(
        localStorage.getItem('@alectrion:user') || ''
      ) as unknown as LoginResponse;

      const response = await api.post('user/create', payload, {
        headers: {
          Authorization: `Bearer ${loggedUser.token}`,
        },
      });
      setIsLoading(false);
      if (response.status === 200) {
        setRefreshRequest(!refreshRequest);
        toast.success('Usuário cadastrado com sucesso', 'Sucesso');
        onClose();
        return;
      }
      toast.error('Erro ao tentar cadastrar o usuario', 'Erro');
    } catch (error: any) {
      toast.error(error.response.data.error, 'Erro');
      setIsLoading(false);
    }
  });

  return (
    <form id="user-register-form" onSubmit={onSubmit} aria-label="form">
      <Grid
        templateColumns="repeat(2, 2fr)"
        width="100%"
        gap={6}
        mt={6}
        alignSelf="center"
      >
        <Box flexDirection="column" alignSelf="center">
          <Text>Nome</Text>
          <Input
            errors={undefined}
            placeholder="Nome"
            defaultValue={selectedUserRegister?.name}
            {...register('name', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
          {errors.name && (
            <span>
              <Text color="red.400">Este campo é obrigatório</Text>
            </span>
          )}
        </Box>

        <Box flexDirection="column">
          <Text>UserName</Text>
          <Input
            errors={undefined}
            placeholder="UserName"
            defaultValue={selectedUserRegister?.username}
            {...register('username', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
          {errors.username && (
            <span>
              <Text color="red.400">Este campo é obrigatório</Text>
            </span>
          )}
        </Box>
      </Grid>

      <Grid templateColumns="repeat(2, 2fr)" width="100%" gap={6} mt={6}>
        <Box flexDirection="column">
          <Text>CPF</Text>
          <Input
            errors={errors.cpf}
            placeholder="Apenas números"
            pattern="[0-9]*"
            title="Por favor, digite apenas números"
            {...register('cpf', {
              required: 'Campo Obrigatório',
              minLength: {
                value: 11,
                message: 'CPF deve ter no mínimo 11 dígitos',
              },
              maxLength: {
                value: 11,
                message: 'CPF deve ter no máximo 11 dígitos',
              },
            })}
          />
        </Box>

        <Box flexDirection="column">
          <Text>E-mail Funcional</Text>
          <Input
            errors={undefined}
            placeholder="E-mail Funcional"
            type="email"
            defaultValue={selectedUserRegister?.email}
            {...register('email', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />
          {errors.email && (
            <span>
              <Text color="red.400">Este campo é obrigatório</Text>
            </span>
          )}
        </Box>
      </Grid>

      <Grid
        templateColumns="repeat(2, 2fr)"
        width="100%"
        gap={6}
        mt={6}
        mb={6}
        alignSelf="center"
      >
        {watchRole === 'CONSULTA' && (
          <>
            <Box flexDirection="column" alignSelf="center">
              <Text>Senha</Text>
              <Input
                errors={undefined}
                type="password"
                placeholder="Senha"
                {...register('password', {
                  maxLength: 50,
                })}
              />
              {errors.password && watchRole === 'CONSULTA' && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
            </Box>

            <Box flexDirection="column" alignSelf="center">
              <Text>Confirmar senha</Text>
              <Input
                errors={undefined}
                type="password"
                placeholder="Confirmar senha"
                {...register('confirmPassword', {
                  maxLength: 50,
                })}
              />
              {errors.confirmPassword && watchRole === 'CONSULTA' && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
            </Box>
          </>
        )}
        <NewControlledSelect
          control={control}
          name="jobFunction"
          id="jobFunction"
          options={TIPOS_JOB}
          placeholder="Selecione uma opção"
          label="Tipo de Cargo"
          rules={{ required: 'Campo obrigatório', shouldUnregister: true }}
        />
      </Grid>
      <Box>
        <Center mb={2}>Tipo de Usuário</Center>
        <Flex justify="center" mb={4}>
          <RadioGroup defaultValue="user">
            <HStack spacing={6}>
              <Radio
                value="ADMIN"
                colorScheme="orange"
                {...register('role', {
                  required: 'Campo Obrigatório',
                })}
              >
                Admin
              </Radio>
              <Radio
                value="BASICO"
                colorScheme="orange"
                {...register('role', {
                  required: 'Campo Obrigatório',
                })}
              >
                Básico
              </Radio>
              <Radio
                value="CONSULTA"
                colorScheme="orange"
                {...register('role', {
                  required: 'Campo Obrigatório',
                })}
              >
                Consulta
              </Radio>
            </HStack>
          </RadioGroup>
        </Flex>
      </Box>
      <Flex gap="4rem" mt="2rem" mb="2rem" justify="center">
        <Button variant="secondary" width="100%" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          type="submit"
          form="user-register-form"
          variant="primary"
          width="100%"
          isLoading={isLoading}
        >
          Registrar
        </Button>
      </Flex>
    </form>
  );
}
