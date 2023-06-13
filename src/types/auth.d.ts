/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
type SignInCredentials = {
  username: string;
  password: string;
};

type SignedUser = {
  token: string;
  name: string;
  email: string;
  expireIn: string;
  job: string;
  role: string;
};

export interface GetUserInfoResponse {
  username: string;
  email: string;
  userId: string;
  profile: 'ADMIN' | 'BASIC' | 'USER';
}

type AuthResponse = {
  token: string;
  name: string;
  email: string;
  expireIn: string;
  job: string;
  role: string;
};
