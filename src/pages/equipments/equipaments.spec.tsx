import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EquipmentTable } from '@/pages/equipments/EquipmentsControl';

const renderComponent = () =>
  render(
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<EquipmentTable />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );

describe('Equipments', () => {
  it('should display a list', async () => {
    const { findByRole } = renderComponent();

    const list = await findByRole('table');
    expect(list).toBeInTheDocument();
  });

  it('should display a button to create equipments', async () => {
    const { queryByText } = renderComponent();

    const button = await queryByText('Cadastrar Equipamento');
    expect(button).toBeInTheDocument();
  });

  it('should display a button to move equipments', async () => {
    const { queryByText } = renderComponent();

    const button = await queryByText('Movimentar');
    expect(button).toBeInTheDocument();
  });

  it('should display a search bar', async () => {
    const { findByPlaceholderText } = renderComponent();

    const bar = await findByPlaceholderText('Pesquisa');
    expect(bar).toBeInTheDocument();
  });
});
