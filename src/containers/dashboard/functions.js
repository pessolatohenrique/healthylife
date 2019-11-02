/* eslint-disable camelcase */
import axios from 'axios';
import Moment from 'moment';
import { getErrorMessage } from '../../utils/errors';
import { formatDecimalToNumber } from '../../utils/formatters';

/**
 * obtem os dados calculados, fornecidos pela API
 */
export const getUserCalculate = async () => {
  let finalData = null;

  const request = await axios.get('user/calculate').catch((error) => {
    finalData = Object.assign({ error: getErrorMessage(error) });
  });

  if (request && request.data) {
    finalData = Object.assign({}, request.data);
  }

  return finalData;
};

/**
 * verifica se um registro existe na base de dados local
 * @param {Object} realm informações do realm database
 * @param {Object} data dados encontrados
 * @return {Array} hasChanged dado encontrado ou array vazio
 */
export const verifyExists = (realm, data) => {
  const hasChanged = realm
    .objects('Indicative')
    .filtered(
      'imc = $0 AND consumed_percentage = $1 AND created_at >= $2 AND created_at <= $3',
      formatDecimalToNumber(data.imc),
      formatDecimalToNumber(data.total_consumido_porcentagem),
      `${Moment().format('YYYY-MM-DD')}T00:00:00`,
      `${Moment().format('YYYY-MM-DD')}T23:59:00`,
    )
    .sorted('id');

  return hasChanged;
};

/**
 * cria o objeto a ser salvo
 * @param {Object} data dados retornados da API
 * @return {Object} objeto mapeado a ser salvo
 */
export const createObject = (data) => {
  const {
    imc,
    classificacao_imc,
    valor_dieta,
    total_consumido,
    total_consumido_porcentagem,
  } = data;

  const objectToSave = {
    id: Moment().unix(),
    imc: formatDecimalToNumber(imc),
    imc_classification: classificacao_imc,
    diet_value: valor_dieta,
    consumed: formatDecimalToNumber(total_consumido),
    consumed_percentage: formatDecimalToNumber(total_consumido_porcentagem),
    created_at: new Date(),
    updated_at: new Date(),
  };

  return objectToSave;
};

/**
 * realiza a inserção na base de dados local
 * @param {Object} realm informações do realm database
 * @param {Object} data dados encontrados
 * @return {Object} finalData dados relacionados à base
 */
export const insert = (realm, data) => {
  let finalData = Object.assign({}, realm);

  const hasChanged = verifyExists(realm, data);

  if (hasChanged.length === 0) {
    try {
      realm.write(() => {
        const objectToSave = createObject(data);

        realm.create('Indicative', objectToSave, true);
      });
    } catch (error) {
      finalData = Object.assign({ error: 'Ops! Erro na inserção de dados' });
    }
  }

  return finalData;
};

/**
 * obtem o último resultado da tabela
 * @param {Object} realm informações do realm database
 * @return {Object} lastResult informações do último resultado, ou vazio
 */
export const getLastResult = (realm) => {
  let lastResult = [];
  const lastResultQuery = realm
    .objects('Indicative')
    .sorted('id', true)
    .slice(0, 1);

  if (lastResultQuery && lastResultQuery[0]) {
    const lastTmp = lastResultQuery[0];
    lastResult = lastTmp;
  }

  return lastResult;
};
