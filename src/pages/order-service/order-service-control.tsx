import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { BiEditAlt, BiSearch } from 'react-icons/bi';
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  TableContainer,
  Divider,
  Box,
  useDisclosure,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { toast } from '@/utils/toast';
import { SideBar } from '@/components/side-bar';
import { api, apiSchedula } from '../../config/lib/axios';
import { EquipmentRegisterModal } from '@/components/equipment-register-modal';
import { EquipmentViewModal } from '@/components/equipment-view-modal';
import { theme } from '@/styles/theme';
import { EquipmentEditModal } from '@/components/equipment-edit-modal';
import { ControlledSelect } from '@/components/form-fields/controlled-select';
import { STATUS, TIPOS_EQUIPAMENTO, Workstation } from '@/constants/equipment';
import { Datepicker } from '@/components/form-fields/date';
import { Input } from '@/components/form-fields/input';
import { OrderServiceRegisterModal } from '@/components/order-service-register-modal';

interface ISelectOption {
  label: string;
  value: number | string;
}

export interface EquipmentData {
  tippingNumber: string;
  serialNumber: string;
  type: string;
  situacao: string;
  estado: string;
  model: string;
  acquisitionDate: Date;
  description?: string;
  initialUseDate: Date;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: string;
  processor?: string;
  storageType?: string;
  storageAmount?: string;
  ram_size?: string;
  createdAt?: string;
  updatedAt: string;
  id: string;
  brand: {
    name: string;
  };
  acquisition: { name: string };
  unit: {
    name: string;
    localization: string;
  };
}

type FilterValues = {
  type?: ISelectOption;
  brand?: string;
  lastModifiedDate?: string;
  unit?: ISelectOption;
  situation?: ISelectOption;
  search: string;
};

// função que define os eestados searchTerm e searchType com o useState, searchTerm é o termo de pesquisa que o usuário insere na caixa de entrada, enquanto searchType é o tipo de equipamento que o usuário seleciona no menu suspenso.//
function OrderServiceTable() {
  const [equipments, setEquipments] = useState<EquipmentData[]>([]);
  const [nextEquipments, setNextEquipments] = useState<EquipmentData[]>([]);

  const [selectedEquipmentToEdit, setSelectedEquipmentToEdit] =
    useState<EquipmentData>();
  const [refreshRequest, setRefreshRequest] = useState<boolean>(false);
  const [workstations, setWorkstations] = useState<ISelectOption[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  const {
    control,
    watch,
    register,
    formState: { errors },
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();


  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentData>();


  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    isOpen: isRegisterOpen,
    onClose: onRegisterClose,
    onOpen: onRegisterOpen,
  } = useDisclosure();

  return (
    <Grid templateColumns="1fr 5fr" gap={6}>
      <GridItem>
        <SideBar />
      </GridItem>

      <GridItem>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignContent="center"
          alignItems="center"
          width="100%"
        >
          <Flex flexDirection="column" width="80%">
            <Flex justifyContent="space-between" width="100%">
              
              <Button colorScheme={theme.colors.primary} onClick={onOpen}>
                Cadastrar Ordem de Serviço
              </Button>
            </Flex>
            <Divider borderColor="#00000" margin="15px 0 15px 0" />
          </Flex>
        </Flex>
        <OrderServiceRegisterModal
          onClose={onClose}
          isOpen={isOpen}
          refreshRequest={refreshRequest}
          setRefreshRequest={setRefreshRequest}
        />
      </GridItem>
    </Grid>
  )
}
export { OrderServiceTable };
