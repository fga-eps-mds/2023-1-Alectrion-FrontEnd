/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { render } from '@testing-library/react';
import React from 'react';
import { Item } from '.';

describe('ListItem', () => {
  it('should display item data', async () => {
    const mock = {
      title: 'mock title',
      description: 'mock descpition',
    };

    const { findByText } = render(<Item {...mock} />);

    const title = await findByText(mock.title);
    const description = await findByText(mock.description);

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
