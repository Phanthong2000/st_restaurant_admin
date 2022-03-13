import {
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS,
  ACTION_CUSTOMER_GET_QUANTITY_CUSTOMERS,
  ACTION_CUSTOMER_MODAL_ADD_CUSTOMER,
  ACTION_CUSTOMER_MODAL_EDIT_CUSTOMER,
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS_BY_KEYWORDS,
  ACTION_CUSTOMER_GET_GENDER_CUSTOMER,
  ACTION_CUSTOMER_GET_NEW_CUSTOMER_IN_WEEK
} from '../actions/types';

const defaultState = {
  customers: [],
  quantityCustomers: [],
  modalAddCustomer: false,
  modalEditCustomer: {
    status: false,
    customer: {}
  },
  customersKeyword: [],
  newCustomer: {
    categories: [],
    data: [],
    total: 0
  },
  genderCustomer: []
};
// eslint-disable-next-line default-param-last
const customerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_CUSTOMER_GET_ALL_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case ACTION_CUSTOMER_GET_QUANTITY_CUSTOMERS:
      return {
        ...state,
        quantityCustomers: action.payload
      };
    case ACTION_CUSTOMER_MODAL_ADD_CUSTOMER:
      return {
        ...state,
        modalAddCustomer: action.payload
      };
    case ACTION_CUSTOMER_MODAL_EDIT_CUSTOMER:
      return {
        ...state,
        modalEditCustomer: action.payload
      };
    case ACTION_CUSTOMER_GET_ALL_CUSTOMERS_BY_KEYWORDS:
      return {
        ...state,
        customersKeyword: action.payload
      };
    case ACTION_CUSTOMER_GET_NEW_CUSTOMER_IN_WEEK:
      return {
        ...state,
        newCustomer: action.payload
      };
    case ACTION_CUSTOMER_GET_GENDER_CUSTOMER:
      return {
        ...state,
        genderCustomer: action.payload
      };
    default:
      return state;
  }
};
export default customerReducer;
