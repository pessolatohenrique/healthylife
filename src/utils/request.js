import axios from 'axios';
import { getErrorMessage, verifyShowError } from './errors';

/**
 * realiza uma requisição do tipo GET via axios
 * @param {String} url URL a ser pesquisa
 * @return {Array} finalData lista encontrada
 */
export const getRequest = async (url) => {
  let finalData = null;

  const request = await axios.get(url).catch((error) => {
    verifyShowError({ error: getErrorMessage(error) });
    finalData = Object.assign({ error: getErrorMessage(error) });
  });

  if (request && request.data) {
    finalData = Object.assign({}, request.data);
  }

  if (request && request.data.length > 0) {
    finalData = [...request.data];
  }

  return finalData;
};
