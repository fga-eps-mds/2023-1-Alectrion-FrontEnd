import { AxiosRequestConfig } from 'axios';

import { api } from '@/services/api';
import { CreateEquipmentPayload } from './types';

export const createEquipment = async (
  equipmentPayload: CreateEquipmentPayload
): Promise<Result<{ result: any }>> => {
  try {
    const response = await api.post('equipment/createEquipment', {
      ...equipmentPayload,
    });

    return { type: 'success', value: response?.data };
  } catch (error: Error | any) {
    return { type: 'error', error };
  }
};
