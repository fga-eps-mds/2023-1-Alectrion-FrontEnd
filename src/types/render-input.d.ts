/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import type { ReactElement } from 'react';
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  UseFormStateReturn,
} from 'react-hook-form';

type RenderInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ({
  field,
  fieldState,
  formState,
}: {
  field: ControllerRenderProps<UserProfile, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}) => ReactElement;
