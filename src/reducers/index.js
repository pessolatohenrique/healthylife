// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from "redux";
import { productReducer as product } from "./product";
import { mealTypeReducer as mealType } from "./mealType";
import { foodGroupReducer as foodGroup } from "./foodGroup";
import { connectionReducer as connection } from "./connection";

export const reducers = combineReducers({
  product,
  mealType,
  foodGroup,
  connection
});
