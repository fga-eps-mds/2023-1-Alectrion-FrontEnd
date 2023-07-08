import { screen, render, act, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EquipmentForm from '.';

describe('EquipmentForm', () => {
  it('should render correctly', () => {
    render(
      <EquipmentForm
        onClose={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });

  it('should render cpu fields', async () => {
    render(
      <EquipmentForm
        onClose={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const select = screen.getByLabelText('Tipo de equipamento');
    await act(() => fireEvent.change(select, { target: { value: 'CPU' } }));

    expect(screen.getByLabelText('Qtd. Memória RAM (GB)')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de armazenamento')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Qtd. Armazenamento (GB)')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Processador')).toBeInTheDocument();
  });

  it('should render monitor fields', async () => {
    render(
      <EquipmentForm
        onClose={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const select = screen.getByLabelText('Tipo de equipamento');
    await act(() => fireEvent.change(select, { target: { value: 'Monitor' } }));

    expect(screen.getByLabelText('Tipo de monitor')).toBeInTheDocument();
    expect(screen.getByLabelText('Tamanho do Monitor')).toBeInTheDocument();
  });

  it('should render estabilizador fields', async () => {
    render(
      <EquipmentForm
        onClose={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const select = screen.getByLabelText('Tipo de equipamento');
    await act(() =>
      fireEvent.change(select, { target: { value: 'Estabilizador' } })
    );

    expect(screen.getByLabelText('Potência (VA)')).toBeInTheDocument();
  });

  it('should render Nobreak fields', async () => {
    render(
      <EquipmentForm
        onClose={vi.fn()}
        refreshRequest={false}
        setRefreshRequest={vi.fn()}
      />
    );

    const select = screen.getByLabelText('Tipo de equipamento');
    await act(() => fireEvent.change(select, { target: { value: 'Nobreak' } }));

    expect(screen.getByLabelText('Potência (VA)')).toBeInTheDocument();
  });
});
