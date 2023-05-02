import { GridItem, Select, Text } from '@chakra-ui/react';

export type SelectItem = {
  value: string;
  key: string;
};

type EquipmentRegisterSelectFieldProps = {
  title: string;
  name: string;
  items: SelectItem[];
};

export default function EquipmentRegisterSelectField({
  title,
  name,
  items,
}: EquipmentRegisterSelectFieldProps) {
  return (
    <GridItem
      minW="270px"
      w="100%"
      h="61px"
      display="flex"
      flexDirection="column"
    >
      <Text>{title}</Text>
      <Select name={name}>
        {items.map((item) => (
          <option key={item.key} value={item.value}>
            {item.value}
          </option>
        ))}
      </Select>
    </GridItem>
  );
}
