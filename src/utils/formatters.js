/**
 * formata um valor monetário para decimal
 * por exemplo: de R$50,90 para R$50.90
 * @param {String} strDecimal valor monetário a ser traduzido
 * @return {Float} valor convertido
 */
export const formatDecimalToNumber = strDecimal => {
  let formatedValue = strDecimal;

  if (strDecimal) {
    formatedValue = strDecimal
      .toString()
      .replace(/\./g, "")
      .replace(",", ".")
      .trim();
  }

  return parseFloat(formatedValue);
};

/**
 * valida se a String é um decimal válido
 * por exemplo: 50,90 é um decimal válido
 * @param {String} str valor a ser comparado
 * @return {Bool} é válido ou não
 */
export const verifyValidateDecimal = str => {
  return /^[1-9]\d*(,\d+)?$/.test(str);
};
