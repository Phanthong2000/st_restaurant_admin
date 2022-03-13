import React from 'react';
import { Avatar, Box, List, ListItemButton, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { actionAuthLoggedIn } from '../../redux/actions/authAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '300px',
  background: 'lightgrey',
  position: 'absolute',
  padding: theme.spacing(2),
  borderRadius: '10px',
  zIndex: 2,
  top: 40,
  right: 110,
  [theme.breakpoints.only('xs')]: {
    right: 10
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
  color: 'lightgrey'
}));
function BoxProfile() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem('admin');
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
