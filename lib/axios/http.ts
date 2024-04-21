import axios, { AxiosInstance } from 'axios';
import { store } from '../redux/store';

const apiClient: AxiosInstance = axios.create({
  baseURL:
    'https://a3c8-2001-ee0-4a6b-8750-95e-2a4c-cf0-8aec.ngrok-free.app' ||
    'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + store.getState().auth.token || '',
  },
});

export default apiClient;
