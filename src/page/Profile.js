import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  styled,
  TextField,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import validate from 'validator';
import axios from 'axios';
import moment from 'moment';
import api from '../assets/api/api';
import {
  actionGetUser,
  actionUserShowHotToast,
  actionUserSnackbar
} from '../redux/actions/userAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2)
}));
const BoxDetail = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: theme.spacing(2),
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '25%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '80%',
  marginLeft: '10%',
  marginBottom: '15px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: '0px'
  }
}));
const Input = styled(TextField)(({ theme }) => ({
  width: '100%'
}));
const AvatarUser = styled(Avatar)(({ theme }) => ({
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    width: '40%',
    height: '40%',
    marginLeft: '30%'
  }
}));
function Profile() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [identification, setIdentification] = useState('');
  const user = useSelector((state) => state.user.user);
  const [error, setError] = useState('');
  useEffect(() => {
    if (loggedIn && user.taiKhoan !== undefined) {
      setUsername(user.taiKhoan.tenDangNhap);
      setFullName(user.hoTen);
      setAvatar(user.anhDaiDien);
      setPhone(user.soDienThoai);
      setEmail(user.email);
      setAddress(user.diaChi);
      setGender(user.gioiTinh);
      setBirthday(user.ngaySinh);
      setIdentification(user.chungMinhThu);
    }
    return function () {
      return null;
    };
  }, [user]);
  if (user.taiKhoan === undefined) return null;
  return (
    <RootStyle>
      <BoxDetail>
        <BoxTitle>
          <Title>Thông tin quản lý</Title>
          <Box sx={{ width: '100%', textAlign: 'center', marginTop: '20px' }}>
            <AvatarUser src={avatar} />
          </Box>
        </BoxTitle>
        <BoxContent>
          <BoxInput>
            <Input disabled fullWidth value={username} label="Tên đăng nhập" />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={fullName}
              disabled
              onChange={(e) => setFullName(e.target.value)}
              label="Họ tên"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={phone}
              disabled
              onChange={(e) => setPhone(e.target.value)}
              label="Số điện thoại"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              disabled
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
              label="Chứng minh thư"
            />
          </BoxInput>
          <BoxInput>
            <Input
              fullWidth
              disabled
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              label="Địa chỉ"
            />
          </BoxInput>
          <BoxInput>
            <DatePicker
              disabled
              customInput={<Input label="Ngày sinh" fullWidth />}
              selected={Date.parse(birthday)}
              dateFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setBirthday(newValue);
              }}
            />
          </BoxInput>
          <BoxInput>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  disabled
                  value="Nam"
                  control={<Radio onClick={() => setGender('Nam')} checked={gender === 'Nam'} />}
                  label="Nam"
                />
                <FormControlLabel
                  disabled
                  value="Nữ"
                  control={<Radio onClick={() => setGender('Nữ')} checked={gender === 'Nữ'} />}
                  label="Nữ"
                />
              </RadioGroup>
            </FormControl>
          </BoxInput>
          <BoxInput>
            <Typography sx={{ width: '100%', textAlign: 'left', color: 'red' }}>{error}</Typography>
          </BoxInput>
        </BoxContent>
      </BoxDetail>
    </RootStyle>
  );
}

export default Profile;
