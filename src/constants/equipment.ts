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
  { value: 'HD', key: 'hd' },
  { value: 'SSD', key: 'ssd' },
];

export const TIPOS_MONITOR: SelectItem<TipoMonitor>[] = [
  { value: 'LCD', key: 'lcd' },
  { value: 'LED', key: 'led' },
];

export const TIPOS_EQUIPAMENTO: SelectItem<TipoEquipamento>[] = [
  { label: 'CPU', value: 'cpu' },
  { label: 'Escaneador', value: 'escaneador' },
  { label: 'Estabilizador', value: 'estabilizador' },
  { label: 'Monitor', value: 'monitor' },
  { label: 'Nobreak', value: 'nobreak' },
  { label: 'Webcam', value: 'webcam' },
];

export const ESTADOS_EQUIPAMENTO = [
  { label: 'NOVO', value: 'novo' },
  { label: 'USADO', value: 'usado' },
];
