import React, { useEffect } from 'react';
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
  top: 40,
  right: 170,
  padding: theme.spacing(2),
  zIndex: 100,
  [theme.breakpoints.only('xs')]: {
    right: 70
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
function BoxNotification() {
  const dispatch = useDispatch();
  const allNotifications = useSelector((state) => state.user.allNotifications);
  useEffect(() => {
    window.addEventListener('click', () => {
      // dispatch(actionUserBoxNotification(false));
    });
    return function () {
      return null;
    };
  }, []);
  return (
    <RootStyle boxShadow={3}>
      <ArrowToNotification icon="ant-design:caret-right-filled" />
      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Thông báo</Typography>
      <BoxContent>
        <Scrollbar alwaysShowTracks>
          {allNotifications.map((item, index) => (
            <Notification key={index} notification={item} indexNoti={index} />
          ))}
        </Scrollbar>
      </BoxContent>
    </RootStyle>
  );
}

export default BoxNotification;
