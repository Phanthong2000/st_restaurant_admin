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
  ACTION_ANALYTIC_REVENUE_YEAR_LAST,
  ACTION_ANALYTIC_COLUMN_TYPEFOOD_FOOD,
  ACTION_ANALYTIC_FOODS_SELLING,
  ACTION_ANALYTIC_FOODS_STOP_SELL,
  ACTION_ANALYTIC_COLUMN_CUSTOMERS_YEAR,
  ACTION_ANALYTIC_COLUMN_REVENUE_BOOK,
  ACTION_ANALYTIC_COLUMN_REVENUE_ORDER,
  ACTION_ANALYTIC_COLUMN_REVENUE_REVENUE,
  ACTION_ANALYTIC_GET_ALL_ORDERS,
  ACTION_ANALYTIC_GET_TOP10_FOODS_LOVE,
  ACTION_ANALYTIC_GET_REVENUE_WEEK,
  ACTION_ANALYTIC_GET_BOOK_WEEK,
  ACTION_ANALYTIC_GET_ORDER_WEEK,
  ACTION_ANALYTIC_GET_TOP10_CUSTOMER,
  ACTION_ANALYTIC_GET_TOTAL_REVENUE_REVENUE,
  ACTION_ANALYTIC_COLUMN_AREA_TABLE,
  ACTION_ANALYTIC_COLUMN_TOP10_TABLE,
  ACTION_ANALYTIC_GET_TOP10_FOOD,
  ACTION_ANALYTIC_COLUMN_REVENUE_MONTH
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
  orderYearLast: 0,
  columnTypefoodFood: {
    name: [],
    data: []
  },
  foodsSelling: 0,
  foodsStopSell: 0,
  columnCustomersYear: {
    total: [],
    male: [],
    female: []
  },
  columnRevenueBook: [],
  columnRevenueOrder: [],
  columnRevenueRevenue: [],
  totalRevenueRevenue: 0,
  allOrders: [],
  top10FoodsLove: {
    name: [],
    value: []
  },
  revenueWeek: {
    categories: [],
    data: [],
    total: 0
  },
  bookWeek: {
    categories: [],
    data: [],
    total: 0
  },
  orderWeek: {
    categories: [],
    data: [],
    total: 0
  },
  top10Customer: {
    categories: [],
    data: [],
    customers: []
  },
  columnAreaTable: {
    columnName: [],
    columnData: []
  },
  top10Table: {
    columnName: [],
    columnData: []
  },
  top10Food: [],
  columnRevenueMonth: {
    columnData: [],
    total: 0
  }
};

// eslint-disable-next-line default-param-last
const analyticReduce = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_ANALYTIC_REVENUE_DATE_LAST:
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
    case ACTION_ANALYTIC_COLUMN_TYPEFOOD_FOOD:
      return {
        ...state,
        columnTypefoodFood: action.payload
      };
    case ACTION_ANALYTIC_FOODS_SELLING:
      return {
        ...state,
        foodsSelling: action.payload
      };
    case ACTION_ANALYTIC_FOODS_STOP_SELL:
      return {
        ...state,
        foodsStopSell: action.payload
      };
    case ACTION_ANALYTIC_COLUMN_CUSTOMERS_YEAR:
      return {
        ...state,
        columnCustomersYear: action.payload
      };
    case ACTION_ANALYTIC_COLUMN_REVENUE_BOOK:
      return {
        ...state,
        columnRevenueBook: action.payload
      };
    case ACTION_ANALYTIC_COLUMN_REVENUE_ORDER:
      return {
        ...state,
        columnRevenueOrder: action.payload
      };
    case ACTION_ANALYTIC_COLUMN_REVENUE_REVENUE:
      return {
        ...state,
        columnRevenueRevenue: action.payload
      };
    case ACTION_ANALYTIC_GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload
      };
    case ACTION_ANALYTIC_GET_TOP10_FOODS_LOVE:
      return {
        ...state,
        top10FoodsLove: action.payload
      };
    case ACTION_ANALYTIC_GET_REVENUE_WEEK:
      return {
        ...state,
        revenueWeek: action.payload
      };
    case ACTION_ANALYTIC_GET_BOOK_WEEK:
      return {
        ...state,
        bookWeek: action.payload
      };
    case ACTION_ANALYTIC_GET_ORDER_WEEK:
      return {
        ...state,
        orderWeek: action.payload
      };
    case ACTION_ANALYTIC_GET_TOP10_CUSTOMER:
      return {
        ...state,
        top10Customer: action.payload
      };
    case ACTION_ANALYTIC_GET_TOTAL_REVENUE_REVENUE:
      return {
        ...state,
        totalRevenueRevenue: action.payload
      };
    case ACTION_ANALYTIC_COLUMN_AREA_TABLE:
      return {
        ...state,
        columnAreaTable: action.payload
      };
    case ACTION_ANALYTIC_COLUMN_TOP10_TABLE:
      return {
        ...state,
        top10Table: action.payload
      };
    case ACTION_ANALYTIC_GET_TOP10_FOOD:
      return {
        ...state,
        top10Food: action.payload
      };
    case ACTION_ANALYTIC_COLUMN_REVENUE_MONTH:
      return {
        ...state,
        columnRevenueMonth: action.payload
      };
    default:
      return state;
  }
};

export default analyticReduce;
