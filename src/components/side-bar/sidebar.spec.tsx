/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from '.';
import { routes } from '../../constants/routes';

describe('Sidebar', () => {
  it('should display all routes', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <SideBar />
      </BrowserRouter>
    );

    let text;
    routes.forEach(async (r) => {
      text = await findByText(r.label);

      expect(text).toBeInTheDocument();
    });
  });
});
