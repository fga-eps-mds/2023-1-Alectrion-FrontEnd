/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { ActionButtonProps } from '../types';
import { Button } from '@chakra-ui/react';

type BackButtonProps<Data> = ActionButtonProps<Data>;

export function BackButton<Data>({
  onClick,
  label,
  ...props
}: BackButtonProps<Data>) {
  return (
    <Button variant="tertiary" mb="40px" type="submit" paddingX="24" width="sm">
      VOLTAR
    </Button>
  );
}
