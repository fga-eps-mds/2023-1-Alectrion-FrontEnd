export type SelectItem<T> = {
  label: T;
  value: string;
};

export type TipoEquipamento =
  | 'CPU'
  | 'Escaneador'
  | 'Estabilizador'
  | 'Monitor'
  | 'Nobreak'
  | 'Webcam';

export type TipoArmazenamento = 'HD' | 'SSD';
export type TipoMonitor = 'LCD' | 'LED';

export const TIPOS_ARMAZENAMENTO: SelectItem<TipoArmazenamento>[] = [
  { value: 'HD', key: 'HD' },
  { value: 'SSD', key: 'SSD' },
];

export const TIPOS_MONITOR: SelectItem<TipoMonitor>[] = [
  { value: 'LCD', key: 'LCD' },
  { value: 'LED', key: 'LED' },
];

export const TIPOS_EQUIPAMENTO: SelectItem<TipoEquipamento>[] = [
  { label: 'CPU', value: 'CPU' },
  { label: 'Escaneador', value: 'Escaneador' },
  { label: 'Estabilizador', value: 'Estabilizador' },
  { label: 'Monitor', value: 'Monitor' },
  { label: 'Nobreak', value: 'Nobreak' },
  { label: 'Webcam', value: 'Webcam' },
];

export const ESTADOS_EQUIPAMENTO = [
  { label: 'NOVO', value: 'Novo' },
  { label: 'USADO', value: 'Usado' },
];
