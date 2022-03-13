import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_EMPLOYEE_GET_ALL_EMPLOYEES,
  ACTION_EMPLOYEE_MODAL_ADD_EMPLOYEE,
  ACTION_EMPLOYEE_MODAL_EDIT_EMPLOYEE,
  ACTION_EMPLOYEE_GET_EMPLOYEES_BY_KEYWORDS
} from './types';

export const actionEmployeeGetAllEmployees = (data) => ({
  type: ACTION_EMPLOYEE_GET_ALL_EMPLOYEES,
  payload: data
});

export const actionEmployeeModalAddEmployee = (data) => ({
  type: ACTION_EMPLOYEE_MODAL_ADD_EMPLOYEE,
  payload: data
});

export const actionEmployeeModalEditEmployee = (data) => ({
  type: ACTION_EMPLOYEE_MODAL_EDIT_EMPLOYEE,
  payload: data
});
export const actionEmployeeGetEmployeesByKeywords = (data) => ({
  type: ACTION_EMPLOYEE_GET_EMPLOYEES_BY_KEYWORDS,
  payload: data
});
export const actionGetAllEmployees = () => (dispatch) => {
  axios
    .get(`${api}nhanVien/list`)
    .then((res) => {
      dispatch(actionEmployeeGetAllEmployees(res.data));
    })
    .catch((err) => console.log(err));
};

export const actionGetEmployeesByKeywords = (keywords) => (dispatch) => {
  if (keywords === '') {
    axios
      .get(`${api}nhanVien/list`)
      .then((res) => {
        dispatch(actionEmployeeGetEmployeesByKeywords(res.data));
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .get(`${api}nhanVien/list/keyword`, {
        params: {
          keyword: keywords
        }
      })
      .then((res) => {
        dispatch(actionEmployeeGetEmployeesByKeywords(res.data));
      })
      .catch((err) => console.log(err));
  }
};
