import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_CHAT_GET_ALL_MESSAGES,
  ACTION_CHAT_ADD_MESSAGE,
  ACTION_CHAT_UPDATE_MESSAGE,
  ACTION_CHAT_DELETE_MESSAGE,
  ACTION_CHAT_GET_ALL_GHIM_MESSAGE,
  ACTION_CHAT_ADD_GHIM_MESSAGE,
  ACTION_CHAT_DELETE_GHIM_MESSAGE,
  ACTION_CHAT_USER_HOST,
  ACTION_CHAT_MESSAGE_HOST,
  ACTION_CHAT_ADD_MESSAGE_MEETING,
  ACTION_CHAT_BOX_CHAT_MEETING,
  ACTION_CHAT_DELETE_USERS_INPUTTING,
  ACTION_CHAT_ADD_USERS_INPUTTING
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
export const actionChatGetAllGhimMessage = (data) => ({
  type: ACTION_CHAT_GET_ALL_GHIM_MESSAGE,
  payload: data
});
export const actionChatAddGhimMessage = (data) => ({
  type: ACTION_CHAT_ADD_GHIM_MESSAGE,
  payload: data
});
export const actionChatDeleteGhimMessage = (data) => ({
  type: ACTION_CHAT_DELETE_GHIM_MESSAGE,
  payload: data
});
export const actionChatUserHost = (data) => ({
  type: ACTION_CHAT_USER_HOST,
  payload: data
});
export const actionChatMessageHost = (data) => ({
  type: ACTION_CHAT_MESSAGE_HOST,
  payload: data
});
export const actionChatAddMessageMeeting = (data) => ({
  type: ACTION_CHAT_ADD_MESSAGE_MEETING,
  payload: data
});
export const actionChatBoxChatMeeting = (data) => ({
  type: ACTION_CHAT_BOX_CHAT_MEETING,
  payload: data
});
export const actionChatAddUsersInputting = (data) => ({
  type: ACTION_CHAT_ADD_USERS_INPUTTING,
  payload: data
});
export const actionChatDeleteUsersInputting = (data) => ({
  type: ACTION_CHAT_DELETE_USERS_INPUTTING,
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

export const actionGetAllGhimMessage = () => async (dispatch) => {
  const data = await axios.get(`${api}tinNhan/list/byGhim`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  dispatch(
    actionChatGetAllGhimMessage(
      data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
    )
  );
};
