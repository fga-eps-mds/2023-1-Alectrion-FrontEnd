import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://alectrion-gateway-2023.herokuapp.com/',
});
