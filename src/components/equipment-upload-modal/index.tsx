import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdAttachFile } from 'react-icons/md';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Modal } from '../modal';

type EquipmentsUploadModalProps = {
  isOpen: boolean;
  onClose(): void;
  refreshRequest: boolean;
  setRefreshRequest: React.Dispatch<React.SetStateAction<boolean>>;
};

export function EquipmentsUploadModal({
  isOpen,
  onClose,
  refreshRequest,
  setRefreshRequest,
}: EquipmentsUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const onDropFile = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];

    if (fileInputRef.current) {
      fileInputRef.current.files = e.dataTransfer.files;
    }

    setFile(file);
    setIsHovering(false);
  };

  const onDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();

    setIsHovering(false);
  };

  const onDragStart = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();

    setIsHovering(true);
  };

  const formatData = (jsonData: any[][]) => {
    const formattedData: any[] = [];

    // Percorre cada linha da planilha
    for (let i = 1; i < jsonData.length; i += 1) {
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
        // eslint-disable-next-line no-continue
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
      if (tipoEquipamento === 'CPU') {
        const qtdMemoriaRAM = row[10];
        const tipoArmazenamento = row[11];
        const qntArmazenamento = row[12];
        const processador = row[13];

        formattedRow.qtdMemoriaRAM = qtdMemoriaRAM;
        formattedRow.tipoArmazenamento = tipoArmazenamento;
        formattedRow.qntArmazenamento = qntArmazenamento;
        formattedRow.processador = processador;
      } else if (tipoEquipamento === 'Estabilizador') {
        const potencia = row[10];

        formattedRow.potencia = potencia;
      } else if (tipoEquipamento === 'Monitor') {
        const tipoMonitor = row[10];
        const tamanhoMonitor = row[11];

        formattedRow.tipoMonitor = tipoMonitor;
        formattedRow.tamanhoMonitor = tamanhoMonitor;
      } else if (tipoEquipamento === 'Nobreak') {
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

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const formattedData = formatData(jsonData as any[][]);
      };
      reader.readAsArrayBuffer(file);
    }
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
          borderColor={isHovering ? 'blue' : 'black'}
          backgroundColor={isHovering ? 'blue.100' : 'unset'}
          onDrop={onDropFile}
          onDragOver={onDragStart}
          onDragLeave={onDragOver}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={4}
        >
          {file ? (
            <>
              <Icon as={MdAttachFile} boxSize={16} marginRight={2} />
              <Text
                textAlign="center"
                alignSelf="center"
                fontWeight="bold"
                fontSize="20px"
              >
                {file.name}
              </Text>
            </>
          ) : (
            <>
              <Icon as={AiFillFileAdd} boxSize={16} marginRight={2} />
              <Text
                textAlign="center"
                alignSelf="center"
                fontWeight="bold"
                fontSize="20px"
              >
                Arraste um arquivo XLS
              </Text>
            </>
          )}
        </Flex>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text>Adicione um arquivo do seu computador</Text>
          <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        </Flex>
        <Flex gap="60px" paddingY="64px">
          <Button variant="secondary">Cancelar</Button>
          <Button onClick={handleUpload}>Registrar</Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
