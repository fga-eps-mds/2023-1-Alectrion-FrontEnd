import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import MovementForm from '.';

const SELECTED_EQUIPMENT_MOCK = {
  tippingNumber: 'tippingNumber',
  serialNumber: 'serialNumber',
  type: 'type',
  situacao: 'situacao',
  estado: 'estado',
  model: 'model',
  acquisitionDate: new Date(2000, 1, 1),
  description: 'description',
  screenSize: 'screenSize',
  power: 'power',
  screenType: 'screenType',
  processor: 'processor',
  storageType: 'storageType',
  storageAmount: 'storageAmount',
  ram_size: 'ram_size',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  id: 'id',
  brand: {
    name: 'name',
  },
  acquisition: { name: 'name' },
  unit: {
    name: 'name',
    localization: 'localization',
  },
};

describe('MovementForm', () => {
  it('should render correctly', () => {
    render(
      <MovementForm
        onClose={vi.fn()}
        lenghtMovements={10}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
        selectedEquipmentToMovement={[SELECTED_EQUIPMENT_MOCK]}
        setSelectedMovement={vi.fn()}
        onOpenTerm={vi.fn()}
      />
    );

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Gerar Movimentação')).toBeInTheDocument();
  });
});
