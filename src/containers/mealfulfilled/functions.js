import { getRequest } from "../../utils/request";
import { getRealm } from "../../config/realm";
import { verifyShowError } from "../../utils/errors";

/**
 * realiza o mapeamento no formato necessário para a base de dados
 * @param {Array} data dados encontrados na API
 * @return {Array} finalDataMaped dados mapeados
 */
export const mapList = (data, foodGroups) => {
  let finalDataMaped = [];

  if (data && data.length > 0) {
    finalDataMaped = [...data].map(item => {
      const groupFinded = [...foodGroups].find(
        group => group.id === item.alimento.grupo_id
      );
      let itemCopy = {
        id: item.id,
        meal_type: {
          id: item.refeicao.id,
          description: item.refeicao.descricao,
          created_at: new Date(),
          updated_at: new Date()
        },
        food: {
          id: item.alimento.id,
          group: groupFinded,
          description: item.alimento.descricao,
          measure: item.alimento.medida_caseira,
          calories: item.alimento.calorias,
          created_at: new Date(),
          updated_at: new Date()
        },
        consumed_date: item.data_consumo,
        consumed_time: item.horario_consumo,
        quantity: item.quantidade,
        calories_total: item.quantidade * item.alimento.calorias,
        created_at: new Date(),
        updated_at: new Date()
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
export const list = async foodGroups => {
  const finalData = await getRequest("meal?expand=alimento,refeicao&sort=id");
  const finalDataMaped = await mapList(finalData, foodGroups);
  return finalDataMaped;
};

/**
 * verifica se um registro existe na base de dados local
 * @param {Object} realm informações do realm database
 * @return {Array} hasChanged dado encontrado ou array vazio
 */
export const verifyExists = async realm => {
  const result = await realm.objects("MealFulfilled").sorted("id", false);
  return result;
};

export const bulkInsert = async (realm, data) => {
  const finalData = Object.assign({}, realm);
  try {
    realm.write(() => {
      data.forEach(item => {
        realm.create("MealFulfilled", item, true);
      });
    });
  } catch (error) {
    verifyShowError({
      error: "Ops! Erro na inserção das refeições realizadas"
    });
  }

  return finalData;
};

export const groupByMealType = async meals => {
  const map = new Map(Array.from(meals, obj => [obj["meal_type"]["id"], []]));
  meals.forEach(obj => map.get(obj["meal_type"]["id"]).push(obj));
  let mealsGrouped = Array.from(map.values());
  mealsGrouped = [...mealsGrouped].map(item => Object.assign({ items: item }));
  return mealsGrouped;
};

export const loadMealFlow = async (connection, foodGroups) => {
  const realm = await getRealm();
  let data = await verifyExists(realm);

  if (connection.status) {
    data = await list(foodGroups);
    await bulkInsert(realm, data);
  }

  return data;
};
