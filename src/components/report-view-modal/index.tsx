import { Button, Flex } from '@chakra-ui/react';
import { AiFillFilePdf } from 'react-icons/ai';
import { Modal } from '../modal';

type ReportViewModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedReport: any | undefined;
};

export function ReportViewModal({
  isOpen,
  onClose,
  selectedReport,
}: ReportViewModalProps) {
  return (
    <Modal
      // title={`Relatório ${selectedReport.type || ''} - ${selectedReport.id || ''}`}
      title="Relatório"
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <AiFillFilePdf size="1.7rem" />
        <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
          <Button type="submit" variant="primary">
            Imprimir
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
