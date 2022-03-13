import axios from 'axios';
import api from '../../assets/api/api';
import {
  ACTION_USER_OPEN_CHAT_BOX,
  ACTION_USER_SHOW_HOT_TOAST,
  ACTION_USER_SNACKBAR,
  ACTION_USER_GET_USER,
  ACTION_USER_BOX_PROFILE
} from './types';

export const actionUserOpenChatBox = (data) => ({
  type: ACTION_USER_OPEN_CHAT_BOX,
  payload: data
});
export const actionUserShowHotToast = (data) => ({
  type: ACTION_USER_SHOW_HOT_TOAST,
  payload: data
});

export const actionUserSnackbar = (data) => ({
  type: ACTION_USER_SNACKBAR,
  payload: data
});
export const actionUserGetUser = (data) => ({
  type: ACTION_USER_GET_USER,
  payload: data
});
export const actionUserBoxProfile = (data) => ({
  type: ACTION_USER_BOX_PROFILE,
  payload: data
});

export const actionGetUser = (id) => (dispatch) => {
  axios
    .get(`${api}nguoiQuanLy/detail/${id}`)
    .then((res) => {
      dispatch(actionUserGetUser(res.data));
    })
    .catch((err) => console.log(err));
};
