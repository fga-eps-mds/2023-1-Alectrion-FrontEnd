<div align="center">
    <img src="https://github.com/fga-eps-mds/2022-1-Alectrion-DOC/blob/gh-pages/docs/documentation/Documentos/Identidade%20Visual/S%C3%ADmbolo_Alectrion.png?raw=true" height="350px" width="350px">
</div>

## Sobre

Alectrion é um sistema de gerenciamento de inventário, ordens de serviços e movimentações de equipamentos de informática,
feito para atender às demandas da DSTI (Divisão de Suporte Técnico Interno) da Polícia Civil do estado de Goiás.

Aplicação disponível em: [link da aplicação](https://alectrion-2023.herokuapp.com/)

## Requisitos
### Localmente
- yarn (versão 1.22.18)
### Docker
- Docker
- Docker-compose

## Instalação

1. Clone o projeto

> git clone https://github.com/fga-eps-mds/2023-1-Alectrion-FrontEnd

2. Entre na pasta do projeto

> cd 2023-1-Alectrion-FrontEnd

3. Crie um arquivo .env da mesma forma do arquivo .env.example 
### Localmente
4. instale as dependências

> yarn

5. execute o projeto

> yarn dev

### Docker
4. Crie a network ```alectrion-network``` caso ela não exista. Para verificar se a network existe execute:

> docker network ls

Se a network não existir execute o seguinte comando para criar
> docker network create alectrion-network

5. Execute o projeto
    
> docker-compose up

A aplicação estará disponível na porta 3000

## Ambientes

- [Documentação](https://github.com/fga-eps-mds/2023-1-Alectrion-DOC)

- [Front-End](https://github.com/fga-eps-mds/2023-1-Alectrion-FrontEnd)

- [Back-End: UserAPI](https://github.com/fga-eps-mds/2023-1-Alectrion-UserAPI)
  
- [Back-End: EquipamentAPI](https://github.com/fga-eps-mds/2023-1-Alectrion-EquipamentApi) 

- [Back-End: GateWay](https://github.com/fga-eps-mds/2023-1-Alectrion-Gateway) 
