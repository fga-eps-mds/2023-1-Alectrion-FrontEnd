import axios from 'axios';
import { useToast } from '@chakra-ui/react';

export const api = axios.create({
  baseURL: 'https://alectrion-gateway-2023.herokuapp.com/',
});

const errorResponseHandler = (error: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast();
  if (error?.response) {
    if (typeof error?.response?.data === 'string') {
      toast({
        title: 'Erro Interno do Servidor.',
        description: 'Não foi possível executar a solicitação.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return Promise.reject(new Error(error.response.data));
    }
    return Promise.reject(new Error('Something went wrong'));
  }
  if (error?.request) {
    console.error('INTERNAL SERVER ERROR: ', error?.toJSON?.());
    toast({
      title: 'Erro Interno do Servidor.',
      description: 'Não foi possível executar a solicitação.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
    return Promise.reject(new Error('Internal server error'));
  }
  return Promise.reject(error);
};

api.interceptors.response.use((response) => response, errorResponseHandler);
