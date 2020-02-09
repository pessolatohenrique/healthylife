/**
 * realiza o agrupamento de uma lista com base em um atributo
 * @param {Array} arr lista com as informações
 * @param {String} prop propriedade a ser agrupada
 * @return {Array} lista agrupada
 */
export function groupByAttribute(arr, prop) {
  const map = new Map(Array.from(arr, obj => [obj[prop], []]));
  arr.forEach(obj => map.get(obj[prop]).push(obj));
  return Array.from(map.values());
}
