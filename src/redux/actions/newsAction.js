import axios from 'axios';
import api from '../../assets/api/api';
import { ACTION_NEWS_GET_ALL_NEWS, ACTION_NEWS_WATCH_NEWS } from './types';

export const actionNewsGetAllNews = (data) => ({
  type: ACTION_NEWS_GET_ALL_NEWS,
  payload: data
});
export const actionNewsWatchNews = (data) => ({
  type: ACTION_NEWS_WATCH_NEWS,
  payload: data
});

export const actionGetAllNews = () => async (dispatch) => {
  const data = await axios.get(`${api}tinTuc/list`);
  dispatch(
    actionNewsGetAllNews(data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt)))
  );
};
