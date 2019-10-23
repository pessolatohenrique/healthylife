/* eslint-disable camelcase */
import axios from 'axios';
import Moment from 'moment';
import { getErrorMessage } from '../../utils/errors';
import { formatDecimalToNumber } from '../../utils/formatters';

export const getUserCalculate = async () => {
  let finalData = null;

  const request = await axios.get('user/calculate').catch((error) => {
    finalData = Object.assign({ error: getErrorMessage(error) });
  });

  if (request.data) {
    finalData = Object.assign({}, request.data);
  }

  return finalData;
};

export const insert = (realm, data) => {
  realm.write(() => {
    const {
      imc,
      classificacao_imc,
      valor_dieta,
      total_consumido,
      total_consumido_porcentagem,
    } = data;
    realm.create(
      'Indicative',
      {
        id: Moment().unix(),
        imc: formatDecimalToNumber(imc),
        imc_classification: classificacao_imc,
        diet_value: valor_dieta,
        consumed: formatDecimalToNumber(total_consumido),
        consumed_percentage: formatDecimalToNumber(total_consumido_porcentagem),
        created_at: new Date(),
        updated_at: new Date(),
      },
      true,
    );
  });

  return realm;
};
