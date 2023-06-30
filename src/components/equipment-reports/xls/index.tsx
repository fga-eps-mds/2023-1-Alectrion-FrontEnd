import { BsFiletypeXlsx } from 'react-icons/bs'
import { useExcelDownloder } from 'react-xls'

export function Excel () {
	const { ExcelDownloder, Type } = useExcelDownloder();
	const csvData = [
		["firstname", "lastname", "email"],
		["Ahmed", "Tomi", "ah@smthing.co.com"],
		["Raed", "Labes", "rl@smthing.co.com"],
		["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
	return (
		<ExcelDownloder data={csvData} type={Type.Button}>
			<BsFiletypeXlsx size="2.2rem"/>
		</ExcelDownloder>
	)
}
