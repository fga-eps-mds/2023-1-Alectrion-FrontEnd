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
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const options = [
    { name: 'Controle de Equipamento', link: '/equipaments' },
    { name: 'Controle Ordem Serviço', link: '' },
    { name: 'Movimentações', link: '/movements' },
    { name: 'Relatórios', link: '' },
  ];

  return (
    <Box
      position="fixed"
      left="0"
      top="0"
      bottom="0"
      backgroundColor="#000"
      width="16vw"
      minWidth="166px"
      color="#fff"
      padding="20px"
      height="100%"
    >
      <Text fontSize="2.8vw" fontWeight="bold">
        Alectrion
      </Text>
      {options.map((option) => (
        <Text
          key={option.name}
          fontSize="4xs"
          fontWeight="bold"
          marginTop="10"
          _hover={{ cursor: 'pointer', color: 'orange.500' }}
          onClick={() => navigate(option.link)}
        >
          {option.name}
        </Text>
      ))}
      <Box position="absolute" bottom="20px" fontSize="4xs">
        <Text fontWeight="bold">Cadastro Usuário</Text>
        <Text fontWeight="bold" marginTop="2">
          Admin
        </Text>
      </Box>
    </Box>
  );
});

SideBar.displayName = 'SideBar';
