import { Flex, Text, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MdDescription } from 'react-icons/md';
import { Modal } from '../modal';
import { MovementsPDF } from '../movements-pdf/MovementsPdfDocument';
import { MovimentacaoTipoMap } from '@/constants/movements';
import { movement } from '@/pages/movements/MovementControl';

type TermModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedMoviment: movement | undefined;
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
  const onCloseCallback = () => {
    onClose();
  };

  return (
    <Modal
      title={`Termo de ${MovimentacaoTipoMap.get(
        parseInt(String(selectedMoviment?.type), 10) ?? 0
      ) as string
        }`}
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
        termo_de_
        {
          MovimentacaoTipoMap.get(
            parseInt(String(selectedMoviment?.type), 10) ?? 0
          ) as string
        }
        .pdf
      </Text>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onCloseCallback}>
          Cancelar
        </Button>
        <PDFDownloadLink
          document={
            <MovementsPDF
              title={
                MovimentacaoTipoMap.get(
                  parseInt(String(selectedMoviment?.type), 10) ?? 0
                ) as string
              }
              equipments={selectedMoviment?.equipments ?? []}
              date={selectedMoviment?.date ?? ''}
              destination={selectedMoviment?.destination.name ?? ''}
            />
          }
          fileName={`termo_de_${MovimentacaoTipoMap.get(
            parseInt(String(selectedMoviment?.type), 10) ?? 0
          ) as string
            }`}
        >
          {({ loading }) => (
            <Button
              isLoading={loading}
              variant="primary"
              onClick={() => {
                setRefreshRequest(!refreshRequest);
                onClose();
              }}
            >
              Imprimir
            </Button>
          )}
        </PDFDownloadLink>
      </Flex>
    </Modal>
  );
}
