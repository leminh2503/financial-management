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
import { ProductModel } from '../../../lib/axios';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Props = {
  open: boolean;
  closeModal: () => void;
  selectItem?: ProductModel;
  deleteItem?: (item: ProductModel) => void;
};

export const ModalItemProduct: React.FC<Props> = ({
  open,
  selectItem,
  closeModal,
  deleteItem,
}) => {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [image, setImage] = React.useState('');
  const [code, setCode] = React.useState('');
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
    setName(selectItem?.name || '');
    setPrice(selectItem?.price.toString() || '');
    setDescription(selectItem?.description || '');
    setQuantity(selectItem?.quantity.toString() || '');
    setImage(selectItem?.image || '');
    setCode(selectItem?.code || '');
  }, [selectItem]);

  console.log('selectItem----', selectItem);

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
            {selectItem?.name ? selectItem?.name : 'Thêm sản phẩm'}
          </Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Image</FormControl.Label>
              {image && (
                <Box alignItems="center" justifyContent="center">
                  <Image
                    style={{
                      width: 200,
                      height: 100,
                    }}
                    source={{ uri: image }}
                  ></Image>
                </Box>
              )}
              <Button mt={3} onPress={pickImageAsync}>
                Chọn ảnh
              </Button>
            </FormControl>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input value={name} onChangeText={setName} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Mã sản phẩm</FormControl.Label>
              <Input value={code} onChangeText={setCode} />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Giá</FormControl.Label>
              <Input
                value={price}
                onChangeText={setPrice}
                keyboardType={'numeric'}
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Số lượng</FormControl.Label>
              <Input
                value={quantity}
                onChangeText={setQuantity}
                keyboardType={'numeric'}
              />
            </FormControl>

            <FormControl mt="3">
              <FormControl.Label>Mô tả</FormControl.Label>
              <Input
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
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
