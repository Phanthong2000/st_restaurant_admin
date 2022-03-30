import {
  ACTION_USER_OPEN_CHAT_BOX,
  ACTION_USER_SHOW_HOT_TOAST,
  ACTION_USER_SNACKBAR,
  ACTION_USER_GET_USER,
  ACTION_USER_BOX_PROFILE,
  ACTION_USER_BOX_NOTIFICATION,
  ACTION_USER_BACKDROP,
  ACTION_USER_CHOOSE_NOTIFICATION,
  ACTION_USER_SUPPORT_CHOOSE_NOTIFICATION
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
  },
  user: {},
  boxProfile: false,
  boxNotification: false,
  backdrop: {
    status: false,
    content: ''
  },
  chooseNotification: {
    id: '',
    page: 2
  },
  supportChooseNotification: 0
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
    case ACTION_USER_GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ACTION_USER_BOX_PROFILE:
      return {
        ...state,
        boxProfile: action.payload,
        boxNotification: false
      };
    case ACTION_USER_BOX_NOTIFICATION:
      return {
        ...state,
        boxNotification: action.payload,
        boxProfile: false
      };
    case ACTION_USER_BACKDROP:
      return {
        ...state,
        backdrop: action.payload
      };
    case ACTION_USER_CHOOSE_NOTIFICATION:
      return {
        ...state,
        chooseNotification: action.payload
      };
    case ACTION_USER_SUPPORT_CHOOSE_NOTIFICATION:
      return {
        ...state,
        supportChooseNotification: state.supportChooseNotification + 1
      };
    default:
      return state;
  }
};
export default userReducer;
