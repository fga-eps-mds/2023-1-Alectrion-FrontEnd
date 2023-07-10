export type SelectItem<T> = {
  label: T;
  value: string;
};

export const TIPOS_RELATORIO: SelectItem<TipoRelatorio>[] = [
  { label: 'Ordem de servico', value: 'Ordem de servico' },
  { label: 'Movimentacao', value: 'Movimentacao' },
  { label: 'Equipamento', value: 'Equipamento' },
];

export type TipoRelatorio = 'Ordem de servico' | 'Movimentacao' | 'Equipamento';
