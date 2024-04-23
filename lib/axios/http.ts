import axios, { AxiosInstance } from 'axios';
import { store } from '../redux/store';

const apiClient: AxiosInstance = axios.create({
  baseURL:
    'https://628c-2001-ee0-4a6b-4b40-6094-8b40-6860-529b.ngrok-free.app' ||
    'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + store.getState().auth.token || '',
  },
});

export default apiClient;
