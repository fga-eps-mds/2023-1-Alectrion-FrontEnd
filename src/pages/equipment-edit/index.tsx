import { Button, useDisclosure } from '@chakra-ui/react';
import { EquipmentEditModal } from '@/components/equipment-edit-modal';

export function EquipEdit() {
  const { isOpen, onClose, onOpen } = useDisclosure();


const equip = {
  id: "b4809047-638e-4001-830d-b538ea1f01a4",

  tippingNumber: "123456",
  serialNumber: "654123",
  type: {value:"Monitor", label:"Monitor"},
  situacao: "Ativo",
  estado: {value: "Novo", label:"Novo"},
  model: "teste123",
  description: "teste123",
  initialUseDate: {value: 2021, label: '2021'},
  acquisitionDate: new Date("2022-03-21"),
  screenSize: "teste123",
  invoiceNumber: "098123",
  power: "teste123",
  screenType: {value: "LED", label:"LED"},
  processor: "teste123",
  storageType: {value: "SSD", label:"SSD"},
  storageAmount: "teste123",
  brandName: "teste123",
  acquisitionName: "teste123",
  ram_size: "teste123",
}


  return (
    <>
      <Button onClick={onOpen}>Abrir modal temporário</Button>
      <EquipmentEditModal onClose={onClose} isOpen={isOpen} equip={equip}/>
    </>
  );
}
