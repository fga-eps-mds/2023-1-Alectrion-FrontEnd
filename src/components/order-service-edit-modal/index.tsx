import { Flex } from '@chakra-ui/react';
import OrderServiceEditForm from '../order-service-edit-form';
import { Modal } from '../modal';
import { OrderServiceData } from '@/pages/order-service/OrderServiceControl';

type OrderServiceEditModalProps = {
  isOpen: boolean;
  onClose(): void;
  orderService: OrderServiceData;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

function transformFields(data: any) {
  if (!data) return;
  const transformedData = { ...data };
  return transformedData;
}

export function OrderServiceEditModal({
  isOpen,
  onClose,
  orderService,
  refreshRequest,
  setRefreshRequest,
}: OrderServiceEditModalProps) {
  console.log(orderService)
  return (
    <Modal
      title={`Ordem de Serviço #${orderService?.id}`}
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        {<OrderServiceEditForm
          onClose={onClose}
          orderService={transformFields(orderService)}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />}
      </Flex>
    </Modal>
  );
}
