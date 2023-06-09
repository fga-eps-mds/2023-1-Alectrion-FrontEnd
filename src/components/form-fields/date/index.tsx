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
    border?: boolean;
    startDate?: Date;
    endDate?: Date;
    monthPicker?: boolean;
    yearPicker?: boolean;
    outsideModal?: boolean;
  };

export function Datepicker<FormValues extends FieldValues>({
  control,
  name,
  id,
  label,
  placeHolder,
  border = true,
  yearPicker = false,
  outsideModal = false,
  rules,
  startDate,
  endDate,
  monthPicker = false,
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

  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const lowerDate = monthPicker ? firstDayOfMonth : startDate;
  const higherDate = monthPicker ? lastDayOfMonth : endDate;

  return (
    <FormControl isInvalid={!!error} id={id} cursor="pointer" userSelect="none">
      {label && <FormLabel cursor="pointer">{label}</FormLabel>}

      <InputGroup display="block" zIndex={+2}>
        <Box>
          {outsideModal ? (
            <ReactDatePicker
              portalId="root-portal"
              selected={value as Date}
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value as string}
              locale="pt"
              dateFormat="dd/MM/yyyy"
              minDate={lowerDate}
              maxDate={higherDate}
              showMonthYearPicker={monthPicker}
              showYearPicker={yearPicker}
              customInput={
                border ? (
                  <Input borderColor="#212121" fontSize="sm" />
                ) : (
                  <Input
                    fontSize="sm"
                    border="0px"
                    boxShadow="none"
                    placeholder={placeHolder}
                    sx={{ '::placeholder': { color: '#212121' } }}
                    _focus={{ border: 'none', boxShadow: 'none' }}
                  />
                )
              }
              // minDate={new Date()}
              // showTimeInput
              // timeInputLabel="Hora"
              fixedHeight
              {...props}
            />
          ) : (
            <ReactDatePicker
              selected={value as Date}
              name={name}
              ref={ref}
              onChange={onChange}
              onBlur={onBlur}
              value={value as string}
              locale="pt"
              dateFormat="dd/MM/yyyy"
              minDate={lowerDate}
              maxDate={higherDate}
              showMonthYearPicker={monthPicker}
              showYearPicker={yearPicker}
              customInput={
                border ? (
                  <Input borderColor="#212121" fontSize="sm" />
                ) : (
                  <Input
                    fontSize="sm"
                    border="0px"
                    boxShadow="none"
                    placeholder={placeHolder}
                    sx={{ '::placeholder': { color: '#212121' } }}
                    _focus={{ border: 'none', boxShadow: 'none' }}
                  />
                )
              }
              fixedHeight
              {...props}
            />
          )}
        </Box>
        <InputRightElement color="gray.500" pointerEvents="none" zIndex={-1}>
          <Icon as={BsCalendar3} color="#212121" fontSize="lg" />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error && error.message}</FormErrorMessage>
    </FormControl>
  );
}
