import {
  ACTION_USER_OPEN_CHAT_BOX,
  ACTION_USER_SHOW_HOT_TOAST,
  ACTION_USER_SNACKBAR
} from '../actions/types';

const defaultState = {
  openChatBox: false,
  showToast: {
    content: '',
    type: ''
  },
  snackbar: {
    status: false,
    content: '',
    type: 'success'
  }
};

// eslint-disable-next-line default-param-last
const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_USER_OPEN_CHAT_BOX:
      return {
        ...state,
        openChatBox: action.payload
      };
    case ACTION_USER_SHOW_HOT_TOAST:
      return {
        ...state,
        showToast: action.payload
      };
    case ACTION_USER_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
