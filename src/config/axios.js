import env from 'react-native-config';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const config = {
  api: {
    host: env.API_HOST,
    timeout: 20000,
  },
};

const configureAxios = async () => {
  axios.defaults.baseURL = env.API_HOST;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post.Accept = 'application/json';
  axios.defaults.headers.common.Authorization = `Bearer ${await AsyncStorage.getItem('token')}`;
};

const API_HOST = config.api.host;

export { API_HOST, configureAxios };

export default config;
