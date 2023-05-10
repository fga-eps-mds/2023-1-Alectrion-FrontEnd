export interface CreateEquipmentPayload {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  model: string;
  description: string;
  initialUseDate: string;
  acquisitionDate: string;
  screenSize: string;
  invoiceNumber: string;
  power: string;
  screenType: string;
  processor: string;
  storageType: string;
  storageAmount: string;
  brandName: string;
  acquisitionName: string;
  unitId: string;
  ram_size: string;
  estado: string;
}

export interface CreateEquipmentResponse {
  tippingNumber: string;
  serialNumber: string;
  situacao: string;
  estado: string;
  model: string;
  description: string;
  initialUseDate: string;
  acquisitionDate: string;
  invoiceNumber: string;
  type: string;
  processor: string;
  storageAmount: string;
  storageType: string;
  ram_size: string;
  acquisition: {
    id: string;
    name: string;
  };
  unit: {
    id: string;
    name: string;
    localization: string;
    createdAt: string;
    updatedAt: string;
  };
  brand: {
    id: '6bedf644-32ee-47df-8e78-8a3ed67b8d5d';
    name: 'positivo';
  };
  screenSize: null;
  power: null;
  screenType: null;
  id: '3f7b7df4-3af2-4dc3-ae5a-0f424c3bbfef';
  createdAt: '2023-05-10T03:24:25.128Z';
  updatedAt: '2023-05-10T03:24:25.128Z';
}
