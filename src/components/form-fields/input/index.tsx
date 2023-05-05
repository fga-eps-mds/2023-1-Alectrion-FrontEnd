/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input as ChakraInput,
  InputAddonProps,
  InputElementProps,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
} from '@chakra-ui/react';

export interface InputProps extends ChakraInputProps {
  label: string | JSX.Element;
  errors: FieldError | undefined;
  rightElement?: ReactElement<InputElementProps>;
  leftElement?: ReactElement<InputElementProps>;
  rightAddon?: ReactElement<InputAddonProps>;
  leftAddon?: ReactElement<InputAddonProps>;
}

export const Input = forwardRef<InputProps, 'input'>((props, ref) => {
  const {
    label,
    errors,
    rightElement,
    leftElement,
    rightAddon,
    leftAddon,
    ...rest
  } = props;

  return (
    <FormControl isInvalid={Boolean(errors)}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        {leftAddon ?? null}
        {leftElement ?? null}
        <ChakraInput {...rest} ref={ref} borderColor="#212121" />
        {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
        {rightAddon ?? null}
      </InputGroup>
      <FormErrorMessage>{errors?.message}</FormErrorMessage>
    </FormControl>
  );
});
