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
import { Box, Button, Center, Input, Text, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/components/modal';
import { useAuth } from '@/contexts/AuthContext';
import { AlectrionIcon } from '../../components/icons/AlectrionIcon';

export function Login() {
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
    identifier,
    password,
  }) => {
    setIsLoading(true);
    await signIn({ identifier, password });
    setIsLoading(false);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/pass-recover');
  };

  return (
    <Flex
      aria-label="form"
      bgGradient="linear(288.94deg, #F8B86D 0%, #F78F88 90.96%)"
      h="100vh"
      color="white"
    >
      <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
        <Box
          height="100%"
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bg="white"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
            color="black"
            paddingY="5%"
            paddingX="5%"
            m="0.4%"
            display="flex"
            flexDir="column"
          >
            <Box alignSelf="center">
              <AlectrionIcon height={10} width={10} />
            </Box>
            <Text mb={10} textAlign="center" fontSize="4xl">
              Alectrion
            </Text>
            <Text mb="3%" color="#605555" fontWeight="semibold" fontSize="4xl">
              Entrar
            </Text>
            <Box mb="7%">
              <Text
                pl="5px"
                pb="8px"
                color="#605555"
                fontWeight="medium"
                fontSize="lg"
              >
                Username ou CPF
              </Text>
              <Input
                size="lg"
                fontSize="lg"
                {...register('identifier', { required: true })}
                placeholder="Username ou CPF"
              />
              {errors.identifier && (
                <span>
                  <Text color="red.400">Este campo é obrigatório</Text>
                </span>
              )}
            </Box>
            <Box mb="14%">
              <Text
                pl="5px"
                pb="8px"
                color="#605555"
                fontWeight="medium"
                fontSize="lg"
              >
                Senha
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
                mb="7%"
                type="submit"
                paddingX="24"
                width="sm"
                isLoading={isLoading}
              >
                ENTRAR
              </Button>
            </Center>
            <Center>
              <Button 
              onClick={handleBack}
              variant="link"
              color="#239875">
                Recuperar Senha
              </Button>
            </Center>
          </Box>
        </Box>
      </form>
    </Flex>
  );
}
