import { PDFDownloadLink } from "@react-pdf/renderer";
import { EquipmentsPDF } from './document'
import { Button } from "@chakra-ui/react";
import { MdPictureAsPdf } from "react-icons/md";
import { EquipmentData } from "@/pages/equipments/EquipmentsControl";

interface PDFprops {
	equipments: EquipmentData[]
}

export function PDF ({equipments}: PDFprops) {
	const date = new Date().getDate().toString()
	console.log(date)
	return (
		<PDFDownloadLink
		document={
			<EquipmentsPDF
			title={
				'Relatório de equipamentos'
			}
			equipments={equipments}
			date={date}
			/>
		}
		fileName={`relatorio_equipamentos_${date}`}
		>
	{({ loading }) => (
		<MdPictureAsPdf size="2.2rem" cursor="pointer"/>
	)}
	</PDFDownloadLink>
	)
}