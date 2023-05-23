/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */

import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { BsCalendar3 } from 'react-icons/bs';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import pt from 'date-fns/locale/pt-BR';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt', pt);

type Props<FormValues extends FieldValues> = Omit<
  ReactDatePickerProps,
  'onChange'
> &
  UseControllerProps<FormValues> & {
    label?: string;
    placeHolder?: string;
  };

export function Datepicker<FormValues extends FieldValues>({
  control,
  name,
  id,
  label,
  placeHolder,
  rules,
  ...props
}: Props<FormValues>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <FormControl isInvalid={!!error} id={id} cursor="pointer" userSelect="none">
      <FormLabel cursor="pointer">{label}</FormLabel>

      <InputGroup display="block" zIndex={+1}>
        <Box>
          <ReactDatePicker
            selected={value as Date}
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value as string}
            locale="pt"
            dateFormat="dd/MM/yyyy"
            // minDate={new Date()}
            placeholderText={placeHolder}
            // showTimeInput
            // timeInputLabel="Hora"
            fixedHeight
            customInput={<Input borderColor="#212121" />}
            {...props}
          />
        </Box>
        <InputRightElement color="gray.500" pointerEvents="none" zIndex={-1}>
          <Icon as={BsCalendar3} color="#212121" fontSize="lg" />
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}
