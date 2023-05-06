/* eslint-disable prettier/prettier */
import { GridItem, GridItemProps, Input, Text } from '@chakra-ui/react';

type EquipmentTextFieldProps = {
  title: string;
  name: string;
} & GridItemProps;

export default function EquipmentTextField({
  title,
  name,
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
      <Input name={name} />
    </GridItem>
  );
}
