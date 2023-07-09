import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { api } from '@/config/lib/axios';
import { movement } from '@/pages/movements/MovementControl';

export const getMovements = async (filter: string) => {
  console.log(filter);
  try {
    const { data }: AxiosResponse<movement[]> = await api.get(
      `equipment/listMovement?${filter}`
    );
    return data;
  } catch (error) {
    toast.error('Nenhuma movimentação encontrada');
    return [];
  }
};
