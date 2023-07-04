import {
  Input,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import { theme } from '@/styles/theme';
import { Select, SingleValue } from 'chakra-react-select';
import { useState } from 'react';
import { api } from '@/config/lib/axios';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from '@/utils/toast';

type FormValues = {
  oldBrand: string;
  newBrand: string;
};

interface ISelectOption {
  label: string;
  value: number | string;
}

interface BrandData {
  brand: { name: string };
}

export default function EditBrandsForm() {
  const [brands, setBrands] = useState<BrandData[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandData>();
  const take = 5;

  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const fetchBrands = async (str: string) => {
    // TODO: EDITAR ROTA
    try {
      const { data }: AxiosResponse<BrandData[]> = await api.get(
        `equipment/find?searchTipping=${str}&take=${take}`
      );
      setBrands(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  const formattedOptions = <T, K extends keyof T>(
    // TODO: FAZER FUNCIONAR RS
    data: T[],
    label: K,
    value: K
  ): ISelectOption[] => {
    return data?.map((item: T) => {
      const optionLable = String(item[label]);
      const optionValue: number | string = String(item[value]);
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
      (brand) => brand.brand.name === event?.value
    );
    setSelectedBrand(selectedOption);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmitEdit = handleSubmit(async (formData) => {
    try {
      const {
        oldBrand,
        newBrand
      } = formData;
      const payload = {
        oldBrand: selectedBrand?.brand,
        newBrand
      };
      // TODO: ALTERAR ROTA
      const response = await api.post(
        `rota para o back`,
        payload
      );
      toast.success('Marca alterada com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao alterar a Marca!';
      toast.error(message);
    }

  });

  const onSubmitDelete= handleSubmit(async (formData) => {
    try {
      const {
        oldBrand,
        newBrand
      } = formData;
      const payload = {
        oldBrand: selectedBrand?.brand,
        newBrand
      };
      // TODO: ALTERAR ROTA
      const response = await api.post(
        `rota para o back`,
        payload
      );
      toast.success('Marca deletada com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao deletar a Marca!';
      toast.error(message);
    }

  });

  const onSubmitAdd = handleSubmit(async (formData) => {
    try {
      const {
        newBrand
      } = formData;
      const payload = {
        newBrand
      };
      // TODO: ALTERAR ROTA
      const response = await api.post(
        `rota para o back`,
        payload
      );
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
              brands,
              'brand',
              'brand'
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
            name="nome"
            width="100%"
            marginRight="75px"
            placeholder="Novo nome para a marca"
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
              brands,
              'brand',
              'brand'
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
            name="nome"
            width="100%"
            placeholder="Nome da Marca"
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