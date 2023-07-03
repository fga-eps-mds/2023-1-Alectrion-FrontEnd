import { colors } from '@/styles/Colors';

export type SelectItem<T> = {
  label: T;
  value: string;
};

export const OSStatusMap = new Map<string, string>([
  ['MAINTENANCE', 'Em manutenção'],
  ['CONCLUDED', 'Concluído'],
  ['WARRANTY', 'Garantia'],
]);

export const OSStatusStyleMap = new Map<
  string,
  { color: string; fontWeight: string; fontSize: string }
>([
  [
    'MAINTENANCE',
    { color: colors.primary, fontWeight: 'bold', fontSize: '16px' },
  ],
  [
    'CONCLUDED',
    { color: colors.green[700], fontWeight: 'bold', fontSize: '16px' },
  ],
  ['WARRANTY', { color: colors.red, fontWeight: 'bold', fontSize: '16px' }],
]);

export type TipoOS = 'Em manutenção' | 'Concluído' | 'Garantia';

export const OSSTATUS = [
  { label: 'Em manutenção', value: 'MAINTENANCE' },
  { label: 'Concluído', value: 'CONCLUDED' },
  { label: 'Garantia', value: 'WARRANTY' },
];
