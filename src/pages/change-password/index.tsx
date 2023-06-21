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
import { Box, Button, Center, Divider, Flex, Input, Text } from '@chakra-ui/react';
import { useState , useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { toast } from '@/utils/toast';
import { useAuth } from '@/contexts/AuthContext';
import { api} from '../../config/lib/axios';

export function ChangePassword() {
  const { signOut, user } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [actualPassword, setActualPassword] = useState('');
    
  const atualizarSenha = () => {
    if (newPassword !== confirmPassword) {
      toast.error('As senhas informadas não coincidem. Por favor, verifique e tente novamente.');
    } else if(user?.role==="consulta") {
      toast.error('Usuário de consulta, alteração de senha não autorizada.');
    } else {
        const data = {
          userId: user?.id,
          username: user?.name,
          password: newPassword,
          actualPassword,
        };
        const apiUrl = '/user/updatePassword';
        api.put(apiUrl, data)
        .then(response => {
          if (response.status === 200) {
            // Lógica de sucesso ao atualizar a senha
            toast.success('Senha atualizada com sucesso!');
          }
        })
        .catch(error => {
          // Lógica para lidar com erros na requisição
          toast.error('Ocorreu um erro ao atualizar a senha. Por favor, tente novamente.');
          console.error(error);
        });
      }
    }
      return (
        <form aria-label="form">
          <Center
            aria-label="form"
            bgGradient="linear(288.94deg, #F8B86D 0%, #F49320 90.96%)"
            h="100vh"
            color="white"
          >
            <Box position="fixed" left="0" top="0" bottom="0" padding="20px">
              <Text fontSize="2.8vw" fontWeight="bold">
                Alectrion
              </Text>
            </Box>
            <Box
              bg="white"
              borderRadius="10px"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25),  0px 4px 4px rgba(0, 0, 0, 0.25),  0px 1px 1px rgba(0, 0, 0, 0.12),  0px 2px 2px rgba(0, 0, 0, 0.12),  0px 8px 8px rgba(0, 0, 0, 0.12);"
              color="black"
              paddingY="20"
              paddingX="20"
            >
              <Text mb="39px" color="#605555" fontWeight="semibold" fontSize="4xl">
                Alterar senha
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
                    Senha atual
                  </Text>
                  <Input size="lg" fontSize="lg" name="actualPassword" width="50%" type="password" 
                    value={actualPassword}
                    onChange={(e) => setActualPassword(e.target.value)}
                  />
                </Box>
              </Flex>
              <Flex>
                <Box>
                  <Text
                    pl="5px"
                    pb="8px"
                    color="#605555"
                    fontWeight="medium"
                    fontSize="lg"
                    marginTop="8px"
                  >
                    Nova senha
                  </Text>
                  <Input
                    size="lg"
                    fontSize="lg"
                    name="newPassword"
                    width="100%"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Box>
                <Box marginLeft="30px">
                  <Text
                    pl="5px"
                    pb="8px"
                    color="#605555"
                    fontWeight="medium"
                    fontSize="lg"
                    marginTop="8px"
                  >
                    Confirmar senha
                  </Text>
                  <Input
                    size="lg"
                    fontSize="lg"
                    name="confirmPassword"
                    width="100%"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Box>
              </Flex>
              <Text
                mb="5%"
                color="#605555"
                fontWeight="semibold"
                fontSize="0.7em"
                marginTop="2%"
              >
                A senha deve conter letra maiúscula,
                <br />
                letra minúscula, número e caractere
                <br />
                especial(@, #, $, %, ...)
              </Text>
              <Flex justify="space-between">
                <Button
                  marginTop="30px"
                  mb="120px"
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
                  paddingX="24"
                  width="20px"
                  color="white"
                  bg="black"
                  onClick={atualizarSenha}
                >
                  Alterar senha
                </Button>
              </Flex>
            </Box>
          </Center>
        </form>
      );
    } 