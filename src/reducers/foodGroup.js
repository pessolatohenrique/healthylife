import { FOOD_GROUP_SET_LIST } from "../actions/foodGroup";

const initialState = {
  list: []
};

export const foodGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOOD_GROUP_SET_LIST:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};
