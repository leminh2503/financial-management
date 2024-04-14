import axios from 'axios';
import { DataResponse } from './model';
import { BASE_URL } from './index';
import { store } from '../redux/store';

export const postImage = async (formData: FormData) => {
  return axios.post<DataResponse<string>>(BASE_URL + '/api/Image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + store.getState().auth.token || '',
    },
    // transformRequest: (data, headers) => {
    //   return formData; // this is doing the trick
    // },
  });
};
