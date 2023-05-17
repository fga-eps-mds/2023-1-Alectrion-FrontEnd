import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MovementsTable } from './MovementControl';

describe('Movements', () => {
  it('should display a list', async () => {
    const { findByRole } = render(
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<MovementsTable />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );

    const list = await findByRole('table');
    expect(list).toBeInTheDocument();
  });

  it('should display a search bar', async () => {
    const { findByPlaceholderText } = render(
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<MovementsTable />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    );

    const bar = await findByPlaceholderText('Pesquisa');
    expect(bar).toBeInTheDocument();
  });
});