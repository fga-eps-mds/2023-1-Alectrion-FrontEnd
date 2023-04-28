/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { Text } from '@chakra-ui/react';
import { Props } from 'chakra-react-select';
import React from 'react';

export const handleEmptyOptions: Props['noOptionsMessage'] = (state) => (
  <Text color="gray.300">
    Nenhuma resultado para pesquisa{' '}
    <Text as="span" fontWeight="semibold" color="white" p={0.5} bg="primary">
      {state.inputValue}
    </Text>
  </Text>
);
