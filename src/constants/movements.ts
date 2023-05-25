export type SelectItem<T> = {
  label: T;
  value: string;
};
export type TipoLotacao = 'Empréstimo' | 'Responsabilidade' | 'Baixa';

export const TIPOS_LOTACAO: SelectItem<TipoLotacao>[] = [
  { label: 'Empréstimo', value: '0' },
  { label: 'Baixa', value: '1' },
  { label: 'Responsabilidade', value: '2' },
];

export const MovimentacaoTipoMap = new Map<number, string>([
  [0, 'Empréstimo'],
  [1, 'Baixa'],
  [2, 'Responsabilidade'],
]);

export type TipoMovimentacao = 'Empréstimo' | 'Baixa' | 'Responsabilidade';
export const TIPOS_MOVIMENTACAO: SelectItem<TipoMovimentacao>[] = [
  { label: 'Empréstimo', value: '0' },
  { label: 'Baixa', value: '1' },
  { label: 'Responsabilidade', value: '2' },
];
