import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@chakra-ui/react';
import { MdPictureAsPdf } from 'react-icons/md';
import { MovementsReportPDF } from './document';
import { movementEquipment } from '@/pages/movements/MovementControl';

interface MovementsReportPDFprops {
  movements: movementEquipment[];
}

export function PDF({ movements }: MovementsReportPDFprops) {
  const date = new Date().getDate().toString();
  console.log(date);
  return (
    <PDFDownloadLink
      document={
        <MovementsReportPDF
          title="Relatório de movimentações"
          equipments={movements}
          date={date}
          destination=""
        />
      }
      fileName={`relatorio_movimentacao_${date}`}
    >
      {({ loading }) => <MdPictureAsPdf size="2.2rem" cursor="pointer" />}
    </PDFDownloadLink>
  );
}
