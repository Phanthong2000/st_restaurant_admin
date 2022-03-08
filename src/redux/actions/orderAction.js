import {
  ACTION_ORDER_GET_ORDER,
  ACTION_ORDER_ADD_FOODS,
  ACTION_ORDER_EDIT_FOODS,
  ACTION_ORDER_DELETE_FOODS,
  ACTION_ORDER_MODAL_INFORMATION_FOOD
} from './types';

export const actionOrderGetOrder = (data) => ({
  type: ACTION_ORDER_GET_ORDER,
  payload: data
});
export const actionOrderAddFoods = (data) => ({
  type: ACTION_ORDER_ADD_FOODS,
  payload: data
});
export const actionOrderEditFoods = (data) => ({
  type: ACTION_ORDER_EDIT_FOODS,
  payload: data
});
export const actionOrderDeleteFoods = (data) => ({
  type: ACTION_ORDER_DELETE_FOODS,
  payload: data
});
export const actionOrderModalInformation = (data) => ({
  type: ACTION_ORDER_MODAL_INFORMATION_FOOD,
  payload: data
});
