import { screen, render, fireEvent, act } from '@testing-library/react';
import { vi } from 'vitest';
import { DeleteExtensiveButton } from '.';

describe('DeleteExtensiveButton', () => {
  it('has the correct aria-label', () => {
    render(<DeleteExtensiveButton label="usuário" onClick={() => {}} />);
    expect(screen.getByText('Excluir usuário')).toBeInTheDocument();
  });

  it('should be able to call DeleteExtensiveButton onClick function', async () => {
    const onClickMock = vi.fn();
    render(<DeleteExtensiveButton label="usuário" onClick={onClickMock} />);

    const button = screen.getAllByText('Excluir').pop() as HTMLElement;
    await act(() => fireEvent.click(button));

    expect(onClickMock).toHaveBeenCalled();
  });
});
