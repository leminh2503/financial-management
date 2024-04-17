import axios, { AxiosInstance } from 'axios';
import { store } from '../redux/store';

const apiClient: AxiosInstance = axios.create({
  baseURL:
    'https://9b73-123-16-53-214.ngrok-free.app' || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + store.getState().auth.token || '',
  },
});

export default apiClient;
