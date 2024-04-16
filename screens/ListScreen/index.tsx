import React, { useEffect, useState } from 'react';
import { Box, Button, FlatList, Row } from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiService, ProductModel } from '../../lib/axios';
import { RefreshControl } from 'react-native';
import { ModalItemProduct } from './modals/ModalItemProduct';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  deleteProduct,
  setListProduct,
} from '../../lib/redux/reducers/productReducer';
import { RootState } from '../../lib/redux/store';
import { Item2 } from './components/Item2';

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
  const [selectedItem, setSelectedItem] = useState<any>();
  const [showAppModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { listProduct } = useSelector((state: RootState) => state.product);
  const [loading, setLoading] = useState(false);

  const onPressItem = async (item: any) => {
    console.log('item-----', item);
    setSelectedItem(item);
    setShowModal(true);
  };

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
        dispatch(setListProduct(e.data.data));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const getURLImage = async (id: any) => {
    const res = await ApiService.getImageById(id);
    return res.data.message;
  };

  useEffect(() => {
    getListProduct();
  }, [user]);

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
        renderItem={({ item }) => {
          return <Item2 item={item} openItem={onPressItem} />;
        }}
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
