import React, { useEffect, useState } from 'react';
import { Box, Button, Column, FlatList, Image, Row, Text } from 'native-base';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ApiService, UserModel } from '../../lib/axios';
import { ModalItemUser } from './modals/ModalItemUser';
import { TouchableRipple } from 'react-native-paper';

type Props = NativeStackScreenProps<RootStackParamList, 'List'>;
export const UserScreen: React.FC<Props> = () => {
  const [lists, setLists] = useState<UserModel[]>();
  const [selectedItem, setSelectedItem] = useState<any>();
  const [showAppModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const onPressItem = async (item: UserModel) => {
    setSelectedItem(item);
    handleOpenModal();
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleAddUser = () => {
    setSelectedItem(null);
    handleOpenModal();
  };

  console.log('lists: ---', lists);

  const handleDeteleItem = (item: UserModel) => {
    ApiService.deleteUser(item?.userId)
      .then((e) => {
        GetUsers();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const GetUsers = () => {
    ApiService.getUsers()
      .then((e) => {
        setLists(e.data.data);
        setShowModal(false);
        setRefresh(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <Box width="100%">
      <Box w="100%">
        <Button mx={2} mb={2} onPress={handleAddUser}>
          Thêm Nhân viên
        </Button>
        <FlatList
          mx={2}
          ListFooterComponent={<Box height={170} />}
          data={lists || []}
          refreshing={refresh}
          onRefresh={GetUsers}
          renderItem={({ item }) => (
            <TouchableRipple
              onPress={() => {
                onPressItem(item);
              }}
            >
              <Box
                backgroundColor="#E2e6e6"
                borderWidth="1"
                _light={{
                  borderColor: 'light.border',
                }}
                _dark={{
                  borderColor: 'dark.border',
                }}
                pl="4"
                pr="5"
                py="2"
                m={1}
              >
                <Row alignItems="center">
                  <Image
                    source={{
                      uri: item.image || 'https://picsum.photos/200/300',
                    }}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 10,
                    }}
                  />
                  <Column mx={2}>
                    <Text fontSize="xl" fontWeight={600}>
                      {item.username}
                    </Text>
                    <Text>{item.roleId === 1 ? 'ADMIN' : 'Nhân viên'}</Text>
                  </Column>
                </Row>
              </Box>
            </TouchableRipple>
          )}
          keyExtractor={(item) => String(item.userId)}
        />
      </Box>
      <ModalItemUser
        selectItem={selectedItem}
        closeModal={handleCloseModal}
        open={showAppModal}
        deleteItem={handleDeteleItem}
        refresh={GetUsers}
      />
    </Box>
  );
};
