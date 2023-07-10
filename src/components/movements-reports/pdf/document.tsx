import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { movement } from '@/pages/movements/MovementControl';
import { formatDate } from '@/utils/format-date';

interface MovementsPdfProps {
  movements: movement[];
  title: string;
}

Font.register({
  family: 'Arial',
  fonts: [
    {
      src: 'https://fonts.cdnfonts.com/s/29107/ARIALMTMEDIUM.woff',
      fontStyle: 'normal',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.cdnfonts.com/s/29107/ARIALBOLDMT.woff',
      fontStyle: 'bold',
      fontWeight: 700,
    },
  ],
});

export function MovementsPDF({ title, movements }: MovementsPdfProps) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: 20,
      fontFamily: 'Arial',
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    caption: {
      fontSize: 8,
    },
    title: {
      paddingTop: 24,
      textTransform: 'uppercase',
      fontSize: 20,
      fontWeight: 700,
    },
    subtitle: {
      fontSize: 12,
      paddingBottom: 24,
    },
    locale: {
      paddingBottom: 16,
      fontSize: 12,
      fontWeight: 700,
    },
    logo: {
      width: 50,
      height: 66,
      marginBottom: 4,
    },
    tableHeader: {
      backgroundColor: '#D8D8D8',
      flexDirection: 'row',
      marginTop: 8,
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderBottomColor: '#000',
      minHeight: 24,
      alignItems: 'center',
    },
    columnHeader: {
      color: '#000',
      flex: 1,
      textAlign: 'center',
      fontSize: 8,
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      minHeight: 24,
      alignItems: 'center',
    },
    rowData: {
      fontSize: 8,
      flex: 1,
      textAlign: 'center',
      paddingRight: 15,
    },
    signature: {
      marginTop: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

  const formattedEmissionDate = (): string => {
    const currentEmissionDate = new Date();
    const emissionDay = currentEmissionDate
      .getDate()
      .toString()
      .padStart(2, '0');
    const emissionMonth = (currentEmissionDate.getMonth() + 1)
      .toString()
      .padStart(2, '0');
    const emissionYear = currentEmissionDate
      .getFullYear()
      .toString()
      .padStart(4, '0');

    const emissionHours = currentEmissionDate
      .getHours()
      .toString()
      .padStart(2, '0');
    const emissionMinutes = currentEmissionDate
      .getMinutes()
      .toString()
      .padStart(2, '0');
    const emissionSeconds = currentEmissionDate
      .getSeconds()
      .toString()
      .padStart(2, '0');

    return `${emissionDay}/${emissionMonth}/${emissionYear} - ${emissionHours}:${emissionMinutes}:${emissionSeconds}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} orientation="landscape">
        <View style={styles.header}>
          <Image src="/PoliciaCivilLogo.jpeg" style={styles.logo} />
          <Text style={styles.caption}>ESTADO DE GOIÁS</Text>
          <Text style={styles.caption}>DIRETORIA GERAL DA POLÍCIA CIVIL</Text>
          <Text style={styles.caption}>
            SUPERINTENDÊNCIA DE GESTÃO INTEGRADA
          </Text>
          <Text style={styles.caption}>
            DIVISÃO DE SUPORTE TÉCNICO EM INFORMÁTICA
          </Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            Sistema de Controle Interno da DSTI
          </Text>
        </View>
        <Text style={styles.caption}>
          Data da emissão: {formattedEmissionDate()}
        </Text>
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.columnHeader, maxWidth: 24 }}>Item</Text>
          <Text style={{ ...styles.columnHeader, minWidth: 80, maxWidth: 100 }}>
            Tombamento
          </Text>
          <Text style={{ ...styles.columnHeader, minWidth: 60, maxWidth: 80 }}>
            Tipo
          </Text>
          <Text style={{ ...styles.columnHeader, minWidth: 45, maxWidth: 55 }}>
            Marca
          </Text>
          <Text style={{ ...styles.columnHeader, minWidth: 70 }}>
            Descrição
          </Text>
          <Text style={{ ...styles.columnHeader, minWidth: 70, maxWidth: 90 }}>
            Lotação
          </Text>
          <Text style={{ ...styles.columnHeader, minWidth: 60, maxWidth: 80 }}>
            Status
          </Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 56 }}>
            Data da Movimentação
          </Text>
        </View>
        {movements.map((move: movement, moveIndex: number) =>
          move.equipments.map((equipment: any, equipmentIndex: number) => (
            <View style={styles.tableRow} key={equipment?.id}>
              <Text style={{ ...styles.rowData, maxWidth: 24 }}>
                {equipmentIndex + 1}
              </Text>
              <Text style={{ ...styles.rowData, minWidth: 80, maxWidth: 100 }}>
                {equipment?.tippingNumber}
              </Text>
              <Text style={{ ...styles.rowData, minWidth: 60, maxWidth: 80 }}>
                {equipment?.type}
              </Text>
              <Text style={{ ...styles.rowData, minWidth: 45, maxWidth: 55 }}>
                {equipment?.brand?.name}
              </Text>
              <Text style={{ ...styles.rowData, textAlign: 'center' }}>
                {equipment?.description}
              </Text>
              <Text style={{ ...styles.rowData, minWidth: 70, maxWidth: 90 }}>
                {move.destination.name}
              </Text>
              <Text style={{ ...styles.rowData, minWidth: 60, maxWidth: 80 }}>
                {equipment?.situacao}
              </Text>
              <Text style={{ ...styles.rowData, maxWidth: 56 }}>
                {formatDate(move?.date)}
              </Text>
            </View>
          ))
        )}
      </Page>
    </Document>
  );
}
