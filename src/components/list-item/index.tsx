/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { ReactElement } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { ActionsProps } from './list-item-actions';

export interface ItemProps<Data> {
  title: string | JSX.Element;
  description: string | JSX.Element;
  children?: ReactElement<ActionsProps<Data>>;
}

export const customDivider = {
  content: "''",
  position: 'absolute',
  bottom: '0',
  width: '300px',
  height: '1px',
  backgroundColor: '#e6e6e6',
};

export function Item<Data>({ title, description, children }: ItemProps<Data>) {
  return (
    <Flex
      w="100%"
      justifyContent="space-between"
      position="relative"
      bg="white"
      borderRadius="md"
      padding={5}
      boxShadow="lg"
    >
      <Box alignSelf="center">
        <Box
          fontWeight="medium"
          mb={1}
          position="relative"
          _before={customDivider}
        >
          {title}
        </Box>
        <Box color="GrayText">{description}</Box>
      </Box>

      <Box alignSelf="end" display="contents">
        {children}
      </Box>
    </Flex>
  );
}
