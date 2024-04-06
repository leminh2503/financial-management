import { ProductModel } from '../../lib/axios';
import React, { useEffect, useState } from 'react';
import { Box, Column, Heading, Image, Row, Text } from 'native-base';
import NumericInput from 'react-native-numeric-input';
import { useDispatch } from 'react-redux';
import {
  changeCountProduct,
  removeProduct,
} from '../../lib/redux/reducers/productReducer';

export interface PropsItem {
  item: ProductModel;
}

export const Item1 = ({ item }: PropsItem) => {
  const { name, price, description, image, quantity, code } = item;
  const [count, setCount] = useState(item.count || 0);
  const dispatch = useDispatch();
  useEffect(() => {
    setCount(item.count || 0);
  }, [item]);

  useEffect(() => {
    if (count === 0) {
      dispatch(removeProduct(item.id));
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
          <Text mt={0.5} fontSize="xs">
            Tồn kho: {item.quantity}
          </Text>
          <Text mt={0.5} fontSize="sm" color="orange.600">
            Giá thành: {item.price}
          </Text>
          <NumericInput
            minValue={0}
            maxValue={item.quantity}
            totalWidth={100}
            totalHeight={30}
            value={count}
            containerStyle={{
              marginTop: 10,
            }}
            textColor="black"
            onChange={(value) => {
              setCount(value);
              dispatch(changeCountProduct({ id: item.id, count: value }));
            }}
          />
        </Column>
      </Row>
    </Box>
  );
};
