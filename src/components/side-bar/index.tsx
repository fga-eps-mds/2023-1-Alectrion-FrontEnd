/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */

import React, { memo } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { RiLogoutCircleFill } from 'react-icons/ri';
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { routes } from '../../constants/routes';
import { SideBarItem } from './sidebar-item';

export const SideBar = memo(() => {
  // Mocked
  // TODO: create an AuthContext and get it using useAuth
  const user = {
    name: 'Usuário',
  };

  // Mocked
  // TODO: get function from authContext
  const signOut = () => {
    return null;
  };

  async function handleSignOut() {
    signOut();
  }

  let options=[
    { name: 'Controle de Equipamento' },
    { name: 'Controle Ordem Serviço' },
    { name: 'Movimentações' },
    { name: 'Relatórios' }]

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      backgroundColor="#000"
      width="166px"
      color="#fff"
      padding="20px"
    >
      <Text fontSize="2xl" fontWeight="bold">
        Alectrion
      </Text>
      {options.map((option) => (
        <Text
          key={option.name}
          fontSize="2xs"
          fontWeight="bold"
          marginTop="10"
          _hover={{ cursor: 'pointer', color: 'orange.500' }}
        >
          {option.name}
        </Text>
      ))}
      <Box position="absolute" bottom="20px">
        <Text fontSize="xs" fontWeight="bold">
          Cadastro Usuário
        </Text>
        <Text fontSize="xs" fontWeight="bold" marginTop="2">
          Admin
        </Text>
      </Box>
    </Box>
  );
});

SideBar.displayName = 'SideBar';
