/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { OrderServiceEditModal } from './OrderServiceEditModal';
import { api } from '../../config/lib/axios';

function transformFields(orderService: { id: string }): any {
  throw new Error('Function not implemented.');
}
describe('OrderServiceEditModal', () => {
  const orderService = {
    id: 'order-service-id',
  };

  test('renders the modal with correct title', () => {
    render(
      <OrderServiceEditModal
        isOpen
        onClose={() => {}}
        orderService={orderService}
        refreshRequest={false}
        setRefreshRequest={() => {}}
      />
    );

    expect(
      screen.getByText(`Ordem de Serviço #${orderService.id}`)
    ).toBeInTheDocument();
  });

  test('renders the modal content with OrderServiceEditForm', () => {
    render(
      <OrderServiceEditModal
        isOpen
        onClose={() => {}}
        orderService={orderService}
        refreshRequest={false}
        setRefreshRequest={() => {}}
      />
    );

    expect(screen.getByTestId('order-service-edit-form')).toBeInTheDocument();
  });

  test('calls onClose when modal is closed', () => {
    const mockOnClose = vi.fn();

    render(
      <OrderServiceEditModal
        isOpen
        onClose={mockOnClose}
        orderService={orderService}
        refreshRequest={false}
        setRefreshRequest={() => {}}
      />
    );

    fireEvent.click(screen.getByLabelText('Fechar modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  test('renders the modal with correct title', () => {
    render(
      <OrderServiceEditModal
        isOpen
        onClose={() => {}}
        orderService={orderService}
        refreshRequest={false}
        setRefreshRequest={() => {}}
      />
    );

    expect(
      screen.getByText(`Ordem de Serviço #${orderService.id}`)
    ).toBeInTheDocument();
  });

  test('renders the modal content with OrderServiceEditForm', () => {
    render(
      <OrderServiceEditModal
        isOpen
        onClose={() => {}}
        orderService={orderService}
        refreshRequest={false}
        setRefreshRequest={() => {}}
      />
    );

    expect(screen.getByTestId('order-service-edit-form')).toBeInTheDocument();
  });

  test('calls onClose when modal is closed', () => {
    const mockOnClose = vi.fn();

    render(
      <OrderServiceEditModal
        isOpen
        onClose={mockOnClose}
        orderService={orderService}
        refreshRequest={false}
        setRefreshRequest={() => {}}
      />
    );

    fireEvent.click(screen.getByLabelText('Fechar modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('passes correct orderService data to OrderServiceEditForm', () => {
    render(
      <OrderServiceEditModal
        isOpen
        onClose={() => {}}
        orderService={orderService}
        refreshRequest={false}
        setRefreshRequest={() => {}}
      />
    );

    const formComponent = screen.getByTestId('order-service-edit-form');
    expect(formComponent.props.orderService).toEqual(
      transformFields(orderService)
    );
  });

  test('refreshRequest is updated when setRefreshRequest is called', () => {
    let refreshRequestValue = false;
    const setRefreshRequest = (value: boolean) => {
      refreshRequestValue = value;
    };

    render(
      <OrderServiceEditModal
        isOpen
        onClose={() => {}}
        orderService={orderService}
        refreshRequest={refreshRequestValue}
        setRefreshRequest={setRefreshRequest}
      />
    );

    const formComponent = screen.getByTestId('order-service-edit-form');

    fireEvent.submit(formComponent); // Simulate form submission
    expect(refreshRequestValue).toBe(true);
  });
});
