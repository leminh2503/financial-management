import { Box, FlatList, Row, Text } from 'native-base';
import React from 'react';
import { InvoiceModel, ProductModel } from '../../lib/axios';
import { Card, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setCart, setClient } from '../../lib/redux/reducers/productReducer';

const _item6: ProductModel = {
  id: 6,
  name: 'Product 6',
  price: 1000,
  description: 'Description 1',
  image: 'https://picsum.photos/200/300',
  quantity: 10,
  code: 'MZISKSFJSK',
  count: 1,
};
const _data: InvoiceModel[] = [
  {
    id: 1,
    total: 1000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 1,
      username: 'User 1',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
  {
    id: 2,
    total: 2000,
    products: [_item6, _item6, _item6, _item6],
    user: {
      id: 2,
      username: 'User 2',
      phoneNumber: 123456789,
      image: 'https://picsum.photos/200/300',
    },
    created_at: '2021-09-01',
    updated_at: '2021-09-01',
  },
];

export const ListInvoiceScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const handleOnPressInvoice = (item: InvoiceModel) => {
    console.log('item----', item?.products);
    dispatch(setCart(item.products));
    dispatch(
      setClient({
        name: item.user.username,
        phone: item.user.phoneNumber.toString(),
      })
    );
    navigate.navigate('InvoiceDetail');
  };

  return (
    <Box>
      <FlatList
        ListFooterComponent={<Box p={4} />}
        data={_data}
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
                    <Text fontSize={12}>IVO-001</Text>
                    <Text fontSize={18} fontWeight="bold">
                      {item.total} đ
                    </Text>
                    <Row justifyContent="space-between" alignItems="center">
                      <Text fontStyle="italic" fontSize={14}>
                        {item.user.username}
                      </Text>
                      <Text fontStyle="italic">{item.created_at}</Text>
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
