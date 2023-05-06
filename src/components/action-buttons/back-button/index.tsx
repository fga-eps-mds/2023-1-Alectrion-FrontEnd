import React from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { ActionButton } from '..';
import { ActionButtonProps } from '../types';

type BackButtonProps<Data> = ActionButtonProps<Data>;

export function BackButton<Data>({
  onClick,
  label,
  ...props
}: BackButtonProps<Data>) {
  return (
    <ActionButton
      label={`Voltar ${label || ''}`}
      icon={<RiEdit2Fill size={22} />}
      onClick={onClick}
      color="gray.700"
      {...props}
    />
  );
}