import React, { memo } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const SideBar = memo(() => {
  // Mocked
  // TODO: create an AuthContext and get it using useAuth

  // Mocked
  // TODO: get function from authContext

  const navigate = useNavigate();

  const options = [
    { name: 'Controle de Equipamento', link: '/equipments' },
    { name: 'Controle Ordem Serviço', link: '/order-services' },
    { name: 'Movimentações', link: '/movements' },
    { name: 'Relatórios', link: '' },
  ];

  const optionUser = { name: 'Cadastro Usuário', link: '/user-register' };
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
        <Text
          key={optionUser.name}
          fontSize="4xs"
          fontWeight="bold"
          marginTop="10"
          _hover={{ cursor: 'pointer', color: 'orange.500' }}
          onClick={() => navigate(optionUser.link)}
        >
          {optionUser.name}
        </Text>
        <Text fontWeight="bold" marginTop="2">
          Admin
        </Text>
      </Box>
    </Box>
  );
});

SideBar.displayName = 'SideBar';
