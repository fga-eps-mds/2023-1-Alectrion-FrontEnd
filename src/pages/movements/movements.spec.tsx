import { render, act, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';
import * as ReactPdf from '@react-pdf/renderer';
import { api } from '../../config/lib/axios';
import { MovementsTable } from './MovementControl';

const MOVEMENTS_RESPONSE_MOCK = {
  data: [
    {
      id: 'f6b9865d-124e-44a0-9e57-cb6f88ebc1fa',
      date: '2023-04-19T19:02:18.446Z',
      userId: '1f0fba7b-b937-4793-bc35-8f476e9e76e2',
      type: 2,
      description: null,
      inChargeName: 'Lucas',
      inChargeRole: 'Delegado',
      chiefName: 'Leo',
      chiefRole: 'Gerente',
      equipmentSnapshots:
        '[{"id":"20b552c0-966d-4b05-b0f0-dfe84a476471","tippingNumber":"987654321","serialNumber":"1919191","type":"Nobreak","situacao":"Reserva Técnica","estado":"Novo","model":"312332232","description":"","initialUseDate":"2022-01-01T00:00:00.000Z","acquisitionDate":"2023-04-19","screenSize":null,"invoiceNumber":"5555555555555","power":"8","screenType":null,"processor":null,"storageType":null,"storageAmount":null,"ram_size":null,"createdAt":"2023-04-19T18:59:22.246Z","updatedAt":"2023-04-19T18:59:22.246Z"}]',
      equipments: [
        {
          id: '20b552c0-966d-4b05-b0f0-dfe84a476471',
          tippingNumber: '987654321',
          serialNumber: '1919191',
          type: 'Nobreak',
          situacao: 'Ativo',
          estado: 'Novo',
          model: '312332232',
          description: '',
          initialUseDate: '2022-01-01T00:00:00.000Z',
          acquisitionDate: '2023-04-19',
          screenSize: null,
          invoiceNumber: '5555555555555',
          power: '8',
          screenType: null,
          processor: null,
          storageType: null,
          storageAmount: null,
          ram_size: null,
          createdAt: '2023-04-19T18:59:22.246Z',
          updatedAt: '2023-04-19T19:02:18.473Z',
          brand: {
            id: 'edd935dc-a1df-42c9-9fde-4977b5b714b2',
            name: 'Intelbras',
          },
          unit: {
            id: 'f46d0971-bf8a-4a27-a360-a1a3a7817ecc',
            name: 'Divisão de Suporte Técnico em Informática',
            localization: 'Goiânia',
            createdAt: '2023-04-15T20:28:35.432Z',
            updatedAt: '2023-04-15T20:28:35.432Z',
          },
        },
      ],
      destination: {
        id: 'f46d0971-bf8a-4a27-a360-a1a3a7817ecc',
        name: 'Divisão de Suporte Técnico em Informática',
        localization: 'Goiânia',
        createdAt: '2023-04-15T20:28:35.432Z',
        updatedAt: '2023-04-15T20:28:35.432Z',
      },
    },
  ],
};

vi.mock('../../config/lib/axios');
vi.mock('@react-pdf/renderer', () => ({ PDFDownloadLink: vi.fn() }));

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

  it('should select movement and open modal with correct data', async () => {
    const mockedGet = vi.spyOn(api, 'get');
    const mockedPdfDownloadLink = vi.spyOn(
      ReactPdf,
      'PDFDownloadLink'
    ) as SpyInstance;
    mockedPdfDownloadLink.mockReturnValue(null);
    mockedGet.mockReturnValue(Promise.resolve(MOVEMENTS_RESPONSE_MOCK));
    const { findByLabelText, findByRole } = renderComponent();

    await act(async () => {
      await new Promise((r) => {
        setTimeout(r, 1000);
      });
    });

    const movementDetailButton = await findByLabelText(
      'Abrir detalhes da movimentação'
    );

    await fireEvent.click(movementDetailButton);
    const totalEquipmentsText = await findByRole('textbox', {
      name: /responsável pelo termo de responsabilidade/i,
    });

    expect(totalEquipmentsText).toHaveValue('Lucas');
  });
});
