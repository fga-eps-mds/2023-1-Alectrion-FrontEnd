import { Text } from '@chakra-ui/react';
import moment from 'moment';

type NumeroTermoProps = {
    numeroTermo : string;
};

type DataProps = {
    dataProps: Date;
}

type TotalEquipamentoProps = {
    totalEquipamentosProps: string;
}
  
export function TotalEquipamentosProps({ totalEquipamentosProps }: TotalEquipamentoProps) {
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
export function DataProps({ dataProps }: DataProps) {
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
      <span style={{ whiteSpace: "nowrap" }}><strong>Data:</strong> {moment(dataProps).format("DD/MM/YYYY HH:mm:ss")}</span>
    </div>
  );
}
export function NumeroTermoProps({ numeroTermo }: NumeroTermoProps) {
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
export  function MovimentacaoTitle() {
  return (
    <Text fontSize="40px" textColor="#212121" mb="33px">
      Movimentação
    </Text>
  );
}   
  
