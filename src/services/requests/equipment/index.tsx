import { Type } from 'react-toastify/dist/utils';
import { api } from '@/services/api';
import { CreateEquipmentPayload } from './types';
import { UpdateEquipmentPayload } from './types';

export const createEquipment = async (
  equipmentPayload: CreateEquipmentPayload
): Promise<Result<{ result: Type }>> => {
  try {
    const response = await api.post('equipment/createEquipment', {
      ...equipmentPayload,
    });

    return { type: 'success', value: response?.data };
  } catch (error) {
    if (error instanceof Error) {
      return { type: 'error', error };
    }

    // Tratamento de erro para caso não seja do tipo 'Error'
    return { type: 'error', error: new Error('An unknown error occurred.') };
  }
};

export const updateEquipment = async (
  equipmentPayload: UpdateEquipmentPayload
): Promise<Result<{ result: any }>> => {
  try {
    const response = await api.put('equipment/updateEquipment', {
      ...equipmentPayload,
    });

    return { type: 'success', value: response?.data };
  } catch (error: Error | any) {
    return { type: 'error', error };
  }
};
