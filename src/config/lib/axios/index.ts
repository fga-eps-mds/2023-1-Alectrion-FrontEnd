/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000/',
});

export const apiSchedula = axios.create({
  baseURL: 'https://prd-2023-1-schedula-localidade.herokuapp.com/',
});
export const schedulaApi = axios.create({
  baseURL: 'https://prd-2023-1-schedula-localidade.herokuapp.com/workstations',
});
