export interface CreateEquipmentPayload {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: string;
  acquisitionDate: string;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  brandName: string;
  acquisitionName: string;
  unitId?: string;
  ram_size?: string;
  estado: string;
}

export interface UpdateEquipmentPayload {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: string;
  acquisitionDate: string;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  brandName: string;
  acquisitionName: string;
  unitId?: string;
  ram_size?: string;
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
  processor?: string;
  storageAmount?: string;
  storageType?: string;
  ram_size?: string;
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
    id: string;
    name: string;
  };
  screenSize?: string;
  power?: string;
  screenType?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateEquipmentResponse {
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
  processor?: string;
  storageAmount?: string;
  storageType?: string;
  ram_size?: string;
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
    id: string;
    name: string;
  };
  screenSize?: string;
  power?: string;
  screenType?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
