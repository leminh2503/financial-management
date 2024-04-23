import React, { useCallback, useEffect, useState } from 'react';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Searchbar } from 'react-native-paper';
import { Box, Button, FlatList } from 'native-base';
import { Item2 } from '../ListScreen/components/Item2';
import { ProductModel } from '../../lib/axios';
import { RootState } from '../../lib/redux/store';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import { ModalScanner } from '../CartScreen/modals/ModalScanner';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;
const _item: ProductModel = {
  id: 1,
  productName: 'Product 1',
  productPrice: 1000,
  productDescription: 'Description 1',
  productImageId: 'https://picsum.photos/200/300',
  productQuantity: 10,
  productSKU: 'MZISKSFJSK',
  count: 0,
};

export const SearchScreen: React.FC<Props> = () => {
  const { listProduct } = useSelector((state: RootState) => state.product);
  const [list, setList] = React.useState<ProductModel[]>([]);
  const [showModalScanner, setModalScanncer] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedValue = useDebounce(searchQuery, 200);

  const search = useCallback(async () => {
    const listResult = listProduct.filter((item) => {
      return item.productSKU.includes(debouncedValue);
    });
    setList(listResult);
  }, [debouncedValue]);

  useEffect(() => {
    search();
  }, [debouncedValue, search]);

  useEffect(() => {
    setList(listProduct);
  }, [listProduct]);
  return (
    <Box>
      <Button mx={3} onPress={() => setModalScanncer(true)}>
        Search by QR
      </Button>
      <Searchbar
        placeholder="Search by code"
        onChangeText={setSearchQuery}
        style={{ margin: 10, borderRadius: 10 }}
        value={searchQuery}
      />
      <FlatList
        data={list}
        renderItem={({ item }) => {
          return <Item2 item={item} />;
        }}
        ListFooterComponent={<Box height={100} />}
        keyExtractor={(item) => String(item.productId)}
      />

      <ModalScanner
        open={showModalScanner}
        closeModal={() => setModalScanncer(false)}
        setText={setSearchQuery}
      />
    </Box>
  );
};
