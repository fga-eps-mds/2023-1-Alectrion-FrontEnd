/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { ActionButtonProps } from '../types';
import { Button } from '@chakra-ui/react';

type ConfirmEditButtonProps<Data> = ActionButtonProps<Data>;

export function ConfirmEditButton<Data>({
  onClick,
  label,
  ...props
}: ConfirmEditButtonProps<Data>) {
  return (
    <Button mb="40px" type="submit" paddingX="24" width="sm">
      EDITAR
    </Button>
  );
}
