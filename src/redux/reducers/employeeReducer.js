import {
  ACTION_EMPLOYEE_GET_ALL_EMPLOYEES,
  ACTION_EMPLOYEE_MODAL_ADD_EMPLOYEE,
  ACTION_EMPLOYEE_MODAL_EDIT_EMPLOYEE,
  ACTION_EMPLOYEE_GET_EMPLOYEES_BY_KEYWORDS
} from '../actions/types';

const defaultState = {
  employees: [],
  modalAddEmployee: false,
  modalEditEmployee: {
    status: false,
    employee: {}
  },
  employeesKeyword: []
};

// eslint-disable-next-line default-param-last
const employeeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_EMPLOYEE_GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    case ACTION_EMPLOYEE_MODAL_ADD_EMPLOYEE:
      return {
        ...state,
        modalAddEmployee: action.payload
      };
    case ACTION_EMPLOYEE_MODAL_EDIT_EMPLOYEE:
      return {
        ...state,
        modalEditEmployee: action.payload
      };
    case ACTION_EMPLOYEE_GET_EMPLOYEES_BY_KEYWORDS:
      return {
        ...state,
        employeesKeyword: action.payload
      };
    default:
      return state;
  }
};

export default employeeReducer;