import { Input, Text, Box, Button } from '@chakra-ui/react';
import { Select, SingleValue } from 'chakra-react-select';
import { useRef, useState } from 'react';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { api } from '@/config/lib/axios';
import { theme } from '@/styles/theme';
import { toast } from '@/utils/toast';

type FormValues = {
  create: string;
  edit: string;
};

interface ISelectOption {
  label: string;
  value: number | string;
}

interface TypeData {
  id: number;
  name: string;
}

export default function EditTypeForm() {
  const [types, setTypes] = useState<TypeData[]>([]);
  const [selectedType, setSelectedType] = useState<TypeData>();

  const debounce = <T extends (...args: any[]) => void>(fn: T, ms = 400) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const fetchTypes = async (str: string) => {
    try {
      const { data }: AxiosResponse<TypeData[]> = await api.get(
        `equipment/type?search=${str}`
      );
      setTypes(data);
    } catch (error) {
      console.error('Nenhum Equipamento encontrado');
    }
  };

  const formattedOptions = <T, K extends keyof T>(
    data: TypeData[]
  ): ISelectOption[] => {
    return data?.map((item) => {
      const optionLable = String(item.name);
      const optionValue: number | string = String(item.name);
      return { label: optionLable, value: optionValue };
    });
  };

  const handleSearch = debounce(async (str) => {
    if (str !== '') {
      fetchTypes(str);
    }
  }, 500);

  const handleChange = (event: SingleValue<ISelectOption>) => {
    const selectedOption = types.find((type) => type.name === event?.value);
    setSelectedType(selectedOption);
  };

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset: resetCreateForm,
  } = useForm<FormValues>();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEditForm,
  } = useForm<FormValues>();

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: errorsDelete },
    reset: resetDeleteForm,
  } = useForm<FormValues>();

  const onSubmitEdit = handleSubmitEdit(async (formData) => {
    try {
      const payload = {
        id: selectedType?.id,
        name: formData.edit,
      };
      const response = await api.put(`equipment/type`, payload);
      resetEditForm();
      toast.success('Tipo alterado com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao alterar o Tipo!';
      toast.error(message);
    }
  });

  const onSubmitDelete = handleSubmitDelete(async () => {
    try {
      const response = await api.delete(
        `equipment/type?id=${selectedType?.id}`
      );
      resetDeleteForm();
      toast.success('Tipo deletado com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao deletar o Tipo!';
      toast.error(message);
    }
  });

  const onSubmitAdd = handleSubmitCreate(async (formData) => {
    try {
      const payload = {
        name: formData.create,
      };
      const response = await api.post(`equipment/type`, payload);
      resetCreateForm();
      toast.success('Tipo criado com sucesso!', 'Sucesso');
    } catch (error: any) {
      console.error(error);
      const message = error.response.data.error
        ? error.response.data.error
        : 'Erro ao criar o Tipo!';
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
        Tipo
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
        <form id="type-edit-form" onSubmit={onSubmitEdit}>
          <Text
            pl="2%"
            pb="1%"
            color="#605555"
            fontWeight="medium"
            fontSize="lg"
            marginTop="3%"
          >
            Tipo para Editar
          </Text>
          <Select
            placeholder="Pesquisar por Nome"
            onInputChange={handleSearch}
            onChange={handleChange}
            options={formattedOptions(types)}
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
            placeholder="Novo nome para o tipo"
            {...registerEdit('edit', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />

          <Button
            marginTop="5%"
            width="100%"
            type="submit"
            form="type-edit-form"
            variant="primary"
          >
            Editar
          </Button>
        </form>

        <form id="type-delete-form" onSubmit={onSubmitDelete}>
          <Text
            pl="5px"
            pb="8px"
            color="#605555"
            fontWeight="medium"
            fontSize="lg"
            marginTop="3%"
          >
            Tipo para Excluir
          </Text>
          <Select
            placeholder="Pesquisar por Nome"
            onInputChange={handleSearch}
            onChange={handleChange}
            options={formattedOptions(types)}
          />
          <Button
            marginTop="5%"
            width="100%"
            type="submit"
            form="type-delete-form"
            variant="primary"
          >
            Excluir
          </Button>
        </form>

        <form id="type-add-form" onSubmit={onSubmitAdd}>
          <Text
            pl="5px"
            pb="8px"
            color="#605555"
            fontWeight="medium"
            fontSize="lg"
            marginTop="3%"
          >
            Cadastrar Tipo
          </Text>
          <Input
            size="lg"
            fontSize="lg"
            width="100%"
            placeholder="Nome do Tipo"
            {...registerCreate('create', {
              required: 'Campo Obrigatório',
              maxLength: 50,
            })}
          />

          <Button
            marginTop="5%"
            width="100%"
            type="submit"
            form="type-add-form"
            variant="primary"
          >
            Cadastrar
          </Button>
        </form>
      </Box>
    </div>
  );
}
