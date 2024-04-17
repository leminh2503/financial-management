import React, { useEffect, useState } from 'react';
import { Alert, Box, Button, Image, Row, Text } from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiService, UserModel } from '../../lib/axios';
import { ModalItemUser } from '../UserScreen/modals/ModalItemUser';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { Loading } from '../../components/Loading';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;
const _item: UserModel = {
  id: 1,
  username: 'admin',
  image: 'https://picsum.photos/200/300',
  phoneNumber: 123456789,
  fullName: 'Nguyễn Văn A',
};

export const SaffScreen: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [showAppModal, setShowModal] = useState(false);
  const [info, setInfo] = useState<UserModel>();
  const [loading, setLoading] = useState(false);

  console.log('user: ', user);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const GetUser = () => {
    setLoading(true);
    ApiService.getUserById(user?.userId)
      .then((e) => {
        console.log('GetUser: ', e);
        setInfo(e.data.data[0]);
        setLoading(false);
      })
      .catch((e) => {
        Alert('Lỗi lấy thông tin người dùng');
        setLoading(false);
      });
  };

  console.log('infotttt', info);

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <Box width="100%" px={5}>
      {loading && <Loading />}
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
          {info?.username}
        </Text>
      </Row>
      <Row alignItems="center" mt={3}>
        <Text fontWeight="bold" fontSize={20}>
          Họ và tên:
        </Text>
        <Text mx={3} fontSize={20}>
          {info?.fullName || _item.fullName}
        </Text>
      </Row>
      <Row alignItems="center" mt={3}>
        <Text fontWeight="bold" fontSize={20}>
          Chức vụ:
        </Text>
        <Text mx={3} fontSize={20}>
          {info?.roleId === 1 ? 'ADMIN' : 'Nhân viên'}
        </Text>
      </Row>
      <Row alignItems="center" mt={3}>
        <Text fontWeight="bold" fontSize={20}>
          Số điện thoại:
        </Text>
        <Text mx={3} fontSize={20}>
          {info?.phoneNumber || _item.phoneNumber}
        </Text>
      </Row>
      <Button mt={3} onPress={handleOpenModal}>
        Chỉnh sửa
      </Button>

      <ModalItemUser
        selectItem={info}
        closeModal={handleCloseModal}
        open={showAppModal}
        refresh={GetUser}
        isShowDelete={false}
      />
    </Box>
  );
};
