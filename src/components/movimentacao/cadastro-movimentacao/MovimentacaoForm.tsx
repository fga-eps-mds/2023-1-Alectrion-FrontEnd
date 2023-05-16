/* trazer logo todos os campos de preencher para este arquivo*/ 
/*import moment from 'moment';*/
import { Box, Flex, Text, Checkbox, Table, Tbody, Td, Th, Thead, Tr, Select, Input, Button} from '@chakra-ui/react'
import { useFormik, Formik } from 'formik'
import { useHistory } from 'react-router-dom';



type NumeroTermoProps = {
  numeroTermo : string;
};
type DataProps = {
  dataProps: Date;
}
type TotalEquipamentoProps = {
  totalEquipamentosProps: string;
}
 
export class MovimentacaoForm{
  PostoDeTrabalhoDropdown() {
      return (
        <Flex
          position="absolute"
          left="50px" 
          top="143px"  
          width="170px"
          height="35px"
          flexDirection="column"
        >
          <span style={{ fontSize: "16px", color: "#212121" }}>Posto de Trabalho</span>
          <Select
            mt="5px"
            placeholder="Selecione uma opção"
            borderRadius="10px"
            borderColor="#212121"
            bg="#FFFFFF"
            color="#212121"
            width="269px"
            height="35px"
            _hover={{ borderColor: "#F49320" }}
            _focus={{ borderColor: "#F49320" }}
            value={formik.values.destin}
          >
            <option value="01° Delegacia de policia">01° Delegacia de policia</option>
            <option value="02° Delegacia de policia">02° Delegacia de policia</option>
            <option value="03° Delegacia de policia">03° Delegacia de policia</option>
          </Select>
          <Flex
            mt="5px"
            width="269px"
            height="35px"
            bg="#FFFFFF"
            borderRadius="10px"
            alignItems="center"
            paddingLeft="5px"
            color="#212121"
          >
          </Flex>
            
        </Flex>
      );
  }
  /*não colocamo definição de value em cidade*/
  CidadeDropdown() {
      return (
          <Flex
          position="absolute"
          left="350px" 
          top="143px"  
          width="170px"
          height="35px"
          flexDirection="column"
        >
          <span style={{ fontSize: "16px", color: "#212121" }}>Cidade</span>
          <Select
            mt="5px"
            placeholder="Selecione uma opção"
            borderRadius="10px"
            borderColor="#212121"
            bg="#FFFFFF"
            color="#212121"
            width="269px"
            height="35px"
            _hover={{ borderColor: "#F49320" }}
            _focus={{ borderColor: "#F49320" }}
          >
            <option value="Águas Lindas">Águas Lindas</option>
            <option value="Goiania">Goiania</option>
            
          </Select>
          <Flex
            mt="5px"
            width="269px"
            height="35px"
            bg="#FFFFFF"
            borderRadius="10px"
            alignItems="center"
            paddingLeft="5px"
            color="#212121"
          >
          
          </Flex>
        
        </Flex>
      );
  }
  /*Tem que ver */ 
  TipoDeLotaçãoDropdown() {
      return (
        <Flex
          position="absolute"
          left="660px" 
          top="143px"  
          width="170px"
          height="35px"
          flexDirection="column"
        >
          <span style={{ fontSize: "16px", color: "#212121" }}>Tipo de Lotação</span>
          <Select
            mt="5px"
            placeholder="Selecione uma opção"
            borderRadius="10px"
            borderColor="#212121"
            bg="#FFFFFF"
            color="#212121"
            width="269px"
            height="35px"
            _hover={{ borderColor: "#F49320" }}
            _focus={{ borderColor: "#F49320" }}
            value={formik.values.tipo}
            /* Tem que fazer depois uma conversão de tipo para numero*/
          >
            <option value="Empréstimo">Empréstimo</option> 
            <option value="Baixa">Baixa</option>
            <option value="Responsabilidade">Responsabilidade</option>
            
          </Select>
          <Flex
            mt="5px"
            width="269px"
            height="35px"
            bg="#FFFFFF"
            borderRadius="10px"
            alignItems="center"
            paddingLeft="5px"
            color="#212121"
          >
          </Flex>
        
        </Flex>
      );
  }
  AtribuicaoDropdown2() {
      return (
        <Flex
          position="absolute"
          left="660px"
          top="240px"
          width="170px"
          height="55px"
          flexDirection="column"
        >
          <span style={{ fontSize: "16px", color: "#212121" }}>Atribuição</span>
          <Select
            mt="5px"
            placeholder="Selecione uma opção"
            borderRadius="10px"
            borderColor="#212121"
            bg="#FFFFFF"
            color="#212121"
            width="269px"
            height="35px"
            _hover={{ borderColor: "#F49320" }}
            _focus={{ borderColor: "#F49320" }}
            value={formik.values.chiefRole}
          >
            <option value="delegado de polícia">Delegado de Polícia</option>
            <option value="policial civil">Policial Civil</option>
            <option value="investigador">Investigador</option>
          </Select>
          <Flex
            mt="5px"
            width="269px"
            height="35px"
            bg="#FFFFFF"
            borderRadius="10px"
            alignItems="center"
            paddingLeft="5px"
            color="#212121"
          >
            
          </Flex>

        </Flex>
      );
  }
  ResponsavelPelaMovimentacao() {
    return (
      <Flex
        position="absolute"
        left="50px"
        top="240px" 
        width="170px"
        height="55px"
        borderRadius="10px"
        borderColor = '#212121'
        backgroundColor="#FFFFFF"
        boxShadow="lg"
        flexDirection="column"
      >
        <span style={{ fontSize: "16px", color: "#212121" }}>Responsável</span>
        <Box
          mt="5px"
          width="580px"
          height="100px"
          borderColor = '#212121'
          borderRadius="10px"
          backgroundColor="#FFFFFF"
          boxShadow="lg"
        >
          <Input
            border="none"
            bg="#FFFFFF"
            color="#C6C6C6"
            placeholder="Nome da pessoa responsável"
            _focus={{ outline: "none" }}
            value={formik.values.inChargeName}
          />
        </Box>
      </Flex>
    );
  }
  AtribuicaoDropdown() {
    return (
      <Flex
        position="absolute"
        left="530px"
        top="700px"
        width="269px"
        height="55px"
        flexDirection="column"
      >
        <span style={{ fontSize: "16px", color: "#212121" }}>Atribuição</span>
        <Select
          mt="5px"
          placeholder="Selecione uma opção"
          borderRadius="10px"
          borderColor="#212121"
          bg="#FFFFFF"
          color="#212121"
          width="269px"
          height="35px"
          _hover={{ borderColor: "#F49320" }}
          _focus={{ borderColor: "#F49320" }}
          value={formik.values.chiefRole}
        >
          <option value="delegado de polícia">Delegado de Polícia</option>
          <option value="policial civil">Policial Civil</option>
          <option value="investigador">Investigador</option>
        </Select>
        <Flex
          mt="5px"
          width="269px"
          height="35px"
          bg="#FFFFFF"
          borderRadius="10px"
          alignItems="center"
          paddingLeft="5px"
          color="#212121"
        >
        </Flex>
       
      </Flex>
    );
  }
  ResponsavelPeloTermo() {
    return (
      <Flex
        position="absolute"
        left="50px"
        top="700px"
        width="150px"
        height="55px"
        borderRadius="10px"
        
        backgroundColor="#FFFFFF"
        boxShadow="lg"
        flexDirection="column"
      >
        <span style={{ fontSize: "16px", color: "#212121", whiteSpace: "nowrap" ,borderColor: "#212121"}}>
          Responsável pelo Termo de Responsabilidade
        </span>
        <Box
          mt="5px"
          width="450px"
          height="100px"
          borderColor="#212121"
          borderRadius="10px"
          backgroundColor="#FFFFFF"
          boxShadow="lg"
        >
          <Input
            border="none"
            bg="#FFFFFF"
            color="#C6C6C6"
            placeholder="Nome da pessoa responsável"
            _focus={{ outline: "none" }}
            value={formik.values.chiefName}
          />
        </Box>
      </Flex>
    );
  }
  MovimentacaoTable() {
    return (
      <Box className="material-specs-container" position="relative">
     <Text
     fontSize="20px"
     color="#000000"
     w="277.33px"
     h="24px"
     position="absolute"
     top="-550px"
     left="10px"
     textTransform="uppercase"
    >
    Especificação do Material
    </Text>
        <Box
          w="895px"
          h="342px"
          backgroundColor="#ffffff"
          border="1px solid #f49320"
          borderRadius="10px"
          mt="-515px"
          overflow="auto"
          maxH="300px"
        >
          <Table w="936.91px">
            <Thead>
              <Tr>
                <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320">
                  Equipamento
                </Th>
                <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320">
                  Tombamento
                </Th>
                <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320">
                  N° de Serie
                </Th>
                <Th fontSize="20px" color="#ffffff" backgroundColor="#f49320"></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Equipamento 1</Td>
                <Td>Tombamento 1</Td>
                <Td>{'000001'.padStart(6, '0')}</Td>
                <Td>
                  <Checkbox size="lg" colorScheme="orange" />
                </Td>
              </Tr>
              <Tr> 
                <Td>Equipamento 2</Td>
                <Td>Tombamento 2</Td>
                <Td>{'000002'.padStart(6, '0')}</Td>
                <Td>
                  <Checkbox size="lg" colorScheme="orange" />
                </Td>
              </Tr>
              {/* Adicione mais linhas aqui */}
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  };
  MovimentacaoCancelButton() {
    
      const history = useHistory();
    
      const handleCancel = () => {
        history.push('/outra-pagina');
      };

      const handleCancel2 = () => {
        history.push('/outra-pagina');
      };
    
      return (
        <Flex gap="60px" mt="720px" alignSelf="flex-start" marginLeft="200px">
          <Button background="#212121" borderRadius="50px" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button borderRadius="50px" onClick={handleCancel2}>
            Confirmar
            </Button>
        </Flex>
      );
    
  }
  TotalEquipamentosProps({ totalEquipamentosProps }: TotalEquipamentoProps) {
  return (
    <div
      className="TotalEquipamentoProps"
      style={{
        position: "absolute",
        left: "650px",
        top: "109px",
        width: "170px",
        height: "24px",
        whiteSpace: "nowrap",
      }}
    >
      <span><strong>Total de equipamentos:</strong> {totalEquipamentosProps}</span>
    </div>
  );
  }
  DataProps({ dataProps }: DataProps) {
  return (
    <div
      className="DataProps"
      style={{
        position: "absolute",
        left: "350px",
        top: "109px",
        width: "180px",
        height: "24px",
      }}
    >
      <span style={{ whiteSpace: "nowrap" }}><strong>Data:</strong> {/*moment(dataProps).format("DD/MM/YYYY HH:mm:ss"*/}</span>
    </div>
  );
  }
  NumeroTermoProps({ numeroTermo }: NumeroTermoProps) {
    return (
      <div
        className="NumeroTermoProps"
        style={{
          position: "absolute",
          left: "50px",
          top: "109px",
          width: "170px",
          height: "24px",
        }}
      >
        <span><strong>N° termo:</strong> {numeroTermo}</span>
      </div>
    );
  }
  MovimentacaoTitle() {
    return (
      <Flex alignItems="center" justifyContent="space-between" mb="33px">
        <Flex alignItems="center">
          <Text fontSize="40px" textColor="#212121">
            Movimentação
          </Text>
        </Flex>
      </Flex>
    );
  }

  const formik = useFormik({
    initialValues: {
      data: '',
      userId: '',
      equipmentList: '',
      tipo: '',
      inChargeName: '',
      inChargeRole: '',
      chiefName: '',
      chiefRole: '',
      equipmentSnapshots: '',
      description: '',
      destination: '',
    },
    onSubmit: async (values) => {
      const body = {
        data: values.date,
        userId: values.userId,
        equipmentList: values.equipmentList,
        tipo: values.tipo,
        inChargeName: values.inChargeName,
        inChargeRole: values.inChargeRole,
        chiefName: values.chiefName,
        chiefRole: values.chiefRole,
        equipmentSnapshots: values.equipmentSnapshots,
        description: values.description,
        destination: values.destination,
      };
      const formattedBody = Object.entries(body)
        .filter((object) => object[1] !== null)
        .reduce((newObj, [key, val]) => {
          return { ...newObj, [key]: val };
        }, {});
      try {
        await api.post('equipment/createMovement', formattedBody);
        toast.success('Movimentacao cadastrada com sucesso.');
      } catch (error) {
        toast.error('Aconteceu erro no front.');
      }
      formik.resetForm();
    }
  });
}

export default MovimentacaoForm


