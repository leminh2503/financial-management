import React from 'react';
import { HamburgerIcon, Menu, Pressable, Text } from 'native-base';
// type
import { RootStackParamList } from './types';
// navigation
import { useNavigation } from '@react-navigation/native';
// state(redux)
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthData } from '../lib/redux/reducers/authReducer';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../lib/redux/store';

type NavigationProp = NativeStackScreenProps<RootStackParamList>;

export const NavMenu = () => {
  const navigation = useNavigation<NavigationProp['navigation']>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const doLogout = () => {
    dispatch(resetAuthData());
    navigation.navigate('Signin');
  };
  return (
    <Menu
      closeOnSelect={true}
      trigger={(triggerProps) => {
        return (
          <Pressable
            accessibilityLabel="More options menu"
            {...triggerProps}
            mr={2}
          >
            <HamburgerIcon size="sm" />
          </Pressable>
        );
      }}
    >
      {user?.roleId === 1 && (
        <Menu.Item onPress={() => navigation.navigate('User')}>
          <Text>Danh sách Nhân viên</Text>
        </Menu.Item>
      )}
      <Menu.Item onPress={() => doLogout()}>
        <Text>Sign out</Text>
      </Menu.Item>
    </Menu>
  );
};
