/* eslint-disable prettier/prettier */
/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
    import {
      FieldValues,
      useController,
      UseControllerProps,
    } from 'react-hook-form';
    import {
      FormControl,
      FormErrorMessage,
      FormLabel,
      SelectProps,
    } from '@chakra-ui/react';
    import { Props, Select } from 'chakra-react-select';
    
    import { handleEmptyOptions } from './handle-empty-options';
    import { chakraStyles, customComponents } from './styles';
    
    type ControlledSelectProps<FormValues extends FieldValues> =
      UseControllerProps<FormValues> &
        SelectProps &
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Props<any> & {
          label?: string;
        };
    
    export function ControlledSelect<FormValues extends FieldValues>({
      control,
      name,
      id,
      label,
      rules,
      options,
      ...props
    }: ControlledSelectProps<FormValues>) {
      const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      } = useController<FormValues>({
        name,
        control,
        rules,
      });
    
      const updatedOptions = options ? [{ label: 'Selecionar', value: undefined }, ...options]: [];
      
      return (
        <FormControl isInvalid={!!error} id={id} cursor="pointer" userSelect="none">
          {label && <FormLabel cursor="pointer">{label}</FormLabel>}
          <Select
            name={name}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            value={value === undefined ? "" : value}
            chakraStyles={chakraStyles}
            openMenuOnFocus
            noOptionsMessage={handleEmptyOptions}
            hideSelectedOptions={false}
            tabSelectsValue={false}
            components={customComponents}
            options={updatedOptions}
            {...props}
          />
    
          <FormErrorMessage>{error && error?.message}</FormErrorMessage>
        </FormControl>
      );
    }
    
    
