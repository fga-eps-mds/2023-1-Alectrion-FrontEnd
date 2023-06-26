import { Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import EquipmentReportRegisterForm from '../equipment-report-register-form';
import { Modal } from '../modal';
import { TIPOS_RELATORIO } from '@/constants/reports';
import { NewControlledSelect } from '../form-fields/new-controlled-select';

type ReportRegisterModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReportType = {
  reportType: string;
};

export function ReportRegisterModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
}: ReportRegisterModalProps) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReportType>();

  const watchType = watch('reportType');

  useEffect(() => {
    setValue('reportType', 'Equipamento');
  }, [setValue]);

  return (
    <Modal title="Gerar Relatório" isOpen={isOpen} onClose={onClose} size="4xl">
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <NewControlledSelect
          name="reportType"
          control={control}
          options={TIPOS_RELATORIO}
        />
        {watchType === 'Ordem de servico' && (
          <EquipmentReportRegisterForm
            onClose={onClose}
            refreshRequest={refreshRequest}
            setRefreshRequest={setRefreshRequest}
          />
        )}

        {watchType === 'Equipamento' && (
          <EquipmentReportRegisterForm
            onClose={onClose}
            refreshRequest={refreshRequest}
            setRefreshRequest={setRefreshRequest}
          />
        )}

        {watchType === 'Movimentacao' && (
          <EquipmentReportRegisterForm
            onClose={onClose}
            refreshRequest={refreshRequest}
            setRefreshRequest={setRefreshRequest}
          />
        )}
      </Flex>
    </Modal>
  );
}
