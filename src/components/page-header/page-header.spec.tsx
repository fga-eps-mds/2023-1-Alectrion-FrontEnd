/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { screen, render } from '@testing-library/react';
import React from 'react';
import { PageHeader } from '.';

describe('PageHeader', () => {
  it('has the correct data', () => {
    render(
      <PageHeader title="Titulo" subtitle="Subtitulo">
        <p>Children</p>
      </PageHeader>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Titulo');
    expect(screen.getByText('Subtitulo')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
