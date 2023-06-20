import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
import { SideBar } from '@/components/side-bar';
import { theme } from '@/styles/theme';
//comentario
function ViewProfile() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  return (
      <form  aria-label="form">
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
                <Text
                  margin="20px 0 15px 0"
                  color={theme.colors.black}
                  fontWeight="semibold"
                  fontSize="4xl"
                >
                  {user?.name}
                </Text>
                <Box
                  bg="white"
                  borderRadius="10px"
                  borderWidth="1.9px"
                  borderColor="rgba(255, 165, 0, 1)"
                  boxShadow="0px 0px 15px grey;"
                  color="black"
                  paddingY="5%"
                  paddingX="5%"
                  width="1000px"
                >
                    <Flex>
                      <Box>
                        <Text
                          pl="2%"
                          pb="1%"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          Nome
                        </Text>
                        <Input size="lg" fontSize="lg" name='name' width='120%' marginRight="75px" readOnly placeholder={` ${user?.name}`}/>
                      </Box>
                      <Box marginLeft="5px">
                        <Text
                          pl="22%"
                          pb="1%"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                        >
                          CPF
                        </Text>
                        <Input size="lg" fontSize="lg" name='cpf' width='120%' marginLeft="75px" readOnly placeholder={` ${user?.cpf}`}/>
                      </Box>
                    </Flex>
                    <Flex>
                      <Box>
                        <Text
                           pl="2%"
                           pb="1%"
                           color="#605555"
                           fontWeight="medium"
                           fontSize="lg"
                           marginTop="3%"
                        >
                          Email
                        </Text>
                        <Input size="lg" fontSize="lg" name='email' width='120%' marginRight="75px" readOnly placeholder={` ${user?.email}`}/>
                      </Box>
                      <Box marginLeft="5px">
                        <Text
                          pl="22%"
                          pb="1%"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                          marginTop="3%"
                        >
                          Tipo de Usuário
                        </Text>
                        <Input size="lg" fontSize="lg" name='user' width='120%' marginLeft="75px" readOnly placeholder={` ${user?.role}`}/>
                      </Box>
                    </Flex>
                    <Flex>
                      <Box>
                        <Text
                          pl="5px"
                          pb="8px"
                          color="#605555"
                          fontWeight="medium"
                          fontSize="lg"
                          marginTop="3%"
                        >
                          Cargo
                        </Text>
                        <Input size="lg" fontSize="lg" name='telefone' width='120%' readOnly placeholder={` ${user?.job}`}/>
                      </Box>
                    </Flex>
                    <Flex justify="space-between">
                      <Button
                        marginTop="100px"
                        paddingX="24"
                        width="20px"
                        color="white"
                        bg="black"
                        onClick={() => window.history.back()}
                      >
                        Voltar
                      </Button>
                      <Button
                        marginTop="100px"
                        paddingX="24"
                        width="20px"
                        color="white"
                        bg="black"
                        onClick={() => navigate('/change-password')}
                      >
                        Alterar senha
                      </Button>
                    </Flex>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </form>
  );
}
export { ViewProfile };
