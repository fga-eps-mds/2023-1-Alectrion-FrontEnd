import { Text } from '@chakra-ui/react';

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
          left: "666px",
          top: "109px",
          width: "170px",
          height: "24px",
        }}
      >
        <span>Total de Equipamentos: {totalEquipamentosProps}</span>
      </div>
    );
}
export function DataProps({ dataProps }: DataProps) {
    return (
      <div
        className="DataProps"
        style={{
          position: "absolute",
          left: "367px",
          top: "109px",
          width: "170px",
          height: "24px",
        }}
      >
        <span>Data: {dataProps.toString()}</span>
      </div>
    );
}
export function NumeroTermoProps({ numeroTermo }: NumeroTermoProps) {
    return (
      <div
        className="NumeroTermoProps"
        style={{
          position: "absolute",
          left: "68px",
          top: "109px",
          width: "170px",
          height: "24px",
        }}
      >
        <span> N° termo: = {numeroTermo}</span>
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
  
