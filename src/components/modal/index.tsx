/* eslint-disable prettier/prettier */
/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import {
  Flex,
  Heading,
  Modal as ModalContainer,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react';
import React from 'react';

export interface ModalProps extends ChakraModalProps {
  title: string;
  headerButton?: React.ReactNode;
}

export function Modal({ children, title, headerButton, ...props }: ModalProps) {
  return (
    <ModalContainer blockScrollOnMount={false} {...props}>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        transform="auto-gpu" // force the browser use GPU acceleration for that particular element instead of the CPU
        bg="white"
        backdropFilter="blur(8px)"
      >
        <ModalCloseButton />
        <ModalHeader pl="44px" borderTopRadius="md" bg="white" display="flex">
          <Heading fontWeight="bold" fontSize="40px" textColor="#212121">
            {title}
          </Heading>
          <Flex ml="auto" mr="16px">
            {headerButton}
          </Flex>
        </ModalHeader>

        <ModalBody px="44px" bg="white">
          {children}
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
}
