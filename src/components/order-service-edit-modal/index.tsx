import { Flex } from '@chakra-ui/react';
import OrderServiceEditForm from '../order-service-edit-form';
import { Modal } from '../modal';
import { OrderServiceData } from '@/pages/order-service/OrderServiceControl';

type OrderServiceEditModalProps = {
  isOpen: boolean;
  onClose(): void;
  equip: OrderServiceData | undefined;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

function transformFields(data: any) {
  if (!data) return;
  const transformedData = { ...data };

  transformedData.type = {
    label: transformedData.type,
    value: transformedData.type,
  };

  transformedData.authorId = {
    label: transformedData.authorId,
    value: transformedData.authorId,
  };

  transformedData.receiverName = {
    label: transformedData.receiverName,
    value: transformedData.receiverName,
  };

  transformedData.authorFunctionalNumber = {
    label: transformedData.authorFunctionalNumber,
    value: transformedData.authorFunctionalNumber,
  };

  transformedData.senderName = {
    label: transformedData.senderName,
    value: transformedData.senderName,
  };

  transformedData.senderFunctionalNumber = {
    label: transformedData.senderFunctionalNumber,
    value: transformedData.senderFunctionalNumber,
  };

  return transformedData;
}

export function OrderServiceEditModal({
  isOpen,
  onClose,
  equip,
  refreshRequest,
  setRefreshRequest,
}: OrderServiceEditModalProps) {
  return (
    <Modal
      title="Ordem de Serviço #21312131"
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <OrderServiceEditForm
          onClose={onClose}
          equip={transformFields(equip)}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </Flex>
    </Modal>
  );
}
