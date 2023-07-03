import { Flex, Text, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MdDescription } from 'react-icons/md';
import { useCallback } from 'react';
// import { CSVLink } from 'react-csv';
// import { utils, writeFile } from 'xlsx';
import { Modal } from '../modal';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { formatDate } from '@/utils/format-date';
import { EquipmentsPDF } from './document';

type ReportModalProps = {
  isOpen: boolean;
  onClose(): void;
  type: string;
  equipments: EquipmentData[];
};

export function ReportModal({
  isOpen,
  onClose,
  type,
  equipments,
}: ReportModalProps) {
  const onCloseCallback = () => {
    onClose();
  };

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(equipments);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, `relatorio_equipamentos_${formattedDate}.xls`);
  }, [equipments]);

  const headers = [
    { label: 'Tombamento', key: 'tippingNumber' },
    { label: 'Nº de série', key: 'serialNumber' },
    { label: 'Tipo', key: 'type' },
    { label: 'Marca', key: 'brand.name' },
    { label: 'Modelo', key: 'model' },
    { label: 'Processador', key: 'processor' },
    { label: 'Tipo de Armazenamento', key: 'storageType' },
    { label: 'Memória RAM', key: 'ram_size' },
    { label: 'Tipo de Tela', key: 'screenType' },
    { label: 'Tamanho da tela', key: 'screenSize' },
    { label: 'Potência', key: 'power' },
    { label: 'Situação', key: 'situacao' },
    { label: 'Localização', key: 'unit.name' },
    { label: 'Descrição', key: 'description' },
    { label: 'Data de Aquisição', key: 'acquisitionData' },
  ];
  const formattedDate = formatDate(new Date());

  return (
    <Modal
      title="Relatório de equipamentos"
      isOpen={isOpen}
      onClose={onCloseCallback}
      size="2xl"
    >
      <Text
        textAlign="center"
        mt="1rem"
        style={{ display: 'flex', alignItems: 'center' }}
        fontWeight="bold"
        fontSize="larger"
      >
        <MdDescription size={40} />
        {`Relatório em ${type}`}
      </Text>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onCloseCallback}>
          Cancelar
        </Button>
        {type === 'pdf' && (
          <PDFDownloadLink
            document={
              <EquipmentsPDF
                title="Relatório de equipamentos"
                equipments={equipments}
                date=""
              />
            }
            fileName={`relatorio_equipamentos_${'formattedDate'}`}
          >
            <Button>Imprimir</Button>
          </PDFDownloadLink>
        )}
        {type === 'csv' && (
          // <CSVLink
          //   data={equipments}
          //   headers={headers}
          //   type="xls"
          //   target="_blank"
          //   filename={`relatorio_equipamentos_${formattedDate}`}
          //   separator=';'
          // >
          //   <Button>Imprimir</Button>
          // </CSVLink>
        )}

        {type === 'xls' && <Button onClick={exportFile}>Imprimir</Button>}
      </Flex>
    </Modal>
  );
}

function writeFile(wb: any, arg1: string) {
  throw new Error('Function not implemented.');
}

