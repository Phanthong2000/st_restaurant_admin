import {
  ACTION_CHAT_GET_ALL_MESSAGES,
  ACTION_CHAT_ADD_MESSAGE,
  ACTION_CHAT_UPDATE_MESSAGE,
  ACTION_CHAT_DELETE_MESSAGE,
  ACTION_CHAT_GET_ALL_GHIM_MESSAGE,
  ACTION_CHAT_DELETE_GHIM_MESSAGE,
  ACTION_CHAT_ADD_GHIM_MESSAGE,
  ACTION_CHAT_USER_HOST,
  ACTION_CHAT_MESSAGE_HOST,
  ACTION_CHAT_ADD_MESSAGE_MEETING,
  ACTION_CHAT_BOX_CHAT_MEETING,
  ACTION_CHAT_ADD_USERS_INPUTTING,
  ACTION_CHAT_DELETE_USERS_INPUTTING
} from '../actions/types';

const defaultState = {
  allMessages: [],
  allGhimMessage: [],
  userHost: {},
  messageHost: {},
  allMessagesMeeting: [],
  boxChat: null,
  usersInputting: []
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
    case ACTION_CHAT_ADD_MESSAGE_MEETING:
      return {
        ...state,
        allMessagesMeeting: [action.payload].concat(state.allMessagesMeeting)
      };
    case ACTION_CHAT_BOX_CHAT_MEETING:
      return {
        ...state,
        boxChat: action.payload
      };
    case ACTION_CHAT_ADD_USERS_INPUTTING:
      return {
        ...state,
        usersInputting: [...state.usersInputting, action.payload]
      };
    case ACTION_CHAT_DELETE_USERS_INPUTTING:
      return {
        ...state,
        usersInputting: state.usersInputting.filter((user) => user.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default chatReducer;
