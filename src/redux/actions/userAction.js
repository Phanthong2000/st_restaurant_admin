import axios from 'axios';
import api from '../../assets/api/api';
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
  ACTION_USER_GET_ALL_FEEDBACKS,
  ACTION_USER_BOX_FEEDBACK,
  ACTION_USER_GET_BADGE_FEEDBACK,
  ACTION_USER_MODAL_FEEDBACK,
  ACTION_USER_ADD_BADGE_FEEDBACK,
  ACTION_USER_DELETE_BADGE_FEEDBACK,
  ACTION_USER_ADD_FEEDBACK,
  ACTION_USER_DELETE_FEEDBACK
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
export const actionUserBoxNotification = (data) => ({
  type: ACTION_USER_BOX_NOTIFICATION,
  payload: data
});
export const actionUserBackdrop = (data) => ({
  type: ACTION_USER_BACKDROP,
  payload: data
});
export const actionUserChooseNotification = (data) => ({
  type: ACTION_USER_CHOOSE_NOTIFICATION,
  payload: data
});
export const actionUserSupportChooseNotification = () => ({
  type: ACTION_USER_SUPPORT_CHOOSE_NOTIFICATION
});
export const actionUserGetAllNotifications = (data) => ({
  type: ACTION_USER_GET_ALL_NOTIFICATIONS,
  payload: data
});
export const actionUserAddNotification = (data) => ({
  type: ACTION_USER_ADD_NOTIFICATION,
  payload: data
});
export const actionUserUpdateNotification = (data) => ({
  type: ACTION_USER_UPDATE_NOTIFICATION,
  payload: data
});
export const actionUserGetBadgeNotification = (data) => ({
  type: ACTION_USER_GET_BADGE_NOTIFICATIONS,
  payload: data
});
export const actionUserAddBadgeNotification = () => ({
  type: ACTION_USER_ADD_BADGE_NOTIFICATIONS
});
export const actionUserDeleteBadgeNotification = () => ({
  type: ACTION_USER_DELETE_BADGE_NOTIFICATIONS
});
export const actionUserBoxFeedBack = (data) => ({
  type: ACTION_USER_BOX_FEEDBACK,
  payload: data
});
export const actionUserGetAllFeedbacks = (data) => ({
  type: ACTION_USER_GET_ALL_FEEDBACKS,
  payload: data
});
export const actionUserAddFeedback = (data) => ({
  type: ACTION_USER_ADD_FEEDBACK,
  payload: data
});
export const actionUserDeleteFeedback = (data) => ({
  type: ACTION_USER_DELETE_FEEDBACK,
  payload: data
});
export const actionUserGetBadgeFeedback = (data) => ({
  type: ACTION_USER_GET_BADGE_FEEDBACK,
  payload: data
});
export const actionUserAddBadgeFeedback = (data) => ({
  type: ACTION_USER_ADD_BADGE_FEEDBACK,
  payload: data
});
export const actionUserDeleteBadgeFeedback = (data) => ({
  type: ACTION_USER_DELETE_BADGE_FEEDBACK,
  payload: data
});
export const actionUserModalFeedback = (data) => ({
  type: ACTION_USER_MODAL_FEEDBACK,
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

export const actionGetAllNotifications = () => (dispatch) => {
  axios.get(`${api}thongBao/list`).then((res) => {
    dispatch(
      actionUserGetBadgeNotification(
        res.data.filter((noti) => noti.trangThai === 'Chưa đọc').length
      )
    );
    dispatch(
      actionUserGetAllNotifications(
        res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
      )
    );
  });
};

export const actionGetAllFeedbacks = () => (dispatch) => {
  axios.get(`${api}phanHoi/list`).then((res) => {
    dispatch(
      actionUserGetBadgeFeedback(
        res.data.filter((feedback) => feedback.trangThai === 'Chưa đọc').length
      )
    );
    dispatch(
      actionUserGetAllFeedbacks(
        res.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt))
      )
    );
  });
};
