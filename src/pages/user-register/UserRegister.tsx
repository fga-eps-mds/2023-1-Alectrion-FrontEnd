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
    import { Box, Button, Center, Input, Text, Flex, Spacer, Grid, GridItem } from '@chakra-ui/react';
    import { Modal } from '@/components/modal';
    import Equip from '../edit-equipment';
    /*import { useAuth } from '@/contexts/AuthContext';*/

    
    export function UserRegister() {
      //const { signIn } = useAuth();
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
        //await signIn({ username, password });
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
              width="130%"
            >
              <Text mb="39px" color="#605555" fontWeight="semibold" fontSize="4xl">
                Cadastro

              </Text>
              <Grid templateColumns="repeat(2, 2fr)" width="100%" gap={6} mt={6}>
                <Box flexDirection="column">
                    <Text>Nome</Text>
                    <Input placeholder="Nome" />
                </Box>

                <Box flexDirection="column">
                    <Text>UserName</Text>
                    <Input placeholder="UserName" />
                </Box>
                </Grid>

                <Grid templateColumns="repeat(2, 2fr)" width="100%" gap={6} mt={6}>
                <Box flexDirection="column">
                    <Text>CPF</Text>
                    <Input placeholder="xxx.xxx.xxx-xx" />
                </Box>

                <Box flexDirection="column">
                    <Text>E-mail Funcional</Text>
                    <Input placeholder="E-mail Funcional" />
                </Box>
                </Grid>

                <Grid templateColumns="repeat(2, 2fr)" width="100%" gap={6} mt={6}>
                <Box flexDirection="column">
                    <Text>Senha</Text>
                    <Input placeholder="Senha" />
                </Box>

                <Box flexDirection="column">
                    <Text>Confirmar senha</Text>
                    <Input placeholder="Confirmar senha" />
                </Box>
                </Grid>
              <Flex gap="4rem" mt="2rem" mb="2rem" justify="center">
                <Button variant="secondary" width="100%">
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    form="movement-register-form"
                    variant="primary"
                    width = "100%"
                >
                    Registrar
                </Button>
                </Flex>
            </Box>
          </form>
          <Spacer />
        </Flex>
      );
    }