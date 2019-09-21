export const PRODUCT_GET_LIST = 'PRODUCT_GET_LIST';
export const PRODUCT_CREATE = 'PRODUCT_CREATE';
export const PRODUCT_UPDATE_LIST = 'PRODUCT_UPDATE_LIST';

/**
 * obtem a listagem de produtos
 */
export const list = () => ({
  type: PRODUCT_GET_LIST,
});

export const updateList = listToUpdate => ({
  type: PRODUCT_UPDATE_LIST,
  payload: listToUpdate,
});

/**
 * realiza a criação de um produto
 * @param {Object} product dados do produto
 * @param {Array} actualList conjunto de produtos
 */
export const create = (product, actualList) => (dispatch) => {
  const actualListCopy = [...actualList];

  actualListCopy.push({ ...product });

  dispatch({
    type: PRODUCT_CREATE,
    payload: { ...product },
  });

  dispatch(updateList(actualListCopy));
};
