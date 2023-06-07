import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { movementEquipment } from '@/pages/movements/MovementControl';

interface MovementsPDFProps {
  equipments: movementEquipment[];
  title: string;
  date: string;
  destination: string;
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

export function MovementsPDF({
  title,
  equipments,
  date,
  destination,
}: MovementsPDFProps) {
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
    },
    signature: {
      marginTop: 200,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

  const currentEmissionDate = new Date();
  const emissionDay = currentEmissionDate.getDate().toString().padStart(2, '0');
  const emissionMonth = currentEmissionDate
    .getMonth()
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

  const formattedEmissionDate = `${emissionDay}/${emissionMonth}/${emissionYear} - ${emissionHours}:${emissionMinutes}:${emissionSeconds}`;

  const movementDate = new Date(date);
  const movementDay = movementDate.getDate().toString().padStart(2, '0');
  const movementMonth = (movementDate.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const movementYear = movementDate.getFullYear().toString().padStart(4, '0');

  const formattedMovementDate = `${movementDay}/${movementMonth}/${movementYear}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
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
          <Text style={styles.title}>Termo de {title}</Text>
          <Text style={styles.subtitle}>
            Sistema de Controle Interno da DSTI
          </Text>
          <Text style={styles.locale}>26ª Delegacia de Polícia de Goiânia</Text>
        </View>
        <Text style={styles.caption}>
          Data da emissão: {formattedEmissionDate}
        </Text>
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.columnHeader, maxWidth: 24 }}>Item</Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 56 }}>
            Tombamento
          </Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 32 }}>Tipo</Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 40 }}>Marca</Text>
          <Text style={styles.columnHeader}>Descrição</Text>
          <Text style={styles.columnHeader}>Lotação</Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 56 }}>Data</Text>
        </View>
        {equipments?.map((equipment, index) => (
          <View style={styles.tableRow} key={equipment?.id}>
            <Text style={{ ...styles.rowData, maxWidth: 24 }}>{index + 1}</Text>
            <Text style={{ ...styles.rowData, maxWidth: 56 }}>
              {equipment?.tippingNumber}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 32 }}>
              {equipment?.type}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 40 }}>
              {equipment?.brand?.name}
            </Text>
            <Text style={styles.rowData}>-</Text>
            <Text style={styles.rowData}>{destination}</Text>
            <Text style={{ ...styles.rowData, maxWidth: 56 }}>
              {formattedMovementDate}
            </Text>
          </View>
        ))}

        <Text
          style={{ ...styles.caption, alignSelf: 'flex-end', marginTop: 8 }}
        >
          Qtd. {equipments?.length}
        </Text>

        <View style={styles.signature}>
          <Text style={{ ...styles.caption, marginBottom: 4 }}>
            {'_'.repeat(50)}
          </Text>
          <Text style={styles.caption}>
            ASSINATURA / CARIMBO DO TITULAR DA UNIDADE
          </Text>
          <Text style={styles.caption}>
            26ª DELEGACIA DE POLÍCIA DE GOIÂNIA
          </Text>
        </View>
      </Page>
    </Document>
  );
}