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
  ACTION_ANALYTIC_GET_TOP10_FOODS_LOVE,
  ACTION_ANALYTIC_GET_REVENUE_WEEK
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
export const actionAnalyticGetRevenueWeek = (data) => ({
  type: ACTION_ANALYTIC_GET_REVENUE_WEEK,
  payload: data
});
export const actionRevenueDateNow = () => (dispatch) => {
  axios
    .get(`${api}hoaDon/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
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
        order.donDatBan.listChiTietDonDatBan.forEach((item) => {
          total += item.monAn.donGia * item.soLuong;
        });
      });
      allOrdersLast.forEach((order) => {
        order.donDatBan.listChiTietDonDatBan.forEach((item) => {
          totalLast += item.monAn.donGia * item.soLuong;
        });
      });
      dispatch(actionAnalyticRevenueDateNow(total));
      dispatch(actionAnalyticRevenueDateLast(totalLast));
    });
};

export const actionRevenueMonthNow = () => (dispatch) => {
  axios
    .get(`${api}hoaDon/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const monthNow = moment(new Date().getTime()).format(`YYYY-MM`);
      const monthLast = moment(monthNow, 'YYYY-MM').add(-1, 'months').format('YYYY-MM');
      const allOrders = res.data.filter((order) => order.createAt.substring(0, 7) === monthNow);
      const allOrdersLast = res.data.filter(
        (order) => order.createAt.substring(0, 7) === monthLast
      );
      let total = 0;
      let totalLast = 0;
      allOrders.forEach((order) => {
        order.donDatBan.listChiTietDonDatBan.forEach((item) => {
          total += item.monAn.donGia * item.soLuong;
        });
      });
      allOrdersLast.forEach((order) => {
        order.donDatBan.listChiTietDonDatBan.forEach((item) => {
          totalLast += item.monAn.donGia * item.soLuong;
        });
      });
      dispatch(actionAnalyticRevenueMonthNow(total));
      dispatch(actionAnalyticRevenueMonthLast(totalLast));
    });
};
export const actionRevenueYearNow = () => (dispatch) => {
  axios
    .get(`${api}hoaDon/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const yearNow = moment(new Date().getTime()).format(`YYYY`);
      const yearLast = moment(yearNow, 'YYYY').add(-1, 'years').format('YYYY');
      const allOrders = res.data.filter((order) => order.createAt.substring(0, 4) === yearNow);
      const allOrdersLast = res.data.filter((order) => order.createAt.substring(0, 4) === yearLast);
      let total = 0;
      let totalLast = 0;
      allOrders.forEach((order) => {
        order.donDatBan.listChiTietDonDatBan.forEach((item) => {
          total += item.monAn.donGia * item.soLuong;
        });
      });
      allOrdersLast.forEach((order) => {
        order.donDatBan.listChiTietDonDatBan.forEach((item) => {
          totalLast += item.monAn.donGia * item.soLuong;
        });
      });
      dispatch(actionAnalyticRevenueYearNow(total));
      dispatch(actionAnalyticRevenueYearLast(totalLast));
    });
};

export const actionBookDateNow = () => (dispatch) => {
  axios
    .get(`${api}donDatBan/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const allBooks = res.data.filter(
        (book) =>
          book.createAt.substring(0, 10) === moment(new Date().getTime()).format(`YYYY-MM-DD`)
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
  axios
    .get(`${api}donDatBan/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const monthNow = moment(new Date().getTime()).format(`YYYY-MM`);
      const monthLast = moment(monthNow, 'YYYY-MM').add(-1, 'months').format('YYYY-MM');
      const allBooks = res.data.filter((book) => book.createAt.substring(0, 7) === monthNow);
      const allBooksLast = res.data.filter((book) => book.createAt.substring(0, 7) === monthLast);
      dispatch(actionAnalyticBookMonthLast(allBooksLast.length));
      dispatch(actionAnalyticBookMonthNow(allBooks.length));
    });
};

export const actionBookYearNow = () => (dispatch) => {
  axios
    .get(`${api}donDatBan/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const yearNow = moment(new Date().getTime()).format(`YYYY`);
      const yearLast = moment(yearNow, 'YYYY').add(-1, 'years').format('YYYY');
      const allBooks = res.data.filter((book) => book.createAt.substring(0, 4) === yearNow);
      const allBooksLast = res.data.filter((book) => book.createAt.substring(0, 4) === yearLast);
      dispatch(actionAnalyticBookYearNow(allBooks.length));
      dispatch(actionAnalyticBookYearLast(allBooksLast.length));
    });
};

export const actionOrderDateNow = () => (dispatch) => {
  axios
    .get(`${api}hoaDon/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
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
  axios
    .get(`${api}hoaDon/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const monthNow = moment(new Date().getTime()).format(`YYYY-MM`);
      const monthLast = moment(monthNow, 'YYYY-MM').add(-1, 'months').format('YYYY-MM');
      const allOrders = res.data.filter((order) => order.createAt.substring(0, 7) === monthNow);
      const allOrdersLast = res.data.filter(
        (order) => order.createAt.substring(0, 7) === monthLast
      );
      dispatch(actionAnalyticOrderMonthNow(allOrders.length));
      dispatch(actionAnalyticOrderMonthLast(allOrdersLast.length));
    });
};

export const actionOrderYearNow = () => (dispatch) => {
  axios
    .get(`${api}hoaDon/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const yearNow = moment(new Date().getTime()).format(`YYYY`);
      const yearLast = moment(yearNow, 'YYYY').add(-1, 'years').format('YYYY');
      const allOrders = res.data.filter((order) => order.createAt.substring(0, 4) === yearNow);
      const allOrdersLast = res.data.filter((order) => order.createAt.substring(0, 4) === yearLast);
      dispatch(actionAnalyticOrderYearNow(allOrders.length));
      dispatch(actionAnalyticOrderYearLast(allOrdersLast.length));
    });
};

export const actionColumnTypefoodFood = () => async (dispatch) => {
  const typefoodQuery = await axios.get(`${api}loaiMonAn/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  const resType = typefoodQuery.data;
  const columnName = [];
  const columnData = [];
  resType.forEach((type) => {
    columnName.push(type.tenLoaiMonAn);
    const data = axios.get(`${api}monAn/list/loaiMonAn?maLoaiMonAn=${type.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
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

export const actionColumnCustomersYear = (type, month, year) => async (dispatch) => {
  if (type === 'year') {
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
    const m2T = [];
    const m3T = [];
    const m4T = [];
    const m5T = [];
    const m6T = [];
    const m7T = [];
    const m8T = [];
    const m9T = [];
    const m10T = [];
    const m11T = [];
    const m12T = [];
    const query = await axios.get(`${api}khachHang/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
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
        ],
        totalSum:
          m1T.length +
          m2T.length +
          m3T.length +
          m4T.length +
          m5T.length +
          m6T.length +
          m7T.length +
          m8T.length +
          m9T.length +
          m10T.length +
          m11T.length +
          m12T.length,
        maleSum:
          checkGender(m1T, 'Nam') +
          checkGender(m2T, 'Nam') +
          checkGender(m3T, 'Nam') +
          checkGender(m4T, 'Nam') +
          checkGender(m5T, 'Nam') +
          checkGender(m6T, 'Nam') +
          checkGender(m7T, 'Nam') +
          checkGender(m8T, 'Nam') +
          checkGender(m9T, 'Nam') +
          checkGender(m10T, 'Nam') +
          checkGender(m11T, 'Nam') +
          checkGender(m12T, 'Nam'),
        femaleSum:
          checkGender(m1T, 'Nữ') +
          checkGender(m2T, 'Nữ') +
          checkGender(m3T, 'Nữ') +
          checkGender(m4T, 'Nữ') +
          checkGender(m5T, 'Nữ') +
          checkGender(m6T, 'Nữ') +
          checkGender(m7T, 'Nữ') +
          checkGender(m8T, 'Nữ') +
          checkGender(m9T, 'Nữ') +
          checkGender(m10T, 'Nữ') +
          checkGender(m11T, 'Nữ') +
          checkGender(m12T, 'Nữ')
      })
    );
  } else {
    const m1 = `${year}-${month}-01`;
    const m2 = `${year}-${month}-02`;
    const m3 = `${year}-${month}-03`;
    const m4 = `${year}-${month}-04`;
    const m5 = `${year}-${month}-05`;
    const m6 = `${year}-${month}-06`;
    const m7 = `${year}-${month}-07`;
    const m8 = `${year}-${month}-08`;
    const m9 = `${year}-${month}-09`;
    const m10 = `${year}-${month}-10`;
    const m11 = `${year}-${month}-11`;
    const m12 = `${year}-${month}-12`;
    const m13 = `${year}-${month}-13`;
    const m14 = `${year}-${month}-14`;
    const m15 = `${year}-${month}-15`;
    const m16 = `${year}-${month}-16`;
    const m17 = `${year}-${month}-17`;
    const m18 = `${year}-${month}-18`;
    const m19 = `${year}-${month}-19`;
    const m20 = `${year}-${month}-20`;
    const m21 = `${year}-${month}-21`;
    const m22 = `${year}-${month}-22`;
    const m23 = `${year}-${month}-23`;
    const m24 = `${year}-${month}-24`;
    const m25 = `${year}-${month}-25`;
    const m26 = `${year}-${month}-26`;
    const m27 = `${year}-${month}-27`;
    const m28 = `${year}-${month}-28`;
    const m29 = `${year}-${month}-29`;
    const m30 = `${year}-${month}-30`;
    const m31 = `${year}-${month}-31`;
    const m1T = [];
    const m2T = [];
    const m3T = [];
    const m4T = [];
    const m5T = [];
    const m6T = [];
    const m7T = [];
    const m8T = [];
    const m9T = [];
    const m10T = [];
    const m11T = [];
    const m12T = [];
    const m13T = [];
    const m14T = [];
    const m15T = [];
    const m16T = [];
    const m17T = [];
    const m18T = [];
    const m19T = [];
    const m20T = [];
    const m21T = [];
    const m22T = [];
    const m23T = [];
    const m24T = [];
    const m25T = [];
    const m26T = [];
    const m27T = [];
    const m28T = [];
    const m29T = [];
    const m30T = [];
    const m31T = [];
    const query = await axios.get(`${api}khachHang/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    query.data.forEach((customer) => {
      if (customer.createAt.substring(0, 7) === m1) {
        m1T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m2) {
        m2T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m3) {
        m3T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m4) {
        m4T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m5) {
        m5T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m6) {
        m6T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m7) {
        m7T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m8) {
        m8T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m9) {
        m9T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m10) {
        m10T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m11) {
        m11T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m12) {
        m12T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m13) {
        m13T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m14) {
        m14T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m15) {
        m15T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m16) {
        m16T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m17) {
        m17T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m18) {
        m18T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m19) {
        m19T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m20) {
        m20T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m21) {
        m21T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m22) {
        m22T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m23) {
        m23T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m24) {
        m24T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m25) {
        m25T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m26) {
        m26T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m27) {
        m27T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m28) {
        m28T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m29) {
        m29T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m30) {
        m30T.push(customer);
      } else if (customer.createAt.substring(0, 10) === m31) {
        m31T.push(customer);
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
          m12T.length,
          m13T.length,
          m14T.length,
          m15T.length,
          m16T.length,
          m17T.length,
          m18T.length,
          m19T.length,
          m20T.length,
          m21T.length,
          m22T.length,
          m23T.length,
          m24T.length,
          m25T.length,
          m26T.length,
          m27T.length,
          m28T.length,
          m29T.length,
          m30T.length,
          m31T.length
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
          checkGender(m12T, 'Nam'),
          checkGender(m13T, 'Nam'),
          checkGender(m14T, 'Nam'),
          checkGender(m15T, 'Nam'),
          checkGender(m16T, 'Nam'),
          checkGender(m17T, 'Nam'),
          checkGender(m18T, 'Nam'),
          checkGender(m19T, 'Nam'),
          checkGender(m20T, 'Nam'),
          checkGender(m21T, 'Nam'),
          checkGender(m22T, 'Nam'),
          checkGender(m23T, 'Nam'),
          checkGender(m24T, 'Nam'),
          checkGender(m25T, 'Nam'),
          checkGender(m26T, 'Nam'),
          checkGender(m27T, 'Nam'),
          checkGender(m28T, 'Nam'),
          checkGender(m29T, 'Nam'),
          checkGender(m30T, 'Nam'),
          checkGender(m31T, 'Nam')
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
          checkGender(m12T, 'Nữ'),
          checkGender(m13T, 'Nữ'),
          checkGender(m14T, 'Nữ'),
          checkGender(m15T, 'Nữ'),
          checkGender(m16T, 'Nữ'),
          checkGender(m17T, 'Nữ'),
          checkGender(m18T, 'Nữ'),
          checkGender(m19T, 'Nữ'),
          checkGender(m20T, 'Nữ'),
          checkGender(m21T, 'Nữ'),
          checkGender(m22T, 'Nữ'),
          checkGender(m23T, 'Nữ'),
          checkGender(m24T, 'Nữ'),
          checkGender(m25T, 'Nữ'),
          checkGender(m26T, 'Nữ'),
          checkGender(m27T, 'Nữ'),
          checkGender(m28T, 'Nữ'),
          checkGender(m29T, 'Nữ'),
          checkGender(m30T, 'Nữ'),
          checkGender(m31T, 'Nữ')
        ],
        totalSum:
          m1T.length +
          m2T.length +
          m3T.length +
          m4T.length +
          m5T.length +
          m6T.length +
          m7T.length +
          m8T.length +
          m9T.length +
          m10T.length +
          m11T.length +
          m12T.length +
          m13T.length +
          m14T.length +
          m15T.length +
          m16T.length +
          m17T.length +
          m18T.length +
          m19T.length +
          m20T.length +
          m21T.length +
          m22T.length +
          m23T.length +
          m24T.length +
          m25T.length +
          m26T.length +
          m27T.length +
          m28T.length +
          m29T.length +
          m30T.length +
          m31T.length,
        maleSum:
          checkGender(m1T, 'Nam') +
          checkGender(m2T, 'Nam') +
          checkGender(m3T, 'Nam') +
          checkGender(m4T, 'Nam') +
          checkGender(m5T, 'Nam') +
          checkGender(m6T, 'Nam') +
          checkGender(m7T, 'Nam') +
          checkGender(m8T, 'Nam') +
          checkGender(m9T, 'Nam') +
          checkGender(m10T, 'Nam') +
          checkGender(m11T, 'Nam') +
          checkGender(m12T, 'Nam') +
          checkGender(m13T, 'Nam') +
          checkGender(m14T, 'Nam') +
          checkGender(m15T, 'Nam') +
          checkGender(m16T, 'Nam') +
          checkGender(m17T, 'Nam') +
          checkGender(m18T, 'Nam') +
          checkGender(m19T, 'Nam') +
          checkGender(m20T, 'Nam') +
          checkGender(m21T, 'Nam') +
          checkGender(m22T, 'Nam') +
          checkGender(m23T, 'Nam') +
          checkGender(m24T, 'Nam') +
          checkGender(m25T, 'Nam') +
          checkGender(m26T, 'Nam') +
          checkGender(m27T, 'Nam') +
          checkGender(m28T, 'Nam') +
          checkGender(m29T, 'Nam') +
          checkGender(m30T, 'Nam') +
          checkGender(m31T, 'Nam'),
        femaleSum:
          checkGender(m1T, 'Nữ') +
          checkGender(m2T, 'Nữ') +
          checkGender(m3T, 'Nữ') +
          checkGender(m4T, 'Nữ') +
          checkGender(m5T, 'Nữ') +
          checkGender(m6T, 'Nữ') +
          checkGender(m7T, 'Nữ') +
          checkGender(m8T, 'Nữ') +
          checkGender(m9T, 'Nữ') +
          checkGender(m10T, 'Nữ') +
          checkGender(m11T, 'Nữ') +
          checkGender(m12T, 'Nữ') +
          checkGender(m13T, 'Nữ') +
          checkGender(m14T, 'Nữ') +
          checkGender(m15T, 'Nữ') +
          checkGender(m16T, 'Nữ') +
          checkGender(m17T, 'Nữ') +
          checkGender(m18T, 'Nữ') +
          checkGender(m19T, 'Nữ') +
          checkGender(m20T, 'Nữ') +
          checkGender(m21T, 'Nữ') +
          checkGender(m22T, 'Nữ') +
          checkGender(m23T, 'Nữ') +
          checkGender(m24T, 'Nữ') +
          checkGender(m25T, 'Nữ') +
          checkGender(m26T, 'Nữ') +
          checkGender(m27T, 'Nữ') +
          checkGender(m28T, 'Nữ') +
          checkGender(m29T, 'Nữ') +
          checkGender(m30T, 'Nữ') +
          checkGender(m31T, 'Nữ')
      })
    );
  }
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
  const query = await axios(`${api}donDatBan/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
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
  const query = await axios(`${api}hoaDon/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
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
  field.donDatBan.listChiTietDonDatBan.forEach((item) => {
    total += item.monAn.donGia * item.soLuong;
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
  const query = await axios(`${api}hoaDon/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
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
  const data = await axios.get(`${api}hoaDon/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  dispatch(
    actionAnalyticGetAllOrders(
      data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
    )
  );
};

export const actionGetTop10FoodsLove = () => async (dispatch) => {
  const data = await axios(`${api}monAn/list`);
  const temp = data.data.filter((food) => food.listKhachHangThichMonAn);
  const tempSort = temp.sort(
    (a, b) => b.listKhachHangThichMonAn.length - a.listKhachHangThichMonAn.length
  );
  const name = [];
  const value = [];
  tempSort.slice(0, 10).forEach((food) => {
    name.push(food.tenMonAn);
    value.push(food.listKhachHangThichMonAn.length);
  });
  dispatch(
    actionAnalyticGetTop10FoodsLove({
      name,
      value
    })
  );
};

export const actionGetRevenueWeek = () => async (dispatch) => {
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
  const data = await axios.get(`${api}hoaDon/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  data.data.forEach((order) => {
    if (order.createAt.substring(0, 10) === sundayString) sun += getTotalRevenue(order);
    else if (order.createAt.substring(0, 10) === mondayString) mon += getTotalRevenue(order);
    else if (order.createAt.substring(0, 10) === tuesdayString) tue += getTotalRevenue(order);
    else if (order.createAt.substring(0, 10) === wednesdayString) wed += getTotalRevenue(order);
    else if (order.createAt.substring(0, 10) === thursdayString) thu += getTotalRevenue(order);
    else if (order.createAt.substring(0, 10) === fridayString) fri += getTotalRevenue(order);
    else if (order.createAt.substring(0, 10) === saturdayString) sat += getTotalRevenue(order);
  });
  dispatch(
    actionAnalyticGetRevenueWeek({
      categories: [
        moment(sunday).format(`DD-MM`),
        moment(monday).format(`DD-MM`),
        moment(tuesday).format(`DD-MM`),
        moment(wednesday).format(`DD-MM`),
        moment(thursday).format(`DD-MM`),
        moment(friday).format(`DD-MM`),
        moment(saturday).format(`DD-MM`)
      ],
      data: [sun, mon, tue, wed, thu, fri, sat]
    })
  );
};
const getTotalRevenue = (order) => {
  let total = 0;
  order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
    total += ct.monAn.donGia * ct.soLuong;
  });
  return total;
};
