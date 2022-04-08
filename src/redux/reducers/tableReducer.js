import {
  ACTION_TABLE_MODAL_EDIT_TABLE,
  ACTION_TABLE_GET_ALL_TABLES,
  ACTION_TABLE_MODAL_ADD_TABLE,
  ACTION_TABLE_SORT_TABLE,
  ACTION_TABLE_MODAL_CHANGE_AREA
} from '../actions/types';

const defaultState = {
  allTables: [],
  modalAddTable: false,
  modalEditTable: {
    status: false,
    table: {}
  },
  sortTable: 'all',
  modalChangeArea: {
    status: false,
    table: {}
  }
};

// eslint-disable-next-line default-param-last
const tableReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_TABLE_GET_ALL_TABLES:
      return {
        ...state,
        allTables: action.payload
      };
    case ACTION_TABLE_MODAL_ADD_TABLE:
      return {
        ...state,
        modalAddTable: action.payload
      };
    case ACTION_TABLE_MODAL_EDIT_TABLE:
      return {
        ...state,
        modalEditTable: action.payload
      };
    case ACTION_TABLE_SORT_TABLE:
      return {
        ...state,
        sortTable: action.payload
      };
    case ACTION_TABLE_MODAL_CHANGE_AREA:
      return {
        ...state,
        modalChangeArea: action.payload
      };
    default:
      return state;
  }
};

export default tableReducer;
