import React, { useEffect, useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import Notification from './Notification';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '400px',
  background: theme.palette.lightgrey,
  position: 'absolute',
  borderRadius: '20px',
  top: 60,
  right: 300,
  padding: theme.spacing(2),
  zIndex: 100,
  [theme.breakpoints.only('xs')]: {
    right: 230,
    top: 50
  }
}));
const ArrowToNotification = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '30px',
  position: 'absolute',
  zIndex: 3,
  right: -20,
  top: 15,
  color: theme.palette.lightgrey
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '500px',
  maxHeight: '500px',
  display: 'flex'
}));
function ButtonSort({ sort, value, label, handleSort }) {
  const ChipSort = styled(Typography)(({ theme }) => ({
    background: sort === value ? theme.palette.main : theme.palette.white,
    color: sort !== value ? theme.palette.main : theme.palette.white,
    padding: '2px 5px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '12px'
  }));
  return (
    <ChipSort
      onClick={(e) => {
        e.stopPropagation();
        handleSort(value);
      }}
    >
      {label}
    </ChipSort>
  );
}
function BoxNotification() {
  const dispatch = useDispatch();
  const allNotifications = useSelector((state) => state.user.allNotifications);
  const [notifications, setNotifications] = useState([]);
  const [sort, setSort] = useState('all');
  const sortNotifications = (sort) => {
    if (sort === 'all') {
      setNotifications(allNotifications);
    } else if (sort === 'read') {
      setNotifications(
        allNotifications.filter((notification) => notification.trangThai === 'Đã đọc')
      );
    } else {
      setNotifications(
        allNotifications.filter((notification) => notification.trangThai === 'Chưa đọc')
      );
    }
  };
  useEffect(() => {
    sortNotifications('all');
    return function () {
      return null;
    };
  }, []);
  const handleSort = (value) => {
    sortNotifications(value);
    setSort(value);
  };
  return (
    <RootStyle boxShadow={3}>
      <ArrowToNotification icon="ant-design:caret-right-filled" />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Thông báo</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonSort handleSort={handleSort} label="Tất cả" value="all" sort={sort} />
          <ButtonSort handleSort={handleSort} label="Đã đọc" value="read" sort={sort} />
          <ButtonSort handleSort={handleSort} label="Chưa đọc" value="unread" sort={sort} />
        </Box>
      </Box>
      <BoxContent>
        <Scrollbar alwaysShowTracks>
          {notifications.map((item, index) => (
            <Notification key={index} notification={item} indexNoti={index} />
          ))}
        </Scrollbar>
      </BoxContent>
    </RootStyle>
  );
}

export default BoxNotification;
