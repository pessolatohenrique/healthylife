/* eslint-disable camelcase */
import axios from 'axios';
import { getErrorMessage } from '../../utils/errors';

export const login = async (username, password) => {
  let finalData = null;

  const request = await axios
    .post('/auth/login', {
      username,
      password,
    })
    .catch((error) => {
      finalData = Object.assign({ error: getErrorMessage(error) });
    });

  if (request && request.data) {
    const { access_token } = request.data;

    axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    finalData = access_token;
  }

  return finalData;
};
