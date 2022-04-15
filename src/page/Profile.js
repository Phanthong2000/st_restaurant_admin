import React, { useEffect, useState } from 'react';
import { Box, Card, styled, Typography, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import moment from 'moment';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f5f4'
}));
const BoxDetail = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  paddingBottom: '10px',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));
const Background = styled('img')(({ theme }) => ({
  width: '100%',
  height: '350px'
}));
const BoxInfo = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const WrapperAvatar = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const AvatarUser = styled('img')(({ theme }) => ({
  width: '250px',
  height: '300px',
  outline: '10px solid #fff',
  marginTop: '-100px'
}));
const BoxUsername = styled(Box)(({ theme }) => ({
  width: '100%'
}));
const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxDate = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px'
}));
const IconDate = styled(Icon)(({ theme }) => ({
  width: '25px',
  height: '25px',
  color: theme.palette.gray
}));
const Date = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.gray,
  fontSize: '18px',
  marginLeft: '5px'
}));
const BoxGender = styled(Box)(({ theme }) => ({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mainHover,
  borderRadius: '20px'
}));
function Info({ icon, value, label }) {
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    background: theme.palette.white,
    borderRadius: '10px',
    padding: '30px 20px',
    border: `1px solid lightgrey`
  }));
  const WrapperIcon = styled(Box)(({ theme }) => ({
    color: theme.palette.main,
    borderRadius: '30px',
    border: `1px solid lightgrey`,
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));
  const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary
  }));
  const Value = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary
  }));
  return (
    <Grid sx={{ width: '100%', padding: '20px' }} item xs={12} sm={6} md={6} xl={6} lg={6}>
      <Wrapper>
        <WrapperIcon>
          <Icon style={{ width: '25px', height: '25px' }} icon={icon} />
        </WrapperIcon>
        <Box sx={{ marginLeft: '20px' }}>
          <Label>{label}</Label>
          <Value>{value}</Value>
        </Box>
      </Wrapper>
    </Grid>
  );
}
function Profile() {
  const user = useSelector((state) => state.user.user);
  if (user.taiKhoan === undefined) return null;
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <Box sx={{ width: '100%', padding: '10px' }}>
          <BoxDetail>
            <Background src="https://lh3.googleusercontent.com/ytWZKEfkZpozAjmNW1r_Kmul8DU67BAl9UZPwCEr8g5_Is8cJLHcYLP71QTxuq_A8WLBDjbn40gmHvpanw5sw_38=w640-h400-e365-rj-sc0x00ffffff" />
            <BoxInfo container>
              <WrapperAvatar item xs={12} sm={12} md={12} lg={4} xl={4}>
                <AvatarUser src={user.anhDaiDien} />
              </WrapperAvatar>
              <Grid item sx={{ padding: '10px' }} xs={10} sm={10} md={10} lg={6} xl={6}>
                <BoxUsername>
                  <Username>{user.hoTen}</Username>
                  <BoxDate>
                    <IconDate icon="cil:clock" />
                    <Date>Ngày vào làm {moment(user.createAt).format(`DD/MM/YYYY`)}</Date>
                  </BoxDate>
                  <BoxDate>
                    <IconDate icon="clarity:calendar-line" />
                    <Date>Ngày sinh {moment(user.ngaySinh).format(`DD/MM/YYYY`)}</Date>
                  </BoxDate>
                </BoxUsername>
              </Grid>
              <Grid item sx={{ padding: '10px' }} xs={2} sm={2} md={2} lg={2} xl={2}>
                <BoxGender>
                  <Icon
                    style={{ color: '#fff', width: '25px', height: '25px' }}
                    icon={user.gioiTinh === 'Nam' ? `bi:gender-male` : `bi:gender-female`}
                  />
                  <Typography
                    sx={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      marginLeft: '5px',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    {user.gioiTinh}
                  </Typography>
                </BoxGender>
              </Grid>
            </BoxInfo>
          </BoxDetail>
          <Box> </Box>
        </Box>
        <Grid sx={{ marginTop: '10px' }} container>
          <Info
            icon="ant-design:user-outlined"
            value={user.taiKhoan.tenDangNhap}
            label="Tên đăng nhập"
          />
          <Info icon="carbon:phone" value={user.soDienThoai} label="Số điện thoại" />
          <Info icon="mi:email" value={user.email} label="Email" />
          <Info
            icon="heroicons-outline:identification"
            value={user.chungMinhThu}
            label="Chứng minh thư"
          />
          <Info icon="mdi:map-marker-outline" value={user.diaChi} label="Địa chỉ" />
        </Grid>
      </Scrollbar>
    </RootStyle>
  );
}

export default Profile;
