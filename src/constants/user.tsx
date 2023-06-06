/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
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
  CONSULTA = 'consulta'
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
  id?: string

  name: string

  email: string

  username: string

  job: Job

  role: Role

  password: string

  createdAt?: Date

  updatedAt?: Date

  deletedAt?: Date

  isDeleted?: boolean
}

export interface LoginResponse {
  token: string

  expireIn: string

  email: string

  name: string

  role: string
  
  job?: string
}