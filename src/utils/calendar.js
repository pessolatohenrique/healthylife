import moment from 'moment';

/**
 * calcula a diferença em dias
 * @param {String} date_initial data inicial, em formato americano
 * @param {String} date_final data final, em formato americano
 * @return {Integer} difference diferença em dias
 */
export const getDifferenceInDays = (date_initial, date_final) => moment(date_final).diff(moment(date_initial), 'days');
