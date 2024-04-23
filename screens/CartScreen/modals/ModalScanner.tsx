import React, { useEffect, useState } from 'react';
import { Box, Modal, useToast } from 'native-base';
import { useDispatch } from 'react-redux';
import { CameraView } from 'expo-camera/next';
import { Camera } from 'expo-camera';

type Props = {
  open: boolean;
  closeModal: () => void;
  setText: (value: string) => void;
};

export const ModalScanner: React.FC<Props> = ({
  open,
  closeModal,
  setText,
}) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const dispatch = useDispatch();
  const toast = useToast();
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setText(data);
    closeModal();
  };

  return (
    <Modal isOpen={open} size={'full'} onClose={closeModal} safeAreaTop={true}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Quét Mã</Modal.Header>
        <Modal.Body>
          <Box
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <CameraView
              style={{
                width: '100%',
                aspectRatio: 1,
                overflow: 'hidden',
                borderRadius: 10,
                marginBottom: 10,
              }}
              onBarcodeScanned={handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: [
                  'pdf417',
                  'codabar',
                  'datamatrix',
                  'qr',
                  'aztec',
                  'ean13',
                  'ean8',
                  'upc_e',
                  'code39',
                  'code93',
                  'itf14',
                  'code128',
                  'upc_a',
                ],
              }}
            />
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
