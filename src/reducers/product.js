import { PRODUCT_GET_LIST, PRODUCT_CREATE, PRODUCT_UPDATE_LIST } from '../actions/product';

const initialState = {
  list: [
    { id: 1, name: 'Course of React.JS' },
    { id: 2, name: 'Course of React Native' },
    { id: 3, name: 'Course of Redux' },
    { id: 4, name: 'Course of Node.js' },
  ],
  addedProduct: {},
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_GET_LIST:
      return {
        ...state,
      };
    case PRODUCT_CREATE:
      return {
        ...state,
        addedProduct: action.payload,
      };
    case PRODUCT_UPDATE_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
