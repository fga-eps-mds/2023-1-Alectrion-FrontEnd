import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { PageSize, Content, TDocumentDefinitions } from 'pdfmake/interfaces';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function movimentacaoPDF() {
    const reportTitle: Content[] = [
        { text: 'ESTADO DE GOIÁS', fontSize: 8, alignment: 'center' },
        { text: 'DIRETORIA GERAL DA POLÍCIA CIVIL', fontSize: 8, alignment: 'center' },
        { text: 'SUPERINTENDÊNCIA DE GESTÃO INTEGRADA', fontSize: 8, alignment: 'center' },
        { text: 'DIVISÃO DE SUPORTE TÉCNICO EM INFORMÁTICA', fontSize: 8, alignment: 'center' }
    ];

    const details: Content[] = [];

    const rodape: Content[] = [

    ];

    const docDefinition: TDocumentDefinitions = {
        pageSize: 'A4' as PageSize,
        pageOrientation: 'landscape',
        pageMargins: [15, 50, 15, 40] as [number, number, number, number],

        header: reportTitle,
        content: details,
        footer: rodape
    };

    pdfMake.createPdf(docDefinition).download();
}

export default movimentacaoPDF;