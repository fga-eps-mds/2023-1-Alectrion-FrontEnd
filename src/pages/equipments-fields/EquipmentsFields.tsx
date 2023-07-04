import {
  Text,
  Divider,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { SideBar } from '@/components/side-bar';
import { theme } from '@/styles/theme';
import EditBrandsForm from '@/components/edit-brands-form';

function EquipmentsFields() {

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
              Controle de Cadastro
            </Text>
            <Flex justifyContent="space-between" width="100%">
              <Text color="#00000" fontWeight="medium" fontSize="2xl">
                Edite os Dados Cadastrais
              </Text>
            </Flex>
            <Divider borderColor="#00000" margin="15px 0 15px 0" />

            <EditBrandsForm />

          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}
export { EquipmentsFields };
