import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { api } from '@/config/lib/axios';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';

export const getEquipments = async (filter: string) => {
  console.log(filter);
  try {
    const { data }: AxiosResponse<EquipmentData[]> = await api.get(
      `equipment/find?${filter}`
    );
    return data;
  } catch (error) {
    toast.error('Nenhum Equipamento encontrado');
    return [];
  }
};
