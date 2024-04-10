import React, { useCallback, useState } from 'react';
import { Box, Button, Image, Row, Text } from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { ApiService, UserModel } from '../../lib/axios';
import { ModalItemUser } from '../UserScreen/modals/ModalItemUser';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;
const _item: UserModel = {
  id: 1,
  username: 'admin',
  image: 'https://picsum.photos/200/300',
  phoneNumber: 123456789,
  fullName: 'Nguyễn Văn A',
};

const _data = [
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
export const SaffScreen: React.FC<Props> = () => {
  const [showAppModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const GetUsers = () => {
    ApiService.getUsers().then((e) => {
      console.log(e);
      setLists(e.data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      GetUsers();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  return (
    <Box width="100%" px={5}>
      <Box my={5} alignItems="center" justifyContent="center">
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
          }}
          source={{ uri: 'https://picsum.photos/200/300' }}
        ></Image>
      </Box>
      <Row alignItems="center" mt={3}>
        <Text fontWeight="bold" fontSize={20}>
          Username:
        </Text>
        <Text mx={3} fontSize={20}>
          {_item.username}
        </Text>
      </Row>
      <Row alignItems="center" mt={3}>
        <Text fontWeight="bold" fontSize={20}>
          Họ và tên:
        </Text>
        <Text mx={3} fontSize={20}>
          {_item.fullName}
        </Text>
      </Row>
      <Row alignItems="center" mt={3}>
        <Text fontWeight="bold" fontSize={20}>
          Chức vụ:
        </Text>
        <Text mx={3} fontSize={20}>
          {_item?.role}
        </Text>
      </Row>
      <Row alignItems="center" mt={3}>
        <Text fontWeight="bold" fontSize={20}>
          Số điện thoại:
        </Text>
        <Text mx={3} fontSize={20}>
          {_item.phoneNumber}
        </Text>
      </Row>
      <Button mt={3} onPress={handleOpenModal}>
        Chỉnh sửa
      </Button>

      <ModalItemUser
        selectItem={_item}
        closeModal={handleCloseModal}
        open={showAppModal}
      />
    </Box>
  );
};
