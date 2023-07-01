import { PDFDownloadLink } from "@react-pdf/renderer";
import { EquipmentsPDF } from './document'
import { Button } from "@chakra-ui/react";
import { MdPictureAsPdf } from "react-icons/md";
import { EquipmentData } from "@/pages/equipments/EquipmentsControl";

interface PDFprops {
	date: string[]
	equipments: EquipmentData[]
}

export function PDF ({date, equipments}: PDFprops) {
	return (
		<PDFDownloadLink
		document={
			<EquipmentsPDF
			title={
				'Relatório de equipamentos'
			}
			equipments={equipments}
			date={`${date[0]}_${date[1]}_${date[2]}`}
			/>
		}
		fileName={`relatorio_equipamentos_${date[0]}_${date[1]}_${date[2]}`}
		>
		<MdPictureAsPdf size="2.2rem" cursor="pointer"/>

	</PDFDownloadLink>
	)
}