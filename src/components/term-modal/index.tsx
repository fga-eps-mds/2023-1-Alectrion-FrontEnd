import { useForm } from 'react-hook-form';
import {
  Flex,
  Text,
  Grid,
  GridItem,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Checkbox,
  TableContainer,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Modal } from '../modal';

type TermModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TermModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
}: TermModalProps) {
  const onCloseCallback = () => {
    onClose();
  };

  const [displayTextModalOpen, setDisplayTextModalOpen] = useState(false);

  const handleOpenTextModal = () => {
    setDisplayTextModalOpen(true);
  };

  const handleCloseTextModal = () => {
    setDisplayTextModalOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpenTextModal}>Abrir Texto</Button>

      <Modal
        title="Texto Gerado"
        isOpen={displayTextModalOpen}
        onClose={handleCloseTextModal}
        size="md"
      >
        {/* depois ver a logica de como pegar o tipo de termo pra printar aqui*/}
        <Text textAlign="center">Texto Gerado</Text>
      </Modal>

      <Modal
        title="Termo de Responsabilidade"
        isOpen={isOpen}
        onClose={onCloseCallback}
        size="2xl"
      >
        <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
          <Button variant="secondary" onClick={onCloseCallback}>
            Fechar
          </Button>
          <Button type="submit" variant="primary">
            Imprimir
          </Button>
        </Flex>
        
      </Modal>
    </>
  );
}