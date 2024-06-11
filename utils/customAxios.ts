import axios from 'axios'
import Env from '../config/env';
import { store } from './redux/store';

export const axiosInstance = (value = 'apiDomain') => {

  const config: any = {
    headers: {
      'Content-Type': 'application/json',
      'x-apollo-operation-name': 'word-store@apollo'
    },
    baseURL: Env.getVar(value),
  };
  const auth = store.getState()
  if (auth.token?.code) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${auth.token?.code}`
    }
  };

  return axios.create(config);
}
