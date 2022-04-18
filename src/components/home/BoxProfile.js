import React, { useEffect } from 'react';
import { Avatar, Box, List, ListItemButton, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { actionAuthLoggedIn } from '../../redux/actions/authAction';
import { actionUserBoxProfile } from '../../redux/actions/userAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '300px',
  background: theme.palette.lightgrey,
  position: 'absolute',
  padding: theme.spacing(2),
  borderRadius: '10px',
  zIndex: 999,
  top: 60,
  right: 240,
  [theme.breakpoints.down('md')]: {
    right: 170,
    top: 50
  },
  [theme.breakpoints.only('sm')]: {
    right: 170,
    top: 60
  }
}));
const ArrowToProfile = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '30px',
  position: 'absolute',
  zIndex: 3,
  right: -20,
  top: 15,
  color: theme.palette.lightgrey
}));
function BoxProfile() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('click', () => {
      dispatch(actionUserBoxProfile(false));
    });
    return function () {
      return null;
    };
  }, []);
  const logout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    dispatch(actionAuthLoggedIn(false));
    navigate('/login');
  };
  return (
    <RootStyle>
      <ArrowToProfile icon="ant-design:caret-right-filled" />
      <List>
        <ListItemButton onClick={() => navigate('/home/profile')}>
          <Avatar src={user.anhDaiDien} />
          <Typography
            sx={{ fontWeight: 'bold', fontSize: '16px', color: '#fff', marginLeft: '10px' }}
          >
            Thông tin người dùng
          </Typography>
        </ListItemButton>
        <ListItemButton
          onClick={logout}
          sx={{ width: '100%', border: `1px solid red`, marginTop: '10px' }}
        >
          <Icon
            style={{ width: '30px', height: '30px', color: 'red' }}
            icon="fluent:sign-out-20-regular"
          />
          <Typography
            sx={{ fontWeight: 'bold', fontSize: '16px', marginLeft: '10px', color: 'red' }}
          >
            Đăng xuất
          </Typography>
        </ListItemButton>
      </List>
    </RootStyle>
  );
}

export default BoxProfile;
