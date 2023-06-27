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
import { OSStatusMap } from '@/constants/orderservice';
import { useAuth } from '@/contexts/AuthContext';

interface OrderServicePdfProps {
  orderService: OrderServiceData;
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

export function OrderServicePdf({ orderService }: OrderServicePdfProps) {
  const { user } = useAuth();

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
    overtitle: {
      paddingTop: 24,
      fontSize: 16,
      fontWeight: 700,
    },
    title: {
      paddingTop: 8,
      fontSize: 20,
      fontWeight: 700,
    },
    subtitle: {
      fontSize: 12,
      paddingBottom: 12,
    },
    locale: {
      paddingBottom: 16,
      alignSelf: 'flex-end',
      textAlign: 'right',
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
      borderBottomWidth: 1,
      borderTopWidth: 1,
      borderBottomColor: '#000',
      minHeight: 24,
      alignItems: 'center',
      borderLeftWidth: 1,
      borderLeftColor: '#e2e2e2',
    },
    columnHeader: {
      color: '#000',
      flex: 1,
      textAlign: 'center',
      fontSize: 8,
      fontWeight: 'bold',
      height: '100%',
      paddingTop: 8,
      borderRightWidth: 1,
      borderRightColor: '#e2e2e2',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      minHeight: 24,
      alignItems: 'center',
      borderLeftWidth: 1,
      borderLeftColor: '#e2e2e2',
    },
    rowData: {
      fontSize: 8,
      flex: 1,
      textAlign: 'center',
      borderRightWidth: 1,
      borderRightColor: '#e2e2e2',
      borderLeftColor: '#e2e2e2',
      paddingTop: 16,
      minHeight: 44,
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

  const receiverDateYear = new Date(orderService.finishDate)
    ?.getFullYear()
    .toString()
    .padStart(4, '0');
  const receiverDateMonth = new Date(orderService.finishDate)
    ?.getMonth()
    .toString()
    .padStart(2, '0');
  const receiverDateDay = new Date(orderService.finishDate)
    ?.getDay()
    .toString()
    .padStart(2, '0');

  const formattedReceiverDate = `${receiverDateDay}/${receiverDateMonth}/${receiverDateYear}`;

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
          <Text style={styles.overtitle}>O.S. nº {orderService.id}</Text>
          <Text style={styles.title}>
            {orderService.equipment.unit.localization}
          </Text>
          <Text style={styles.subtitle}>
            Sistema de Controle Interno da DSTI
          </Text>

          <Text style={styles.locale}>
            Status da O.S.: {OSStatusMap.get(orderService.status)}
          </Text>
        </View>
        <Text style={styles.caption}>
          Data da emissão: {formattedEmissionDate}
        </Text>
        <Text style={styles.caption}>Recebido por: {user?.name}</Text>
        <View
          style={{ ...styles.tableHeader, marginTop: 8, borderBottomWidth: 0 }}
        >
          <Text
            style={{
              ...styles.columnHeader,
              textAlign: 'center',
            }}
          >
            Entrada do Equipamento
          </Text>
        </View>
        <View style={styles.tableHeader}>
          <Text style={{ ...styles.columnHeader, minWidth: 80, maxWidth: 100 }}>
            Tombamento
          </Text>
          <Text style={{ ...styles.columnHeader, minWidth: 60, maxWidth: 80 }}>
            Tipo
          </Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 60 }}>Marca</Text>
          <Text style={styles.columnHeader}>Descrição</Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 72 }}>
            Processo SEI
          </Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 100 }}>
            Servidor
          </Text>
          <Text style={{ ...styles.columnHeader, maxWidth: 72 }}>
            Funcional ou CPF
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={{ ...styles.rowData, minWidth: 80, maxWidth: 100 }}>
            {orderService.equipment?.tippingNumber}
          </Text>
          <Text style={{ ...styles.rowData, minWidth: 60, maxWidth: 80 }}>
            {orderService.equipment?.type}
          </Text>
          <Text style={{ ...styles.rowData, maxWidth: 60 }}>
            {orderService.equipment?.brand?.name}
          </Text>
          <Text style={styles.rowData}>
            {orderService.equipment.description}
          </Text>
          <Text style={{ ...styles.rowData, maxWidth: 72 }}>
            {orderService.seiProcess}
          </Text>
          <Text
            style={{
              ...styles.rowData,
              maxWidth: 100,
            }}
          >
            <>
              {'_'.repeat(20)}
              {'\n'}
              {orderService.senderName}
            </>
          </Text>
          <Text style={{ ...styles.rowData, maxWidth: 72 }}>
            {orderService.senderDocument}
          </Text>
        </View>
        <View style={{ ...styles.tableHeader, borderTopWidth: 0 }}>
          <Text
            style={{
              ...styles.columnHeader,
              textAlign: 'center',
            }}
          >
            Relato do defeito
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={{
              ...styles.rowData,
              minHeight: undefined,
              paddingTop: undefined,
            }}
          >
            {orderService.description}
          </Text>
        </View>

        {OSStatusMap.get(orderService.status) === 'Concluído' && (
          <>
            <View
              style={{
                ...styles.tableHeader,
                marginTop: 16,
              }}
            >
              <Text
                style={{
                  ...styles.columnHeader,
                  textAlign: 'center',
                }}
              >
                Retirada do equipamento
              </Text>
            </View>
            <View
              style={{
                ...styles.tableHeader,
                borderTopWidth: 0,
              }}
            >
              <Text
                style={{
                  ...styles.columnHeader,
                  textAlign: 'center',
                  maxWidth: 72,
                }}
              >
                Data da retirada
              </Text>
              <Text
                style={{
                  ...styles.columnHeader,
                  textAlign: 'center',
                  maxWidth: 200,
                }}
              >
                Servidor responsável pela retirada
              </Text>
              <Text
                style={{
                  ...styles.columnHeader,
                  textAlign: 'center',
                }}
              >
                Funcional / CPF
              </Text>
              <Text
                style={{
                  ...styles.columnHeader,
                  textAlign: 'center',
                  maxWidth: 200,
                }}
              >
                Técnico responsável pela manutenção
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text
                style={{
                  ...styles.rowData,
                  maxWidth: 72,
                  borderLeftWidth: 1,
                  minHeight: 44,
                }}
              >
                {formattedReceiverDate}
              </Text>
              <Text
                style={{
                  ...styles.rowData,
                  maxWidth: 200,
                  paddingTop: 16,
                  minHeight: 44,
                }}
              >
                <>
                  {'_'.repeat(20)}
                  {'\n'}
                  {orderService.withdrawalName}
                </>
              </Text>
              <Text style={{ ...styles.rowData, minHeight: 44 }}>
                {orderService.withdrawalDocument}
              </Text>
              <Text style={{ ...styles.rowData, maxWidth: 200, minHeight: 44 }}>
                {orderService.technicianName}
              </Text>
            </View>
          </>
        )}

        <Text
          style={{
            ...styles.caption,
            paddingTop: 12,
            marginTop: 'auto',
            textAlign: 'center',
            width: '100%',
          }}
        >
          Endereço Av. Anhanguera, 7364 - Aeroviario, Goiânia - GO, 74435-300.
          {'\n'}
          Fone: 3201-6184
        </Text>
      </Page>
    </Document>
  );
}
