import {
  ACTION_USER_OPEN_CHAT_BOX,
  ACTION_USER_SHOW_HOT_TOAST,
  ACTION_USER_SNACKBAR,
  ACTION_USER_GET_USER,
  ACTION_USER_BOX_PROFILE,
  ACTION_USER_BOX_NOTIFICATION,
  ACTION_USER_BACKDROP,
  ACTION_USER_CHOOSE_NOTIFICATION,
  ACTION_USER_SUPPORT_CHOOSE_NOTIFICATION,
  ACTION_USER_GET_ALL_NOTIFICATIONS,
  ACTION_USER_GET_BADGE_NOTIFICATIONS,
  ACTION_USER_ADD_BADGE_NOTIFICATIONS,
  ACTION_USER_DELETE_BADGE_NOTIFICATIONS,
  ACTION_USER_ADD_NOTIFICATION,
  ACTION_USER_UPDATE_NOTIFICATION,
  ACTION_USER_BOX_FEEDBACK,
  ACTION_USER_GET_ALL_FEEDBACKS,
  ACTION_USER_GET_BADGE_FEEDBACK,
  ACTION_USER_MODAL_FEEDBACK,
  ACTION_USER_ADD_BADGE_FEEDBACK,
  ACTION_USER_ADD_FEEDBACK,
  ACTION_USER_DELETE_BADGE_FEEDBACK,
  ACTION_USER_DELETE_FEEDBACK
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
  supportChooseNotification: 0,
  allNotifications: [],
  badgeNotification: 0,
  boxFeedBack: false,
  allFeedbacks: [],
  badgeFeedback: 0,
  modalFeedback: {
    status: false,
    feedback: {}
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
    case ACTION_USER_GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case ACTION_USER_BOX_PROFILE:
      return {
        ...state,
        boxProfile: action.payload,
        boxNotification: false,
        boxFeedBack: false
      };
    case ACTION_USER_BOX_NOTIFICATION:
      return {
        ...state,
        boxNotification: action.payload,
        boxProfile: false,
        boxFeedBack: false
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
    case ACTION_USER_GET_ALL_NOTIFICATIONS:
      return {
        ...state,
        allNotifications: action.payload
      };
    case ACTION_USER_ADD_NOTIFICATION:
      return {
        ...state,
        allNotifications: [action.payload].concat(state.allNotifications)
      };
    case ACTION_USER_UPDATE_NOTIFICATION:
      console.log(action.payload);
      return {
        ...state,
        allNotifications: [
          ...state.allNotifications
            .slice(0, action.payload.index)
            .concat([action.payload.notification])
            .concat([
              ...state.allNotifications.slice(
                action.payload.index + 1,
                state.allNotifications.length
              )
            ])
        ]
      };
    case ACTION_USER_GET_BADGE_NOTIFICATIONS:
      return {
        ...state,
        badgeNotification: action.payload
      };
    case ACTION_USER_ADD_BADGE_NOTIFICATIONS:
      return {
        ...state,
        badgeNotification: (state.badgeNotification += 1)
      };
    case ACTION_USER_DELETE_BADGE_NOTIFICATIONS:
      return {
        ...state,
        badgeNotification: (state.badgeNotification -= 1)
      };
    case ACTION_USER_BOX_FEEDBACK:
      return {
        ...state,
        boxFeedBack: action.payload,
        boxNotification: false,
        boxProfile: false
      };
    case ACTION_USER_GET_ALL_FEEDBACKS:
      return {
        ...state,
        allFeedbacks: action.payload
      };
    case ACTION_USER_ADD_FEEDBACK:
      return {
        ...state,
        allFeedbacks: [action.payload].concat([...state.allFeedbacks])
      };
    case ACTION_USER_DELETE_FEEDBACK:
      return {
        ...state,
        allFeedbacks: [
          ...state.allFeedbacks
            .slice(0, action.payload.index)
            .concat([action.payload.feedback])
            .concat([
              ...state.allFeedbacks.slice(action.payload.index + 1, state.allFeedbacks.length)
            ])
        ]
      };
    case ACTION_USER_GET_BADGE_FEEDBACK:
      return {
        ...state,
        badgeFeedback: action.payload
      };
    case ACTION_USER_ADD_BADGE_FEEDBACK:
      return {
        ...state,
        badgeFeedback: (state.badgeFeedback += 1)
      };
    case ACTION_USER_DELETE_BADGE_FEEDBACK:
      return {
        ...state,
        badgeFeedback: (state.badgeFeedback -= 1)
      };
    case ACTION_USER_MODAL_FEEDBACK:
      return {
        ...state,
        modalFeedback: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
