import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_EMPLOYEE_GET_ALL_EMPLOYEES,
  ACTION_EMPLOYEE_MODAL_ADD_EMPLOYEE,
  ACTION_EMPLOYEE_MODAL_EDIT_EMPLOYEE
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
export const actionGetAllEmployees = () => (dispatch) => {
  axios
    .get(`${api}nhanVien/list`)
    .then((res) => {
      dispatch(actionEmployeeGetAllEmployees(res.data));
    })
    .catch((err) => console.log(err));
};
