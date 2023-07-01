import { EquipmentData } from '@/pages/equipments/EquipmentsControl';
import { BsFiletypeXlsx } from 'react-icons/bs'
import { useExcelDownloder } from 'react-xls'

interface Excelprops {
	date: string[];
	equipments: EquipmentData[];
	onClick: () => {};
}	

export function Excel ({ date, equipments, onClick }: Excelprops) {
	const { ExcelDownloder, Type } = useExcelDownloder();
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
	return (
		<ExcelDownloder data={{equipments}} headers={headers} type={Type.Button} filename={`relatorio_equipamentos_${date[0]}_${date[1]}_${date[2]}`}>
			<BsFiletypeXlsx size="2.2rem"/>
		</ExcelDownloder>
	)
}
