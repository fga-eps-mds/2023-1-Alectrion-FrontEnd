export type SelectItem<T> = {
  value: T;
  key: string;
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
  { value: 'CPU', key: 'cpu' },
  { value: 'Escaneador', key: 'escaneador' },
  { value: 'Estabilizador', key: 'estabilizador' },
  { value: 'Monitor', key: 'monitor' },
  { value: 'Nobreak', key: 'nobreak' },
  { value: 'Webcam', key: 'webcam' },
];

export const ESTADOS_EQUIPAMENTO = [
  { value: 'NOVO', key: 'novo' },
  { value: 'USADO', key: 'usado' },
];
