import {
  ACTION_ORDER_GET_ORDER,
  ACTION_ORDER_ADD_FOODS,
  ACTION_ORDER_DELETE_FOODS,
  ACTION_ORDER_EDIT_FOODS,
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
  ACTION_ORDER_GET_ORDER_MANY,
  ACTION_ORDER_SET_FOODS_MANY
} from '../actions/types';

const defaultState = {
  book: {
    customerName: '',
    email: '',
    phone: '',
    date: 0,
    quantityCustomer: 0,
    timeUse: 0,
    area: {},
    description: ''
  },
  foods: [],
  modalInformationFood: {
    status: false,
    food: {}
  },
  userOrder: {},
  booksByKeyword: [],
  modalEditBook: {
    status: false,
    book: {}
  },
  sortBook: 'all',
  newBooks: [],
  updateFoodsForBook: {},
  bookPayOrder: {},
  allWayPay: [],
  ordersNow: [],
  booksNow: [],
  totalNow: 0,
  bookMany: {
    customerName: '',
    email: '',
    phone: '',
    date: 0,
    quantityCustomer: 0,
    timeUse: 0,
    area: {},
    description: '',
    listLoaiBan: []
  },
  foodsMany: []
};

// eslint-disable-next-line default-param-last
const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_ORDER_GET_ORDER:
      return {
        ...state,
        book: action.payload
      };
    case ACTION_ORDER_ADD_FOODS:
      return {
        ...state,
        foods: [...state.foods, action.payload]
      };
    case ACTION_ORDER_DELETE_FOODS:
      return {
        ...state,
        foods: [
          ...state.foods
            .slice(0, action.payload)
            .concat(...state.foods.slice(action.payload + 1, state.foods.length))
        ]
      };
    case ACTION_ORDER_EDIT_FOODS:
      return {
        ...state,
        foods: [
          ...state.foods
            .slice(0, action.payload.index)
            .concat(action.payload.food)
            .concat(...state.foods.slice(action.payload.index + 1, state.foods.length))
        ]
      };
    case ACTION_ORDER_SET_FOOD:
      return {
        ...state,
        foods: action.payload
      };
    case ACTION_ORDER_MODAL_INFORMATION_FOOD:
      return {
        ...state,
        modalInformationFood: action.payload
      };
    case ACTION_ORDER_GET_USER:
      return {
        ...state,
        userOrder: action.payload
      };
    case ACTION_ORDER_GET_BOOKS_BY_KEYWORD:
      return {
        ...state,
        booksByKeyword: action.payload
      };
    case ACTION_ORDER_MODAL_EDIT_BOOK:
      return {
        ...state,
        modalEditBook: action.payload
      };

    case ACTION_ORDER_SORT_BOOK:
      return {
        ...state,
        sortBook: action.payload
      };
    case ACTION_ORDER_NEW_BOOKS:
      return {
        ...state,
        newBooks: action.payload
      };
    case ACTION_ORDER_UPDATE_FOODS_FOR_BOOK:
      return {
        ...state,
        updateFoodsForBook: action.payload
      };
    case ACTION_ORDER_BOOK_PAY_ORDER:
      return {
        ...state,
        bookPayOrder: action.payload
      };
    case ACTION_ORDER_GET_ALL_WAY_PAY:
      return {
        ...state,
        allWayPay: action.payload
      };
    case ACTION_ORDER_GET_ORDER_NOW:
      return {
        ...state,
        ordersNow: action.payload
      };
    case ACTION_ORDER_GET_BOOKS_NOW:
      return {
        ...state,
        booksNow: action.payload
      };
    case ACTION_ORDER_GET_TOTAL_NOW:
      return {
        ...state,
        totalNow: action.payload
      };
    case ACTION_ORDER_GET_ORDER_MANY:
      return {
        ...state,
        bookMany: action.payload
      };
    case ACTION_ORDER_SET_FOODS_MANY:
      return {
        ...state,
        foodsMany: action.payload
      };
    default:
      return state;
  }
};

export default orderReducer;
