import axios from 'axios';
import moment from 'moment';
import api from '../../assets/api/api';
import {
  ACTION_ANALYTIC_REVENUE_DATE_LAST,
  ACTION_ANALYTIC_REVENUE_DATE_NOW,
  ACTION_ANALYTIC_BOOK_DATE_LAST,
  ACTION_ANALYTIC_BOOK_DATE_NOW,
  ACTION_ANALYTIC_ORDER_DATE_LAST,
  ACTION_ANALYTIC_ORDER_DATE_NOW,
  ACTION_ANALYTIC_REVENUE_MONTH_LAST,
  ACTION_ANALYTIC_REVENUE_MONTH_NOW,
  ACTION_ANALYTIC_BOOK_MONTH_LAST,
  ACTION_ANALYTIC_BOOK_MONTH_NOW,
  ACTION_ANALYTIC_ORDER_MONTH_NOW,
  ACTION_ANALYTIC_ORDER_MONTH_LAST,
  ACTION_ANALYTIC_BOOK_YEAR_LAST,
  ACTION_ANALYTIC_BOOK_YEAR_NOW,
  ACTION_ANALYTIC_REVENUE_YEAR_LAST,
  ACTION_ANALYTIC_REVENUE_YEAR_NOW,
  ACTION_ANALYTIC_ORDER_YEAR_LAST,
  ACTION_ANALYTIC_ORDER_YEAR_NOW
} from './types';

export const actionAnalyticRevenueDateNow = (data) => ({
  type: ACTION_ANALYTIC_REVENUE_DATE_NOW,
  payload: data
});
export const actionAnalyticRevenueDateLast = (data) => ({
  type: ACTION_ANALYTIC_REVENUE_DATE_LAST,
  payload: data
});

export const actionAnalyticBookDateNow = (data) => ({
  type: ACTION_ANALYTIC_BOOK_DATE_NOW,
  payload: data
});
export const actionAnalyticBookDateLast = (data) => ({
  type: ACTION_ANALYTIC_BOOK_DATE_LAST,
  payload: data
});
export const actionAnalyticOrderDateLast = (data) => ({
  type: ACTION_ANALYTIC_ORDER_DATE_LAST,
  payload: data
});
export const actionAnalyticOrderDateNow = (data) => ({
  type: ACTION_ANALYTIC_ORDER_DATE_NOW,
  payload: data
});
export const actionAnalyticRevenueMonthNow = (data) => ({
  type: ACTION_ANALYTIC_REVENUE_MONTH_NOW,
  payload: data
});
export const actionAnalyticRevenueMonthLast = (data) => ({
  type: ACTION_ANALYTIC_REVENUE_MONTH_LAST,
  payload: data
});
export const actionAnalyticBookMonthNow = (data) => ({
  type: ACTION_ANALYTIC_BOOK_MONTH_NOW,
  payload: data
});
export const actionAnalyticBookMonthLast = (data) => ({
  type: ACTION_ANALYTIC_BOOK_MONTH_LAST,
  payload: data
});
export const actionAnalyticOrderMonthLast = (data) => ({
  type: ACTION_ANALYTIC_ORDER_MONTH_LAST,
  payload: data
});
export const actionAnalyticOrderMonthNow = (data) => ({
  type: ACTION_ANALYTIC_ORDER_MONTH_NOW,
  payload: data
});

export const actionAnalyticRevenueYearNow = (data) => ({
  type: ACTION_ANALYTIC_REVENUE_YEAR_NOW,
  payload: data
});
export const actionAnalyticRevenueYearLast = (data) => ({
  type: ACTION_ANALYTIC_REVENUE_YEAR_LAST,
  payload: data
});
export const actionAnalyticBookYearNow = (data) => ({
  type: ACTION_ANALYTIC_BOOK_YEAR_NOW,
  payload: data
});
export const actionAnalyticBookYearLast = (data) => ({
  type: ACTION_ANALYTIC_BOOK_YEAR_LAST,
  payload: data
});
export const actionAnalyticOrderYearLast = (data) => ({
  type: ACTION_ANALYTIC_ORDER_YEAR_LAST,
  payload: data
});
export const actionAnalyticOrderYearNow = (data) => ({
  type: ACTION_ANALYTIC_ORDER_YEAR_NOW,
  payload: data
});
export const actionRevenueDateNow = () => (dispatch) => {
  axios.get(`${api}hoaDon/list`).then((res) => {
    const allOrders = res.data.filter(
      (order) =>
        order.createAt.substring(0, 10) === moment(new Date().getTime()).format(`YYYY-MM-DD`)
    );
    const allOrdersLast = res.data.filter(
      (order) =>
        order.createAt.substring(0, 10) ===
        moment(new Date().getTime() - 86400000).format(`YYYY-MM-DD`)
    );
    let total = 0;
    let totalLast = 0;
    allOrders.forEach((order) => {
      order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
        total += ct.soLuong * ct.monAn.donGia;
      });
    });
    allOrdersLast.forEach((order) => {
      order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
        totalLast += ct.soLuong * ct.monAn.donGia;
      });
    });
    dispatch(actionAnalyticRevenueDateNow(total));
    dispatch(actionAnalyticRevenueDateLast(totalLast));
  });
};

export const actionRevenueMonthNow = () => (dispatch) => {
  axios.get(`${api}hoaDon/list`).then((res) => {
    const monthNow = moment(new Date().getTime()).format(`YYYY-MM`);
    const monthLast = moment(monthNow, 'YYYY-MM').add(-1, 'months').format('YYYY-MM');
    const allOrders = res.data.filter((order) => order.createAt.substring(0, 7) === monthNow);
    const allOrdersLast = res.data.filter((order) => order.createAt.substring(0, 7) === monthLast);
    let total = 0;
    let totalLast = 0;
    allOrders.forEach((order) => {
      order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
        total += ct.soLuong * ct.monAn.donGia;
      });
    });
    allOrdersLast.forEach((order) => {
      order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
        totalLast += ct.soLuong * ct.monAn.donGia;
      });
    });
    dispatch(actionAnalyticRevenueMonthNow(total));
    dispatch(actionAnalyticRevenueMonthLast(totalLast));
  });
};
export const actionRevenueYearNow = () => (dispatch) => {
  axios.get(`${api}hoaDon/list`).then((res) => {
    const yearNow = moment(new Date().getTime()).format(`YYYY`);
    const yearLast = moment(yearNow, 'YYYY').add(-1, 'years').format('YYYY');
    const allOrders = res.data.filter((order) => order.createAt.substring(0, 4) === yearNow);
    const allOrdersLast = res.data.filter((order) => order.createAt.substring(0, 4) === yearLast);
    let total = 0;
    let totalLast = 0;
    allOrders.forEach((order) => {
      order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
        total += ct.soLuong * ct.monAn.donGia;
      });
    });
    allOrdersLast.forEach((order) => {
      order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
        totalLast += ct.soLuong * ct.monAn.donGia;
      });
    });
    dispatch(actionAnalyticRevenueYearNow(total));
    dispatch(actionAnalyticRevenueYearLast(totalLast));
  });
};

export const actionBookDateNow = () => (dispatch) => {
  axios.get(`${api}donDatBan/list`).then((res) => {
    const allBooks = res.data.filter(
      (book) => book.createAt.substring(0, 10) === moment(new Date().getTime()).format(`YYYY-MM-DD`)
    );
    const allBooksLast = res.data.filter(
      (book) =>
        book.createAt.substring(0, 10) ===
        moment(new Date().getTime() - 86400000).format(`YYYY-MM-DD`)
    );
    dispatch(actionAnalyticBookDateNow(allBooks.length));
    dispatch(actionAnalyticBookDateLast(allBooksLast.length));
  });
};

export const actionBookMonthNow = () => (dispatch) => {
  axios.get(`${api}donDatBan/list`).then((res) => {
    const monthNow = moment(new Date().getTime()).format(`YYYY-MM`);
    const monthLast = moment(monthNow, 'YYYY-MM').add(-1, 'months').format('YYYY-MM');
    const allBooks = res.data.filter((book) => book.createAt.substring(0, 7) === monthNow);
    const allBooksLast = res.data.filter((book) => book.createAt.substring(0, 7) === monthLast);
    dispatch(actionAnalyticBookMonthLast(allBooksLast.length));
    dispatch(actionAnalyticBookMonthNow(allBooks.length));
  });
};

export const actionBookYearNow = () => (dispatch) => {
  axios.get(`${api}donDatBan/list`).then((res) => {
    const yearNow = moment(new Date().getTime()).format(`YYYY`);
    const yearLast = moment(yearNow, 'YYYY').add(-1, 'years').format('YYYY');
    const allBooks = res.data.filter((book) => book.createAt.substring(0, 4) === yearNow);
    const allBooksLast = res.data.filter((book) => book.createAt.substring(0, 4) === yearLast);
    dispatch(actionAnalyticBookYearNow(allBooks.length));
    dispatch(actionAnalyticBookYearLast(allBooksLast.length));
  });
};

export const actionOrderDateNow = () => (dispatch) => {
  axios.get(`${api}hoaDon/list`).then((res) => {
    const allOrders = res.data.filter(
      (order) =>
        order.createAt.substring(0, 10) === moment(new Date().getTime()).format(`YYYY-MM-DD`)
    );
    const allOrdersLast = res.data.filter(
      (order) =>
        order.createAt.substring(0, 10) ===
        moment(new Date().getTime() - 86400000).format(`YYYY-MM-DD`)
    );
    dispatch(actionAnalyticOrderDateNow(allOrders.length));
    dispatch(actionAnalyticOrderDateLast(allOrdersLast.length));
  });
};

export const actionOrderMonthNow = () => (dispatch) => {
  axios.get(`${api}hoaDon/list`).then((res) => {
    const monthNow = moment(new Date().getTime()).format(`YYYY-MM`);
    const monthLast = moment(monthNow, 'YYYY-MM').add(-1, 'months').format('YYYY-MM');
    const allOrders = res.data.filter((order) => order.createAt.substring(0, 7) === monthNow);
    const allOrdersLast = res.data.filter((order) => order.createAt.substring(0, 7) === monthLast);
    dispatch(actionAnalyticOrderMonthNow(allOrders.length));
    dispatch(actionAnalyticOrderMonthLast(allOrdersLast.length));
  });
};

export const actionOrderYearNow = () => (dispatch) => {
  axios.get(`${api}hoaDon/list`).then((res) => {
    const yearNow = moment(new Date().getTime()).format(`YYYY`);
    const yearLast = moment(yearNow, 'YYYY').add(-1, 'years').format('YYYY');
    const allOrders = res.data.filter((order) => order.createAt.substring(0, 4) === yearNow);
    const allOrdersLast = res.data.filter((order) => order.createAt.substring(0, 4) === yearLast);
    dispatch(actionAnalyticOrderYearNow(allOrders.length));
    dispatch(actionAnalyticOrderYearLast(allOrdersLast.length));
  });
};
