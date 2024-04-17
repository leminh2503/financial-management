import { ProductModel } from '../../lib/axios';
import React, { useEffect, useState } from 'react';
import { Box, Column, Heading, Image, Row, Text } from 'native-base';
import NumericInput from 'react-native-numeric-input';
import { useDispatch } from 'react-redux';
import {
  changeCountProduct,
  removeProductInCart,
} from '../../lib/redux/reducers/productReducer';

export interface PropsItem {
  item: ProductModel;
  openItem?: (item: ProductModel) => void;
}

export const Item1 = ({ item }: PropsItem) => {
  const [count, setCount] = useState(item.count || 0);
  const dispatch = useDispatch();
  useEffect(() => {
    setCount(item.count || 0);
  }, [item]);

  useEffect(() => {
    if (count === 0) {
      dispatch(removeProductInCart(item.productId));
    }
  }, [count]);

  return (
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
      <Row alignItems="center">
        <Column>
          <Image
            style={{ width: 100, height: 80 }} // style={{ width: 50, height: 50 }}
            source={{
              uri: item.productImageId,
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
            color={item.productQuantity < 5 ? 'orange.600' : '#000e21'}
            fontSize={item.productQuantity < 5 ? 'lg' : 'xs'}
          >
            Tồn kho: {item.productQuantity - (item.productQuantitySold || 0)}
          </Text>
          <Text mt={0.5} fontSize="sm" color="orange.600">
            Giá thành: {item.productPrice} đ
          </Text>
          <NumericInput
            minValue={0}
            maxValue={item.productQuantity}
            totalWidth={100}
            totalHeight={30}
            value={count}
            containerStyle={{
              marginTop: 10,
            }}
            textColor="black"
            onChange={(value) => {
              setCount(value);
              dispatch(
                changeCountProduct({ productId: item.productId, count: value })
              );
            }}
          />
        </Column>
      </Row>
    </Box>
  );
};
