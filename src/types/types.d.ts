/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
type ApiResponse<Data> = { data: Data; error: null | string; message: string };

type ServiceStatus = {
  APP: string;
};

type SelectOption<Value = number> = {
  label: string;
  value: Value;
};
