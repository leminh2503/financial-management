// import { Table } from "react-native-table-component";
import { StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { Box, Button, Icon, Row, Text } from 'native-base';
import { useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { DataTable } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

export default function InvoiceDetail() {
  const { phone, name, cart } = useSelector(
    (state: RootState) => state.product
  );

  const totalPrice = useMemo(() => {
    return cart?.reduce((total, item) => total + item.price * item.count, 0);
  }, [cart]);

  return (
    <Box style={styles.container}>
      <Row justifyContent="space-between">
        <Text fontWeight="bold">Ngày lập hoá đơn</Text>
        <Text>10/4/2024</Text>
      </Row>
      <Row mt={1} justifyContent="space-between">
        <Text fontWeight="bold">Mã nhân viên</Text>
        <Text>NV0001</Text>
      </Row>
      <Row mt={1} justifyContent="space-between">
        <Text fontWeight="bold">Tên khách hàng</Text>
        <Text>{name}</Text>
      </Row>
      <Row mt={1} mb={4} justifyContent="space-between">
        <Text fontWeight="bold">Số điện thoại</Text>
        <Text>{phone}</Text>
      </Row>

      <DataTable>
        <DataTable.Header style={styles.databeHeader}>
          <DataTable.Title style={{ flex: 1 }}>STT</DataTable.Title>
          <DataTable.Title style={{ flex: 4 }}>Tên sản phẩm</DataTable.Title>
          <DataTable.Title style={{ flex: 4 }}>Mã sản phẩm</DataTable.Title>
          <DataTable.Title style={{ flex: 2 }}>Giá</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }}>SL</DataTable.Title>
        </DataTable.Header>
        {cart?.map((l, i) => (
          <DataTable.Row style={styles.databeBox} key={i}>
            <DataTable.Cell style={{ flex: 1 }}>{i + 1}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>{l.productName}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>{l.productSKU}</DataTable.Cell>
            <DataTable.Cell style={{ flex: 2 }}>
              {l.productPrice}
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              {l.productQuantity}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Row mt={4} justifyContent="space-between">
        <Text fontWeight="bold">Tổng thanh toán</Text>
        <Text>{totalPrice} đ</Text>
      </Row>
      <Button mt={3} backgroundColor="#0065D6">
        <Row alignItems="center" space={4}>
          <Text fontWeight="bold" color="#ffffff">
            In hoá đơn
          </Text>
          <Icon name="printer" as={AntDesign} color="#FFFFFF" />
        </Row>
      </Button>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  mainbox: {
    textAlign: 'center',
    margin: 15,
    flex: 1,
    justifyContent: 'space-between',
  },
  databeBox: {
    // margin: 10,
    textAlign: 'right',
  },
  databeHeader: {
    // margin: 10,
    textAlign: 'right',
    backgroundColor: '#589BF0',
  },
});
