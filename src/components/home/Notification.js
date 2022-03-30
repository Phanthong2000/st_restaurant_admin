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
  actionUserSupportChooseNotification
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
  notification: PropTypes.object
};
function Notification({ notification }) {
  const booksByKeyword = useSelector((state) => state.order.booksByKeyword);
  const [book, setBook] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBook = (id) => {
    axios.get(`${api}donDatBan/detail/${id}`).then((res) => {
      setBook(res.data);
    });
  };
  useEffect(() => {
    getBook(notification.noiDung);
    return function () {
      return null;
    };
  }, []);
  const chooseNotification = () => {
    const index = booksByKeyword.findIndex((item) => item.id === book.id);
    const page = (index / 5)
      .toString()
      .substring(0, (index / 5).toFixed(1).toString().indexOf('.'));
    dispatch(
      actionUserChooseNotification({
        id: book.id,
        page: parseInt(page, 10)
      })
    );
    navigate('/home/book');
    dispatch(actionUserSupportChooseNotification());
    dispatch(actionUserBoxNotification(false));
  };
  if (book.thoiGianNhanBan === undefined)
    return (
      <RootStyle>
        <Box sx={{ display: 'flex' }}>
          <Skeleton sx={{ width: '60px', height: '60px' }} variant="circular" />
          <Box sx={{ marginLeft: '10px' }}>
            <Skeleton variant="text" sx={{ width: '100px' }} />
            <Skeleton variant="text" sx={{ width: '100px' }} />
            <Skeleton variant="text" sx={{ width: '100px' }} />
          </Box>
        </Box>
      </RootStyle>
    );
  return (
    <RootStyle onClick={chooseNotification}>
      <Box sx={{ display: 'flex' }}>
        <AvatarUser src={notification.nguoiGui.anhDaiDien} />
        <Box sx={{ marginLeft: '10px' }}>
          <Username>
            <b>{notification.nguoiGui.hoTen}</b> đã đặt bàn
          </Username>
          <Time>
            <b>Nhận bàn vào lúc: </b>
            {moment(book.thoiGianNhanBan).format(`hh:mm a DD/MM/yyyy`)}
          </Time>
          <Time>
            <b>Đặt bàn vào lúc: </b>
            {moment(Date.parse(book.createAt)).format(`hh:mm a DD/MM/yyyy`)}
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
