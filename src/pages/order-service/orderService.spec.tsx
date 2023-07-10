import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { OrderServiceTable } from '@/pages/order-service/OrderServiceControl';

const renderComponent = () =>
  render(
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<OrderServiceTable />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );

describe('OrderServices', () => {
  it('should display a list', async () => {
    const { findByRole } = renderComponent();

    const list = await findByRole('table');
    expect(list).toBeInTheDocument();
  });

  it('should display a button to create order services', async () => {
    const { queryByText } = renderComponent();

    const button = await queryByText('Nova Ordem de serviço');
    expect(button).toBeInTheDocument();
  });

  it('should display a button to clean filters', async () => {
    const { queryByText } = renderComponent();

    const button = await queryByText('Limpar filtros aplicados');
    expect(button).toBeInTheDocument();
  });

  it('should display a search bar', async () => {
    const { findByPlaceholderText } = renderComponent();

    const bar = await findByPlaceholderText('Pesquisa');
    expect(bar).toBeInTheDocument();
  });
});

