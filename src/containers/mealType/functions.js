import { getRequest } from '../../utils/request';
import { getRealm } from '../../config/realm';
import { verifyShowError } from '../../utils/errors';

/**
 * realiza o mapeamento no formato necessário para a base de dados
 * @param {Array} data dados encontrados na API
 * @return {Array} finalDataMaped dados mapeados
 */
export const mapList = (data) => {
  let finalDataMaped = [];

  if (data && data.length > 0) {
    finalDataMaped = [...data].map((item) => {
      let itemCopy = Object.assign({}, item);
      itemCopy = {
        ...itemCopy,
        description: itemCopy.descricao,
        created_at: new Date(),
        updated_at: new Date(),
      };
      delete itemCopy.descricao;
      return itemCopy;
    });
  }

  return finalDataMaped;
};

/**
 * obtem a listagem de tipos de refeição
 * @return {Array} finalData tipos de refeição
 */
export const list = async () => {
  const finalData = await getRequest('meal-type?page=1');
  const finalDataMaped = await mapList(finalData);
  return finalDataMaped;
};

/**
 * verifica se um registro existe na base de dados local
 * @param {Object} realm informações do realm database
 * @return {Array} hasChanged dado encontrado ou array vazio
 */
export const verifyExists = async (realm) => {
  const result = await realm.objects('MealType').sorted('id');
  return result;
};

export const bulkInsert = async (realm, data) => {
  const finalData = Object.assign({}, realm);
  try {
    realm.write(() => {
      data.forEach((item) => {
        realm.create('MealType', item, true);
      });
    });
  } catch (error) {
    verifyShowError({ error: 'Ops! Erro na inserção das refeições' });
  }

  return finalData;
};

export const loadMealTypeFlow = async (connection) => {
  const realm = await getRealm();
  const hasMeals = await verifyExists(realm);
  let data = [...hasMeals];

  if (hasMeals.length === 0 && connection.status) {
    data = await list();
    const inserted = await bulkInsert(realm, data);
    return inserted;
  }

  return data;
};
