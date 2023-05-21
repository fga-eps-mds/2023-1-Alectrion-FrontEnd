/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { screen, render } from '@testing-library/react';
import React from 'react';
import { DeleteButton } from '../delete-button';

describe('DeleteButton', () => {
  it('has the correct aria-label', () => {
    render(<DeleteButton label="usuário" onClick={() => {}} />);
    expect(screen.getByText('Excluir usuário')).toBeInTheDocument();
  });

  it('should be able to call DeleteButton onClick function', async () => {
    render(<DeleteButton label="usuário" onClick={() => {}} />);

    const button = screen.getByText('Excluir usuário');

    expect(button).toBeInTheDocument();
  });
});
