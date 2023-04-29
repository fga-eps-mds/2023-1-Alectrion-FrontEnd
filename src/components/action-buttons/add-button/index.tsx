/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import React from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { ActionButton } from '..';

import type { ActionButtonProps } from '../types';

type AddButtonProps<Data> = ActionButtonProps<Data>;

export function AddButton<Data>({
  onClick,
  label,
  ...props
}: AddButtonProps<Data>) {
  return (
    <ActionButton
      label={label}
      icon={<MdLibraryAdd size={20} />}
      onClick={onClick}
      {...props}
    />
  );
}
