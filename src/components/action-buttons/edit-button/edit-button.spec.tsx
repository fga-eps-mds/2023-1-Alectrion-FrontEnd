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
import { EditButton } from '.';

describe('EditButton', () => {
  it('has the correct aria-label', () => {
    render(<EditButton label="Usuário" onClick={() => {}} />);
    expect(screen.getByLabelText('Editar Usuário')).toBeInTheDocument();
  });

  it('should be able to call EditButton onClick function', async () => {
    const mock = vi.fn();

    render(<EditButton onClick={mock} />);

    screen.getByRole('button').click();

    expect(mock).toHaveBeenCalled();
  });
});
