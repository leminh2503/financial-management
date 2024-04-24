import { Box, Icon, Row, Text } from 'native-base';
import { Card, TouchableRipple } from 'react-native-paper';
import React, { useMemo } from 'react';
import { InvoiceModel } from '../../lib/axios';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  item: InvoiceModel;
  deleteItem: (id: number) => void;
}

export const ItemInvoice = ({ item, deleteItem }: Props) => {
  const navigate = useNavigation();

  const total = useMemo(() => {
    return item?.products?.reduce(
      (a, i) => a + i.quantityInOrder * i.productPrice,
      0
    );
  }, [item]);
  const handleOnPressInvoice = (item: InvoiceModel) => {
    navigate.navigate('InvoiceDetail', {
      id: item.orderId,
    });
  };
  return (
    <TouchableRipple
      onPress={() => {
        handleOnPressInvoice(item);
      }}
    >
      <Box p={2}>
        <Card>
          <Box p={2}>
            <Row justifyContent="space-between" alignItems="center">
              <Text fontSize={12}>#{item.orderId}</Text>
              <Icon
                name="trash"
                color="#Ea372d"
                as={FontAwesome}
                size="md"
                onPress={() => deleteItem(item.orderId)}
              />
            </Row>
            <Text fontSize={18} fontWeight="bold">
              {total} đ
            </Text>
            <Row justifyContent="space-between" alignItems="center">
              <Text fontStyle="italic" fontSize={14}>
                {item.orderName}
              </Text>
              <Text fontStyle="italic">
                {moment(item.createdDate).format('DD/MM/YYYY HH:mm')}
              </Text>
            </Row>
          </Box>
        </Card>
      </Box>
    </TouchableRipple>
  );
};
