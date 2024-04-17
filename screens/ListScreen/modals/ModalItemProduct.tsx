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
import { ApiService, ImageModel, ProductModel } from '../../../lib/axios';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { Loading } from '../../../components/Loading';
import {
  addToListProduct,
  editProduct,
} from '../../../lib/redux/reducers/productReducer';
import { useRoleAdmin } from '../../../hooks/useRoleAdmin';
import { uploadStorage } from '../../../hooks/useFirestorage';

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
  const [cost, setCost] = React.useState('');
  const [imageApi, setImageApi] = React.useState<ImageModel>('');
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const isAdmin = useRoleAdmin();
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      const formData = new FormData();
      console.log('result:-----', result.assets[0]);
      formData?.append('imageFile', {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: `image${Math.random() * 99999}`,
      });
      setLoading(true);
      const reponsrImage = await ApiService.postImage(formData)
        .then((e) => {
          setLoading(false);
          setImage(result.assets[0].uri);
          setImageApi(e.data.data);
        })
        .catch((e) => {
          console.log('Error: ', e);
        });
    } else {
      alert('You did not select any image.');
    }
  };

  const addProduct = () => {
    const data = {
      productName: name,
      productPrice: parseInt(price),
      productDescription: description,
      productQuantity: parseInt(quantity),
      productImageId: imageApi.imageId,
      productSKU: code,
      productCost: parseInt(cost),
    };
    setLoading(true);
    ApiService.postProduct(data)
      .then(async (e) => {
        const response = await uploadStorage(image, imageApi.imageId);

        console.log('Add product: ', response);

        dispatch(
          addToListProduct({
            ...e.data.data,
            count: 0,
          })
        );
        setLoading(false);
        closeModal();
      })
      .catch((e) => {
        setLoading(false);
        // Alert(JSON.stringify(e));
        console.log('Error: ---', e);
      });
  };

  const patchProduct = () => {
    const data = {
      productId: selectItem?.productId,
      productName: name,
      productPrice: parseInt(price),
      productDescription: description,
      productQuantity: parseInt(quantity),
      productImageId: imageApi.imageId,
      productSKU: code,
      productCost: parseInt(cost),
    };
    setLoading(true);
    ApiService.patchProduct(data)
      .then((e) => {
        console.log('Patch product: ', e.data.data);
        dispatch(editProduct(e.data.data));
        setLoading(false);
        closeModal();
      })
      .catch((e) => {
        setLoading(false);
        // Alert(JSON.stringify(e));
        console.log('Error: ---', e.response);
      });
  };

  const handleSave = () => {
    if (selectItem) {
      patchProduct();
    } else {
      addProduct();
    }
  };

  useEffect(() => {
    setName(selectItem?.productName || '');
    setPrice(selectItem?.productPrice.toString() || '');
    setDescription(selectItem?.productDescription || '');
    setQuantity(selectItem?.productQuantity.toString() || '');
    setImage(selectItem?.productImageId || '');
    setCode(selectItem?.productSKU || '');
    setCost(selectItem?.productCost.toString() || '');
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
        {loading ? (
          <Loading />
        ) : (
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>
              {selectItem?.productName
                ? selectItem?.productName
                : 'Thêm sản phẩm'}
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
              {isAdmin && (
                <FormControl mt="3">
                  <FormControl.Label>Giá nhập</FormControl.Label>
                  <Input
                    value={cost}
                    onChangeText={setCost}
                    keyboardType={'numeric'}
                  />
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
                {selectItem && isAdmin ? (
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
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};
