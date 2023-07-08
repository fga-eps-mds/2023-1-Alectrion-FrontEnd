import { screen, render } from '@testing-library/react';
import { vi } from 'vitest';
import OrderServiceEditForm from '.';

const ORDER_SERVICE_MOCK = {
  equipment: {
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
  },
  equipmentId: 'equipmentId',
  seiProcess: 'seiProcess',
  id: 'id',
  status: 'status',
  description: 'description',
  finishDate: 'finishDate',
  withdrawalName: 'withdrawalName',
  withdrawalDocument: 'withdrawalDocument',
  senderName: 'senderName',
  senderDocument: 'senderDocument',
  technicianName: 'technicianName',
};

describe('OrderServiceEditForm', () => {
  it('should render correctly', () => {
    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={ORDER_SERVICE_MOCK}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('should render concluded status fields', () => {
    const orderServiceMock = { ...ORDER_SERVICE_MOCK, status: 'CONCLUDED' };

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceMock}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(
      screen.getByLabelText('Responsável pela retirada')
    ).toBeInTheDocument();
    expect(screen.getAllByLabelText('CPF ou Nº Funcional')).toHaveLength(2);
    expect(screen.getByLabelText('Técnico Responsável')).toBeInTheDocument();
  });
});
