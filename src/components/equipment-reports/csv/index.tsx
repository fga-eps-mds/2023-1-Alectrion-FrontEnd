import { EquipmentData } from '@/pages/equipments/EquipmentsControl'
import { CSVLink } from 'react-csv'
import { GrDocumentCsv } from 'react-icons/gr'

interface CSVprops {
	date: string[];
	equipments: EquipmentData[];
	onClick: () => {};
}

export function CSV ({ date, equipments, onClick }: CSVprops) {
	const headers = [
		{ label: 'Tombamento', key: 'tippingNumber' },
		{ label: 'Nº de série', key: 'serialNumber' },
		{ label: 'Tipo', key: 'type' },
		{ label: 'Marca', key: 'brand.name' },
		{ label: 'Modelo', key: 'model' },
		{ label: 'Processador', key: 'processor' },
		{ label: 'Tipo de Armazenamento', key: 'storageType' },
		{ label: 'Memória RAM', key: 'ram_size' },
		{ label: 'Tipo de Tela', key: 'screenType' },
		{ label: 'Tamanho da tela', key: 'screenSize' },
		{ label: 'Potência', key: 'power' },
		{ label: 'Situação', key: 'situacao' },
		{ label: 'Localização', key: 'unit.name' },
		{ label: 'Descrição', key: 'description' },
		{ label: 'Data de Aquisição', key: 'acquisitionData' },
	];

	const csvData = equipments;
	return (
		<CSVLink 
			data={csvData}
			headers={headers}
			type='xls'
			target='_blank'
			filename={`relatorio_equipamentos_${date[0]}_${date[1]}_${date[2]}`}
			onClick={onClick}
			>
			<GrDocumentCsv size="2.2rem"/>
		</CSVLink>
	)
}