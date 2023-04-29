/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { memo } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

interface PageHeaderProps {
  title: string;
  subtitle?: string | JSX.Element;
  children?: React.ReactNode;
}

export const PageHeader = memo(
  ({ title, subtitle, children }: PageHeaderProps) => {
    return (
      <Flex justifyContent="space-between" marginBottom={8}>
        <Box>
          <Heading>{title}</Heading>
          {subtitle}
        </Box>

        <Box>{children}</Box>
      </Flex>
    );
  }
);

PageHeader.displayName = 'PageHeader';
