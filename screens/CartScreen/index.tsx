import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Column,
  FlatList,
  Icon,
  Row,
  Text,
  useToast,
} from 'native-base';
import { StyleSheet } from 'react-native';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { Item1 } from './Item1';
import {
  addCartToInvoice,
  editProduct,
  resetCart,
} from '../../lib/redux/reducers/productReducer';
import { FontAwesome } from '@expo/vector-icons';
import { ModalAddClient } from './modals/ModalAddClient';
import { ApiService } from '../../lib/axios';
import { addInvoice } from '../../lib/redux/reducers/invoiceReducer';
import { cloneDeep } from 'lodash';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const CartScreen: React.FC<Props> = () => {
  const { cart } = useSelector((state: RootState) => state.product);
  const { user } = useSelector((state: RootState) => state.auth);
  const [showModalClient, setShowModalClient] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const toast = useToast();

  const cleanCart = () => {
    dispatch(resetCart());
  };

  const total = useMemo(() => {
    return cart?.reduce(
      (total, item) => total + item.productPrice * item.count,
      0
    );
  }, [cart]);

  const handleOpenModal = () => {
    const overCount = cart.some(
      (item) =>
        item.count > item.productQuantity - (item.productQuantitySold || 0)
    );
    if (overCount) {
      toast.show({
        title: 'Số lượng hàng không đủ',
        placement: 'top',
      });
      return;
    } else {
      setShowModalClient(true);
    }
  };

  const handleCreateInvoice = async (data: { name: string }) => {
    const listOrderItem = cart.map((item) => {
      return {
        productId: item.productId,
        quantityInOrder: item.count,
      };
    });
    const res = await ApiService.createOrder({
      orderName: data.name,
      products: listOrderItem,
    });
    const dataRes = res.data.data;
    if (dataRes) {
      toast.show({ title: 'Tạo hoá đơn thành công', placement: 'top' });
    }
    const listProduct = cloneDeep(cart);
    const listProductMap = listProduct.map((item) => {
      return {
        ...item,
        quantityInOrder: item.count,
      };
    });

    await dispatch(
      addInvoice({
        orderId: dataRes.orderId,
        orderName: dataRes.orderName,
        products: listProductMap,
        createdDate: new Date().toISOString(),
      })
    );
    await listProductMap.forEach((item) => {
      dispatch(
        editProduct({
          ...item,
          count: 0,
          productQuantitySold: (item.productQuantitySold || 0) + item.count,
        })
      );
    });
    await dispatch(addCartToInvoice());
    navigate.navigate('InvoiceDetail', {
      id: dataRes.orderId,
    });
    // console.log('handleCreateInvoice', user);
  };

  return (
    <Column w="100%" mx={2} style={{ flex: 1 }} justifyContent="space-between">
      <Row justifyContent="flex-end" my={2} mr={4} space="md">
        <Icon
          name="search"
          // color="#Ea372d"
          as={FontAwesome}
          size={30}
          onPress={() => {
            navigate.navigate('Search');
          }}
        />
        <Icon
          name="trash"
          color="#Ea372d"
          as={FontAwesome}
          size={30}
          onPress={cleanCart}
        />
      </Row>
      <Column style={{ flex: 1 }}>
        <FlatList
          // ListFooterComponent={<Box height={200} />}
          data={cart}
          renderItem={({ item }) => {
            return <Item1 item={item} count={item.count || 0} />;
          }}
          keyExtractor={(item) => String(item.productSKU)}
        />
      </Column>

      <Box
        height={60}
        width="100%"
        style={[style.shadow]}
        alignItems="flex-end"
        justifyContent="center"
        px={4}
      >
        <Row space="md" alignItems="center">
          <Column>
            <Row>
              <Text>Tổng thanh toán: </Text>
              <Text ml={1} color="#De7d44">
                {total} đ
              </Text>
            </Row>
          </Column>
          <Column>
            <Button onPress={handleOpenModal}>In hoá đơn</Button>
          </Column>
        </Row>
      </Box>

      <ModalAddClient
        open={showModalClient}
        closeModal={() => setShowModalClient(false)}
        createInvoice={handleCreateInvoice}
      />
    </Column>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    backgroundColor: '#ffffff',
    // position: 'absolute',
    // bottom: 0,
    marginBottom: 60,
  },
});
