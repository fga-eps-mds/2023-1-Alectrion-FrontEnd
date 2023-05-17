export const mockData = [
  {
    id: 13276989755488998,
    tipo: 'Emprestimo',
    destino: 'Divisão de Suporte Técnico',
    data: '01/05/2023',
    quantidade: 2,
    postoTrabalho: '01ª Delegacia Distrital',
    cidade: 'Águas Lindas',
    tipoLotacao: 'Empréstimo',
    responsavel: 'Nome da pessoa responsável',
    atribuicao: 'Delegado de Polícia',
    responsavelTermo: 'Nome da pessoa responsável',
    atribuicaoTermo: 'Delegado de Polícia',
    materiais: [
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '111111',
      },
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '222222',
      },
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '333333',
      },
    ],
  },
  {
    id: 7798791893792675,
    tipo: 'Responsabilidade',
    destino: 'Escola Superior de Polícia Civil',
    data: '03/05/2023',
    quantidade: 1,
    postoTrabalho: '01ª Delegacia Distrital',
    cidade: 'Águas Lindas',
    tipoLotacao: 'Empréstimo',
    responsavel: 'Nome da pessoa responsável',
    atribuicao: 'Delegado de Polícia',
    responsavelTermo: 'Nome da pessoa responsável',
    atribuicaoTermo: 'Delegado de Polícia',
    materiais: [
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '444444',
      },
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '555555',
      },
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '666666',
      },
    ],
  },
  {
    id: 34367686545435764,
    tipo: 'Emprestimo',
    destino: 'Escola Superior de Polícia Civil',
    data: '05/05/2023',
    quantidade: 3,
    postoTrabalho: '01ª Delegacia Distrital',
    cidade: 'Águas Lindas',
    tipoLotacao: 'Empréstimo',
    responsavel: 'Nome da pessoa responsável',
    atribuicao: 'Delegado de Polícia',
    responsavelTermo: 'Nome da pessoa responsável',
    atribuicaoTermo: 'Delegado de Polícia',
    materiais: [
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '777777',
      },
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '888888',
      },
      {
        equipamento: 'Monitor Dell 1080p24',
        tombamento: 'R42KXD546',
        nmrSerie: '999999',
      },
    ],
  },
];
export const MovimentacaoTipoMap = new Map<number, string>([
  [0, 'Empréstimo'],
  [1, 'Baixa'],
  [2, 'Responsabilidade'],
]);
