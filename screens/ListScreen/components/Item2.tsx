import { PropsItem } from '../../CartScreen/Item1';
import { Box, Column, Heading, Icon, Image, Row, Text } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../lib/redux/reducers/productReducer';
import { TouchableRipple } from 'react-native-paper';
import { ApiService } from '../../../lib/axios';
import { useRoleAdmin } from '../../../hooks/useRoleAdmin';

export const Item2 = ({ item, openItem }: PropsItem) => {
  const dispatch = useDispatch();
  const [image, setImage] = React.useState<string>('');

  const getURLImage = async (id: any) => {
    const res = await ApiService.getImageById(id);
    setImage(res.data.message);
  };

  useEffect(() => {
    getURLImage(71);
  }, [item]);

  const addItemToCart = (item: any) => {
    dispatch(
      addToCart({
        ...item,
        count: 1,
      })
    );
  };

  return (
    <TouchableRipple
      onPress={() => {
        if (openItem) openItem(item);
        else addItemToCart(item);
      }}
    >
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
                  size={30}
                  mr={3}
                />
              </Column>
              <Column>
                <Image
                  style={{ width: 100, height: 80, borderRadius: 10 }} // style={{ width: 50, height: 50 }}
                  source={{
                    uri: 'https://picsum.photos/200/300',
                  }}
                  mr={3}
                ></Image>
              </Column>
              <Column>
                <Heading fontSize="sm">{item.productName}</Heading>
                <Text fontSize="xs">Mã sản phẩm: {item.productSKU}</Text>
                <Text
                  color={item.productQuantity < 5 ? 'orange.600' : '#000e21'}
                  fontSize={item.productQuantity < 5 ? 'lg' : 'xs'}
                >
                  Tồn kho: {item.productQuantity - (item.quantityInOrder || 0)}
                </Text>
                {useRoleAdmin() && (
                  <Text fontSize="xs">Giá nhập: {item.productCost}</Text>
                )}
                <Text fontSize="sm" color="orange.600">
                  Giá thành: {item.productPrice}
                </Text>
              </Column>
            </Row>
          </Column>
        </Row>
      </Box>
    </TouchableRipple>
  );
};
