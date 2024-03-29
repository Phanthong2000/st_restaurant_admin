import axios from 'axios';
import moment from 'moment';
import {
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS,
  ACTION_CUSTOMER_GET_QUANTITY_CUSTOMERS,
  ACTION_CUSTOMER_MODAL_ADD_CUSTOMER,
  ACTION_CUSTOMER_MODAL_EDIT_CUSTOMER,
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS_BY_KEYWORDS,
  ACTION_CUSTOMER_GET_NEW_CUSTOMER_IN_WEEK,
  ACTION_CUSTOMER_GET_GENDER_CUSTOMER,
  ACTION_CUSTOMER_GET_SORT_CUSTOMER,
  ACTION_CUSTOMER_GET_CUSTOMER_BLOCK,
  ACTION_CUSTOMER_GET_CUSTOMER_EFFECT,
  ACTION_CUSTOMER_MODAL_CUSTOMERS_ONLINE
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
export const actionCustomerSortCustomer = (data) => ({
  type: ACTION_CUSTOMER_GET_SORT_CUSTOMER,
  payload: data
});

export const actionCustomerGetCustomerBlock = (data) => ({
  type: ACTION_CUSTOMER_GET_CUSTOMER_BLOCK,
  payload: data
});
export const actionCustomerGetCustomerEffect = (data) => ({
  type: ACTION_CUSTOMER_GET_CUSTOMER_EFFECT,
  payload: data
});
export const actionCustomerModalCustomersOnline = (data) => ({
  type: ACTION_CUSTOMER_MODAL_CUSTOMERS_ONLINE,
  payload: data
});
export const actionGetAllCustomers = () => (dispatch) => {
  axios
    .get(`${api}khachHang/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const { data } = res;
      dispatch(
        actionCustomerGetAllCustomers(
          data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
        )
      );
      dispatch(actionCustomerGetQuantityCustomers(data));
      dispatch(
        actionCustomerGetCustomerBlock(
          data.filter((customer) => customer.taiKhoan.trangThai === 'Đã khoá')
        )
      );
      dispatch(
        actionCustomerGetCustomerEffect(
          data.filter((customer) => customer.taiKhoan.trangThai === 'Hiệu lực')
        )
      );
    })
    .catch((err) => console.log(err));
};
export const actionGetAllCustomerByKeyword = (keyword) => (dispatch) => {
  if (keyword === '') {
    axios
      .get(`${api}khachHang/list`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        dispatch(
          actionCustomerGetAllCustomersByKeyword(
            res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
          )
        );
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .get(`${api}khachHang/list/keyword`, {
        params: {
          keyword
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        dispatch(
          actionCustomerGetAllCustomersByKeyword(
            res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
          )
        );
      })
      .catch((err) => console.log(err));
  }
};
export const actionCustomerGetNewCustomerInWeek = (data) => ({
  type: ACTION_CUSTOMER_GET_NEW_CUSTOMER_IN_WEEK,
  payload: data
});
export const actionCustomerGetGenderCustomer = (data) => ({
  type: ACTION_CUSTOMER_GET_GENDER_CUSTOMER,
  payload: data
});
export const actionGetNewCustomerInWeek = () => (dispatch) => {
  const startOfWeek = Date.parse(moment().startOf('week').toDate());
  const sunday = new Date(startOfWeek);
  const sundayString = moment(sunday).format('YYYY-MM-DD');
  const monday = new Date(startOfWeek + 86400000);
  const mondayString = moment(monday).format('YYYY-MM-DD');
  const tuesday = new Date(startOfWeek + 86400000 * 2);
  const tuesdayString = moment(tuesday).format('YYYY-MM-DD');
  const wednesday = new Date(startOfWeek + 86400000 * 3);
  const wednesdayString = moment(wednesday).format('YYYY-MM-DD');
  const thursday = new Date(startOfWeek + 86400000 * 4);
  const thursdayString = moment(thursday).format('YYYY-MM-DD');
  const friday = new Date(startOfWeek + 86400000 * 5);
  const fridayString = moment(friday).format('YYYY-MM-DD');
  const saturday = new Date(startOfWeek + 86400000 * 6);
  const saturdayString = moment(saturday).format('YYYY-MM-DD');
  let sun = 0;
  let mon = 0;
  let tue = 0;
  let wed = 0;
  let thu = 0;
  let fri = 0;
  let sat = 0;
  axios
    .get(`${api}khachHang/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      res.data.forEach((user) => {
        if (user.createAt.substring(0, 10) === sundayString) sun += 1;
        else if (user.createAt.substring(0, 10) === mondayString) mon += 1;
        else if (user.createAt.substring(0, 10) === tuesdayString) tue += 1;
        else if (user.createAt.substring(0, 10) === wednesdayString) wed += 1;
        else if (user.createAt.substring(0, 10) === thursdayString) thu += 1;
        else if (user.createAt.substring(0, 10) === fridayString) fri += 1;
        else if (user.createAt.substring(0, 10) === saturdayString) sat += 1;
      });
      dispatch(
        actionCustomerGetNewCustomerInWeek({
          categories: [
            moment(sunday).format(`DD-MM`),
            moment(monday).format(`DD-MM`),
            moment(tuesday).format(`DD-MM`),
            moment(wednesday).format(`DD-MM`),
            moment(thursday).format(`DD-MM`),
            moment(friday).format(`DD-MM`),
            moment(saturday).format(`DD-MM`)
          ],
          data: [sun, mon, tue, wed, thu, fri, sat],
          total: sun + mon + tue + wed + thu + fri + sat
        })
      );
    })
    .catch((err) => console.log(err));
};
export const actionGetGenderCustomer = () => (dispatch) => {
  axios
    .get(`${api}khachHang/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      let male = 0;
      let female = 0;
      res.data.forEach((user) => {
        if (user.gioiTinh === 'Nam') male += 1;
        else if (user.gioiTinh === 'Nữ') female += 1;
      });
      dispatch(actionCustomerGetGenderCustomer([male, female]));
    })
    .catch((err) => console.log(err));
};
