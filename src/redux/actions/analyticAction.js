import axios from 'axios';
import { get } from 'lodash';
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
  ACTION_ANALYTIC_ORDER_YEAR_NOW,
  ACTION_ANALYTIC_COLUMN_TYPEFOOD_FOOD,
  ACTION_ANALYTIC_FOODS_STOP_SELL,
  ACTION_ANALYTIC_FOODS_SELLING,
  ACTION_ANALYTIC_COLUMN_CUSTOMERS_YEAR,
  ACTION_ANALYTIC_COLUMN_REVENUE_BOOK,
  ACTION_ANALYTIC_COLUMN_REVENUE_ORDER,
  ACTION_ANALYTIC_COLUMN_REVENUE_REVENUE,
  ACTION_ANALYTIC_GET_ALL_ORDERS,
  ACTION_ANALYTIC_GET_TOP10_FOODS_LOVE
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
export const actionAnalyticColumnTypefoodFood = (data) => ({
  type: ACTION_ANALYTIC_COLUMN_TYPEFOOD_FOOD,
  payload: data
});
export const actionAnalyticFoodsSelling = (data) => ({
  type: ACTION_ANALYTIC_FOODS_SELLING,
  payload: data
});
export const actionAnalyticFoodsStopSell = (data) => ({
  type: ACTION_ANALYTIC_FOODS_STOP_SELL,
  payload: data
});
export const actionAnalyticColumnCustomersYear = (data) => ({
  type: ACTION_ANALYTIC_COLUMN_CUSTOMERS_YEAR,
  payload: data
});
export const actionAnalyticColumnRevenueOrder = (data) => ({
  type: ACTION_ANALYTIC_COLUMN_REVENUE_ORDER,
  payload: data
});
export const actionAnalyticColumnRevenueBook = (data) => ({
  type: ACTION_ANALYTIC_COLUMN_REVENUE_BOOK,
  payload: data
});
export const actionAnalyticColumnRevenueRevenue = (data) => ({
  type: ACTION_ANALYTIC_COLUMN_REVENUE_REVENUE,
  payload: data
});
export const actionAnalyticGetAllOrders = (data) => ({
  type: ACTION_ANALYTIC_GET_ALL_ORDERS,
  payload: data
});
export const actionAnalyticGetTop10FoodsLove = (data) => ({
  type: ACTION_ANALYTIC_GET_TOP10_FOODS_LOVE,
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

export const actionColumnTypefoodFood = () => async (dispatch) => {
  const typefoodQuery = await axios.get(`${api}loaiMonAn/list`);
  const resType = typefoodQuery.data;
  const columnName = [];
  const columnData = [];
  resType.forEach((type) => {
    columnName.push(type.tenLoaiMonAn);
    const data = axios.get(`${api}monAn/list/loaiMonAn?maLoaiMonAn=${type.id}`);
    data.then((res) => {
      columnData.push(res.data.length);
    });
  });
  dispatch(
    actionAnalyticColumnTypefoodFood({
      name: columnName,
      data: columnData
    })
  );
};

export const actionColumnCustomersYear = (year) => async (dispatch) => {
  const m1 = `${year}-01`;
  const m2 = `${year}-02`;
  const m3 = `${year}-03`;
  const m4 = `${year}-04`;
  const m5 = `${year}-05`;
  const m6 = `${year}-06`;
  const m7 = `${year}-07`;
  const m8 = `${year}-08`;
  const m9 = `${year}-09`;
  const m10 = `${year}-10`;
  const m11 = `${year}-11`;
  const m12 = `${year}-12`;
  const m1T = [];
  const m1M = 0;
  const m1F = 0;
  const m2T = [];
  const m2M = 0;
  const m2F = 0;
  const m3T = [];
  const m3M = 0;
  const m3F = 0;
  const m4T = [];
  const m4M = 0;
  const m4F = 0;
  const m5T = [];
  const m5M = 0;
  const m5F = 0;
  const m6T = [];
  const m6M = 0;
  const m6F = 0;
  const m7T = [];
  const m7M = 0;
  const m7F = 0;
  const m8T = [];
  const m8M = 0;
  const m8F = 0;
  const m9T = [];
  const m9M = 0;
  const m9F = 0;
  const m10T = [];
  const m10M = 0;
  const m10F = 0;
  const m11T = [];
  const m11M = 0;
  const m11F = 0;
  const m12T = [];
  const m12M = 0;
  const m12F = 0;
  const query = await axios.get(`${api}khachHang/list`);
  query.data.forEach((customer) => {
    if (customer.createAt.substring(0, 7) === m1) {
      m1T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m2) {
      m2T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m3) {
      m3T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m4) {
      m4T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m5) {
      m5T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m6) {
      m6T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m7) {
      m7T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m8) {
      m8T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m9) {
      m9T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m10) {
      m10T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m11) {
      m11T.push(customer);
    } else if (customer.createAt.substring(0, 7) === m12) {
      m12T.push(customer);
    }
  });
  dispatch(
    actionAnalyticColumnCustomersYear({
      total: [
        m1T.length,
        m2T.length,
        m3T.length,
        m4T.length,
        m5T.length,
        m6T.length,
        m7T.length,
        m8T.length,
        m9T.length,
        m10T.length,
        m11T.length,
        m12T.length
      ],
      male: [
        checkGender(m1T, 'Nam'),
        checkGender(m2T, 'Nam'),
        checkGender(m3T, 'Nam'),
        checkGender(m4T, 'Nam'),
        checkGender(m5T, 'Nam'),
        checkGender(m6T, 'Nam'),
        checkGender(m7T, 'Nam'),
        checkGender(m8T, 'Nam'),
        checkGender(m9T, 'Nam'),
        checkGender(m10T, 'Nam'),
        checkGender(m11T, 'Nam'),
        checkGender(m12T, 'Nam')
      ],
      female: [
        checkGender(m1T, 'Nữ'),
        checkGender(m2T, 'Nữ'),
        checkGender(m3T, 'Nữ'),
        checkGender(m4T, 'Nữ'),
        checkGender(m5T, 'Nữ'),
        checkGender(m6T, 'Nữ'),
        checkGender(m7T, 'Nữ'),
        checkGender(m8T, 'Nữ'),
        checkGender(m9T, 'Nữ'),
        checkGender(m10T, 'Nữ'),
        checkGender(m11T, 'Nữ'),
        checkGender(m12T, 'Nữ')
      ]
    })
  );
};

const checkGender = (data, condition) => data.filter((item) => item.gioiTinh === condition).length;

const checkAnalyticMonth = (field, condition) => field.createAt.substring(0, 7) === condition;

export const actionColumnRevenueBook = (year) => async (dispatch) => {
  let m1 = 0;
  let m2 = 0;
  let m3 = 0;
  let m4 = 0;
  let m5 = 0;
  let m6 = 0;
  let m7 = 0;
  let m8 = 0;
  let m9 = 0;
  let m10 = 0;
  let m11 = 0;
  let m12 = 0;
  const query = await axios(`${api}donDatBan/list`);
  query.data.forEach((book) => {
    if (checkAnalyticMonth(book, `${year}-01`)) m1 += 1;
    if (checkAnalyticMonth(book, `${year}-02`)) m2 += 1;
    if (checkAnalyticMonth(book, `${year}-03`)) m3 += 1;
    if (checkAnalyticMonth(book, `${year}-04`)) m4 += 1;
    if (checkAnalyticMonth(book, `${year}-05`)) m5 += 1;
    if (checkAnalyticMonth(book, `${year}-06`)) m6 += 1;
    if (checkAnalyticMonth(book, `${year}-07`)) m7 += 1;
    if (checkAnalyticMonth(book, `${year}-08`)) m8 += 1;
    if (checkAnalyticMonth(book, `${year}-09`)) m9 += 1;
    if (checkAnalyticMonth(book, `${year}-10`)) m10 += 1;
    if (checkAnalyticMonth(book, `${year}-11`)) m11 += 1;
    if (checkAnalyticMonth(book, `${year}-12`)) m12 += 1;
  });
  dispatch(actionAnalyticColumnRevenueBook([m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12]));
};

export const actionColumnRevenueOrder = (year) => async (dispatch) => {
  let m1 = 0;
  let m2 = 0;
  let m3 = 0;
  let m4 = 0;
  let m5 = 0;
  let m6 = 0;
  let m7 = 0;
  let m8 = 0;
  let m9 = 0;
  let m10 = 0;
  let m11 = 0;
  let m12 = 0;
  const query = await axios(`${api}hoaDon/list`);
  query.data.forEach((book) => {
    if (checkAnalyticMonth(book, `${year}-01`)) m1 += 1;
    if (checkAnalyticMonth(book, `${year}-02`)) m2 += 1;
    if (checkAnalyticMonth(book, `${year}-03`)) m3 += 1;
    if (checkAnalyticMonth(book, `${year}-04`)) m4 += 1;
    if (checkAnalyticMonth(book, `${year}-05`)) m5 += 1;
    if (checkAnalyticMonth(book, `${year}-06`)) m6 += 1;
    if (checkAnalyticMonth(book, `${year}-07`)) m7 += 1;
    if (checkAnalyticMonth(book, `${year}-08`)) m8 += 1;
    if (checkAnalyticMonth(book, `${year}-09`)) m9 += 1;
    if (checkAnalyticMonth(book, `${year}-10`)) m10 += 1;
    if (checkAnalyticMonth(book, `${year}-11`)) m11 += 1;
    if (checkAnalyticMonth(book, `${year}-12`)) m12 += 1;
  });
  dispatch(actionAnalyticColumnRevenueOrder([m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12]));
};

const getTotalItem = (field) => {
  let total = 0;
  field.donDatBan.listChiTietDonDatBan.forEach((ct) => {
    total += ct.soLuong * ct.monAn.donGia;
  });
  return total;
};

export const actionColumnRevenueRevenue = (year) => async (dispatch) => {
  let m1 = 0;
  let m2 = 0;
  let m3 = 0;
  let m4 = 0;
  let m5 = 0;
  let m6 = 0;
  let m7 = 0;
  let m8 = 0;
  let m9 = 0;
  let m10 = 0;
  let m11 = 0;
  let m12 = 0;
  const query = await axios(`${api}hoaDon/list`);
  query.data.forEach((book) => {
    if (checkAnalyticMonth(book, `${year}-01`)) {
      m1 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-02`)) {
      m2 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-03`)) {
      m3 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-04`)) {
      m4 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-05`)) {
      m5 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-06`)) {
      m6 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-07`)) {
      m7 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-08`)) {
      m8 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-09`)) {
      m9 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-10`)) {
      m10 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-11`)) {
      m11 += getTotalItem(book);
    }
    if (checkAnalyticMonth(book, `${year}-12`)) {
      m12 += getTotalItem(book);
    }
  });
  dispatch(actionAnalyticColumnRevenueRevenue([m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12]));
};

export const actionGetAllOrders = () => async (dispatch) => {
  const data = await axios.get(`${api}hoaDon/list`);
  dispatch(
    actionAnalyticGetAllOrders(
      data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
    )
  );
};

export const actionGetTop10FoodsLove = () => async (dispatch) => {
  const data = await axios(`${api}monAn/list`);
  const temp = data.data.filter((food) => food.thich);
  const tempSort = temp.sort((a, b) => b.thich.length - a.thich.length);
  const name = [];
  const value = [];
  tempSort.slice(0, 10).forEach((food) => {
    name.push(food.tenMonAn);
    value.push(food.thich.length);
  });
  dispatch(
    actionAnalyticGetTop10FoodsLove({
      name,
      value
    })
  );
};
