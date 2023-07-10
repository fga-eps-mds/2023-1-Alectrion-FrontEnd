import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { api } from '@/config/lib/axios';
import { OrderServiceData } from '@/pages/order-service/OrderServiceControl';

export const getOrderServices = async (filter: string) => {
  console.log(filter);
  try {
    const { data }: AxiosResponse<OrderServiceData[]> = await api.get(
      `equipment/listOrderService?${filter}`
    );
    return data;
  } catch (error) {
    toast.error('Nenhuma Ordem de Serviço encontrada');
    return [];
  }
};
