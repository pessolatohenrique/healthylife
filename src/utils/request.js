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

/**
 * realiza uma requisição de qualquer tipo
 * @param {String} urlString url a ser chamada
 * @param {Object} parameters possíveis parâmetros a serem enviados
 * @param {String} method método HTTP
 * @return {Object} finalData objeto de retorno
 */
export const fetchAxios = async (urlString, parameters = {}, method) => {
  let finalData = null;
  try {
    const result = await axios[method](urlString, parameters);

    const { data } = result;

    if (data) {
      finalData = data;
    }
  } catch (e) {
    console.tron.log('ERROR', e);
    finalData = Object.assign({ error: 'Ops! Algo deu errado' });
  }

  return finalData;
};
