import { getRequest } from "../../utils/request";
import { getRealm } from "../../config/realm";
import { verifyShowError } from "../../utils/errors";
import { RESULTS_PER_PAGE } from "../../constants/general";

/**
 * realiza o mapeamento no formato necessário para a base de dados
 * @param {Array} data dados encontrados na API
 * @return {Array} finalDataMaped dados mapeados
 */
export const mapList = (data, foodGroups) => {
  let finalDataMaped = [];

  if (data && data.length > 0) {
    finalDataMaped = [...data].map(item => {
      let itemCopy = {
        id: item.id,
        group: {
          id: item.grupo.id,
          description: item.grupo.descricao,
          portion: item.grupo.valor_porcao,
          created_at: new Date(),
          updated_at: new Date()
        },
        description: item.descricao,
        measure: item.medida_caseira,
        calories: item.calorias
      };
      return itemCopy;
    });
  }

  return finalDataMaped;
};

/**
 * obtem a listagem de tipos de refeição
 * @return {Array} finalData tipos de refeição
 */
export const list = async (page, foodGroups) => {
  const finalData = await getRequest(
    `food?per-page=${RESULTS_PER_PAGE}&page=${page}&sort=descricao&expand=grupo`
  );

  const finalDataMaped = await mapList(finalData.items, foodGroups);
  return finalDataMaped;
};

export const getMetaData = async () => {
  const finalData = await getRequest(
    `food?per-page=${RESULTS_PER_PAGE}&page=1`
  );
  return finalData._meta;
};

/**
 * verifica se um registro existe na base de dados local
 * @param {Object} realm informações do realm database
 * @return {Array} hasChanged dado encontrado ou array vazio
 */
export const verifyExists = async realm => {
  const result = await realm.objects("Food").sorted("id");

  console.tron.log("RESULT", result);
  return result;
};

export const bulkInsert = async (realm, data) => {
  const finalData = Object.assign({}, realm);
  try {
    realm.write(() => {
      data.forEach(item => {
        realm.create("Food", item, true);
      });
    });
  } catch (error) {
    verifyShowError({ error: "Ops! Erro na inserção dos alimentos" });
  }

  return finalData;
};

export const loadFoodFlow = async (connection, foodGroups) => {
  const realm = await getRealm();
  const hasFood = await verifyExists(realm);
  let data = [...hasFood];

  if (hasFood.length === 0 && connection.status) {
    const metaData = await getMetaData();

    for (i = 0; i < metaData.pageCount; i++) {
      let page = i + 1;
      data = await list(page, foodGroups);
      const inserted = await bulkInsert(realm, data);
      //   return inserted;
    }
  }

  return data;
};
