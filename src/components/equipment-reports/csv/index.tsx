import { EquipmentData } from '@/pages/equipments/EquipmentsControl'
import { CSVLink, CSVDownload } from 'react-csv'
import { FaFileCsv } from 'react-icons/fa'

export function CSV (equipments: any) {
	const csvData = [
		["firstname", "lastname", "email"],
		["Ahmed", "Tomi", "ah@smthing.co.com"],
		["Raed", "Labes", "rl@smthing.co.com"],
		["Yezzi", "Min l3b", "ymin@cocococo.com"]
	];
	return (
		<CSVLink 
			data={csvData}
		>
		<FaFileCsv size="2.2rem"/>
		</CSVLink>
	)
}