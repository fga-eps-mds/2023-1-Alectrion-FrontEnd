/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */

export type SelectItem<T> = {
  label: T;
  value: string;
};
export type TipoJob =
  | 'delegado'
  | 'agente de policia'
  | 'escrivao de policia'
  | 'coordenador'
  | 'chefe de secao'
  | 'generico'
  | 'comissionado'
  | 'estagiario'
  | 'superintendente';

export const TIPOS_JOB: SelectItem<TipoJob>[] = [
  { label: 'delegado', value: '0' },
  { label: 'agente de policia', value: '1' },
  { label: 'escrivao de policia', value: '2' },
  { label: 'coordenador', value: '3' },
  { label: 'chefe de secao', value: '4' },
  { label: 'generico', value: '5' },
  { label: 'comissionado', value: '6' },
  { label: 'estagiario', value: '7' },
  { label: 'superintendente', value: '8' },
];

export enum USER_ACCESS {
  BASIC = 'Básico',
  SEARCH = 'Consulta',
  MANAGER = 'Gerente',
  ADMIN = 'Administrador',
}

export enum Role {
  ADMIN = 'administrador',
  GERENTE = 'gerente',
  BASICO = 'basico',
  CONSULTA = 'consulta',
}

export enum Job {
  DELEGADO = 'delegado',
  AGENTE_POLICIA = 'agente de policia',
  ESCRIVAO = 'escrivao de policia',
  COORDENADOR = 'coordenador',
  CHEFE_SECAO = 'chefe de secao',
  GENERICO = 'generico',
  COMISSIONADO = 'comissionado',
  ESTAGIARIO = 'estagiario',
  SUPERINTENDENTE = 'superintendente',
}

export interface User {
  id?: string;

  name: string;

  email: string;

  username: string;

  job: Job;

  role: Role;

  password: string;

  createdAt?: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  isDeleted?: boolean;
}

export interface LoginResponse {
  token: string;

  expireIn: string;

  email: string;

  name: string;

  role: string;

  job?: string;
}
