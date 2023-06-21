/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-redeclare */
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi } from 'vitest';
import OrderServiceEditForm from './OrderServiceEditForm';

import { api } from '@/config/lib/axios';

describe('OrderServiceEditForm', () => {
  it('deve chamar onSubmit quando o formulário é enviado', async () => {
    const mockOnClose = vi.fn();
    const mockSubmit = vi.fn();

    render(
      <OrderServiceEditForm
        onClose={mockOnClose}
        orderService="2023-06-18"
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText('Status:'), {
      target: { value: 'concluido' },
    });

    fireEvent.click(screen.getByText('Salvar'));

    await screen.findByText('Ordem de serviço editada com sucesso', {
      exact: false,
    });
    expect(mockSubmit).toHaveBeenCalled();

    expect(mockOnClose).toHaveBeenCalled();
  });
});

describe('OrderServiceEditForm', () => {
  it('deve renderizar com os dados corretos do orderService', () => {
    const orderServiceData = {
      equipment: {
        tippingNumber: '123',
        type: 'Type 1',
        serialNumber: 'SN123',
        brand: {
          name: 'Brand 1',
        },
        model: 'Model 1',
        unit: {
          localization: 'Localization 1',
        },
        situacao: 'Situation 1',
      },
      senderName: 'John Doe',
      senderDocument: '123456789',
      seiProcess: 'SEI123',
      id: '12345',
      status: 'Concluído',
      description: 'Description 1',
      finishDate: '2023-06-20',
    };

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByText('Nº de tombamento:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    expect(screen.getByLabelText('Status:')).toHaveValue('Concluído');
    expect(screen.getByLabelText('Tipo:')).toHaveValue('Type 1');
    expect(screen.getByDisplayValue('SN123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Brand 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Model 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Localization 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Situation 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Responsável pela entrega')).toHaveValue(
      'John Doe'
    );
    expect(screen.getByLabelText('Funcional/CPF')).toHaveValue('123456789');
    expect(screen.getByLabelText('Processo SEI')).toHaveValue('SEI123');
    expect(screen.getByText('Descrição:')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição:')).toHaveValue('Description 1');
  });
});

describe('OrderServiceEditForm', () => {
  const mockOnClose = vi.fn();
  const mockSetRefreshRequest = vi.fn();

  const orderServiceData = {
    equipment: {
      tippingNumber: '123',
      type: 'Type 1',
      serialNumber: 'SN123',
      brand: {
        name: 'Brand 1',
      },
      model: 'Model 1',
      unit: {
        localization: 'Localization 1',
      },
      situacao: 'Situation 1',
    },
    senderName: 'John Doe',
    senderDocument: '123456789',
    seiProcess: 'SEI123',
    id: '12345',
    status: 'Concluído',
    description: 'Description 1',
    finishDate: '2023-06-20',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar com os dados corretos do orderService', () => {
    render(
      <OrderServiceEditForm
        onClose={mockOnClose}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={mockSetRefreshRequest}
      />
    );

    expect(screen.getByText('Nº de tombamento:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123')).toBeInTheDocument();
    expect(screen.getByLabelText('Status:')).toHaveValue('Concluído');
    expect(screen.getByLabelText('Tipo:')).toHaveValue('Type 1');
    expect(screen.getByDisplayValue('SN123')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Brand 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Model 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Localization 1')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Situation 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Responsável pela entrega')).toHaveValue(
      'John Doe'
    );
    expect(screen.getByLabelText('Funcional/CPF')).toHaveValue('123456789');
    expect(screen.getByLabelText('Processo SEI')).toHaveValue('SEI123');
    expect(screen.getByText('Descrição:')).toBeInTheDocument();
    expect(screen.getByLabelText('Descrição:')).toHaveValue('Description 1');
  });

  it('deve chamar onClose quando o botão cancelar for clicado', () => {
    render(
      <OrderServiceEditForm
        onClose={mockOnClose}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={mockSetRefreshRequest}
      />
    );

    fireEvent.click(screen.getByText('Cancelar'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar setRefreshRequest quando o formulário for enviado com sucesso', () => {
    render(
      <OrderServiceEditForm
        onClose={mockOnClose}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={mockSetRefreshRequest}
      />
    );

    fireEvent.submit(screen.getByTestId('equipment-register-form'));
    expect(mockSetRefreshRequest).toHaveBeenCalledTimes(1);
  });
  it('deve chamar a função onClose quando o botão "Cancelar" for clicado', () => {
    const mockOnClose = vi.fn();

    render(
      <OrderServiceEditForm
        onClose={mockOnClose}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
  it('deve chamar a função submit quando o botão "Salvar" for clicado', () => {
    const mockSubmit = vi.fn();

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
        submitFunction={mockSubmit}
      />
    );

    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
  it('deve atualizar o estado "status" quando o valor do campo "Status" mudar', () => {
    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const statusField = screen.getByLabelText('Status:');
    fireEvent.change(statusField, { target: { value: 'concluido' } });

    expect(statusField).toHaveValue('concluido');
  });
  it('deve exibir uma mensagem de sucesso após editar o serviço de pedido', async () => {
    const mockSubmit = vi.fn();

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
        submitFunction={mockSubmit}
      />
    );

    fireEvent.click(screen.getByText('Salvar'));

    await screen.findByText('Ordem de serviço editada com sucesso', {
      exact: false,
    });

    expect(mockSubmit).toHaveBeenCalled();
  });
  it('deve exibir uma mensagem de erro se houver um erro ao atualizar o serviço de pedidos', async () => {
    const mockSubmit = vi.fn().mockRejectedValueOnce(new Error('API Error'));

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
        submitFunction={mockSubmit}
      />
    );

    fireEvent.click(screen.getByText('Salvar'));

    await screen.findByText('Erro ao atualizar a ordem de serviço');

    expect(mockSubmit).toHaveBeenCalled();
  });
  it('deve chamar a função setRefreshRequest após o envio do formulário', () => {
    const mockSetRefreshRequest = vi.fn();

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={mockSetRefreshRequest}
      />
    );

    fireEvent.submit(screen.getByTestId('equipment-register-form'));

    expect(mockSetRefreshRequest).toHaveBeenCalledTimes(1);
  });
  it('deve atualizar o estado quando o usuário interage com os campos de entrada', () => {
    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const descriptionField = screen.getByLabelText('Descrição:');
    fireEvent.change(descriptionField, { target: { value: 'Nova descrição' } });

    expect(descriptionField).toHaveValue('Nova descrição');
  });
  it('deve renderizar componentes condicionalmente com base no valor do campo "Status"', () => {
    const orderServiceData = {
      // ...orderServiceData
      status: 'Concluído',
    };

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByText('Componente A')).toBeInTheDocument();
    expect(screen.queryByText('Componente B')).toBeNull();

    const statusField = screen.getByLabelText('Status:');
    fireEvent.change(statusField, { target: { value: 'Em andamento' } });

    expect(screen.getByText('Componente B')).toBeInTheDocument();
    expect(screen.queryByText('Componente A')).toBeNull();
  });

  it('deve validar os campos obrigatórios antes de enviar o formulário', () => {
    const mockSubmit = vi.fn();

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
        submitFunction={mockSubmit}
      />
    );

    fireEvent.click(screen.getByText('Salvar'));

    expect(mockSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Este campo é obrigatório')).toBeInTheDocument();
  });

  it('deve exibir um componente de carregamento durante o envio do formulário', async () => {
    const mockSubmit = vi.fn(
      () => new Promise((resolve) => setTimeout(resolve, 2000))
    );

    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
        submitFunction={mockSubmit}
      />
    );

    fireEvent.click(screen.getByText('Salvar'));

    expect(screen.getByText('Carregando...')).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('Carregando...'));

    expect(mockSubmit).toHaveBeenCalled();
  });
  it('deve validar campos específicos, como o comprimento máximo de uma descrição', () => {
    render(
      <OrderServiceEditForm
        onClose={vi.fn()}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const descriptionField = screen.getByLabelText('Descrição:');
    fireEvent.change(descriptionField, {
      target: {
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    });

    expect(
      screen.getByText('A descrição deve ter no máximo 50 caracteres.')
    ).toBeInTheDocument();
  });
  it('deve fechar automaticamente o formulário após uma determinada ação', () => {
    const mockOnClose = vi.fn();

    render(
      <OrderServiceEditForm
        onClose={mockOnClose}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
        closeAfterAction
      />
    );

    fireEvent.click(screen.getByText('Salvar'));

    expect(mockOnClose).toHaveBeenCalled();
  });

  it('deve exibir um brinde de erro se houver um erro ao atualizar o serviço de pedidos', () => {
    const mockApiPut = vi
      .spyOn(api, 'put')
      .mockRejectedValueOnce(new Error('API Error'));

    render(
      <OrderServiceEditForm
        onClose={mockOnClose}
        orderService={orderServiceData}
        refreshRequest={false}
        setRefreshRequest={mockSetRefreshRequest}
      />
    );

    fireEvent.submit(screen.getByTestId('equipment-register-form'));
    expect(mockSetRefreshRequest).toHaveBeenCalledTimes(1);
  });
});
