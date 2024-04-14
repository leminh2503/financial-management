import React, { useCallback, useState } from 'react';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import { CompositeScreenProps, useFocusEffect } from '@react-navigation/native';

// components
import {
  Button,
  Center,
  Column,
  Heading,
  Icon,
  Link,
  Modal,
  Row,
  ScrollView,
  Text,
} from 'native-base';
import { Feather } from '@expo/vector-icons';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../lib/redux/store';
import { reset, resetAuthData } from '../../../lib/redux/reducers/authReducer';

// react-navigation
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  RootStackParamList,
  SettingsScreenTabParamList,
} from '../../../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<SettingsScreenTabParamList, 'AppConfig'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const AppConfigScreen: React.FC<Props> = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>();
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const clearCache = async () => {
    console.log('start clearing');
    setIsUpdating(true);
    try {
      await AsyncStorage.clear();
      dispatch(reset());
      dispatch(resetAuthData());
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <ScrollView>
      <Center width="100%">
        <Column p="6" width="100%">
          <Column pb="3" maxWidth="80">
            <Heading pb="3">Informations</Heading>
            <Row pb="1.5">
              <Text bold color="primary.500">
                App Version:{' '}
              </Text>
              <Text>{Constants.manifest?.version}</Text>
            </Row>
            <Row pb="1.5">
              <Text bold color="primary.500">
                Device:{' '}
              </Text>
              <Text>
                {String(Device.osName) +
                  ' ' +
                  String(Device.osVersion) +
                  ' ' +
                  String(Device.modelName)}
              </Text>
            </Row>
            <Row pb="1.5">
              <Text bold color="primary.500">
                User Email:{' '}
              </Text>
              <Text>{user?.username}</Text>
            </Row>
            <Row pb="1.5">
              <Text bold color="primary.500">
                User Name:{' '}
              </Text>
              <Text>{user?.username + ' ' + user?.username}</Text>
            </Row>
          </Column>
          <Column pb="3" maxWidth="80">
            <Heading pb="3">Settings</Heading>
            <Row pb="1.5">
              <Button
                onPress={() => setShowModal(true)}
                colorScheme="primary"
                leftIcon={<Icon as={Feather} name="alert-circle" size="sm" />}
                isLoading={isUpdating}
                isLoadingText="Erasing..."
              >
                Clear App Cache
              </Button>
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                  <Modal.CloseButton />
                  <Modal.Header>Alert</Modal.Header>
                  <Modal.Body>
                    <Text>
                      Clearing the cache will erase your data and you will have
                      to sign in again.
                    </Text>
                    <Text>Do you really want to erase your data?</Text>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button.Group space={2}>
                      <Button
                        variant="ghost"
                        colorScheme="blueGray"
                        onPress={() => {
                          setShowModal(false);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        isLoading={isUpdating}
                        isLoadingText="Erasing..."
                        onPress={async () => {
                          await clearCache();
                          setShowModal(false);
                        }}
                      >
                        OK
                      </Button>
                    </Button.Group>
                  </Modal.Footer>
                </Modal.Content>
              </Modal>
            </Row>
          </Column>
          <Column pb="3" maxWidth="80">
            <Heading pb="3">About this app</Heading>
            <Row pb="1.5">
              <Link
                maxWidth="64"
                href={`https://github.com/cymagix/expo-react-native-base`}
                isExternal
              >
                Check in the GitHub.
              </Link>
            </Row>
          </Column>
        </Column>
      </Center>
    </ScrollView>
  );
};
