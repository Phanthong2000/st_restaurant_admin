import React, { useEffect, useState } from 'react';
import { Avatar, Box, ListItemButton, Skeleton, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import api from '../../assets/api/api';
import {
  actionUserBoxNotification,
  actionUserChooseNotification,
  actionUserDeleteBadgeNotification,
  actionUserSupportChooseNotification,
  actionUserUpdateNotification
} from '../../redux/actions/userAction';

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  width: '100%',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  background: theme.palette.white,
  marginTop: '10px'
}));
const AvatarUser = styled(Avatar)(({ theme }) => ({
  width: '60px',
  height: '60px'
}));
const Username = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '14px'
}));
const Time = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '12px'
}));
Notification.prototype = {
  notification: PropTypes.object,
  index: PropTypes.number
};
function Notification({ notification, index }) {
  const booksByKeyword = useSelector((state) => state.order.booksByKeyword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chooseNotification = () => {
    const index = booksByKeyword.findIndex((item) => item.id === notification.donDatBan.id);
    const page = (index / 5)
      .toString()
      .substring(0, (index / 5).toFixed(1).toString().indexOf('.'));
    dispatch(
      actionUserChooseNotification({
        id: notification.donDatBan.id,
        page: parseInt(page, 10)
      })
    );
    navigate('/home/book');
    dispatch(actionUserSupportChooseNotification());
    if (notification.trangThai === 'Chưa đọc') {
      dispatch(actionUserDeleteBadgeNotification());
      axios
        .put(`${api}thongBao/edit`, {
          ...notification,
          trangThai: 'Đã đọc'
        })
        .then((res) => {
          dispatch(
            actionUserUpdateNotification({
              index,
              notification: res.data
            })
          );
          dispatch(actionUserBoxNotification(false));
        });
    } else {
      dispatch(actionUserBoxNotification(false));
    }
  };
  return (
    <RootStyle onClick={chooseNotification}>
      <Box sx={{ display: 'flex' }}>
        <AvatarUser src={notification.khachHang.anhDaiDien} />
        <Box sx={{ marginLeft: '10px' }}>
          <Username>
            <b>{notification.khachHang.hoTen}</b> đã đặt bàn
          </Username>
          <Time>
            <b>Nhận bàn vào lúc: </b>
            {moment(notification.donDatBan.thoiGianNhanBan).format(`hh:mm a DD/MM/yyyy`)}
          </Time>
          <Time>
            <b>Đặt bàn vào lúc: </b>
            {moment(Date.parse(notification.donDatBan.createAt)).format(`hh:mm a DD/MM/yyyy`)}
          </Time>
        </Box>
      </Box>
      {notification.trangThai === 'Chưa đọc' && (
        <Icon style={{ color: 'green', width: '40px', height: '40px' }} icon="ci:dot-03-m" />
      )}
    </RootStyle>
  );
}

export default Notification;
