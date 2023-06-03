export const OSStatusMap = new Map<string, string>([
    ['MAINTENANCE', 'Em manutenção'],
    ['CONCLUDED' , 'Concluído'],
    ['WARRANTY', 'Garantia'],
  ]);

export const OSStatusStyleMap = new Map<string, { color: string; fontWeight: string }>([
    ['MAINTENANCE', { color: 'black', fontWeight: 'semibold' }],
    ['CONCLUDED', { color: 'green', fontWeight: 'semibold' }],
    ['WARRANTY', { color: 'orange', fontWeight: 'semibold' }],
  ]);