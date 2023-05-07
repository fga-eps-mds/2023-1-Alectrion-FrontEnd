import {
  FormControl,
  Textarea,
  FormLabel,
  FormHelperText,
  InputProps as ChakraInputProps,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps extends ChakraInputProps {
  label: string | JSX.Element;
  errors: FieldError | undefined;
  maxChars: number;
}

export function TextArea(props: InputProps) {
  const { label, errors, maxChars } = props;

  const [text, setText] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };
  return (
    <FormControl isInvalid={Boolean(errors)}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        value={text}
        onChange={handleChange}
        minH="7rem"
        borderColor="#212121"
        resize="none"
        maxLength={maxChars}
        focusBorderColor="primary"
      />
      <FormHelperText>{`${text.length} / ${maxChars} caracteres`}</FormHelperText>
    </FormControl>
  );
}
