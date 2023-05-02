import { GridItem, GridItemProps, Input, Text } from '@chakra-ui/react';

type EquipmentRegisterTextFieldProps = {
  title: string;
  name: string;
} & GridItemProps;

export default function EquipmentRegisterTextField({
  title,
  name,
  ...props
}: EquipmentRegisterTextFieldProps) {
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
