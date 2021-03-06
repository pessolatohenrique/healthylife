/* eslint-disable radix */
import Moment from 'moment';
import { getRequest } from '../../utils/request';
import { verifyShowError } from '../../utils/errors';

/**
 * realiza o mapeamento no formato necessário para a base de dados
 * @param {Array} data dados encontrados na API
 * @param {Array} mealTypes tipos de refeição
 * @return {Array} finalDataMaped dados mapeados
 */
export const mapList = (data, mealTypes) => {
  let finalDataMaped = [];

  if (data && data.length > 0) {
    finalDataMaped = [...data].map((item) => {
      const currentMealType = mealTypes.find(mealType => mealType.id === item.refeicao_id);
      let itemCopy = Object.assign({}, item);
      itemCopy = {
        ...itemCopy,
        id: parseInt(`${Moment().unix()}${currentMealType.id}`),
        meal_type: currentMealType,
        consumed_at: item.horario_consumo,
        calories_total: parseFloat(item.calorias_total),
        created_at: new Date(),
        updated_at: new Date(),
      };

      delete itemCopy.refeicao_id;
      delete itemCopy.refeicao_descricao;
      delete itemCopy.horario_consumo;
      delete itemCopy.calorias_total;

      return itemCopy;
    });
  }

  return finalDataMaped;
};

export const mapToChart = data => [...data].map(item => Object.assign({
  name: item.meal_type.description,
  value: item.calories_total,
}));

/**
 * obtem a listagem de tipos de refeição
 * @return {Array} finalData tipos de refeição
 */
export const getCalculateCalories = async (mealTypeList) => {
  const finalData = await getRequest(
    `meal/calculate-calories?UsuarioRefeicaoSearch[data_inicial]=${Moment().format('DD/MM/YYYY')}`,
  );

  const finalDataMaped = mapList(finalData, mealTypeList);

  return finalDataMaped;
};

export const insertReport = (realm, data) => {
  try {
    realm.write(() => {
      realm.create('Meal', data);
    });
  } catch (error) {
    // console.tron.log('error on creation', error.message);
  }

  return true;
};

/**
 * verifica se um registro existe na base de dados local
 * @param {Object} realm informações do realm database
 * @return {Array} hasChanged dado encontrado ou array vazio
 */
export const verifyExists = async (realm, currentItem) => {
  const result = await realm
    .objects('Meal')
    .filtered(
      'meal_type.id = $0 AND consumed_at = $1 AND calories_total = $2 AND created_at >= $3 AND created_at <= $4',
      currentItem.meal_type.id,
      currentItem.consumed_at,
      parseFloat(currentItem.calories_total),
      `${Moment().format('YYYY-MM-DD')}T00:00:00`,
      `${Moment().format('YYYY-MM-DD')}T23:59:00`,
    )
    .sorted('id');

  return result;
};

export const searchFromToday = async (realm) => {
  const data = realm
    .objects('Meal')
    .filtered(
      'created_at >= $0 AND created_at <= $1',
      `${Moment().format('YYYY-MM-DD')}T00:00:00`,
      `${Moment().format('YYYY-MM-DD')}T23:59:00`,
    )
    .sorted('id');

  return data;
};

export const bulkInsert = async (realm, data) => {
  const finalData = Object.assign({}, realm);
  try {
    const promises = [...data].map(async (item) => {
      const resultExists = await verifyExists(realm, item);

      if (resultExists.length === 0) {
        await insertReport(realm, item);
      }
    });

    await Promise.all(promises);
  } catch (error) {
    verifyShowError({ error: 'Ops! Erro na inserção das refeições' });
  }

  return finalData;
};
