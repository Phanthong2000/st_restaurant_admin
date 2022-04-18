import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: '30px',
  cursor: 'pointer'
}));
const IconMenu = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  color: theme.palette.gray
}));
const NameMenu = styled(Typography)(({ theme }) => ({
  marginLeft: '20px',
  fontWeight: 'bold',
  color: theme.palette.gray
}));
MenuItem.prototype = {
  menu: PropTypes.object
};
function MenuItem({ menu }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const allMessages = useSelector((state) => state.chat.allMessages);
  const goToPath = () => {
    if (menu.path === '/home/chat') {
      const message = allMessages.at(0);
      if (
        message.nguoiQuanLy.id !== user.id &&
        message.listNguoiQuanLyDaDoc.filter((item) => item.id === user.id).length === 0
      ) {
        axios.put(
          `${api}tinNhan/edit`,
          {
            ...message,
            listNguoiQuanLyDaDoc: [...message.listNguoiQuanLyDaDoc, user]
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        );
      }
    }
    navigate(`${menu.path}`);
  };
  return (
    <RootStyle onClick={goToPath}>
      <IconMenu sx={{ color: pathname.includes(menu.path) && '#3C58C9' }} icon={menu.icon} />
      <NameMenu sx={{ color: pathname.includes(menu.path) && '#3C58C9' }}>{menu.name}</NameMenu>
    </RootStyle>
  );
}

export default MenuItem;
