import * as React from 'react';

// api
import { apiClient, ApiService } from '../../lib/axios';

//components
import {
  Box,
  Button,
  Center,
  Checkbox,
  Column,
  FormControl,
  Heading,
  Image,
  Input,
  KeyboardAvoidingView,
  Row,
  Spacer,
  Text,
  useToast,
} from 'native-base';

//redux
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoginEmail,
  setToken,
  setUser,
} from '../../lib/redux/reducers/authReducer';
import { RootState } from '../../lib/redux/store';

// navigation
import { RootStackParamList } from '../../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Signin'>;

export const SigninScreen: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { loginInfo } = useSelector((state: RootState) => state.auth);
  const [username, onChangeUsername] = React.useState(loginInfo?.username);
  const [password, onChangePassword] = React.useState(loginInfo?.password);
  const [rememberMe, setRememberMe] = React.useState(!!loginInfo?.username);
  const onPressSigninButton = async () => {
    const values = {
      username,
      password,
    };

    ApiService.signin(values)
      .then((res) => {
        // if (res?.data?.message) {
        //   toast.show({
        //     title: res.data.message,
        //     placement: 'top',
        //   });
        //   return;
        // }
        dispatch(setUser(res.data.data.user));
        dispatch(setToken(res.data.data.token));
        // Set auth token
        apiClient.interceptors.request.use((config) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${res.data.data.token}`;
          }
          return config;
        });
        // If remember me checked, then save user data to storage
        if (rememberMe) {
          dispatch(
            setLoginEmail({
              username: username,
              password: password,
            })
          );
        }
        props.navigation.navigate('BottomTab', { screen: 'Sales' });
      })
      .catch((err) => {
        console.log('err---', err);

        toast.show({
          title: 'Sai thông tin tài khoản',
          placement: 'top',
        });
      });
  };
  const onPressSignupLink = () => {
    props.navigation.navigate('Signup');
  };
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Center width="100%">
        <Box safeArea p="2" py="8" w="90%">
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginBottom: 20,
            }}
            source={require('../../assets/images/logo.png')}
          ></Image>
          <Heading>Welcome to Lan Anh Mart</Heading>
          <Column space={3} mt="5">
            <FormControl>
              <FormControl.Label>Username/Số điện thoại</FormControl.Label>
              <Input
                value={username}
                onChangeText={onChangeUsername}
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                value={password}
                onChangeText={onChangePassword}
                type="password"
              />
            </FormControl>
            <Row space={3} width="100%">
              <Checkbox
                value=""
                isChecked={rememberMe}
                onChange={setRememberMe}
              >
                Remember me
              </Checkbox>
              <Spacer />
              <Text>Forget Password?</Text>
            </Row>
            <Button onPress={onPressSigninButton} mt="2">
              Sign in
            </Button>
            {/*<Row mt="6" justifyContent="center">*/}
            {/*  <Text>I&apos;m a new user. </Text>*/}
            {/*  <Link onPress={onPressSignupLink}>Sign Up</Link>*/}
            {/*</Row>*/}
          </Column>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};
