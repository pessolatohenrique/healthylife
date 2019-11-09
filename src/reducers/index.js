// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from 'redux';
import { productReducer as product } from './product';
import { mealTypeReducer as mealType } from './mealType';

export const reducers = combineReducers({
  product,
  mealType,
});
