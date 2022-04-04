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
  ACTION_ANALYTIC_ORDER_MONTH_LAST,
  ACTION_ANALYTIC_ORDER_MONTH_NOW,
  ACTION_ANALYTIC_BOOK_YEAR_LAST,
  ACTION_ANALYTIC_BOOK_YEAR_NOW,
  ACTION_ANALYTIC_ORDER_YEAR_LAST,
  ACTION_ANALYTIC_ORDER_YEAR_NOW,
  ACTION_ANALYTIC_REVENUE_YEAR_NOW,
  ACTION_ANALYTIC_REVENUE_YEAR_LAST
} from '../actions/types';

const defaultState = {
  revenueDateNow: 0,
  revenueDateLast: 0,
  bookDateNow: 0,
  bookDateLast: 0,
  orderDateNow: 0,
  orderDateLast: 0,
  revenueMonthLast: 0,
  revenueMonthNow: 0,
  bookMonthNow: 0,
  bookMonthLast: 0,
  orderMonthNow: 0,
  orderMonthLast: 0,
  revenueYearLast: 0,
  revenueYearNow: 0,
  bookYearNow: 0,
  bookYearLast: 0,
  orderYearNow: 0,
  orderYearLast: 0
};

// eslint-disable-next-line default-param-last
const analyticReduce = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_ANALYTIC_REVENUE_DATE_LAST:
      console.log(action.payload);
      return {
        ...state,
        revenueDateLast: action.payload
      };
    case ACTION_ANALYTIC_REVENUE_DATE_NOW:
      return {
        ...state,
        revenueDateNow: action.payload
      };
    case ACTION_ANALYTIC_BOOK_DATE_LAST:
      return {
        ...state,
        bookDateLast: action.payload
      };
    case ACTION_ANALYTIC_BOOK_DATE_NOW:
      return {
        ...state,
        bookDateNow: action.payload
      };
    case ACTION_ANALYTIC_ORDER_DATE_LAST:
      return {
        ...state,
        orderDateLast: action.payload
      };
    case ACTION_ANALYTIC_ORDER_DATE_NOW:
      return {
        ...state,
        orderDateNow: action.payload
      };
    case ACTION_ANALYTIC_REVENUE_MONTH_LAST:
      return {
        ...state,
        revenueMonthLast: action.payload
      };
    case ACTION_ANALYTIC_REVENUE_MONTH_NOW:
      return {
        ...state,
        revenueMonthNow: action.payload
      };
    case ACTION_ANALYTIC_BOOK_MONTH_LAST:
      return {
        ...state,
        bookMonthLast: action.payload
      };
    case ACTION_ANALYTIC_BOOK_MONTH_NOW:
      return {
        ...state,
        bookMonthNow: action.payload
      };
    case ACTION_ANALYTIC_ORDER_MONTH_LAST:
      return {
        ...state,
        orderMonthLast: action.payload
      };
    case ACTION_ANALYTIC_ORDER_MONTH_NOW:
      return {
        ...state,
        orderMonthNow: action.payload
      };
    case ACTION_ANALYTIC_REVENUE_YEAR_NOW:
      return {
        ...state,
        revenueYearNow: action.payload
      };
    case ACTION_ANALYTIC_REVENUE_YEAR_LAST:
      return {
        ...state,
        revenueYearLast: action.payload
      };
    case ACTION_ANALYTIC_BOOK_YEAR_LAST:
      return {
        ...state,
        bookYearLast: action.payload
      };
    case ACTION_ANALYTIC_BOOK_YEAR_NOW:
      return {
        ...state,
        bookYearNow: action.payload
      };
    case ACTION_ANALYTIC_ORDER_YEAR_LAST:
      return {
        ...state,
        orderYearLast: action.payload
      };
    case ACTION_ANALYTIC_ORDER_YEAR_NOW:
      return {
        ...state,
        orderYearNow: action.payload
      };
    default:
      return state;
  }
};

export default analyticReduce;