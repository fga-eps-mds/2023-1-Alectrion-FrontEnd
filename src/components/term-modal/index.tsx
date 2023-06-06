
import {
  Flex,
  Text,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { Modal } from '../modal';
import { MovementsPDF } from '../movements-pdf/MovementsPdfDocument';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MovimentacaoTipoMap } from '@/constants/movements';
import { movement } from '@/pages/movements/MovementControl';


    
type TermModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedMoviment: movement | undefined ;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TermModal({
  isOpen,
  onClose,
  selectedMoviment,
  refreshRequest,
  setRefreshRequest,

}: TermModalProps) {
  const { isOpen: displayTextModalOpen, onOpen: handleOpenTextModal, onClose: handleCloseTextModal } = useDisclosure();
  console.log(selectedMoviment)
  const onCloseCallback = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title={`Termo de ${MovimentacaoTipoMap.get(parseInt(String(selectedMoviment?.type)) || 0) as string}`}
        isOpen={isOpen}
        onClose={onCloseCallback}
        size="2xl"
      >
        <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
          <Button variant="secondary" onClick={onCloseCallback}>
            Cancelar
          </Button>
          <PDFDownloadLink
            document={
              <MovementsPDF
                title={MovimentacaoTipoMap.get(parseInt(String(selectedMoviment?.type)) || 0) as string}
                equipments={selectedMoviment?.equipments || []}
                date={selectedMoviment?.date || ''}
                destination={selectedMoviment?.destination.name || ''}
              />
            }
            fileName={`termo_de_${MovimentacaoTipoMap.get(parseInt(String(selectedMoviment?.type)) || 0) as string}_010101`}
          >
            {({ loading }) => (
              <Button isLoading={loading} variant="primary" onClick={()=>{setRefreshRequest(!refreshRequest);onClose()}}>
                Imprimir
              </Button>
            )}
          </PDFDownloadLink>
        </Flex>
      </Modal>
    </>
  );
}