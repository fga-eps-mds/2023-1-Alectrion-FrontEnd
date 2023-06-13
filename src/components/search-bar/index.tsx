import { Select, SingleValue } from 'chakra-react-select';
import { AxiosResponse } from 'axios';
import { useState } from 'react';
import { api } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/order-service/order-service-control';

interface ISelectOption {
  label: string;
  value: number | string;
}

type TippingNumberSearchBarProps = {
  equip: EquipmentData;
  changeEquipment: (equip: EquipmentData) => void;
};

const formattedOptions = <T, K extends keyof T>(
  data: T[],
  label: K,
  value: K
): ISelectOption[] => {
  return data?.map((item: T) => {
    const optionLable = String(item[label]);
    const optionValue: number | string = String(item[value]);
    return { label: optionLable, value: optionValue };
  });
};

export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  ms = 400
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export function TippingNumberSearchBar({
  equip,
  changeEquipment,
}: TippingNumberSearchBarProps) {
  const take = 5;
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);

  const fetchEquipments = async (str: string) => {
    try {
      const { data }: AxiosResponse<EquipmentData[]> = await api.get(
        `equipment/find?searchTipping=${str}&take=${take}`
      );
      setEquipments(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  const handleSearch = debounce(async (str) => {
    if (str !== '') {
      fetchEquipments(str);
    }
  }, 500);

  const handleChange = (event: SingleValue<ISelectOption>) => {
    const selectedOption = equipments.find(
      (equipment) => equipment.tippingNumber === event?.value
    );
    changeEquipment(selectedOption as EquipmentData);
  };

  return (
    <Select
      placeholder="Pesquisa"
      value={equip}
      onInputChange={handleSearch}
      onChange={handleChange}
      options={formattedOptions(equipments, 'tippingNumber', 'tippingNumber')}
    />
  );
}
