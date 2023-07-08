import {
  Input,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import { theme } from '@/styles/theme';
import { Select, SingleValue } from 'chakra-react-select';
import { useRef, useState } from 'react';
import { api } from '@/config/lib/axios';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from '@/utils/toast';

type FormValues = {
  create: string;
  edit: string;
};

interface ISelectOption {
  label: string;
  value: number | string;
}

interface BrandData {
  id: number;
  name: string;
}

export default function EditBrandsForm() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandData>();

  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const fetchBrands = async (str: string) => {
    try {
      const { data }: AxiosResponse<BrandData[]> = await api.get(
        `equipment/brand?search=${str}`
      );
      setBrands(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  const formattedOptions = <T, K extends keyof T>(
    data: BrandData[],
  ): ISelectOption[] => {
    return data?.map((item) => {
      const optionLable = String(item.name);
      const optionValue: number | string = String(item.name);
      return { label: optionLable, value: optionValue };
    });
  };


  const handleSearch = debounce(async (str) => {
    if (str !== '') {
      fetchBrands(str);
    }
  }, 500);

  const handleChange = (event: SingleValue<ISelectOption>) => {
    const selectedOption = brands.find(
      (brand) => brand.name === event?.value
    );
    setSelectedBrand(selectedOption);
  };

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset : resetCreateForm
  } = useForm<FormValues>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset : resetEditForm

  } = useForm<FormValues>();

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: errorsDelete },
    reset : resetDeleteForm
  } = useForm<FormValues>();

  const onSubmitEdit = handleSubmitEdit(async (formData) => {
    try {
      const payload = {
        id: selectedBrand?.id,
        name: formData.edit
      };
      const response = await api.put(
        `equipment/brand`,
        payload
      );
      resetEditForm()
      toast.success('Marca alterada com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao alterar a Marca!';
      toast.error(message);
    }

  });

  const onSubmitDelete = handleSubmitDelete(async () => {
    try {
      const response = await api.delete(
        `equipment/brand?id=${selectedBrand?.id}`
      );
      resetDeleteForm()
      toast.success('Marca deletada com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao deletar a Marca!';
      toast.error(message);
    }
  });

  const onSubmitAdd = handleSubmitCreate(async (formData) => {

    try {
      const payload = {
        name: formData.create
      };
      const response = await api.post(
        `equipment/brand`,
        payload
      );
      resetCreateForm()
      toast.success('Marca criada com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao criar a Marca!';
      toast.error(message);
    }
  });

  return (
    <div>
      <Text
        margin="20px 0 15px 0"
        color={theme.colors.black}
        fontWeight="semibold"
        fontSize="4xl"
      >
        Marca
      </Text>
      <Box
        bg="white"
        borderRadius="10px"
        borderWidth="1.9px"
        borderColor="rgba(255, 165, 0, 1)"
        boxShadow="0px 0px 15px rgba(255, 165, 0, 1);"
        color="black"
        paddingY="3%"
        paddingX="3%"
        width="450px"
      >
        <form id="brand-edit-form" onSubmit={onSubmitEdit}>
          <Text
            pl="2%"
            pb="1%"
            color="#605555"
            fontWeight="medium"
            fontSize="lg"
            marginTop="3%"
          >
            Marca para Editar
          </Text>
          <Select
            placeholder="Pesquisar por Nome"
            onInputChange={handleSearch}
            onChange={handleChange}
            options={formattedOptions(
              brands
            )}
          />

          <Text
            pl="2%"
            pb="1%"
            color="#605555"
            fontWeight="medium"
            fontSize="lg"
            marginTop="3%"
          >
            Novo Nome
          </Text>
          <Input
            size="lg"
            fontSize="lg"
            width="100%"
            marginRight="75px"
            placeholder="Novo nome para a marca"
            {...registerEdit('edit', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />

          <Button
            marginTop="5%"
            width="100%"
            type="submit"
            form="brand-edit-form"
            variant="primary"
          >
            Editar
          </Button>
        </form>

        <form id="brand-delete-form" onSubmit={onSubmitDelete}>
          <Text
            pl="5px"
            pb="8px"
            color="#605555"
            fontWeight="medium"
            fontSize="lg"
            marginTop="3%"
          >
            Marca para Excluir
          </Text>
          <Select
            placeholder="Pesquisar por Nome"
            onInputChange={handleSearch}
            onChange={handleChange}
            options={formattedOptions(
              brands
            )}
          />
          <Button
            marginTop="5%"
            width="100%"
            type="submit"
            form="brand-delete-form"
            variant="primary"
          >
            Excluir
          </Button>
        </form>

        <form id="brand-add-form" onSubmit={onSubmitAdd}>
          <Text
            pl="5px"
            pb="8px"
            color="#605555"
            fontWeight="medium"
            fontSize="lg"
            marginTop="3%"
          >
            Cadastrar Marca
          </Text>
          <Input
            size="lg"
            fontSize="lg"
            width="100%"
            placeholder="Nome da Marca"
            {...registerCreate('create', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />

          <Button
            marginTop="5%"
            width="100%"
            type="submit"
            form="brand-add-form"
            variant="primary"
          >
            Cadastrar
          </Button>
        </form>

      </Box>
    </div>
  )
}