/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { BrowserRouter } from 'react-router-dom';
import { SideBarItem } from '.';

describe('Sidebar-item', () => {
  const mock = {
    label: 'mock label',
    pathname: 'mock_pathname',
    icon: FiAlertCircle,
  };

  it('should display correct route name', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <SideBarItem {...mock} />
      </BrowserRouter>
    );

    const text = await findByText(mock.label);
    expect(text).toBeInTheDocument();
  });

  it('should go to a correct path', async () => {
    const { findByRole } = render(
      <BrowserRouter>
        <SideBarItem {...mock} />
      </BrowserRouter>
    );

    const link = await findByRole('link');
    fireEvent.click(link);

    expect(window.location.pathname).toEqual(`/${mock.pathname}`);
  });
});
