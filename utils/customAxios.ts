import axios from 'axios'
import Env from '../config/env';

export const axiosInstance = (value = 'apiDomain') =>
  axios.create({
    headers: {
      'Content-Type': 'application/json',
      'x-apollo-operation-name': 'word-store@apollo'
    },
    baseURL: Env.getVar(value),
  });
