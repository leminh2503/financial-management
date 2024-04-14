import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Column,
  FlatList,
  Heading,
  Icon,
  Image,
  Row,
  Text,
} from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiService, ProductModel, UserModel } from '../../lib/axios';
import { Octicons } from '@expo/vector-icons';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { ModalItemProduct } from './modals/ModalItemProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  deleteProduct,
  setListProduct,
} from '../../lib/redux/reducers/productReducer';
import { RootState } from '../../lib/redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const _item: ProductModel = {
  productId: 1,
  productName: 'Product 1',
  productPrice: 1000,
  productDescription: 'Description 1',
  productImageId: 'https://picsum.photos/200/300',
  productQuantity: 10,
  productSKU: 'MZISKSFJSK',
};
export const _ListData: ProductModel[] = [
  _item,
  _item,
  _item,
  _item,
  _item,
  _item,
  _item,
  _item,
  _item,
  _item,
];

export const ListScreen: React.FC<Props> = () => {
  const [lists, setLists] = useState<UserModel[]>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [showAppModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { listProduct } = useSelector((state: RootState) => state.product);
  const [loading, setLoading] = useState(false);

  const onPressItem = async (item: any) => {
    // TODO: do something
    // props.navigation.navigate('Detail', {
    //   screen: 'Profile',
    //   params: item,
    // });
    setSelectedItem(item);
    setShowModal(true);
  };

  console.log('listProduct: ', listProduct);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleAddItem = () => {
    setSelectedItem(null);
    setShowModal(true);
  };

  const addItemToCart = (item: any) => {
    dispatch(
      addToCart({
        ...item,
        count: 1,
      })
    );
  };

  const handleDeleteItem = (item: ProductModel) => {
    ApiService.deleteProduct(item.productId)
      .then((e) => {
        console.log('Delete product: ', e.data.data);
        setShowModal(false);
        dispatch(deleteProduct(item.productId));
      })
      .catch((e) => {
        console.log('Error: ', e);
      });
  };
  const getListProduct = () => {
    setLoading(true);
    ApiService.getProduct()
      .then((e) => {
        // console.log('getListProduct-----', e.data.data);
        dispatch(setListProduct(e.data.data));
        setLoading(false);
      })
      .catch((e) => {
        console.log('Error: ', e);
        setLoading(false);
      });
  };

  useEffect(() => {
    getListProduct();
  }, []);

  return (
    <Box w="100%">
      {user?.roleId === 1 && (
        <Row justifyContent="flex-end" alignItems="center" my={2}>
          <Button mx={2} onPress={handleAddItem}>
            Thêm Sản Phẩm
          </Button>
        </Row>
      )}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getListProduct} />
        }
        ListFooterComponent={<Box height={120}></Box>}
        data={listProduct}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _light={{
              borderColor: 'light.border',
            }}
            _dark={{
              borderColor: 'dark.border',
            }}
            pl="4"
            pr="5"
            py="2"
          >
            <Row space={3} justifyContent="space-between">
              <Column mr={1}>
                <Row>
                  <Column justifyContent="center">
                    <Icon
                      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                      onPress={(event) => {
                        event.preventDefault();
                        addItemToCart(item);
                      }}
                      as={Octicons}
                      color="#E80843"
                      name="plus"
                      size="30"
                      mr={3}
                    />
                  </Column>

                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      onPressItem(item);
                    }}
                  >
                    <Row>
                      <Column>
                        <Image
                          style={{ width: 100, height: 80, borderRadius: 10 }} // style={{ width: 50, height: 50 }}
                          source={{
                            uri: _item.productImageId,
                          }}
                          mr={3}
                        ></Image>
                      </Column>
                      <Column>
                        <Heading fontSize="sm">{item.productName}</Heading>
                        <Text mt={0.5} fontSize="xs">
                          Mã sản phẩm: {item.productSKU}
                        </Text>
                        <Text
                          mt={0.5}
                          color={
                            item.productQuantity < 5 ? 'orange.600' : '#000e21'
                          }
                          fontSize={item.productQuantity < 5 ? 'lg' : 'xs'}
                        >
                          Tồn kho: {item.productQuantity}
                        </Text>
                        <Text mt={0.5} fontSize="sm" color="orange.600">
                          Giá thành: {item.productPrice}
                        </Text>
                      </Column>
                    </Row>
                  </TouchableOpacity>
                </Row>
              </Column>
            </Row>
          </Box>
        )}
        keyExtractor={(item) => Math.random().toString()}
      />
      <ModalItemProduct
        open={showAppModal}
        closeModal={handleCloseModal}
        selectItem={selectedItem}
        deleteItem={handleDeleteItem}
      />
    </Box>
  );
};
