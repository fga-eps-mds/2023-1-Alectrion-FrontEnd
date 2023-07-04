import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { formatDateTime } from './format-date';

export function filterData(equipments: EquipmentData[]) {
  const filteredData = equipments.map((equip) => {
    const {
      tippingNumber,
      serialNumber,
      type,
      estado,
      situacao,
      brand,
      model,
      processor,
      storageType,
      storageAmount,
      ram_size,
      screenType,
      screenSize,
      power,
      createdAt,
      updatedAt,
      acquisition,
      acquisitionDate,
      unit,
      description,
    } = equip;
    return {
      Tombamento: tippingNumber,
      'Nº de série': serialNumber,
      Tipo: type,
      Estado: estado,
      Situacao: situacao,
      Marca: brand.name,
      Modelo: model,
      Processador: processor,
      'Tipo de armazenamento': storageType,
      'Quantidade de armazenamento': storageAmount,
      'Tamanho da memoria RAM': ram_size,
      'Tipo de Tela': screenType,
      'Tamanho da Tela': screenSize,
      Potência: power,
      'Adicionado em': formatDateTime(createdAt as string),
      'Atualizado em': formatDateTime(updatedAt as string),
      Aquisição: acquisition.name,
      'Data da aquisição': acquisitionDate,
      'Nome da unidade': unit.name,
      'Localização da unidade': unit.localization,
      Descrição: description,
    };
  });
  return filteredData;
}
