import { MEAL_TYPE_SET_LIST } from '../actions/mealType';

const initialState = {
  list: [],
};

export const mealTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEAL_TYPE_SET_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};
