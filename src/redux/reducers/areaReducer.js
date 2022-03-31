import {
  ACTION_AREA_MODAL_ADD_AREA,
  ACTION_AREA_GET_ALL_AREAS,
  ACTION_AREA_MODAL_EDIT_AREA
} from '../actions/types';

const defaultState = {
  modalAddArea: false,
  allAreas: [],
  modalEditArea: {
    status: false,
    area: {}
  }
};

// eslint-disable-next-line default-param-last
const areaReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_AREA_MODAL_ADD_AREA:
      return {
        ...state,
        modalAddArea: action.payload
      };
    case ACTION_AREA_GET_ALL_AREAS:
      return {
        ...state,
        allAreas: action.payload
      };
    case ACTION_AREA_MODAL_EDIT_AREA:
      return {
        ...state,
        modalEditArea: action.payload
      };
    default:
      return state;
  }
};

export default areaReducer;
