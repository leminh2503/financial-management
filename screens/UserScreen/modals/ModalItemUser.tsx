import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Modal,
  useToast,
} from 'native-base';
import { ApiService, UserModel } from '../../../lib/axios';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../lib/redux/store';

type Props = {
  open: boolean;
  closeModal: () => void;
  selectItem?: UserModel;
  deleteItem?: (item: UserModel) => void;
  refresh?: () => void;
  isShowDelete?: boolean;
};

export const ModalItemUser: React.FC<Props> = ({
  open,
  selectItem,
  closeModal,
  deleteItem,
  refresh,
  isShowDelete = true,
}) => {
  const [userName, setUserName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [image, setImage] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const toast = useToast();
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const handleSave = () => {
    if (selectItem) {
      patchUser();
    } else {
      addUser();
    }
  };

  const patchUser = () => {
    ApiService.patchUser({
      userId: selectItem?.userId,
      username: userName,
      fullName: fullName,
      phoneNumber: parseInt(phoneNumber),
      roleId: 0,
    })
      .then((e) => {
        toast.show({ title: 'Sửa người dùng thành công', placement: 'top' });
        refresh && refresh();
        closeModal();
        resetValue();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addUser = () => {
    ApiService.postUser({
      username: userName,
      password: pass,
      fullName: fullName,
      phoneNumber: parseInt(phoneNumber),
      roleId: 0,
    })
      .then((e) => {
        toast.show({ title: 'Thêm ngừoi dùng thành công', placement: 'top' });
        refresh && refresh();
        resetValue();
        closeModal();
      })
      .catch((e) => {
        console.log('--------', e);
      });
  };

  const resetValue = () => {
    setUserName(selectItem?.username || '');
    setPhoneNumber(selectItem?.phoneNumber?.toString() || '');
    setImage(selectItem?.image || '');
    setFullName(selectItem?.fullName || '');
    setPass('');
  };

  useEffect(() => {
    resetValue();
  }, [selectItem]);

  return (
    <Modal isOpen={open} size={'full'} onClose={closeModal} safeAreaTop={true}>
      <KeyboardAvoidingView
        h={{
          base: '200px',
          // lg: 'auto',
        }}
        style={{
          flex: 1,
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>
            {selectItem?.username ? selectItem?.username : 'Thêm nhân viên'}
          </Modal.Header>
          <Modal.Body>
            {/*<FormControl>*/}
            {/*  {image && (*/}
            {/*    <Box alignItems="center" justifyContent="center">*/}
            {/*      <Image*/}
            {/*        style={{*/}
            {/*          width: 100,*/}
            {/*          height: 100,*/}
            {/*          borderRadius: 50,*/}
            {/*        }}*/}
            {/*        source={{ uri: image }}*/}
            {/*      ></Image>*/}
            {/*    </Box>*/}
            {/*  )}*/}
            {/*  <Button mt={4} onPress={pickImageAsync}>*/}
            {/*    Chọn ảnh*/}
            {/*  </Button>*/}
            {/*</FormControl>*/}
            <FormControl>
              <FormControl.Label>Tên đăng nhập</FormControl.Label>
              <Input value={userName} onChangeText={setUserName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Họ và tên</FormControl.Label>
              <Input value={fullName} onChangeText={setFullName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Số điện thoại</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </FormControl>
            {!selectItem && (
              <FormControl mt="3">
                <FormControl.Label>{'Mật khẩu'}</FormControl.Label>
                <Input type="password" value={pass} onChangeText={setPass} />
              </FormControl>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={closeModal}
              >
                Cancel
              </Button>
              {selectItem && user?.roleId === 1 && isShowDelete ? (
                <Button
                  onPress={() => {
                    deleteItem && deleteItem(selectItem);
                  }}
                  colorScheme="red"
                >
                  Delete
                </Button>
              ) : (
                <Box></Box>
              )}
              <Button onPress={handleSave}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
};
