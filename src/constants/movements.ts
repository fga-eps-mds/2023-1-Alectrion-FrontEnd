import { SelectItem } from "./equipment";

export const MovimentacaoTipoMap = new Map<number, string>([
  [0, 'Empréstimo'],
  [1, 'Baixa'],
  [2, 'Responsabilidade'],
]);

export type TipoMovimentacao = 'Empréstimo'|'Baixa'|'Responsabilidade'
export const TIPOS_MOVIMENTACAO: SelectItem<TipoMovimentacao>[]=[
  {label:'Empréstimo',value:'0'},
  {label:'Baixa',value:'1'},
  {label:'Responsabilidade',value:'2'}
]