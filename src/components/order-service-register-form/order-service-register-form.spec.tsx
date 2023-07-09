import { render, screen, fireEvent } from '@testing-library/react';
import { OrderServiceRegisterForm } from '.';

describe('OrderServiceRegisterForm', () => {
  it('renders the form fields', () => {
    render(
      <OrderServiceRegisterForm
        onClose={jest.fn()}
        refreshRequest={false}
        setRefreshRequest={jest.fn()}
        onOpenTerm={jest.fn()}
      />
    );

    // Assert that the form fields are rendered
    expect(
      screen.getByLabelText('Nº de tombamento do equipamento:')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo')).toBeInTheDocument();
    expect(screen.getByLabelText('Nº de série:')).toBeInTheDocument();
    expect(screen.getByLabelText('Marca')).toBeInTheDocument();
    expect(screen.getByLabelText('Modelo')).toBeInTheDocument();
    expect(screen.getByLabelText('Lotação')).toBeInTheDocument();
    expect(screen.getByLabelText('Situação')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Responsável pela entrega')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('CPF ou Nº Funcional')).toBeInTheDocument();
    expect(screen.getByLabelText('Telefone')).toBeInTheDocument();
    expect(screen.getByLabelText('Processo SEI')).toBeInTheDocument();
    expect(screen.getByLabelText('Defeito do Equipamento')).toBeInTheDocument();

    // Assert the presence of buttons
    expect(
      screen.getByRole('button', { name: 'Cancelar' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirmar' })
    ).toBeInTheDocument();
  });

  it('triggers the onClose callback when "Cancelar" button is clicked', () => {
    const onClose = jest.fn();
    render(
      <OrderServiceRegisterForm
        onClose={onClose}
        refreshRequest={false}
        setRefreshRequest={jest.fn()}
        onOpenTerm={jest.fn()}
      />
    );

    // Click the "Cancelar" button
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    // Assert that the onClose callback is called
    expect(onClose).toHaveBeenCalled();
  });

  it('triggers the onSubmit callback when the form is submitted', () => {
    const onSubmit = jest.fn();
    render(
      <OrderServiceRegisterForm
        onClose={jest.fn()}
        refreshRequest={false}
        setRefreshRequest={jest.fn()}
        onOpenTerm={jest.fn()}
      />
    );

    // Fill in the form fields (example: senderName and senderDocument)
    fireEvent.change(screen.getByLabelText('Responsável pela entrega'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('CPF ou Nº Funcional'), {
      target: { value: '123456789' },
    });

    // Submit the form
    fireEvent.submit(screen.getByTestId('order-service-register-form'));

    // Assert that the onSubmit callback is called with the correct form values
    expect(onSubmit).toHaveBeenCalledWith({
      senderName: 'John Doe',
      senderDocument: '123456789',
      // ...other form values...
    });
  });

  it('displays error messages when required fields are not filled', () => {
    render(
      <OrderServiceRegisterForm
        onClose={jest.fn()}
        refreshRequest={false}
        setRefreshRequest={jest.fn()}
        onOpenTerm={jest.fn()}
      />
    );

    // Submit the form without filling in required fields
    fireEvent.submit(screen.getByTestId('order-service-register-form'));

    // Assert that the error messages are displayed for the required fields
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
    // ...assert other error messages...
  });
});
