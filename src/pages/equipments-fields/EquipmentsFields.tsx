import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { api } from '@/config/lib/axios';
import {
  Input,
  Text,
  Box,
  Center,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Button,
  IconButton,
  TableContainer,
  Divider,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { AxiosResponse } from 'axios';
import { Select, SingleValue } from 'chakra-react-select';
import { useAuth } from '@/contexts/AuthContext';
import { SideBar } from '@/components/side-bar';
import { theme } from '@/styles/theme';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { useForm } from 'react-hook-form';

interface ISelectOption {
  label: string;
  value: number | string;
}

interface BrandData {
  brand: { name: string };
}

function EquipmentsFields() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const take = 5;

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserPayload>();

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
            <Text
              margin="20px 0 15px 0"
              color={theme.colors.black}
              fontWeight="semibold"
              fontSize="4xl"
            >
              Perfil de Usuário
            </Text>
            <Flex justifyContent="space-between" width="100%">
              <Text color="#00000" fontWeight="medium" fontSize="2xl">
                Dados Cadastrais
              </Text>
            </Flex>
            <Divider borderColor="#00000" margin="15px 0 15px 0" />
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
                <form id="brand-edit-form">
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

                <form id="brand-delete-form">
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

                <form id="brand-add-form">
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
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}
export { EquipmentsFields };
