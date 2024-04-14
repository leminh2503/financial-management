import React, { useState } from 'react';
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
import {
  ApiService,
  ProductModel,
  ProductModelTest,
  UserModel,
} from '../../lib/axios';
import { Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ModalItemProduct } from './modals/ModalItemProduct';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../lib/redux/reducers/productReducer';
import { RootState } from '../../lib/redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const _item: ProductModelTest = {
  id: 1,
  name: 'Product 1',
  price: 1000,
  description: 'Description 1',
  image: 'https://picsum.photos/200/300',
  quantity: 10,
  code: 'MZISKSFJSK',
};
const _item2: ProductModelTest = {
  id: 2,
  name: 'Product 2',
  price: 1000,
  description: 'Description 1',
  image: 'https://picsum.photos/200/300',
  quantity: 10,
  code: 'MZISKSFJSK',
};
const _item3: ProductModelTest = {
  id: 3,
  name: 'Product 3',
  price: 1000,
  description: 'Description 1',
  image: 'https://picsum.photos/200/300',
  quantity: 10,
  code: 'MZISKSFJSK',
};
const _item4: ProductModelTest = {
  id: 4,
  name: 'Product 4',
  price: 1000,
  description: 'Description 1',
  image: 'https://picsum.photos/200/300',
  quantity: 10,
  code: 'MZISKSFJSK',
};
const _item5: ProductModelTest = {
  id: 5,
  name: 'Product 5',
  price: 1000,
  description: 'Description 1',
  image: 'https://picsum.photos/200/300',
  quantity: 10,
  code: 'MZISKSFJSK',
};
const _item6: ProductModelTest = {
  id: 6,
  name: 'Product 6',
  price: 1000,
  description: 'Description 1',
  image: 'https://picsum.photos/200/300',
  quantity: 10,
  code: 'MZISKSFJSK',
};
export const _ListData: ProductModel[] | ProductModelTest[] = [
  _item,
  _item2,
  _item3,
  _item2,
  _item2,
  _item2,
  _item3,
  _item2,
  _item4,
  _item5,
  _item6,
];

export const ListScreen: React.FC<Props> = () => {
  const [lists, setLists] = useState<UserModel[]>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [showAppModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const onPressItem = async (item: any) => {
    // TODO: do something
    // props.navigation.navigate('Detail', {
    //   screen: 'Profile',
    //   params: item,
    // });
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

  const handleDeleteItem = (item: any) => {
    console.log('delete item', item);
  };
  const GetUsers = () => {
    ApiService.getUsers().then((e) => {
      console.log(e);
      setLists(e.data);
    });
  };

  console.log('lists: ---', user);
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
        ListFooterComponent={<Box height={120}></Box>}
        data={_ListData}
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
                            uri: item.image,
                          }}
                          mr={3}
                        ></Image>
                      </Column>
                      <Column>
                        <Heading fontSize="sm">{item.name}</Heading>
                        <Text mt={0.5} fontSize="xs">
                          Mã sản phẩm: {item.code}
                        </Text>
                        <Text
                          mt={0.5}
                          color={item.quantity < 5 ? 'orange.600' : '#000e21'}
                          fontSize={item.quantity < 5 ? 'lg' : 'xs'}
                        >
                          Tồn kho: {item.quantity}
                        </Text>
                        <Text mt={0.5} fontSize="sm" color="orange.600">
                          Giá thành: {item.price}
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
