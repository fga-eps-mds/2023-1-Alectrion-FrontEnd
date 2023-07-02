import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { Modal } from '../modal';
import React, { useState } from "react";
import * as XLSX from "xlsx";
// import {AiFillFileAdd} from '@chakra-ui/icons';
import { AiFillFileAdd } from 'react-icons/ai';

type EquipmentsUploadModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EquipmentsUploadModal = ({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
}: EquipmentsUploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const formattedData = formatData(jsonData as any [][]);
        // Agora você pode utilizar os dados (formattedData) para cadastrar no banco de dados, exibir em uma tabela, etc.
        console.log(formattedData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const formatData = (jsonData: any[][]) => {
    const formattedData: any[] = [];

    // Percorre cada linha da planilha
    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      const formattedRow: any = {};

      // Validação dos campos obrigatórios
      const tipoEquipamento = row[0];
      const marca = row[1];
      const modelo = row[2];
      const numeroTombamento = row[3];
      const numeroSerie = row[4];
      const numeroNotaFiscal = row[5];
      const tipoAquisicao = row[6];
      const estadoEquipamento = row[7];
      const anoAquisicao = row[8];
      const dataAquisicao = row[9];

      if (
        !tipoEquipamento ||
        !marca ||
        !modelo ||
        !numeroTombamento ||
        !numeroSerie ||
        !numeroNotaFiscal ||
        !tipoAquisicao ||
        !estadoEquipamento ||
        !anoAquisicao ||
        !dataAquisicao
      ) {
        // Pular linha se algum dos campos obrigatórios estiver faltando
        continue;
      }

      formattedRow.tipoEquipamento = tipoEquipamento;
      formattedRow.marca = marca;
      formattedRow.modelo = modelo;
      formattedRow.numeroTombamento = numeroTombamento;
      formattedRow.numeroSerie = numeroSerie;
      formattedRow.numeroNotaFiscal = numeroNotaFiscal;
      formattedRow.tipoAquisicao = tipoAquisicao;
      formattedRow.estadoEquipamento = estadoEquipamento;
      formattedRow.anoAquisicao = anoAquisicao;
      formattedRow.dataAquisicao = dataAquisicao;

      // Campos adicionais para tipos específicos de equipamento
      if (tipoEquipamento === "CPU") {
        const qtdMemoriaRAM = row[10];
        const tipoArmazenamento = row[11];
        const qntArmazenamento = row[12];
        const processador = row[13];

        formattedRow.qtdMemoriaRAM = qtdMemoriaRAM;
        formattedRow.tipoArmazenamento = tipoArmazenamento;
        formattedRow.qntArmazenamento = qntArmazenamento;
        formattedRow.processador = processador;
      } else if (tipoEquipamento === "Estabilizador") {
        const potencia = row[10];

        formattedRow.potencia = potencia;
      } else if (tipoEquipamento === "Monitor") {
        const tipoMonitor = row[10];
        const tamanhoMonitor = row[11];

        formattedRow.tipoMonitor = tipoMonitor;
        formattedRow.tamanhoMonitor = tamanhoMonitor;
      } else if (tipoEquipamento === "Nobreak") {
        const potencia = row[10];

        formattedRow.potencia = potencia;
      }

      // Campo opcional
      const descricao = row[14];
      if (descricao) {
        formattedRow.descricao = descricao;
      }

      formattedData.push(formattedRow);
    }

    return formattedData;
    };

  return (
    <Modal
      title="Cadastro de Equipamentos"
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
    >
      <Flex
        height="100%"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="16px"
      >
        <Text fontWeight="bold" alignSelf="self-start">
          Upload XLS
        </Text>
        <Flex
          width="100%"
          height={374}
          borderStyle="dashed"
          borderWidth={2}
          borderColor="black"
          onDrop={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
        >
        <Icon as={AiFillFileAdd} boxSize={6} marginRight={2} />
        <Text textAlign="center" alignSelf = "center" lineHeight="374px" fontWeight="bold" fontSize="20px">
            Arraste um arquivo XLS
          </Text>
        </Flex>
        <Flex>
          <Text flex="1">Adicione um arquivo do seu computador</Text>
          <Flex flex="2" justifyContent="center" alignItems="center">
            <input type="file" onChange={handleFileChange} />
          </Flex>
        </Flex>
        <Flex gap="60px" paddingY="64px">
          <Button variant="secondary">Cancelar</Button>
          <Button onClick={handleUpload}>Registrar</Button>
        </Flex>
      </Flex>
    </Modal>
  );
  
};
