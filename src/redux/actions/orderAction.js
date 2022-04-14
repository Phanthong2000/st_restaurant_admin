import moment from 'moment';
import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_ORDER_GET_ORDER,
  ACTION_ORDER_ADD_FOODS,
  ACTION_ORDER_EDIT_FOODS,
  ACTION_ORDER_DELETE_FOODS,
  ACTION_ORDER_MODAL_INFORMATION_FOOD,
  ACTION_ORDER_GET_USER,
  ACTION_ORDER_GET_BOOKS_BY_KEYWORD,
  ACTION_ORDER_SET_FOOD,
  ACTION_ORDER_MODAL_EDIT_BOOK,
  ACTION_ORDER_SORT_BOOK,
  ACTION_ORDER_NEW_BOOKS,
  ACTION_ORDER_UPDATE_FOODS_FOR_BOOK,
  ACTION_ORDER_BOOK_PAY_ORDER,
  ACTION_ORDER_GET_ALL_WAY_PAY,
  ACTION_ORDER_GET_ORDER_NOW,
  ACTION_ORDER_GET_BOOKS_NOW,
  ACTION_ORDER_GET_TOTAL_NOW,
  ACTION_ORDER_SET_FOODS_MANY,
  ACTION_ORDER_GET_ORDER_MANY,
  ACTION_ORDER_MODAL_PAYMENT,
  ACTION_ORDER_UNSHIFT_ALL_BOOKS,
  ACTION_ORDER_GET_AREAS_FOR_ORDER,
  ACTION_ORDER_MODAL_CHOOSE_AREA,
  ACTION_ODER_MODAL_PAY_ORDER
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
export const actionOrderGetUser = (data) => ({
  type: ACTION_ORDER_GET_USER,
  payload: data
});

export const actionOrderSetFood = (data) => ({
  type: ACTION_ORDER_SET_FOOD,
  payload: data
});

export const actionOrderGetBooksByKeyWord = (data) => ({
  type: ACTION_ORDER_GET_BOOKS_BY_KEYWORD,
  payload: data
});

export const actionOrderModalEditBook = (data) => ({
  type: ACTION_ORDER_MODAL_EDIT_BOOK,
  payload: data
});

export const actionOrderSortBook = (data) => ({
  type: ACTION_ORDER_SORT_BOOK,
  payload: data
});
export const actionOrderNewBooks = (data) => ({
  type: ACTION_ORDER_NEW_BOOKS,
  payload: data
});
export const actionOrderUpdateFoodsForBook = (data) => ({
  type: ACTION_ORDER_UPDATE_FOODS_FOR_BOOK,
  payload: data
});
export const actionOrderBookPayOrder = (data) => ({
  type: ACTION_ORDER_BOOK_PAY_ORDER,
  payload: data
});
export const actionOrderGetAllWayPay = (data) => ({
  type: ACTION_ORDER_GET_ALL_WAY_PAY,
  payload: data
});
export const actionOrderGetOrdersNow = (data) => ({
  type: ACTION_ORDER_GET_ORDER_NOW,
  payload: data
});
export const actionOrderGetBooksNow = (data) => ({
  type: ACTION_ORDER_GET_BOOKS_NOW,
  payload: data
});
export const actionOrderGetTotalNow = (data) => ({
  type: ACTION_ORDER_GET_TOTAL_NOW,
  payload: data
});
export const actionOrderGetOrderMany = (data) => ({
  type: ACTION_ORDER_GET_ORDER_MANY,
  payload: data
});
export const actionOrderSetFoodsMany = (data) => ({
  type: ACTION_ORDER_SET_FOODS_MANY,
  payload: data
});
export const actionOrderModalPayment = (data) => ({
  type: ACTION_ORDER_MODAL_PAYMENT,
  payload: data
});
export const actionOrderUnshiftAllBooks = (data) => ({
  type: ACTION_ORDER_UNSHIFT_ALL_BOOKS,
  payload: data
});
export const actionOrderGetAreasForOrder = (data) => ({
  type: ACTION_ORDER_GET_AREAS_FOR_ORDER,
  payload: data
});
export const actionOrderModalChooseArea = (data) => ({
  type: ACTION_ORDER_MODAL_CHOOSE_AREA,
  payload: data
});
export const actionOrderModalPayOrder = (data) => ({
  type: ACTION_ODER_MODAL_PAY_ORDER,
  payload: data
});
export const actionGetBooksByKeyword = (keyword) => (dispatch) => {
  if (keyword === '') {
    axios
      .get(`${api}donDatBan/list`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        dispatch(
          actionOrderGetBooksByKeyWord(
            res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
          )
        );
      })
      .catch((err) => console.log(err));
  } else {
    axios
      .get(`${api}donDatBan/list/khachHang/keyword`, {
        params: {
          keyword: keyword.toLowerCase()
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        dispatch(
          actionOrderGetBooksByKeyWord(
            res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
          )
        );
      })
      .catch((err) => console.log(err));
  }
};
export const actionNewBooks = () => (dispatch) => {
  axios
    .get(`${api}donDatBan/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      const { data } = res;
      const booksSort = data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt));
      dispatch(actionOrderNewBooks(booksSort));
    });
};

export const actionGetAllWayPay = () => (dispatch) => {
  axios
    .get(`${api}hinhThucThanhToan/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      dispatch(actionOrderGetAllWayPay(res.data));
    });
};
export const actionGetOrdersNow = () => (dispatch) => {
  axios
    .get(`${api}hoaDon/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      dispatch(
        actionOrderGetOrdersNow(
          res.data.filter(
            (order) =>
              order.createAt.substring(0, 10) === moment(new Date().getTime()).format(`YYYY-MM-DD`)
          )
        )
      );
    });
};

export const actionGetBooksNow = () => (dispatch) => {
  axios
    .get(`${api}donDatBan/list`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    .then((res) => {
      dispatch(
        actionOrderGetBooksNow(
          res.data.filter(
            (book) =>
              book.createAt.substring(0, 10) === moment(new Date().getTime()).format(`YYYY-MM-DD`)
          )
        )
      );
    });
};
export const actionGetTotalNow = () => (dispatch) => {
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
      let total = 0;
      allOrders.forEach((order) => {
        order.donDatBan.listChiTietDonDatBan.forEach((item) => {
          total += item.monAn.donGia * item.soLuong;
        });
      });
      dispatch(actionOrderGetTotalNow(total));
    });
};

export const actionGetAreasForOrder = (checkin, use) => async (dispatch) => {
  const data = await axios.get(`${api}donDatBan/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  const newBook = [];
  data.data.forEach((book) => {
    const a = Date.parse(book.thoiGianNhanBan);
    const b = book.thoiGianDuKienSuDung;
    if (book.trangThai !== '1') {
      if (
        (checkin >= a && checkin + use <= a + b) ||
        (checkin <= a + b && checkin + use >= a + b) ||
        (checkin <= a && checkin + use >= a)
      )
        newBook.push(book);
    }
  });
  const tableUsing = [];
  const tableDontUse = [];
  newBook.forEach((book) => {
    console.log(book);
    if (book.trangThai === '0') {
      tableDontUse.push(...book.listBan);
    } else if (book.trangThai === '2') {
      tableUsing.push(...book.listBan);
    }
  });
  console.log('using', tableUsing);
  console.log('dont use', tableDontUse);
  dispatch(
    actionOrderGetAreasForOrder({
      using: tableUsing,
      dontUse: tableDontUse
    })
  );
};
