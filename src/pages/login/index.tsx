/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable prettier/prettier */
/* eslint-disable import/newline-after-import */
/* eslint-disable @typescript-eslint/no-unused-vars */

/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Center, Input, Text, Flex, Spacer } from '@chakra-ui/react';
import { Modal } from '@/components/modal';
import Equip from '../edit-equipment';
import { useAuth } from '@/contexts/AuthContext';
export function Login() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const generalTypes = ['Webcam', 'Escaneador'];

  const equipmentDataType = 'Webcam';

  switch (equipmentDataType) {
    case generalTypes.find((item) => item === 'Tipo 1'):
      break;
    case generalTypes.find((item) => item === equipmentDataType):
      break;
    default:
      break;
  }

  const [statusModal, setStatusModal] = useState<boolean>(false);
  const toggleModal = () => {
    setStatusModal(!statusModal);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialUser>();

  const onSubmit: SubmitHandler<CredentialUser> = async ({
    username,
    password,
  }) => {
    setIsLoading(true);
    // TODO: get function from authContext
    await signIn({ username, password });
    setIsLoading(false);
  };

  return (
    <Flex
      aria-label="form"
      bgGradient="linear(288.94deg, #F8B86D 0%, #F78F88 90.96%)"
      h="100%"
      color="white"
      
    >
      <Flex w="28%">
        <Text m='39px' color="white" fontWeight="bold" fontSize="4xl" >
          Alectrion
        </Text>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
        <Box
          bg="white"
          borderRadius="10px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
          color="black"
          paddingY="20"
          paddingX="20"
          m="4px"
        >
          <Text mb="39px" color="#605555" fontWeight="semibold" fontSize="4xl">
            Entrar
          </Text>
          <Box marginBottom={10}>
            <Text
              pl="5px"
              pb="8px"
              color="#605555"
              fontWeight="medium"
              fontSize="lg"
            >
              E-mail
            </Text>
            <Input
              size="lg"
              fontSize="lg"
              {...register('username', { required: true })}
              placeholder="Nome de usuário"
            />
            {errors.username && (
              <span>
                <Text color="red.400">Este campo é obrigatório</Text>
              </span>
            )}
          </Box>
          <Box mb="70px">
            {' '}
            <Text
              pl="5px"
              pb="8px"
              color="#605555"
              fontWeight="medium"
              fontSize="lg"
            >
              {' '}
              Senha{' '}
            </Text>
            <Input
              size="lg"
              fontSize="lg"
              {...register('password', { required: true })}
              type="password"
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <span>
                <Text color="red.400">Este campo é obrigatório</Text>
              </span>
            )}
          </Box>
          <Center>
            <Button
              mb="70px"
              type="submit"
              paddingX="24"
              width="sm"
              isLoading={isLoading}
            >
              ENTRAR
            </Button>
          </Center>
          <Center>
            <Button variant="link" color="#239875">
              Recuperar Senha
            </Button>
          </Center>
        </Box>
      </form>
      <Spacer />
    </Flex>
  );
}
