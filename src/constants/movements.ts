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

export type Mes =
  | 'Janeiro'
  | 'Fevereiro'
  | 'Março'
  | 'Abril'
  | 'Maio'
  | 'Junho'
  | 'Julho'
  | 'Agosto'
  | 'Setembro'
  | 'Outubro'
  | 'Novembro'
  | 'Dezembro';
export const MONTH_OPTIONS: SelectItem<Mes>[] = [
  { label: 'Janeiro', value: '1' },
  { label: 'Fevereiro', value: '2' },
  { label: 'Março', value: '3' },
  { label: 'Abril', value: '4' },
  { label: 'Maio', value: '5' },
  { label: 'Junho', value: '6' },
  { label: 'Julho', value: '7' },
  { label: 'Agosto', value: '8' },
  { label: 'Setembro', value: '9' },
  { label: 'Outubro', value: '10' },
  { label: 'Novembro', value: '11' },
  { label: 'Dezembro', value: '12' },
];

export type Semestre = '1º Semestre' | '2º Semestre';
export const SEMESTER_OPTIONS: SelectItem<Semestre>[] = [
  { label: '1º Semestre', value: '0' },
  { label: '2º Semestre', value: '1' },
];
