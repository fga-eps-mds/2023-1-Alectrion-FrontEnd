/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
/* eslint-disable class-methods-use-this */

import { createStandaloneToast } from '@chakra-ui/react';

const { toast: ChakraToast } = createStandaloneToast();

class Toast {
  success(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  }

  error(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  warning(message: string, title?: string) {
    return ChakraToast({
      ...(title && { title }),
      description: message,
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  }
}

export const toast = new Toast();
