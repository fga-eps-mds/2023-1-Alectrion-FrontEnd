/* eslint-disable prettier/prettier */
import { GridItem, GridItemProps, Input, Text } from '@chakra-ui/react';

type EquipmentTextFieldProps = {
  title: string;
  name: string;
  defaultValue?: string | Date;
} & GridItemProps;

export default function EquipmentTextField({
  title,
  name,
  defaultValue,
  ...props
}: EquipmentTextFieldProps) {
  return (
    <GridItem
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      {...props}
    >
      <Text>{title}</Text>
      <Input name={name} defaultValue={defaultValue}/>
    </GridItem>
  );
}
