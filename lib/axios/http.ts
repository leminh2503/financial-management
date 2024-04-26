import axios, { AxiosInstance } from 'axios';
import { store } from '../redux/store';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://2802-1-53-36-242.ngrok-free.app' || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + store.getState().auth.token || '',
  },
});

export default apiClient;
