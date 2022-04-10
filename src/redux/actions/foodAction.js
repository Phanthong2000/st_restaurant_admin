import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_FOOD_GET_TYPE_CHOSEN,
  ACTION_FOOD_GET_ALL_TYPE_FOODS,
  ACTION_FOOD_MODAL_ADD_TYPE_FOOD,
  ACTION_FOOD_GET_ALL_FOODS,
  ACTION_FOOD_GET_ALL_FOODS_BY_NAME,
  ACTION_FOOD_MODAL_EDIT_FOOD,
  ACTION_FOOD_MODAL_EDIT_TYPE_FOOD,
  ACTION_FOOD_SORT_FOOD,
  ACTION_FOOD_MODAL_USER_LOVE
} from './types';

import { actionAnalyticFoodsSelling, actionAnalyticFoodsStopSell } from './analyticAction';

export const actionFoodGetAllFoods = (data) => ({
  type: ACTION_FOOD_GET_ALL_FOODS,
  payload: data
});
export const actionFoodGetTypeChosen = (data) => ({
  type: ACTION_FOOD_GET_TYPE_CHOSEN,
  payload: data
});

export const actionFoodGetAllTypeFoods = (data) => ({
  type: ACTION_FOOD_GET_ALL_TYPE_FOODS,
  payload: data
});

export const actionFoodModalAddTypeFood = (data) => ({
  type: ACTION_FOOD_MODAL_ADD_TYPE_FOOD,
  payload: data
});
export const actionFoodGetAllFoodsByName = (data) => ({
  type: ACTION_FOOD_GET_ALL_FOODS_BY_NAME,
  payload: data
});
export const actionFoodModalEditFood = (data) => ({
  type: ACTION_FOOD_MODAL_EDIT_FOOD,
  payload: data
});
export const actionFoodModalEditTypeFood = (data) => ({
  type: ACTION_FOOD_MODAL_EDIT_TYPE_FOOD,
  payload: data
});

export const actionFoodSortFood = (data) => ({
  type: ACTION_FOOD_SORT_FOOD,
  payload: data
});
export const actionFoodModalUserLove = (data) => ({
  type: ACTION_FOOD_MODAL_USER_LOVE,
  payload: data
});
export const actionGetAllFoods = () => (dispatch) => {
  axios
    .get(`${api}monAn/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      dispatch(actionFoodGetAllFoods(res.data));
      dispatch(
        actionAnalyticFoodsSelling(res.data.filter((food) => food.trangThai === 'Đang bán').length)
      );
      dispatch(
        actionAnalyticFoodsStopSell(res.data.filter((food) => food.trangThai === 'Hết bán').length)
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export const actionGetAllFoodsByName = (name) => (dispatch) => {
  if (name === '') {
    axios
      .get(`${api}monAn/list`)
      .then((res) => {
        dispatch(actionFoodGetAllFoodsByName(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .get(`${api}monAn/list/tenMonAn`, {
        params: {
          tenMonAn: name
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        dispatch(actionFoodGetAllFoodsByName(res.data));
      })
      .catch((err) => console.log(err));
  }
};
export const actionGetAllTypeFoods = () => (dispatch) => {
  axios
    .get(`${api}loaiMonAn/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      dispatch(actionFoodGetAllTypeFoods(res.data));
    })
    .catch((err) => console.log(err));
};
