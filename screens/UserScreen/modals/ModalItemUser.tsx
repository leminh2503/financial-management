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
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
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
    if (handleValidate()) {
      return;
    }
    if (selectItem) {
      patchUser();
    } else {
      addUser();
    }
  };

  const handleValidate = () => {
    if (!userName) {
      toast.show({ title: 'Chưa nhập tên', placement: 'top' });
      return true;
    }
    if (!fullName) {
      toast.show({ title: 'Chưa nhập họ tên', placement: 'top' });
      return true;
    }
    if (!phoneNumber) {
      toast.show({
        title: 'Chưa nhập số điện thoại',
        placement: 'top',
      });
      return true;
    }
    if (!pass) {
      toast.show({ title: 'Chưa nhập mật khẩu', placement: 'top' });
      return true;
    }
    return false;
  };

  const patchUser = () => {
    ApiService.patchUser({
      userId: selectItem?.userId,
      username: userName,
      fullName: fullName,
      phoneNumber: phoneNumber,
      roleId: 0,
    })
      .then((e) => {
        if (e.data.status === 400) {
          return toast.show({ title: e.data.message, placement: 'top' });
        }
        toast.show({ title: 'Sửa người dùng thành công', placement: 'top' });
        refresh && refresh();
        closeModal();
        resetValue();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addUser = async () => {
    const data = await ApiService.postUser({
      username: userName,
      password: pass,
      fullName: fullName,
      phoneNumber: phoneNumber,
      roleId: 0,
    });
    if (data.data) {
      toast.show({ title: 'Thêm người dùng thành công', placement: 'top' });
      refresh && refresh();
      resetValue();
      closeModal();
    }

    // .then((e) => {
    //   console.log('add======', e);

    // toast.show({ title: 'Thêm người dùng thành công', placement: 'top' });
    // refresh && refresh();
    // resetValue();
    // closeModal();
    // })
    // .catch((e) => {
    // if (e.data.status === 400) {
    //   return toast.show({ title: e.data.message, placement: 'top' });
    // }
    // });
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
