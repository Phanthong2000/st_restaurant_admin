import {
  ACTION_CHAT_GET_ALL_MESSAGES,
  ACTION_CHAT_ADD_MESSAGE,
  ACTION_CHAT_UPDATE_MESSAGE,
  ACTION_CHAT_DELETE_MESSAGE
} from '../actions/types';

const defaultState = {
  allMessages: []
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
    default:
      return state;
  }
};

export default chatReducer;
