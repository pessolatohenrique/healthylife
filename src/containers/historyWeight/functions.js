import Moment from "moment";
import { getRequest } from "../../utils/request";
import { formatDecimalToNumber } from "../../utils/formatters";
import { verifyShowError } from "../../utils/errors";
import moment from "moment";

/**
 * realiza o mapeamento no formato necessário para a base de dados
 * @param {Array} data dados encontrados na API
 * @return {Array} finalDataMaped dados mapeados
 */
export const mapList = data => {
  let finalDataMaped = [];

  if (data && data.length > 0) {
    finalDataMaped = [...data].map(item => {
      const itemCopy = {
        id: item.id,
        registered_at: new Date(
          Moment(item.data_lancamento, "DD/MM/YYYY").format("YYYY-MM-DD")
        ),
        weight: formatDecimalToNumber(item.peso),
        difference_imc: formatDecimalToNumber(item.diferenca_imc),
        difference_weight: formatDecimalToNumber(item.diferenca_peso),
        classification_imc: item.classificacao_imc,
        created_at: new Date(),
        updated_at: new Date()
      };

      return itemCopy;
    });
  }

  return finalDataMaped;
};

/**
 * realiza o mapeamento para exibir no gráfico de linha
 * @param {Array} data dados a serem mapeados
 * @return {Array} dataMaped dados mapeados
 */
export const mapToChart = data => {
  let lastResults = [...data];

  if (lastResults.length >= 10) {
    lastResults = [...data].slice(Math.max([...data].length - 5));
  }

  return [...lastResults].map(item =>
    Object.assign({
      name: Moment(item.registered_at)
        .format("DD/MM")
        .toString(),

      value: item.weight
    })
  );
};

/**
 * obtem o histórico de pesos
 * @return {Array} finalData pesos encontrados
 */
export const getHistory = async () => {
  const currentDate = Moment().format("DD/MM/YYYY");
  const dateLastMonth = Moment()
    .subtract(30, "days")
    .format("DD/MM/YYYY");

  const finalData = await getRequest(
    `weight-history?HistoricoPesoSearch[data_inicial]=${dateLastMonth}&HistoricoPesoSearch[data_final]=${currentDate}`
  );

  const finalDataMaped = mapList(finalData);

  return finalDataMaped;
};

/**
 * realiza a pesquisa na API com base na data inicial e final
 * @param {String} date_initial data inicial em formato "DD/MM/YYYY"
 * @param {String} date_final data final em formato "DD/MM/YYYY"
 * @return {Array} finalData lista com os dados
 */
export const getHistorySearch = async (date_initial, date_final) => {
  const finalData = await getRequest(
    `weight-history?HistoricoPesoSearch[data_inicial]=${date_initial}&HistoricoPesoSearch[data_final]=${date_final}`
  );

  const finalDataMaped = mapList(finalData);

  return finalDataMaped;
};

/**
 * verifica se um registro existe na base de dados local
 * @param {Object} currentItem item atual
 * @param {Object} data dados a serem encontrados
 * @return {Array} hasChanged dado encontrado ou array vazio
 */
export const verifyExists = async (currentItem, data) => {
  const result = [...data].filter(item => item.id === currentItem.id);
  return result;
};

/**
 * realiza a pesquisa na base de dados local,
 * com dados do último mês
 * @param {Object} realm informações do realm database
 * @return {Array} result dados da pesquisa
 */
export const searchFromMonth = async realm => {
  const currentDate = Moment().format("YYYY-MM-DD");
  const dateLastMonth = Moment()
    .subtract(30, "days")
    .format("YYYY-MM-DD");

  const result = await realm
    .objects("WeightHistory")
    .filtered(
      "registered_at >= $0 AND registered_at <= $1",
      dateLastMonth,
      currentDate
    )
    .sorted("id");

  return result;
};

/**
 * realiza a pesquisa na base de dados local,
 * com dados parametrizados
 * @param {Object} realm informações do realm database
 * @param {Object} objectSearch informacoes da pesquisa
 * @return {Array} result dados da pesquisa
 */
export const search = async (realm, objectSearch) => {
  const { date_initial, date_final } = objectSearch;

  const result = await realm
    .objects("WeightHistory")
    .filtered(
      "registered_at >= $0 AND registered_at <= $1",
      date_initial,
      date_final
    )
    .sorted("registered_at");

  return result;
};

/**
 * realiza a pesquisa na base de dados local,
 * com dados gerais
 * @param {Object} realm informações do realm database
 * @return {Array} result dados da pesquisa
 */
export const listAll = async realm => {
  const result = await realm.objects("WeightHistory").sorted("id");

  return result;
};

/**
 * realiza inserção na base de dados local
 * @param {Object} realm informações do realm database
 * @return {Bool} inserted
 */
export const insert = (realm, data) => {
  try {
    realm.write(() => {
      realm.create("WeightHistory", data);
    });
  } catch (error) {
    console.tron.log("error on creation", error.message);
  }

  return true;
};

/**
 * realiza inserção na base de dados local
 * @param {Object} realm informações do realm database
 * @param {Array} data dados a serem inseridos
 * @return {Array} finalData dados inseridos
 */
export const bulkInsert = async (realm, data) => {
  const finalData = Object.assign({}, realm);
  try {
    const promises = [...data].map(async item => {
      const resultsFromMonth = await searchFromMonth(realm);
      const resultExists = await verifyExists(item, resultsFromMonth);

      if (resultExists.length === 0) {
        await insert(realm, item);
      }
    });

    await Promise.all(promises);
  } catch (error) {
    verifyShowError({ error: "Ops! Erro na inserção de histórico de peso" });
  }

  return finalData;
};

/**
 * realiza inserção na base de dados local
 * @param {Object} realm informações do realm database
 * @param {Array} data dados a serem inseridos
 * @return {Array} finalData dados inseridos
 */
export const bulkInsertFromSearch = async (realm, data) => {
  const finalData = Object.assign({}, realm);
  try {
    const promises = [...data].map(async item => {
      const resultsGeneral = await listAll(realm);

      const resultExists = await verifyExists(item, resultsGeneral);

      if (resultExists.length === 0) {
        await insert(realm, item);
      }
    });

    await Promise.all(promises);
  } catch (error) {
    verifyShowError({ error: "Ops! Erro na inserção de histórico de peso" });
  }

  return finalData;
};
