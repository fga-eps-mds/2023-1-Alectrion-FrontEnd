/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import {
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
}

export function Modal({ children, title, ...props }: ModalProps) {
  return (
    <ModalContainer blockScrollOnMount={false} {...props}>
      <ModalOverlay bg="blackAlpha.500" />
      <ModalContent
        transform="auto-gpu" // force the browser use GPU acceleration for that particular element instead of the CPU
        bg="blackAlpha.600"
        backdropFilter="blur(8px)"
        color="white"
      >
        <ModalCloseButton />
        <ModalHeader
          textAlign="center"
          borderTopRadius="md"
          bg="blackAlpha.600"
        >
          <Heading fontSize="2xl" color="white" fontWeight="semibold">
            {title}
          </Heading>
        </ModalHeader>

        <ModalBody p={[6, 8, 10, 12]} bg="blackAlpha.100">
          {children}
        </ModalBody>
      </ModalContent>
    </ModalContainer>
  );
}
