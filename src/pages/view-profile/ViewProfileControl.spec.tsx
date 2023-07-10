import { render, act, fireEvent, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';
import * as ReactPdf from '@react-pdf/renderer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api } from '../../config/lib/axios';
import { ViewProfile } from './ViewProfileControl';
import { useAuth } from '@/contexts/AuthContext';
import { RequireAuth } from '@/config/routes/require-auth';
import 'intersection-observer';


describe('ViewProfile', () => {
    test('should render the profile', () => {
      render(
        <BrowserRouter>
          <ChakraProvider>
            <Routes>
              <Route path="*" element={<ViewProfile />} />
            </Routes>
          </ChakraProvider>
        </BrowserRouter>
      );
  
      expect(screen.getByText(/Perfil de Usuário/i)).toBeInTheDocument();
  
      expect(screen.getByPlaceholderText(/Dados Cadastrais/i)).toBeInTheDocument();
  
      expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    });
  });