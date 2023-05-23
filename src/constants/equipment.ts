/* eslint-disable prettier/prettier */
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
  | 'Webcam'
  | 'Hub'
  | 'Switch'
  | 'Notebook'
  | 'Datashow'
  | 'Scanner'
  | 'Impressora'
  | 'Roteador'
  | 'Tablet'
  | 'Tv'
  | 'Fax'
  | 'Telefone'
  | 'Smartphone'
  | 'Projetor'
  | 'Tela de Projeção'
  | 'Camera'
  | 'Caixa de som'
  | 'Impressora térmica'
  | 'Leitor de codigo de barras'
  | 'Mesa Digitalizadora'
  | 'Leitor biométrico'
  | 'Receptor'
  | 'Extrator de dados'
  | 'Transformador'
  | 'Coletor de Assinatura'
  | 'Kit cenário'
  | 'Dispositivo de biometria facial'
  | 'Servidor de rede'
  | 'Hd Externo';

export type TipoArmazenamento = 'HD' | 'SSD';
export type TipoMonitor = 'LCD' | 'LED';

export const TIPOS_ARMAZENAMENTO: SelectItem<TipoArmazenamento>[] = [
  { label: 'HD', value: 'HD' },
  { label: 'SSD', value: 'SSD' },
];

export const TIPOS_MONITOR: SelectItem<TipoMonitor>[] = [
  { label: 'LCD', value: 'LCD' },
  { label: 'LED', value: 'LED' },
];

export const TIPOS_EQUIPAMENTO: SelectItem<TipoEquipamento>[] = [
  { label: 'CPU', value: 'CPU' },
  { label: 'Escaneador', value: 'Escaneador' },
  { label: 'Estabilizador', value: 'Estabilizador' },
  { label: 'Monitor', value: 'Monitor' },
  { label: 'Nobreak', value: 'Nobreak' },
  { label: 'Webcam', value: 'Webcam' },
  { label: 'Hub', value: 'Hub' },
  { label: 'Switch', value: 'Switch' },
  { label: 'Notebook', value: 'Notebook' },
  { label: 'Datashow', value: 'Datashow' },
  { label: 'Scanner', value: 'Scanner' },
  { label: 'Impressora', value: 'Impressora' },
  { label: 'Roteador', value: 'Roteador' },
  { label: 'Tablet', value: 'Tablet' },
  { label: 'Tv', value: 'Tv' },
  { label: 'Fax', value: 'Fax' },
  { label: 'Telefone', value: 'Telefone' },
  { label: 'Smartphone', value: 'Smartphone' },
  { label: 'Projetor', value: 'Projetor' },
  { label: 'Tela de Projeção', value: 'Tela de Projeção' },
  { label: 'Camera', value: 'Camera' },
  { label: 'Caixa de som', value: 'Caixa de som' },
  { label: 'Impressora térmica', value: 'Impressora térmica' },
  { label: 'Leitor de codigo de barras', value: 'Leitor de codigo de barras' },
  { label: 'Mesa Digitalizadora', value: 'Mesa Digitalizadora' },
  { label: 'Leitor biométrico', value: 'Leitor biométrico' },
  { label: 'Receptor', value: 'Receptor' },
  { label: 'Extrator de dados', value: 'Extrator de dados' },
  { label: 'Transformador', value: 'Transformador' },
  { label: 'Coletor de Assinatura', value: 'Coletor de Assinatura' },
  { label: 'Kit cenário', value: 'Kit cenário' },
  {
    label: 'Dispositivo de biometria facial',
    value: 'Dispositivo de biometria facial',
  },
  { label: 'Servidor de rede', value: 'Servidor de rede' },
  { label: 'Hd Externo', value: 'Hd Externo' },
];

export const ESTADOS_EQUIPAMENTO = [
  { label: 'NOVO', value: 'Novo' },
  { label: 'USADO', value: 'Usado' },
];

export const STATUS = [
  { label: 'Ativo', value: 'Ativo' },
  { label: 'Baixado', value: 'Baixado' },
  { label: 'Empréstimo', value: 'Ativo Empréstimo' },
  { label: 'Estoque', value: 'Estoque' },
  { label: 'Manutenção', value: 'Manutenção' },
  { label: 'Reserva Técnica', value: 'Reserva Técnica' },
];

export interface Workstation {
  id: string;
  name: string;
  phone: string;
  ip: string;
  gateway: string;
  is_regional: boolean;
  city: {
    id : string;
    name: string;
    state: string;
  };
  parent_workstation: Workstation | null;
  child_workstations: Workstation[];
}
