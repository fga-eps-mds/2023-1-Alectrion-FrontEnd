import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import EquipmentEditForm from '.';

const EQUIPMENT_MOCK = {
  tippingNumber: 'tippingNumber',
  serialNumber: 'serialNumber',
  type: { name: 'type' },
  situacao: 'situacao',
  model: 'model',
  description: 'description',
  acquisitionDate: new Date(2000, 1, 1),
  screenSize: 'screenSize',
  power: 'power',
  screenType: 'screenType',
  processor: 'processor',
  storageType: 'storageType',
  storageAmount: 'storageAmount',
  brandName: 'brandName',
  acquisition: { name: 'name' },
  unitId: 'unitId',
  ram_size: 'ram_size',
  estado: 'estado',
};

describe('EquipmentEditForm', () => {
  it('should render correctly', () => {
    render(
      <EquipmentEditForm
        onClose={vi.fn()}
        equip={EQUIPMENT_MOCK}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
  });

  it('should render cpu fields', () => {
    const equipmentMock = { ...EQUIPMENT_MOCK, type: { name: 'CPU' } };
    render(
      <EquipmentEditForm
        onClose={vi.fn()}
        equip={equipmentMock}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Qtd. Memória RAM (GB)')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de armazenamento')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Qtd. Armazenamento (GB)')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Processador')).toBeInTheDocument();
  });

  it('should render monitor fields', () => {
    const equipmentMock = { ...EQUIPMENT_MOCK, type: { name: 'Monitor' } };
    render(
      <EquipmentEditForm
        onClose={vi.fn()}
        equip={equipmentMock}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Tipo de monitor')).toBeInTheDocument();
    expect(screen.getByLabelText('Tamanho do Monitor')).toBeInTheDocument();
  });

  it('should render estabilizador fields', () => {
    const equipmentMock = {
      ...EQUIPMENT_MOCK,
      type: { name: 'Estabilizador' },
    };
    render(
      <EquipmentEditForm
        onClose={vi.fn()}
        equip={equipmentMock}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Potência (VA)')).toBeInTheDocument();
  });

  it('should render Nobreak fields', () => {
    const equipmentMock = { ...EQUIPMENT_MOCK, type: { name: 'Nobreak' } };
    render(
      <EquipmentEditForm
        onClose={vi.fn()}
        equip={equipmentMock}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Potência (VA)')).toBeInTheDocument();
  });
});
