import {
  ACTION_FOOD_GET_TYPE_CHOSEN,
  ACTION_FOOD_GET_ALL_TYPE_FOODS,
  ACTION_FOOD_MODAL_ADD_TYPE_FOOD,
  ACTION_FOOD_GET_ALL_FOODS,
  ACTION_FOOD_GET_ALL_FOODS_BY_NAME,
  ACTION_FOOD_MODAL_EDIT_FOOD,
  ACTION_FOOD_MODAL_EDIT_TYPE_FOOD,
  ACTION_FOOD_SORT_FOOD
} from '../actions/types';

const defaultState = {
  foods: [],
  typeChosen: {
    id: '',
    name: 'all'
  },
  typefoods: [],
  modalAddTypeFood: false,
  foodsByName: [],
  modalEditFood: {
    status: false,
    food: {}
  },
  modalEditTypeFood: {
    status: false,
    typefood: {}
  },
  sortFood: 'all'
};

// eslint-disable-next-line default-param-last
const foodReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_FOOD_GET_TYPE_CHOSEN:
      return {
        ...state,
        typeChosen: action.payload
      };
    case ACTION_FOOD_GET_ALL_TYPE_FOODS:
      return {
        ...state,
        typefoods: action.payload
      };
    case ACTION_FOOD_MODAL_ADD_TYPE_FOOD:
      return {
        ...state,
        modalAddTypeFood: action.payload
      };
    case ACTION_FOOD_GET_ALL_FOODS:
      return {
        ...state,
        foods: action.payload
      };
    case ACTION_FOOD_GET_ALL_FOODS_BY_NAME:
      return {
        ...state,
        foodsByName: action.payload
      };
    case ACTION_FOOD_MODAL_EDIT_FOOD:
      return {
        ...state,
        modalEditFood: action.payload
      };
    case ACTION_FOOD_MODAL_EDIT_TYPE_FOOD:
      return {
        ...state,
        modalEditTypeFood: action.payload
      };
    case ACTION_FOOD_SORT_FOOD:
      return {
        ...state,
        sortFood: action.payload
      };
    default:
      return state;
  }
};
export default foodReducer;
