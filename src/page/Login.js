import React, { useEffect, useState } from 'react';
import { Box, Button, Card, InputBase, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import api from '../assets/api/api';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: `${heightScreen}px`,
  background: theme.palette.lightgrey,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
const Logo = styled(Typography)(({ theme }) => ({
  fontSize: '40px',
  fontWeight: 'bold',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary
}));
const Employee = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  color: theme.palette.gray,
  fontFamily: theme.typography.fontFamily.second
}));
const LoginForm = styled(Card)(({ theme }) => ({
  width: '500px',
  background: theme.palette.white,
  marginTop: '50px',
  padding: theme.spacing(2)
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.main
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: '20px',
  border: `2px solid ${theme.palette.black}`,
  padding: theme.spacing(0.5, 2),
  borderRadius: '20px'
}));
const IconInput = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px'
}));
const Input = styled(InputBase)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  marginLeft: '10px'
}));
const ForgotPassword = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16x',
  fontFamily: theme.typography.fontFamily.primary,
  marginTop: '20px',
  cursor: 'pointer',
  ':hover': {
    textDecoration: 'underline'
  }
}));
const ButtonLogin = styled(Button)(({ theme }) => ({
  width: '100%',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '10px',
  fontWeight: 'bold',
  textTransform: 'none',
  padding: theme.spacing(1, 0),
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    if (loggedIn) navigate('/home/app');
    return function () {
      return null;
    };
  }, []);
  const login = () => {
    if (!username.match('^[a-zA-Z0-9]{5,32}$')) {
      setError('Tên đăng nhập không hợp lệ');
    } else if (!password.match('^[a-zA-Z0-9]{5,32}$')) setError('Mật khẩu không hợp lệ');
    else {
      axios
        .get(`${api}taiKhoan/detail/tenDangNhap/${username}`)
        .then((res) => {
          if (res.data.vaiTro.tenVaiTro !== 'ADMIN' || res.data.matKhau !== password)
            setError('Tài khoản không tồn tại');
          else {
            axios
              .get(`${api}nguoiQuanLy/detail/tenDangNhap/${username}`)
              .then((res) => {
                localStorage.setItem('admin', JSON.stringify(res.data));
                window.location.reload();
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((error) => {
          setError('Tài khoản không tồn tại');
        });
    }
  };
  return (
    <RootStyle>
      <Box sx={{ textAlign: 'center' }}>
        <Logo>ST Restaurant</Logo>
        <Employee>Website cho quản lý</Employee>
        <LoginForm elevation={3}>
          <Title>ĐĂNG NHẬP</Title>
          <BoxInput>
            <IconInput icon="ant-design:user-outlined" />
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              placeholder="Tên đăng nhập"
            />
          </BoxInput>
          <BoxInput>
            <IconInput icon="ant-design:key-outlined" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              placeholder="Mật khẩu"
            />
          </BoxInput>
          <Typography sx={{ color: 'red', marginTop: '10px' }}>{error}</Typography>
          <ForgotPassword>Forgot password</ForgotPassword>
          <ButtonLogin onClick={login}>Đăng nhập</ButtonLogin>
        </LoginForm>
      </Box>
    </RootStyle>
  );
}

export default Login;
