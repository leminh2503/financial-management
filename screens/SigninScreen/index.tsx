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
  Link,
  Row,
  Spacer,
  Text,
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
  const { loginInfo } = useSelector((state: RootState) => state.auth);
  const [email, onChangeEmail] = React.useState(loginInfo?.email);
  const [password, onChangePassword] = React.useState(loginInfo?.password);
  const [rememberMe, setRememberMe] = React.useState(!!loginInfo?.email);
  const onPressSigninButton = async () => {
    const values = {
      email,
      password,
      device_token: 'device_token',
    };
    ApiService.signin(values)
      .then((res) => {
        console.log(res.data);
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token));
        // Set auth token
        apiClient.interceptors.request.use((config) => {
          if (config.headers) {
            config.headers.Authorization = `Bearer ${res.data.token}`;
          }
          return config;
        });
        // If remember me checked, then save user data to storage
        if (rememberMe) {
          dispatch(
            setLoginEmail({
              email: email,
              password: password,
            })
          );
        }
        props.navigation.navigate('BottomTab', { screen: 'List' });
      })
      .catch((err) => console.log('err----', err));
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
              <FormControl.Label>Email</FormControl.Label>
              <Input value={email} onChangeText={onChangeEmail} type="text" />
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
              <Link href={'https://your.app.web/forgot-password'} isExternal>
                Forget Password?
              </Link>
            </Row>
            <Button onPress={onPressSigninButton} mt="2">
              Sign in
            </Button>
            <Row mt="6" justifyContent="center">
              <Text>I&apos;m a new user. </Text>
              <Link onPress={onPressSignupLink}>Sign Up</Link>
            </Row>
          </Column>
        </Box>
      </Center>
    </KeyboardAvoidingView>
  );
};
