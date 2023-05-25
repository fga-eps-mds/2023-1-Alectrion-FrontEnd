import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovementsTable } from './MovementControl';

const renderComponent = () =>
  render(
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="*" element={<MovementsTable />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );

describe('Movements', () => {
  it('should display a list', async () => {
    const { findByRole } = renderComponent();

    const list = await findByRole('table');
    expect(list).toBeInTheDocument();
  });

  it('should display a search bar', async () => {
    const { findByPlaceholderText } = renderComponent();

    const bar = await findByPlaceholderText('Pesquisa');
    expect(bar).toBeInTheDocument();
  });

  it('should display a lower date datePicker', async () => {
    const { findByPlaceholderText } = renderComponent();

    const bar = await findByPlaceholderText('Data inicial');
    expect(bar).toBeInTheDocument();
  });

  it('should display a higher date datePicker', async () => {
    const { findByPlaceholderText } = renderComponent();

    const bar = await findByPlaceholderText('Data final');
    expect(bar).toBeInTheDocument();
  });

  it('should display a movements type select', async () => {
    const { findByText } = renderComponent();

    const bar = await findByText('Tipos');
    expect(bar).toBeInTheDocument();
  });

  it('should display a schedula unit select', async () => {
    const { findByText } = renderComponent();

    const bar = await findByText('Selecione');
    expect(bar).toBeInTheDocument();
  });
});
