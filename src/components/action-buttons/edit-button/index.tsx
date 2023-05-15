/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { ActionButton } from '..';
import { ActionButtonProps } from '../types';

type EditButtonProps<Data> = ActionButtonProps<Data>;

export function EditButton<Data>({
  onClick,
  label,
  ...props
}: EditButtonProps<Data>) {
  return (
    <ActionButton
      label={`Editar ${label || ''}`}
      icon={<RiEdit2Fill size={22} />}
      onClick={onClick}
      color="gray.700"
      {...props}
    />
  );
}
