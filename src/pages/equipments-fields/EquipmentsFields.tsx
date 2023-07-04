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

function EquipmentsFields() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  console.log(user);

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
                    >
                      Nome
                    </Text>
                    <Input
                      size="lg"
                      fontSize="lg"
                      name="name"
                      width="100%"
                      marginRight="75px"
                      placeholder={` ${user?.name}`}
                    />
                  </Box>

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
                    <Input
                      size="lg"
                      fontSize="lg"
                      name="email"
                      width="100%"
                      marginRight="75px"
                      placeholder={` ${user?.email}`}
                    />
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
                      Cargo
                    </Text>
                    <Input
                      size="lg"
                      fontSize="lg"
                      name="telefone"
                      width="100%"
                      placeholder={` ${user?.job}`}
                    />
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
