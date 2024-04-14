import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Column, FlatList, Icon, Row, Text } from 'native-base';
import { StyleSheet } from 'react-native';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ProductModel } from '../../lib/axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { Item1 } from './Item1';
import { resetCart } from '../../lib/redux/reducers/productReducer';
import { FontAwesome } from '@expo/vector-icons';
import { ModalAddClient } from './modals/ModalAddClient';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const CartScreen: React.FC<Props> = () => {
  const [product, setListProduct] = useState<ProductModel[]>();
  const { cart } = useSelector((state: RootState) => state.product);
  const [service, setService] = useState<string>('');
  const [showModalClient, setShowModalClient] = useState(false);
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const onPressListItem = async (item: ProductModel) => {
    console.log(item);
  };

  const cleanCart = () => {
    dispatch(resetCart());
  };

  useEffect(() => {
    setListProduct(cart);
  }, [cart, isFocus]);

  const total = useMemo(() => {
    return product?.reduce((total, item) => total + item.price * item.count, 0);
  }, [product]);

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
          data={product}
          renderItem={({ item }) => {
            return <Item1 item={item} />;
          }}
          keyExtractor={(item) => String(item.code)}
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
            <Button onPress={() => setShowModalClient(true)}>In hoá đơn</Button>
          </Column>
        </Row>
      </Box>

      <ModalAddClient
        open={showModalClient}
        closeModal={() => setShowModalClient(false)}
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
