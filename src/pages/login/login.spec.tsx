/* 
    Este código foi adaptado do repositório "2022-2-schedula-front":https://github.com/fga-eps-mds/2022-2-schedula-front/

    Agradecemos aos contribuidores desse projeto por fornecer um ponto de partida útil para nossa 
    implementação.

    Aqui, fizemos modificações no código original para se adequar ao nosso caso específico de uso.
    Quaisquer erros ou bugs nesta implementação são de nossa responsabilidade.
 */
import { fireEvent, render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Login } from '.';
import { theme } from '../../styles/theme';

describe('Login page', () => {
  it('should have a form', async () => {
    const { findByRole } = render(
      <ChakraProvider resetCSS theme={theme}>
        <Login />
      </ChakraProvider>
    );

    const form = await findByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('should have wellcome text', async () => {
    const { findByText } = render(
      <ChakraProvider resetCSS theme={theme}>
        <Login />
      </ChakraProvider>
    );

    const wellcome = await findByText('Bem-vindo');

    expect(wellcome).toBeInTheDocument();
  });

  it('should display error message when any field is empty', async () => {
    const { findByText, findAllByText } = render(
      <ChakraProvider resetCSS theme={theme}>
        <Login />
      </ChakraProvider>
    );

    const button = await findByText('ENTRAR');

    fireEvent.click(button);

    const message = await findAllByText('Este campo é obrigatório');

    expect(message).toHaveLength(2);
  });
});
