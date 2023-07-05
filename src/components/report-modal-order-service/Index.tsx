import { Flex, Text, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MdDescription } from 'react-icons/md';
import { useCallback } from 'react';
import { CSVLink } from 'react-csv';
import { utils, writeFile } from 'xlsx';
import { Modal } from '../modal';
import { OrderServiceData } from '@/pages/order-service/OrderServiceControl';
import { formatDate } from '@/utils/format-date';
import { OrderServicePDF } from './document';

type ReportModalProps = {
  isOpen: boolean;
  onClose(): void;
  type: string;
  orderServices: OrderServiceData[];
};

export function ReportModal({
  isOpen,
  onClose,
  type,
  orderServices,
}: ReportModalProps) {
  const onCloseCallback = () => {
    onClose();
  };

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(orderServices);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, `relatorio_ordens_servico_${formattedDate}.xls`);
  }, [orderServices]);

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
      title="Relatório de Ordens de Serviço"
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
              <OrderServicePDF
                title="Relatório de Ordens de Serviço"
                orderServices={orderServices}
                date=""
              />
            }
            fileName={`relatorio_ordens_servico${'formattedDate'}`}
          >
            <Button>Imprimir</Button>
          </PDFDownloadLink>
        )}
        {type === 'csv' &&
        <CSVLink
          data={orderServices}
          headers={headers}
          type="csv"
          target="_blank"
          filename={`relatorio_ordens_servico_${formattedDate}.csv`}
          separator=';'
        >
        <Button>Imprimir</Button>
        </CSVLink>
        }

        {type === 'xls' && <Button onClick={exportFile}>Imprimir</Button>}
      </Flex>
    </Modal>
  );
}


