import { Box, FlatList, Row, Text } from 'native-base';
import React from 'react';
import { InvoiceModel } from '../../lib/axios';
import { Card, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';

export const ListInvoiceScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { listInvoice } = useSelector((state: RootState) => state.invoice);

  const handleOnPressInvoice = (item: InvoiceModel) => {
    navigate.navigate('InvoiceDetail', {
      id: item.id,
    });
  };

  return (
    <Box>
      <FlatList
        ListFooterComponent={<Box p={4} />}
        data={listInvoice}
        renderItem={({ item, index }) => {
          return (
            <TouchableRipple
              onPress={() => {
                handleOnPressInvoice(item);
              }}
            >
              <Box p={2}>
                <Card>
                  <Box p={2}>
                    <Text fontSize={12}>#{item.id}</Text>
                    <Text fontSize={18} fontWeight="bold">
                      {item.total} đ
                    </Text>
                    <Row justifyContent="space-between" alignItems="center">
                      <Text fontStyle="italic" fontSize={14}>
                        {item.name}
                      </Text>
                      <Text fontStyle="italic">{item.createdAt}</Text>
                    </Row>
                  </Box>
                </Card>
              </Box>
            </TouchableRipple>
          );
        }}
      />
    </Box>
  );
};
