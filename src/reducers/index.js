// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import { productReducer as product } from './product';

export const reducers = combineReducers({
  product,
});
