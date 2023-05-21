import { render } from '@testing-library/react';
import EquipmentViewForm, { ViewEquipFormValues } from './index';

const equipment: ViewEquipFormValues = {
  id: '56897ce0-03ab-4e14-82e0-a4312ba8c392',
  tippingNumber: '122121',
  serialNumber: '454642',
  type: {
    value: 'Webcam',
    label: 'Webcam',
  },
  situacao: 'Reserva Técnica',
  model: 'legal',
  description: '',
  initialUseDate: { value: '2023-05-22', label: '2023-05-22' },
  acquisitionDate: new Date('2023-05-22'),
  screenSize: undefined,
  invoiceNumber: '21212',
  power: undefined,
  storageType: undefined,
  processor: undefined,
  screenType: undefined,
  storageAmount: undefined,
  brand: { name: 'fdfd' },
  acquisition: { name: 'Compra' },
  unitId: '80581fd7-458e-4a03-8dac-9c7ab6567c82',
  ram_size: undefined,
  estado: {
    value: 'Novo',
    label: 'Novo',
  },
};

const equipmentEdit = {
  id: '1',
  tippingNumber: '123',
  serialNumber: '456',
  type: 'CPU',
  situacao: 'Ativo',
  model: 'Test Model',
  description: 'Test Description',
  initialUseDate: new Date(),
  acquisitionDate: new Date(),
  screenSize: '15 inches',
  invoiceNumber: '789',
  power: '1000 VA',
  screenType: 'LED',
  processor: 'Intel Core i7',
  storageType: 'SSD',
  storageAmount: '512 GB',
  brand: { name: 'Test Brand' },
  acquisition: { name: 'Test Acquisition' },
  unit: { name: '1dp Goiania', localization: 'Goiania' },
  ram_size: '8 GB',
  estado: 'Novo',
  updatedAt: '2022',
};

const onCloseMock = () => {};
const handleEditMock = () => {};
const setRefreshRequestMock = () => {};

describe('EquipmentViewForm', () => {
  it('renders the form fields', async () => {
    const { getByLabelText } = render(
      <EquipmentViewForm
        equipmentEdit={equipmentEdit}
        equipment={equipment}
        onClose={onCloseMock}
        handleEdit={handleEditMock}
        refreshRequest={false}
        setRefreshRequest={setRefreshRequestMock}
      />
    );
    const modelo = await getByLabelText('Modelo');
    const marca = await getByLabelText('Marca');

    expect(modelo).toBeInTheDocument();
    expect(marca).toBeInTheDocument();
  });
});
