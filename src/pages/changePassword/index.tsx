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
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, Center, Divider, Flex, Input, Text } from '@chakra-ui/react';
import { Alert, AlertIcon } from '@chakra-ui/react';
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { User, LoginResponse } from '../../constants/user';
import { api, apiSchedula } from '@/config/lib/axios';
import { Modal } from '@/components/modal';
import { useAuth } from '@/contexts/AuthContext';
// import  Equip  from '../edit-equipment';

export function ChangePassword() {
  const { signOut, user } = useAuth();
  const [dados, setDados] = useState({
    userId: '',
    senhaAtual: '',
    novaSenha: '',
    repetirNovaSenha: '',
    error: ''
  });

  const atualizarSenha = () => {
    const {senhaAtual, novaSenha, repetirNovaSenha, userId} = dados;

    if (novaSenha !== repetirNovaSenha) {
      // MUDAR ALERT PARA O CHAKRA UI
      alert('A nova senha e a repetição da nova senha devem ser iguais.');
      return;
    }

    axios
    // MUDAR A ROTA PARA FAZER O DEPLOY
      .put('http://localhost:4000/user/updatePassword', {
        //NAO TENHO CERTEZA SE O USERID É O TOKEN
        userId:  user?.token,
        password: novaSenha
      })
      .then(response => {
        console.log('Senha atualizada com sucesso:', response.data);
        // RECARREGAR A PAGINA DEPOSI DE ATUALIZAR A SENHA
      })
      .catch(error => {
        console.error('Erro ao atualizar senha:', error);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDados(prevDados => ({
      ...prevDados,
      [name]: value
    }));
  };

  return (
    <Center
      aria-label="form"
      bgGradient="linear(288.94deg, #F8B86D 0%, #F49320 90.96%)"
      h="100vh"
      color="white"
    >
      <form  aria-label="form">
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
              <Input size="lg" fontSize="lg" name='senhaAtual' width='50%'/>
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
              <Input size="lg" fontSize="lg" name='novaSenha' width='100%'/>
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
              <Input size="lg" fontSize="lg" name='confirmarSenha' width='100%'/>
            </Box>
          </Flex>     
            <Text mb="5%" color="#605555" fontWeight="semibold" fontSize="0.7em" marginTop="2%">
          A senha deve conter letra maiúscula,<br />
          letra minúscula, número e caractere<br />
          epecial(@, #, $, %, ...)
          </Text> 
          {/* <Divider my="4" borderColor="gray.300" />
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
                placeholder="Digite sua senha atual"
                name='senhaAtual'
                onChange={handleChange}
                value={dados.senhaAtual}
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
                placeholder="Digite sua nova senha"
                name='novaSenha'
                onChange={handleChange}
                value={dados.novaSenha}
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
                placeholder="Confirme sua nova senha"
                name='repetirNovaSenha'
                onChange={handleChange}
                value={dados.repetirNovaSenha}
              />
            </Box>
          </Flex> */}
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
      </form>
    </Center>
  );
}
