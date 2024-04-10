import React from 'react';
import {
  Button,
  FormControl,
  Input,
  KeyboardAvoidingView,
  Modal,
} from 'native-base';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { setClient } from '../../../lib/redux/reducers/productReducer';
import { useNavigation } from '@react-navigation/native';

type Props = {
  open: boolean;
  closeModal: () => void;
};

export const ModalAddClient: React.FC<Props> = ({ open, closeModal }) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onPressSave = () => {
    closeModal();
    dispatch(setClient({ name, phone }));
    navigation.navigate('InvoiceDetail');
  };

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
          <Modal.Header>Thông tin khách hàng</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Tên khách hàng</FormControl.Label>
              <Input value={name} onChangeText={setName} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Số điện thoại</FormControl.Label>
              <Input value={phone} onChangeText={setPhone} />
            </FormControl>
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
              <Button onPress={onPressSave}>In hoá đơn</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </KeyboardAvoidingView>
    </Modal>
  );
};
