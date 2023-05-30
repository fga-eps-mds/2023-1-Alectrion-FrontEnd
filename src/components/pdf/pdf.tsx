import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PageSize } from 'pdfmake/interfaces';

function movimentacaoPDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle: any[] = []; // Adicione o tipo explícito

    const details: any[] = []; // Adicione o tipo explícito

    const rodape: any[] = []; // Adicione o tipo explícito

    const docDefinitios = {
        pageSize: 'A4' as PageSize,
        pageMargins: [15, 50, 15, 40] as [number, number, number, number], // Corrija o tipo

        header: [reportTitle],
        content: [details],
        footer: [rodape]
    };

    pdfMake.createPdf(docDefinitios).download();
}

export default movimentacaoPDF;