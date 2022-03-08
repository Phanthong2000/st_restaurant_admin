import {
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS,
  ACTION_CUSTOMER_GET_QUANTITY_CUSTOMERS,
  ACTION_CUSTOMER_MODAL_ADD_CUSTOMER,
  ACTION_CUSTOMER_MODAL_EDIT_CUSTOMER,
  ACTION_CUSTOMER_GET_ALL_CUSTOMERS_BY_KEYWORDS
} from '../actions/types';

const defaultState = {
  customers: [],
  quantityCustomers: [],
  modalAddCustomer: false,
  modalEditCustomer: {
    status: false,
    customer: {}
  },
  customersKeyword: []
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
    default:
      return state;
  }
};
export default customerReducer;
