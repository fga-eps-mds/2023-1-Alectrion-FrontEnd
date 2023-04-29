/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { Fade, Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import React from 'react';

export function ListItemSkeleton() {
  return (
    <Fade in data-testid="list-item-skeleton">
      <Flex
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
        bg="white"
        borderRadius="md"
        padding={4}
        boxShadow="medium"
        height="92px"
      >
        <VStack spacing={2} alignItems="start">
          <Skeleton height="24px" w={175} />
          <Skeleton height="16px" w={280} />
        </VStack>
        <HStack spacing={4} alignSelf="end">
          <Skeleton height="40px" width="40px" alignSelf="end" />
          <Skeleton height="40px" width="40px" alignSelf="end" />
          <Skeleton height="40px" width="40px" alignSelf="end" />
        </HStack>
      </Flex>
    </Fade>
  );
}
