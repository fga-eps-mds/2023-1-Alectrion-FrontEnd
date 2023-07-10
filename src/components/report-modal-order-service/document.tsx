import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { OrderServiceData } from '@/pages/order-service/OrderServiceControl';

interface OrderServicePDFprops {
  orderServices: OrderServiceData[];
  title: string;
  date: string;
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

export function OrderServicePDF({
  title,
  orderServices,
  date,
}: OrderServicePDFprops) {
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

  const formattedOrderServiceUpdatedAt = orderServices?.map((orderService) => {
    const updatedAtDate = new Date(orderService?.updatedAt);
    const year = updatedAtDate.getFullYear();
    const month = String(updatedAtDate.getMonth() + 1).padStart(2, '0');
    const day = String(updatedAtDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

  const formattedOrderServiceCreatedAt = orderServices?.map((orderService) => {
    const createdAtDate = new Date(orderService?.createdAt);
    const year = createdAtDate.getFullYear();
    const month = String(createdAtDate.getMonth() + 1).padStart(2, '0');
    const day = String(createdAtDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });

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
          Data da emissão: {formattedEmissionDate}
        </Text>
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.columnHeader, maxWidth: 24 }}>Item</Text>
          <Text style={{ ...styles.columnHeader, minWidth: 80, maxWidth: 100 }}>
            Tombamento
          </Text>
          <Text style={{ ...styles.columnHeader, minWidth: 60, maxWidth: 80 }}>
            Tipo
          </Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 40 }}>Marca</Text>
          <Text style={styles.columnHeader}>Descrição</Text>
          <Text style={styles.columnHeader}>Lotação</Text>
          <Text style={{ ...styles.columnHeader, minWidth: 40, maxWidth: 80 }}>
            Status O.S
          </Text>
          <Text style={styles.columnHeader}>Entrada O.S</Text>
          <Text style={styles.columnHeader}>Saída O.S</Text>
        </View>
        {orderServices?.map((orderService, index) => (
          <View style={styles.tableRow} key={orderService?.id}>
            <Text style={{ ...styles.rowData, maxWidth: 24 }}>{index + 1}</Text>
            <Text style={{ ...styles.rowData, minWidth: 80, maxWidth: 100 }}>
              {orderService?.equipment?.tippingNumber}
            </Text>
            <Text style={{ ...styles.rowData, minWidth: 60, maxWidth: 80 }}>
              {orderService?.equipment?.type}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 40 }}>
              {orderService?.equipment?.brand?.name}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 150 }}>
              {orderService?.description}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 150 }}>
              {orderService?.unit?.name}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 150 }}>
              {orderService?.status}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 150 }}>
              {formattedOrderServiceCreatedAt[index]}
            </Text>
            <Text style={{ ...styles.rowData, maxWidth: 130 }}>
              {formattedOrderServiceUpdatedAt[index]}
            </Text>
          </View>
        ))}

        <Text
          style={{ ...styles.caption, alignSelf: 'flex-end', marginTop: 8 }}
        >
          Qtd. {orderServices?.length}
        </Text>
      </Page>
    </Document>
  );
}
