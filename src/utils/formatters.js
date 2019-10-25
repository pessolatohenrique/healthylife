/**
 * formata um valor monetário para decimal
 * por exemplo: de R$50,90 para R$50.90
 * @param {String} strMoney valor monetário a ser traduzido
 * @return {Float} valor convertido
 */
export const formatDecimalToNumber = (strMoney) => {
  let formatedValue = strMoney;

  if (strMoney) {
    formatedValue = strMoney
      .replace(/\./g, '')
      .replace(',', '.')
      .trim();
  }

  return parseFloat(formatedValue.toFixed(2));
};
