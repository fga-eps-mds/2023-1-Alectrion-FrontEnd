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

  return (
    <Flex
      flexDirection="column"
      gap={2}
      width="fit-content"
      height="100%"
      maxHeight="calc(100vh - 7rem)" // (--chakra-spacing-14)3.5rem padding 2x
      position="sticky"
      top={14}
    >
      <Heading margin="0 auto" textAlign="center" fontWeight="hairline">
        Alectrion
      </Heading>
      <Divider />

      <VStack spacing={4} align="stretch">
        {routes.map((route) => (
          <SideBarItem key={route.label} {...route} />
        ))}
      </VStack>

      <Box marginTop="auto" shadow="xl" p=".5rem">
        <Divider marginBottom={2} />
        <Flex gap={2} justifyContent="space-between" alignItems="center">
          <FaRegUser size={25} />
          <Text maxWidth={140} noOfLines={1}>
            {user?.name ?? 'Usuário'}
          </Text>
          <Icon
            as={RiLogoutCircleFill}
            onClick={handleSignOut}
            fontSize={24}
            cursor="pointer"
          />
        </Flex>
      </Box>
    </Flex>
  );
});

SideBar.displayName = 'SideBar';
