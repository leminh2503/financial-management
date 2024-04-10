import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  KeyboardAvoidingView,
  Modal,
} from 'native-base';
import { UserModel } from '../../../lib/axios';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  open: boolean;
  closeModal: () => void;
  selectItem?: UserModel;
  deleteItem?: (item: UserModel) => void;
};

export const ModalItemUser: React.FC<Props> = ({
  open,
  selectItem,
  closeModal,
  deleteItem,
}) => {
  const [userName, setUserName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [image, setImage] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);
      setImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  useEffect(() => {
    setUserName(selectItem?.username || '');
    setPhoneNumber(selectItem?.phoneNumber?.toString() || '');
    setImage(selectItem?.image || '');
    setFullName(selectItem?.fullName || '');
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
            <FormControl>
              {image && (
                <Box alignItems="center" justifyContent="center">
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                    }}
                    source={{ uri: image }}
                  ></Image>
                </Box>
              )}
              <Button mt={4} onPress={pickImageAsync}>
                Chọn ảnh
              </Button>
            </FormControl>
            <FormControl>
              <FormControl.Label>Họ và tên</FormControl.Label>
              <Input value={fullName} onChangeText={setFullName} />
            </FormControl>
            <FormControl>
              <FormControl.Label>Username</FormControl.Label>
              <Input value={userName} onChangeText={setUserName} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Số điện thoại</FormControl.Label>
              <Input value={phoneNumber} onChangeText={setPhoneNumber} />
            </FormControl>
            {!selectItem && (
              <FormControl mt="3">
                <FormControl.Label>{'Mật khẩu'}</FormControl.Label>
                <Input value={pass} onChangeText={setPass} />
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
              {selectItem ? (
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
              <Button onPress={closeModal}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
};
