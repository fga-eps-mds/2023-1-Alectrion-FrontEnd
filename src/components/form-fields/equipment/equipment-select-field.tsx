/* eslint-disable prettier/prettier */
import React from 'react';
import { GridItem, Select, Text } from '@chakra-ui/react';
import { SelectItem } from '@/constants/equipment';
import { ControlledSelect } from '@/components/form-fields/controlled-select';

type EquipmentSelectFieldProps<T> = {
  title: string;
  name: string;
  items: SelectItem<T>[];
  defaultValue?: string;
  onChange: (tipo: T) => void;
};

export default function EquipmentSelectField<T>({
  title,
  name,
  items,
  defaultValue,
  onChange,
}: EquipmentSelectFieldProps<T>) {
  return (
    <GridItem
      minW="270px"
      w="100%"
      h="61px"
      display="flex"
      flexDirection="column"
    >
      <Text>{title}</Text>
      <Select
        name={name}
        defaultValue={defaultValue}
        onChange={(event) => onChange(event.target.value as unknown as T)}
      >
        {items.map((item) => (
          <option key={item.key} value={item.value as unknown as string}>
            {item.value as unknown as string}
          </option>
        ))}
      </Select>
    </GridItem>
  );
}
