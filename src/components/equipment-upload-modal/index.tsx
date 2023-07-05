import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { AiFillFileAdd } from 'react-icons/ai';
import { MdAttachFile } from 'react-icons/md';
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { parse, format } from 'date-fns';
import { api } from '@/config/lib/axios';
import { Modal } from '../modal';
import { toast } from '@/utils/toast';

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
    const selectedFile = e.target.files?.[0] ?? null;
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

    for (let i = 1; i < jsonData.length; i += 1) {
      const row = jsonData[i];
      const formattedRow: any = {};

      const tipoEquipamento = row[0];
      const marca = row[1];
      const modelo = row[2];
      const numeroTombamento = row[3];
      const numeroSerie = row[4];
      const tipoAquisicao = row[5];
      const estadoEquipamento = row[6];
      const dataAquisicao = row[7];

      if (
        !tipoEquipamento ||
        !marca ||
        !modelo ||
        !numeroTombamento ||
        !numeroSerie ||
        !tipoAquisicao ||
        !estadoEquipamento ||
        !dataAquisicao
      ) {
        // eslint-disable-next-line no-continue
        continue;
      }

      formattedRow.type = tipoEquipamento;
      formattedRow.brandName = marca;
      formattedRow.model = modelo.toString();
      formattedRow.tippingNumber = numeroTombamento.toString();
      formattedRow.serialNumber = numeroSerie;
      formattedRow.acquisitionName = tipoAquisicao;
      formattedRow.estado =
        estadoEquipamento.charAt(0).toUpperCase() + estadoEquipamento.slice(1);

      const data = new Date(1900, 0, dataAquisicao - 1);
      const data2 = format(data, 'dd/MM/yyyy');
      formattedRow.acquisitionDate = parse(data2, 'dd/MM/yyyy', new Date());

      if (tipoEquipamento === 'CPU') {
        const qtdMemoriaRAM = row[8];
        const tipoArmazenamento = row[9];
        const qntArmazenamento = row[10];
        const processador = row[11];

        formattedRow.ram_size = qtdMemoriaRAM.toString();
        formattedRow.storageType = tipoArmazenamento;
        formattedRow.storageAmount = qntArmazenamento.toString();
        formattedRow.processor = processador;
      } else if (
        tipoEquipamento === 'Estabilizador' ||
        tipoEquipamento === 'Nobreak'
      ) {
        const potencia = row[12];

        formattedRow.power = potencia;
      } else if (tipoEquipamento === 'Monitor') {
        const tipoMonitor = row[13];
        const tamanhoMonitor = row[14];

        formattedRow.screenType = tipoMonitor;
        formattedRow.screenSize = tamanhoMonitor;
      }
      // Campo opcional
      const descricao = row[15];
      if (descricao) {
        formattedRow.description = descricao;
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

        if (jsonData.length <= 1) {
          toast.error(
            'Planilha sem nenhum equipamento, favor verificar o arquivo',
            'Erro'
          );
        }
        const formattedData = formatData(jsonData as any[][]);

        formattedData.forEach((item) => {
          api
            .post('equipment/createEquipment', item)
            .then((response) => {
              if (response.status === 200) {
                toast.success(
                  'Equipamentos cadastrados com sucesso',
                  'Sucesso'
                );
                setRefreshRequest(!refreshRequest);
                onClose();
              } else {
                toast.error(
                  'Sua importação não foi bem sucedida! Verifique se os campos estão preenchidos corretamente.',
                  'Erro'
                );
              }
            })
            .catch((error) => {
              if (
                error.response.data.error ===
                'Tippingnumber nao pode ser igual ao de um equipamento ja cadastrado.'
              ) {
                toast.error(
                  'Já existe um equipamento cadastrado com este número de tombamento. Cadastre um equipamento com número de tombamento diferente.',
                  'Erro'
                );
              }
              if (
                error.response.data.error ===
                'Tipo de equipamento não encontrado.'
              ) {
                toast.error(
                  'Tipo do equipamento não encontrado por favor verifique se foi digitado corretamente',
                  'Erro'
                );
              }
              console.error(error);
            });
        });
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
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleUpload}>Registrar</Button>
        </Flex>
      </Flex>
    </Modal>
  );
}
