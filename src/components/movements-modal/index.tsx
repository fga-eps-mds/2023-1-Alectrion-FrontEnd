import { Flex, Text } from '@chakra-ui/react';
import { Modal } from '../modal';

type MovementsModalProps = {
  isOpen: boolean;
  onClose(): void;
};

export function MovementsModal({ isOpen, onClose }: MovementsModalProps) {
  return (
    <Modal title="Movimentação" isOpen={isOpen} onClose={onClose} size="4xl">
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <Flex width="100%" justifyContent="space-between">
          <Text>
            <strong>Nº Termo:</strong> 010101
          </Text>
          <Text>
            <strong>Data:</strong> 17/04/2023 12:00:00
          </Text>
          <Text>
            <strong>Total Equipamentos:</strong> 3
          </Text>
        </Flex>

        
      </Flex>
    </Modal>
  );
}
