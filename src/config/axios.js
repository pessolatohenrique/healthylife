import env from 'react-native-config';
import axios from 'axios';

const config = {
  api: {
    host: env.API_HOST,
    timeout: 20000,
  },
};

const configureAxios = () => {
  console.tron.log('Call configure axios');
  axios.defaults.baseURL = env.API_HOST;
  axios.defaults.headers.common.Authorization = 'Bearer 123456';
};

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// colocar no login
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const API_HOST = config.api.host;

export { API_HOST, configureAxios };

export default config;
