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
    import { Box, Button, Center, Divider, Flex, Input, Text } from '@chakra-ui/react';
    import {Modal} from '@/components/modal';
    // import  Equip  from '../edit-equipment';
    
    export function View() {

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
    
      const onSubmit: SubmitHandler<CredentialUser> = async () => {
        setIsLoading(true);
        // TODO: get function from authContext
        // await signIn({ username, password });
        setIsLoading(false);
      };
    
      return (
      <Center
        aria-label="form"
        bgGradient="linear(288.94deg, #F8B86D 0%, #F49320 90.96%)"
        h="100vh"
        color="white"
      >
        <form onSubmit={handleSubmit(onSubmit)} aria-label="form">
          <Box
            bg="white"
            borderRadius="10px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
            color="black"
            paddingY="20"
            paddingX="20"
          >
            <Text mb="39px" color="#605555" fontWeight="semibold" fontSize="4xl">
              Usuário
            </Text>
            <Flex>
              <Box flex="1" pr="2">
                <Text
                  pl="5px"
                  pb="8px"
                  color="#605555"
                  fontWeight="medium"
                  fontSize="lg"
                >
                  Nome
                </Text>
                <Input size="lg" fontSize="lg" placeholder="Nome" />
              </Box>
              <Box flex="1" pl="2">
                <Text
                  pl="5px"
                  pb="8px"
                  color="#605555"
                  fontWeight="medium"
                  fontSize="lg"
                >
                  Sobrenome
                </Text>
                <Input size="lg" fontSize="lg" placeholder="Sobrenome" />
              </Box>
            </Flex>
            <Box>
              <Text
                pl="5px"
                pb="8px"
                color="#605555"
                fontWeight="medium"
                fontSize="lg"
                marginTop="8px"
              >
                E-mail
              </Text>
              <Input size="lg" fontSize="lg" placeholder="E-mail da pessoa" />
            </Box>
            <Divider my="4" borderColor="gray.300" />
            <Flex>
              <Box flex="1" pr="2">
                <Text
                  pl="5px"
                  pb="8px"
                  color="#605555"
                  fontWeight="medium"
                  fontSize="lg"
                >
                  Senha atual
                </Text>
                <Input
                  size="lg"
                  fontSize="lg"
                  placeholder="Senha atual da pessoa"
                />
              </Box>
              <Box flex="1" pl="2">
                <Text
                  pl="5px"
                  pb="8px"
                  color="#605555"
                  fontWeight="medium"
                  fontSize="lg"
                >
                  Nova senha
                </Text>
                <Input
                  size="lg"
                  fontSize="lg"
                  placeholder="Nova senha"
                />
              </Box>
              <Box mb="20px" flex="1" pl="2">
                <Text
                  pl="5px"
                  pb="8px"
                  color="#605555"
                  fontWeight="medium"
                  fontSize="lg"
                >
                  Confirmar senha
                </Text>
                <Input
                  size="lg"
                  fontSize="lg"
                  placeholder="Confirmar senha"
                />
              </Box>
            </Flex>
            <Flex justify="space-between">
                <Button
                  marginTop="20px"
                  mb="120px"
                  type="submit"
                  paddingX="24"
                  width="20px"
                  color="white"
                  bg="black"
                  onClick={() => window.history.back()}
                >
                  Voltar
                </Button>
              
              <Button
                marginTop="30px"
                mb="120px"
                type="submit"
                paddingX="24"
                width="20px"
              >
                Salvar
              </Button>
            </Flex>
          </Box>
        </form>
      </Center>
      );
    }
    