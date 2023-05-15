/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { IconType } from 'react-icons';
import { AiOutlineInfoCircle } from 'react-icons/ai';

export interface IRoute {
  label: string;
  pathname: string;
  icon?: IconType;
}

export const routes: IRoute[] = [
  {
    label: 'Info',
    pathname: '/info',
    icon: AiOutlineInfoCircle,
  },
];
