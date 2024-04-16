import { apiClient } from '../lib/axios';
import { Alert, useToast } from 'native-base';
// redux
import { useDispatch } from 'react-redux';
import { store } from '../lib/redux/store';
import { useEffect, useState } from 'react';
import { resetAuthData } from '../lib/redux/reducers/authReducer';

export default function usePusherNotification() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { token } = store.getState().auth;
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    const initActionOfTokenExpired = () => {
      // Set auth token
      apiClient.interceptors.request.use((config) => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
      apiClient.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          console.log('errortoken-------', token);
          console.log('error-------', error?.response);
          // If API return 401 not authorized error, then sign-out
          if (error?.response.status == 401) {
            dispatch(resetAuthData());
            toast.show({
              title: 'Error',
              placement: 'top',
              description: String(error),
            });
            Alert('Token expired, please login again');
          }
          return error;
        }
      );
      setLoadingComplete(true);
    };
    initActionOfTokenExpired();
  }, [token]);

  return isLoadingComplete;
}
