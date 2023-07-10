import { render, act, fireEvent } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SpyInstance, vi } from 'vitest';
import * as ReactPdf from '@react-pdf/renderer';
import { api } from '../../config/lib/axios';
import { OrderServiceTable } from './OrderServiceControl';

const ORDERSERVICE_RESPONSE_MOCK = {
  data: [
    {
      authorId: '4d5ee056-29fe-46d3-9da3-03036ab2ffa5',
      createdAt: '2023-06-22T11:01:44.000Z',
      description: 'Não liga -',
      finishDate: null,
      id: 2,
      seiProcess: '202300007072548',
      senderDocument: '12312312380',
      senderName: 'Rodrigo',
      senderPhone: '621234578',
      status: 'MAINTENANCE',
      technicianId: null,
      technicianName: null,
      updatedAt: '2023-06-22T11:01:44.000Z',
      withdrawalDocument: null,
      withdrawalName: null,
      equipment: {
        id: '22345d22-9055-4f88-b74c-8a3d3bc485b2',
        tippingNumber: '123456',
        serialNumber: '123456DP',
        type: 'Monitor',
        situacao: 'Manutenção',
        estado: 'Novo',
        model: 'DESKTOP',
        description: '',
        initialUseDate: '2022-01-01T00:00:00.000Z',
        acquisitionDate: '2023-06-21',
        screenSize: '23',
        invoiceNumber: '5555555555555',
        power: null,
        screenType: 'LCD',
        processor: null,
        storageType: null,
        storageAmount: null,
        ram_size: null,
        createdAt: '2023-06-22T13:40:08.194Z',
        updatedAt: '2023-04-19T19:02:18.473Z',
        brand: {
          id: 'd98ceb1d-5303-4329-a9f1-251d243227bb',
          name: 'HP',
        },
        unit: {
          id: '3b1ef641-200a-4bd4-8973-9bf6a9f0b0f9',
          name: 'Assessoria Contábil',
          localization: 'Goiânia',
          createdAt: '2023-06-21T21:29:49.344Z',
          updatedAt: '2023-06-21T21:29:49.344Z',
        },
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
          <Route path="*" element={<OrderServiceTable />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );

describe('Order Service', () => {
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

  it('should select service order and open modal with correct data', async () => {
    const mockedGet = vi.spyOn(api, 'get');
    const mockedPdfDownloadLink = vi.spyOn(
      ReactPdf,
      'PDFDownloadLink'
    ) as SpyInstance;
    mockedPdfDownloadLink.mockReturnValue(null);
    mockedGet.mockReturnValue(Promise.resolve(ORDERSERVICE_RESPONSE_MOCK));
    const { findByLabelText, findByText } = renderComponent();

    await act(async () => {
      await new Promise((r) => {
        setTimeout(r, 1000);
      });
    });

    const orderServiceDetailButton = await findByLabelText(
      'Gerar termo de ordem de serviço'
    );

    await fireEvent.click(orderServiceDetailButton);
    const orderServicePdfText = await findByText('termo_de_Em manutenção.pdf');

    expect(orderServicePdfText).toBeInTheDocument();
  });
});
