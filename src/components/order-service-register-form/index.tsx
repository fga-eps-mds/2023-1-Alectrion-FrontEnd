import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';
import { BiSearch } from 'react-icons/bi';

import {
  ESTADOS_EQUIPAMENTO,
  TIPOS_ARMAZENAMENTO,
  TIPOS_EQUIPAMENTO,
  TIPOS_MONITOR,
} from '@/constants/equipment';
import { Input } from '../form-fields/input';
import { TextArea } from '../form-fields/text-area';
import { toast } from '@/utils/toast';
import { api } from '@/config/lib/axios';


export interface EquipmentData {
    tippingNumber: string;
    serialNumber: string;
    type: string;
    situacao: string;
    model: string;
    id: string;
    brand: {
      name: string;
    };
    unit: {
      name: string;
      localization: string;
    };
  }
  
type FormValues = {
  tippingNumber: string;
  serialNumber: string;
  type: { value: string; label: string };
  situacao: string;
  model: string;
  description?: string;
  initialUseDate: { value: string; label: string };
  acquisitionDate: string;
  screenSize?: string;
  invoiceNumber: string;
  power?: string;
  screenType?: { value: string; label: string };
  processor?: string;
  storageType?: { value: string; label: string };
  storageAmount?: string;
  brandName: string;
  acquisitionName: string;
  unitId?: string;
  ram_size?: string;
  estado: { value: string; label: string };
};

type FilterValues = {
    search: string;
  };

interface OrderServiceFormProps {
  onClose: () => void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OrderServiceformRegisterForm({
  onClose,
  refreshRequest,
  setRefreshRequest,
}: OrderServiceFormProps) {
  const [search, setSearch] = useState<string>('');

  const {
    control: formControl,
    register: formRegister,
    handleSubmit: formHandleSubmit,
    formState: { errors : formErrors},
  } = useForm<FormValues>();

  const {
    watch,
    register,
    formState: { errors },
  } = useForm<FilterValues>({ mode: 'onChange' });

  const watchFilter = watch();

  const handleFilterChange = () => {
    const {} = watchFilter;
  }
  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };
  const handleSearch = debounce(() => {
    setSearch(watch);
  }, 400);

  useEffect(() => {
    handleSearch();
    handleFilterChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listOfYears: Array<{ value: number; label: string }> = (() => {
    const endYear: number = new Date().getFullYear();
    const startYear: number = endYear - 30;

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => {
      const year = startYear + index;
      return { value: year, label: year.toString() };
    }).reverse();
  })();

  return (
    <form id="equipment-formRegister-form">
      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
        <GridItem gridColumn="1 / span 3">
            <strong>Nº de tombamento do equipamento:</strong>
            <Input
                    placeholder="Pesquisa"
                    minWidth="15vw"
                    errors={errors.search}
                    {...register('search')}
                    rightElement={<BiSearch />}
                  />
        </GridItem>
      </Grid>

      <Grid templateColumns="repeat(3, 3fr)" gap={6}>
      </Grid>
      <Flex gap="4rem" mt="2rem" mb="1rem" justify="center">
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit" form="equipment-formRegister-form" variant="primary">
          Confirmar
        </Button>
      </Flex>
    </form>
  );
}
