/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { Children, cloneElement, ReactElement } from 'react';
import { HStack } from '@chakra-ui/react';
import { ActionButton } from '../../action-buttons/types';

export interface ActionsProps<Data> {
  item: Data;
  children:
    | ReactElement<ActionButton<Data>>
    | ReactElement<ActionButton<Data>>[]
    | null;
}

export function ItemActions<Data>({ children, item }: ActionsProps<Data>) {
  return (
    <HStack spacing={4} role="menubar" alignSelf="end">
      {Children.map(
        children,
        (child) =>
          child &&
          cloneElement(child, {
            onClick: child?.props?.onClick?.bind?.(null, item),
          })
      )}
    </HStack>
  );
}
