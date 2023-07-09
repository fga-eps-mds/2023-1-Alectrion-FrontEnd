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
    { label: 'Id da OS', key: 'id' },
    { label: 'Id do autor', key: 'authorId' },
    { label: 'Processo SEI', key: 'seiProcess' },
    { label: 'Descrição', key: 'description' },
    { label: 'Remetente', key: 'senderName' },
    { label: 'Documento do remetente', key: 'senderDocument' },
    { label: 'Telefone do remetente', key: 'senderPhone' },
    { label: 'Id do técnico', key: 'technicianId' },
    { label: 'Nome do técnico', key: 'technicianName' },
    { label: 'Nome do destinatário', key: 'withdrawalName' },
    { label: 'Documento do destinatário', key: 'withdrawalDocument' },
    { label: 'Data de conclusão', key: 'finishDate' },
    { label: 'Status', key: 'status' },
    { label: 'Data de criação', key: 'createdAt' },
    { label: 'Data de atualização', key: 'updatedAt' },
    { label: 'ID do equipamento', key: 'equipment.id' }
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


