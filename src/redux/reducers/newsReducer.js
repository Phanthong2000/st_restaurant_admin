import { ACTION_NEWS_GET_ALL_NEWS, ACTION_NEWS_WATCH_NEWS } from '../actions/types';

const defaultState = {
  allNews: [],
  news: {}
};

// eslint-disable-next-line default-param-last
const newsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_NEWS_GET_ALL_NEWS:
      return {
        ...state,
        allNews: action.payload
      };
    case ACTION_NEWS_WATCH_NEWS:
      return {
        ...state,
        news: action.payload
      };
    default:
      return state;
  }
};

export default newsReducer;
