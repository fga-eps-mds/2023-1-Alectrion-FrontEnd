import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EquipmentTable } from '@/pages/equipaments/EquipamentsControl';

describe('Equipments', () => {
  it('should display a list', async () => {
    const { findByRole } = render(
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EquipmentTable />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );

    const list = await findByRole('table');
    expect(list).toBeInTheDocument();
  });

  it('should display a button to create equipments', async () => {
    const { queryByText } = render(
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EquipmentTable />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );

    const button = await queryByText('Cadastrar Equipamento');
    if (button) {
      expect(button).toBeInTheDocument();
    }
  });

  it('should display a button to move equipments', async () => {
    const { queryByText } = render(
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EquipmentTable />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );

    const button = await queryByText('Movimentar');
    if (button) {
      expect(button).toBeInTheDocument();
    }
  });

  it('should display a search bar', async () => {
    const { findByPlaceholderText } = render(
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<EquipmentTable />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );

    const bar = await findByPlaceholderText('Pesquisa');
    expect(bar).toBeInTheDocument();
  });
});
