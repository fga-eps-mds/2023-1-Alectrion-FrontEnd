import { Flex, Text, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MdDescription } from 'react-icons/md';
import { useCallback } from 'react';
import { CSVLink } from 'react-csv';
import { utils, writeFile } from 'xlsx';
import { Modal } from '../modal';
import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { formatDate } from '@/utils/format-date';
import { EquipmentsPDF } from './document';
import { filterData } from '@/utils/filterEquipmentData';

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

  const formattedDate = formatDate(new Date());

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(filterData(equipments));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, `relatorio_equipamentos_${formattedDate}.xls`);
  }, [equipments, formattedDate]);

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
            fileName={`relatorio_equipamentos_${formattedDate}`}
          >
            <Button>Imprimir</Button>
          </PDFDownloadLink>
        )}
        {type === 'csv' && (
          <CSVLink
            data={filterData(equipments)}
            type="xls"
            target="_blank"
            filename={`relatorio_equipamentos_${formattedDate}`}
            separator=";"
          >
            <Button>Imprimir</Button>
          </CSVLink>
        )}

        {type === 'xls' && <Button onClick={exportFile}>Imprimir</Button>}
      </Flex>
    </Modal>
  );
}
