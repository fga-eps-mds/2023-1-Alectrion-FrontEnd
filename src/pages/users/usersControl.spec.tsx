import { render, act, fireEvent, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';
import * as ReactPdf from '@react-pdf/renderer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '../../config/lib/axios';
import { UsersTable } from './UsersControl';
import { useAuth } from '@/contexts/AuthContext';
import { RequireAuth } from '@/config/routes/require-auth';
import 'intersection-observer';

vi.mock('@/contexts/AuthContext'); // Mock da função useAuth

function MockedComponent() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <div data-testid="table">Tabela de Usuários</div>
  ) : null;
}

const USERS_RESPONSE_MOCK = {
  data: [
    {
      id: '1',
      name: 'Teste1',
      job: 'generico',
      role: 'basico',
      cpf: '1234567890',
    },
    {
      id: '2',
      name: 'Teste 2',
      job: 'generico',
      role: 'administrador',
      cpf: '0987654321',
    },
  ],
};

vi.mock('../../config/lib/axios');

const renderComponent = () =>
  render(
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="*" element={<UsersTable />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );

describe('Users', () => {
  it('should display a list of users', async () => {
    const { findByRole } = renderComponent();

    const userList = await findByRole('table');
    expect(userList).toBeInTheDocument();
  });

  it('should select a user and open modal with correct data', async () => {
    const mockedGet = vi.spyOn(api, 'get');
    mockedGet.mockResolvedValue(Promise.resolve(USERS_RESPONSE_MOCK));

    const { findByLabelText } = renderComponent();

    await act(async () => {
      await new Promise((r) => {
        setTimeout(r, 1000);
      });
    });

    const editUserButton = await findByLabelText('Editar Usuário');

    await fireEvent.click(editUserButton);
  });

  it('should display a button to create user', async () => {
    const { queryByText } = renderComponent();

    const button = await queryByText('Cadastrar Usuário');
    expect(button).toBeInTheDocument();
  });
});

/*

});

  describe('Users', () => {
    test('should render the users control page', () => {
      render(
        <BrowserRouter>
          <ChakraProvider>
            <Routes>
              <Route path="*" element={<UsersTable />} />
            </Routes>
          </ChakraProvider>
        </BrowserRouter>
      );
  
      expect(screen.getByText(/Controle de Acesso/i)).toBeInTheDocument();
  
      expect(screen.getByText(/Cadastrar Usuário/i)).toBeInTheDocument();

      expect(screen.getByText('Usuário')).toBeInTheDocument();
      expect(screen.getByText('Cargo')).toBeInTheDocument();
      expect(screen.getByText('Perfil')).toBeInTheDocument();
      expect(screen.getByText('CPF')).toBeInTheDocument();
    });
  });
*/
