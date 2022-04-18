import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_CHAT_GET_ALL_MESSAGES,
  ACTION_CHAT_ADD_MESSAGE,
  ACTION_CHAT_UPDATE_MESSAGE,
  ACTION_CHAT_DELETE_MESSAGE
} from './types';

export const actionChatGetAllMessages = (data) => ({
  type: ACTION_CHAT_GET_ALL_MESSAGES,
  payload: data
});
export const actionChatAddMessage = (data) => ({
  type: ACTION_CHAT_ADD_MESSAGE,
  payload: data
});
export const actionChatUpdateMessage = (data) => ({
  type: ACTION_CHAT_UPDATE_MESSAGE,
  payload: data
});
export const actionChatDeleteMessage = (data) => ({
  type: ACTION_CHAT_DELETE_MESSAGE,
  payload: data
});
export const actionGetAllMessages = () => async (dispatch) => {
  const data = await axios.get(`${api}tinNhan/list`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  dispatch(
    actionChatGetAllMessages(
      data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
    )
  );
};
