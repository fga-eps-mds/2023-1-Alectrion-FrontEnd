/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { IconButtonProps, TooltipProps } from '@chakra-ui/react';

export interface ActionButton<Item> {
  onClick: (item: Item) => void | Promise<void>;
  label?: string;
}

export type ActionButtonProps<T> = Omit<
  IconButtonProps,
  'onClick' | 'aria-label'
> &
  ActionButton<T> & {
    tooltipProps?: Partial<TooltipProps>;
  };
