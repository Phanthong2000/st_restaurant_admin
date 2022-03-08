import axios from 'axios';
import {
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS,
  ACTION_CUSTOMER_GET_QUANTITY_CUSTOMERS,
  ACTION_CUSTOMER_MODAL_ADD_CUSTOMER,
  ACTION_CUSTOMER_MODAL_EDIT_CUSTOMER,
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS_BY_KEYWORDS
} from './types';
import api from '../../assets/api/api';

export const actionCustomerGetAllCustomers = (data) => ({
  type: ACTION_CUSTOMER_GET_ALL_CUSTOMERS,
  payload: data
});
export const actionCustomerGetQuantityCustomers = (data) => ({
  type: ACTION_CUSTOMER_GET_QUANTITY_CUSTOMERS,
  payload: data
});
export const actionCustomerModalAddCustomer = (data) => ({
  type: ACTION_CUSTOMER_MODAL_ADD_CUSTOMER,
  payload: data
});
export const actionCustomerModalEditCustomer = (data) => ({
  type: ACTION_CUSTOMER_MODAL_EDIT_CUSTOMER,
  payload: data
});
export const actionCustomerGetAllCustomersByKeyword = (data) => ({
  type: ACTION_CUSTOMER_GET_ALL_CUSTOMERS_BY_KEYWORDS,
  payload: data
});
export const actionGetAllCustomers = () => (dispatch) => {
  axios
    .get(`${api}khachHang/list`)
    .then((res) => {
      const { data } = res;
      dispatch(actionCustomerGetAllCustomers(data));
      dispatch(actionCustomerGetQuantityCustomers(data));
    })
    .catch((err) => console.log(err));
};
export const actionGetAllCustomerByKeyword = (keyword) => (dispatch) => {
  if (keyword === '') {
    axios
      .get(`${api}khachHang/list`)
      .then((res) => {
        dispatch(actionCustomerGetAllCustomersByKeyword(res.data));
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .get(`${api}khachHang/list/keyword`, {
        params: {
          keyword
        }
      })
      .then((res) => {
        console.log('keyword', res.data);
        dispatch(actionCustomerGetAllCustomersByKeyword(res.data));
      })
      .catch((err) => console.log(err));
  }
};
