import { useNavigate } from 'react-router-dom';
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
import { useAuth } from '@/contexts/AuthContext';
import { SideBar } from '@/components/side-bar';
import { theme } from '@/styles/theme';
import { NewControlledSelect } from '@/components/form-fields/new-controlled-select';
import { useForm } from 'react-hook-form';

function EquipmentsFields() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const {
    watch,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserPayload>();

  return (
    <form aria-label="form">
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
                  <Box>
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
                    <Input
                      size="lg"
                      fontSize="lg"
                      name="email"
                      width="100%"
                      marginRight="75px"
                      placeholder={` ${user?.email}`}
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
                      name="email"
                      width="100%"
                      marginRight="75px"
                      placeholder={` ${user?.email}`}
                    />

                    <Button
                      marginTop="5%"
                      width="100%"
                      colorScheme={theme.colors.primary}
                      onClick={() => { }}
                    >
                      Editar
                    </Button>
                  </Box>

                  <Box>
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
                    <Input
                      size="lg"
                      fontSize="lg"
                      name="telefone"
                      width="100%"
                      placeholder="Nome Marca"
                    />
                    <Button
                      marginTop="5%"
                      width="100%"
                      colorScheme={theme.colors.primary}
                      onClick={() => { }}
                    >
                      Excluir
                    </Button>
                  </Box>

                  <Box>
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
                      name="telefone"
                      width="100%"
                      placeholder="Nome da Marca"
                    />

                    <Button
                      marginTop="5%"
                      width="100%"
                      colorScheme={theme.colors.primary}
                      onClick={() => { }}
                    >
                      Cadastrar
                    </Button>
                  </Box>

                </Box>
              </div>
            </Flex>
          </Flex>
        </GridItem>
      </Grid>
    </form>
  );
}
export { EquipmentsFields };
