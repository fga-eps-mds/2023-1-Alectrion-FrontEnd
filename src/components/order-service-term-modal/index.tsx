import { Flex, Text, Button } from '@chakra-ui/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { MdDescription } from 'react-icons/md';
import { Modal } from '../modal';
import { OrderServiceData } from '@/pages/order-service/OrderServiceControl';
import { OSStatusMap } from '@/constants/orderservice';
import { OrderServicePdf } from '../order-service-pdf';

type OrderServiceTermModalProps = {
  isOpen: boolean;
  onClose(): void;
  selectedOrderService: OrderServiceData;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function OrderServiceTermModal({
  isOpen,
  onClose,
  selectedOrderService,
  refreshRequest,
  setRefreshRequest,
}: OrderServiceTermModalProps) {
  const onCloseCallback = () => {
    onClose();
  };

  if (!selectedOrderService) {
    return null;
  }

  return (
    <Modal
      title={`O.S. n° ${selectedOrderService?.id}`}
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
        termo_de_{OSStatusMap.get(selectedOrderService.status)}.pdf
      </Text>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onCloseCallback}>
          Cancelar
        </Button>
        <PDFDownloadLink
          document={
            <OrderServicePdf
              orderService={selectedOrderService as OrderServiceData}
            />
          }
          fileName={`termo_de_${OSStatusMap.get(selectedOrderService.status)}`}
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
