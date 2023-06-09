import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { PasswordRecover } from './PasswordRecover';
import { api } from '../../config/lib/axios';

describe('PasswordRecover', () => {
  test('should render the form', () => {
    render(
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="*" element={<PasswordRecover />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Enviar e-mail/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();

    expect(screen.getByText(/Voltar/i)).toBeInTheDocument();
  });
});
