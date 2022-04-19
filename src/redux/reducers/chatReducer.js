import {
  ACTION_CHAT_GET_ALL_MESSAGES,
  ACTION_CHAT_ADD_MESSAGE,
  ACTION_CHAT_UPDATE_MESSAGE,
  ACTION_CHAT_DELETE_MESSAGE,
  ACTION_CHAT_GET_ALL_GHIM_MESSAGE,
  ACTION_CHAT_DELETE_GHIM_MESSAGE,
  ACTION_CHAT_ADD_GHIM_MESSAGE,
  ACTION_CHAT_USER_HOST,
  ACTION_CHAT_MESSAGE_HOST
} from '../actions/types';

const defaultState = {
  allMessages: [],
  allGhimMessage: [],
  userHost: {},
  messageHost: {}
};

// eslint-disable-next-line default-param-last
const chatReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_CHAT_GET_ALL_MESSAGES:
      return {
        ...state,
        allMessages: action.payload
      };
    case ACTION_CHAT_ADD_MESSAGE:
      return {
        ...state,
        allMessages: [action.payload].concat(state.allMessages)
      };
    case ACTION_CHAT_UPDATE_MESSAGE:
      return {
        ...state,
        allMessages: [
          ...state.allMessages
            .slice(0, 0)
            .concat([action.payload.message])
            .concat([...state.allMessages.slice(1, state.allMessages.length)])
        ]
      };
    case ACTION_CHAT_DELETE_MESSAGE:
      return {
        ...state,
        allMessages: [
          ...state.allMessages
            .slice(0, action.payload.index)
            .concat([action.payload.message])
            .concat([
              ...state.allMessages.slice(action.payload.index + 1, state.allMessages.length)
            ])
        ]
      };
    case ACTION_CHAT_GET_ALL_GHIM_MESSAGE:
      return {
        ...state,
        allGhimMessage: action.payload
      };
    case ACTION_CHAT_ADD_GHIM_MESSAGE:
      return {
        ...state,
        allGhimMessage: [action.payload].concat(state.allGhimMessage)
      };
    case ACTION_CHAT_DELETE_GHIM_MESSAGE:
      return {
        ...state,
        allGhimMessage: [
          ...state.allGhimMessage
            .slice(0, action.payload.index)
            .concat([
              ...state.allGhimMessage.slice(action.payload.index + 1, state.allGhimMessage.length)
            ])
        ]
      };
    case ACTION_CHAT_USER_HOST:
      return {
        ...state,
        userHost: action.payload
      };
    case ACTION_CHAT_MESSAGE_HOST:
      return {
        ...state,
        messageHost: action.payload
      };
    default:
      return state;
  }
};

export default chatReducer;
