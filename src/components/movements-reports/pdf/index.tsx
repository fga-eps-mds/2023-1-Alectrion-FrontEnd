import { Flex, Text, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MdDescription } from 'react-icons/md';
import { useCallback } from 'react';
import { CSVLink } from 'react-csv';
import { utils, writeFile } from 'xlsx';
import { Modal } from '@/components/modal';
import { movement } from '@/pages/movements/MovementControl';
import { formatDate } from '@/utils/format-date';
import { MovementsPDF } from './document';

type ReportModalProps = {
  isOpen: boolean;
  onClose(): void;
  type: string;
  movements: movement[];
};

export function ReportModal({
  isOpen,
  onClose,
  type,
  movements,
}: ReportModalProps) {
  const onCloseCallback = () => {
    onClose();
  };

  const formattedDate = formatDate(new Date());

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(movements);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, `relatorio_movimentacoes_${formattedDate}.xls`);
  }, [formattedDate, movements]);

  const headers = [
    { label: 'Tombamento', key: 'tippingNumber' },
    { label: 'Tipo', key: 'type' },
    { label: 'Marca', key: 'brand.name' },
    { label: 'Modelo', key: 'model' },
    { label: 'Situação', key: 'situacao' },
    { label: 'Localização', key: 'unit.name' },
    { label: 'Descrição', key: 'description' },
  ];

  return (
    <Modal
      title="Relatório de movimentações"
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
              <MovementsPDF
                title="Relatório de movimentacoes"
                movements={movements}
              />
            }
            fileName={`relatorio_movimentacoes_${formattedDate}`}
          >
            <Button>Imprimir</Button>
          </PDFDownloadLink>
        )}
        {type === 'csv' && (
          <CSVLink
            data={movements}
            headers={headers}
            type="csv"
            target="_blank"
            filename={`relatorio_equipamentos_${formattedDate}.csv`}
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
