/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { screen, render } from '@testing-library/react';
import React from 'react';
import { RefreshButton } from '.';

describe('RefreshButton', () => {
  it('has the correct aria-label', () => {
    render(
      <RefreshButton
        refresh={() =>
          new Promise((resolve) => {
            resolve('success');
          })
        }
      />
    );

    expect(screen.getByLabelText('Atualizar Dados')).toBeInTheDocument();
  });
});
