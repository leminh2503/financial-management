import React from 'react';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Searchbar } from 'react-native-paper';
import { Box, FlatList } from 'native-base';
import { Item2 } from '../ListScreen/components/Item2';
import { ProductModel } from '../../lib/axios';

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
const _ListData: ProductModel[] = [
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
  _item,
  _item,
];

export const SearchScreen: React.FC<Props> = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  return (
    <Box>
      <Searchbar
        placeholder="Search by code"
        onChangeText={setSearchQuery}
        style={{ margin: 10, borderRadius: 10 }}
        value={searchQuery}
      />
      <FlatList
        data={_ListData}
        renderItem={({ item }) => {
          return <Item2 item={item} />;
        }}
        ListFooterComponent={<Box height={100} />}
        keyExtractor={(item) => String(item.id)}
      />
    </Box>
  );
};
