import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import EquipmentViewForm from '.';

const EQUIPMENT_EDIT_MOCK = {
  equipment: 'aaa',
  tippingNumber: 'tippingNumber',
  serialNumber: 'serialNumber',
  type: { id: '1', name: 'type' },
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

const EQUIPMENT_MOCK = {
  id: 'id',
  tippingNumber: 'tippingNumber',
  serialNumber: 'serialNumber',
  type: { id: '1', name: 'type' },
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

describe('EquipmentViewForm', () => {
  it('should render correctly', () => {
    render(
      <EquipmentViewForm
        equipmentEdit={EQUIPMENT_EDIT_MOCK}
        equipment={EQUIPMENT_MOCK}
        onClose={vi.fn()}
        handleEdit={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByText('Voltar')).toBeInTheDocument();
    expect(screen.getByText('Editar')).toBeInTheDocument();
  });

  it('should render cpu fields', async () => {
    const equipmentMock = { ...EQUIPMENT_MOCK, type: { name: 'CPU' } };

    render(
      <EquipmentViewForm
        equipmentEdit={EQUIPMENT_EDIT_MOCK}
        equipment={equipmentMock}
        onClose={vi.fn()}
        handleEdit={vi.fn()}
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

  it('should render monitor fields', async () => {
    const equipmentMock = { ...EQUIPMENT_MOCK, type: { name: 'Monitor' } };

    render(
      <EquipmentViewForm
        equipmentEdit={EQUIPMENT_EDIT_MOCK}
        equipment={equipmentMock}
        onClose={vi.fn()}
        handleEdit={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Tipo de monitor')).toBeInTheDocument();
    expect(screen.getByLabelText('Tamanho do Monitor')).toBeInTheDocument();
  });

  it('should render estabilizador fields', async () => {
    const equipmentMock = {
      ...EQUIPMENT_MOCK,
      type: { name: 'Estabilizador' },
    };

    render(
      <EquipmentViewForm
        equipmentEdit={EQUIPMENT_EDIT_MOCK}
        equipment={equipmentMock}
        onClose={vi.fn()}
        handleEdit={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Potência (VA)')).toBeInTheDocument();
  });

  it('should render Nobreak fields', async () => {
    const equipmentMock = { ...EQUIPMENT_MOCK, type: { name: 'Nobreak' } };

    render(
      <EquipmentViewForm
        equipmentEdit={EQUIPMENT_EDIT_MOCK}
        equipment={equipmentMock}
        onClose={vi.fn()}
        handleEdit={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Potência (VA)')).toBeInTheDocument();
  });
});
