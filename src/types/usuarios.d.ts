/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
interface IUser {
  id: string;
  email: string;
  username: string;
  name: string;

  position: string;
  profile: Access;

  confirmationToken?: string;
  recoverToken?: string;

  active?: boolean;
}

interface LoggedUser {
  id: string;
  username: string;
  name: string;
  job_role: string;
  access: strings;
}

interface RegisterUserPayload {
  username: string;
  email: string;
  name: string;
  cpf: string;
  role: string;
  jobFunction: string;
  password: string;
  confirmPassword: string;
}

interface CredentialUser {
  username: string;
  password: string;
}

interface CredentialUserPayload {
  username: string;
  password: string;
}

interface CredentialUserPasswordRecover {
  email: string;
}
