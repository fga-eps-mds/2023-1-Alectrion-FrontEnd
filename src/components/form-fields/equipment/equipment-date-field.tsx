/* eslint-disable prettier/prettier */
import { GridItem, GridItemProps, Input, Text } from '@chakra-ui/react';

type EquipmentDateFieldProps = {
  title: string;
  name: string;
  defaultValue?: string;
};

export default function EquipmentDateField({
  title,
  name,
  defaultValue,
  ...props
}: EquipmentDateFieldProps) {
  return (
    <GridItem
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      {...props}
    >
      <Text>{title}</Text>
      <Input name={name} defaultValue={defaultValue} type="date"/>
    </GridItem>
  );
}
