import React, { useState } from 'react';
import {
  Box,
  Center,
  Column,
  FlatList,
  Heading,
  Image,
  Pressable,
  Row,
  Text,
} from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductModel } from '../../lib/axios';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

export const SalesScreen: React.FC<Props> = () => {
  const [lists, setLists] = useState<ProductModel[]>();

  const onPressListItem = async (item: ProductModel) => {
    // TODO: do something
    // props.navigation.navigate('Detail', {
    //   screen: 'Profile',
    //   params: item,
    // });
    console.log(item);
  };

  return (
    <Center width="100%">
      <Box w="100%">
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <Pressable onPress={() => onPressListItem(item)}>
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
                      </Column>
                    </Row>
                  </Column>
                </Row>
              </Box>
            </Pressable>
          )}
          keyExtractor={(item) => String(item.email)}
        />
      </Box>
    </Center>
  );
};
