import {
  FormControl,
  Textarea,
  FormLabel,
  FormHelperText,
  forwardRef,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import {
  ChangeEvent,
  TextareaHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import { FieldError } from 'react-hook-form';

export interface InputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string | JSX.Element;
  errors: FieldError | undefined;
  maxChars: number;
}

export const TextArea = forwardRef<InputProps, 'textarea'>((props, ref) => {
  const { label, errors, maxChars, ...rest } = props;
  const [length, setLength] = useState<string>('0');

  const handleChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setLength(e.target.value.length.toString());
  }, []);

  return (
    <FormControl isInvalid={Boolean(errors)}>
      <FormLabel>{label}</FormLabel>
      <Textarea
        ref={ref}
        {...rest}
        cols={10}
        rows={1}
        textLength={100}
        wrap="nowrap"
        onChange={(e) => handleChange(e)}
        minH="5rem"
        borderColor="#212121"
        resize="none"
        maxLength={maxChars}
        focusBorderColor="primary"
      />
      <Flex justifyContent="space-between">
        <FormHelperText>{`${length} / ${maxChars} caracteres`}</FormHelperText>
        <FormErrorMessage>{errors?.message}</FormErrorMessage>
      </Flex>
    </FormControl>
  );
});
