/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { screen, render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import { AddButton } from '.';

describe('AddButton', () => {
  it('has the correct aria-label', () => {
    render(<AddButton label="Adicionar" onClick={() => {}} />);
    expect(screen.getByLabelText('Adicionar')).toBeInTheDocument();
  });

  it('should be able to call AddButton onClick function', async () => {
    const mock = vi.fn();

    render(<AddButton label="Adicionar" onClick={mock} />);

    screen.getByRole('button').click();

    expect(mock).toHaveBeenCalled();
  });
});
