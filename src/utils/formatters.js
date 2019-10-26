/**
 * formata um valor monetário para decimal
 * por exemplo: de R$50,90 para R$50.90
 * @param {String} strDecimal valor monetário a ser traduzido
 * @return {Float} valor convertido
 */
export const formatDecimalToNumber = (strDecimal) => {
  let formatedValue = strDecimal;

  if (strDecimal) {
    formatedValue = strDecimal
      .toString()
      .replace(/\./g, '')
      .replace(',', '.')
      .trim();
  }

  return parseFloat(formatedValue);
};
