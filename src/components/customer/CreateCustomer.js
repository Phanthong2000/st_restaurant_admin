import React from 'react';
import { Box, Card, Grid, styled, TextField, Typography } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#f0f5f4',
  display: 'flex'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const WrapperLeft = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: '10px'
}));
const WrapperRight = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: '10px'
}));
const TitleForm = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxWrapperInput = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const TitleInput = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '13px',
  fontFamily: theme.typography.fontFamily.primary
}));
const InputCustomer = styled(TextField)(({ theme }) => ({
  width: '100%'
}));
function CreateCustomer() {
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks style={{ padding: '10px' }}>
        <BoxTitle>
          <Title>Thêm khách hàng</Title>
        </BoxTitle>
        <BoxContent container>
          <BoxLeft item xs={12} sm={12} md={12} lg={6} xl={6}>
            <WrapperLeft>
              <TitleForm>Thông tin khách hàng</TitleForm>
              <BoxWrapperInput>
                <BoxInput>
                  <TitleInput>Họ và tên</TitleInput>
                  <InputCustomer size="small" fullWidth placeholder="Nhập họ và tên" />
                </BoxInput>
                <BoxInput>
                  <TitleInput>Số điện thoại</TitleInput>
                  <InputCustomer size="small" fullWidth placeholder="Nhập số điện thoại" />
                </BoxInput>
              </BoxWrapperInput>
              <BoxWrapperInput>
                <BoxInput>
                  <TitleInput>Tên đăng nhập</TitleInput>
                  <InputCustomer size="small" fullWidth placeholder="Nhập tên đăng nhập" />
                </BoxInput>
                <BoxInput>
                  <TitleInput>Mật khẩu</TitleInput>
                  <InputCustomer
                    type="password"
                    size="small"
                    fullWidth
                    placeholder="Nhập mật khẩu"
                  />
                </BoxInput>
              </BoxWrapperInput>
              <BoxWrapperInput>
                <BoxInput>
                  <TitleInput>Email</TitleInput>
                  <InputCustomer size="small" fullWidth placeholder="Nhập email" />
                </BoxInput>
                <BoxInput>
                  <TitleInput>Chứng minh thư</TitleInput>
                  <InputCustomer size="small" fullWidth placeholder="Nhập chứng minh thư" />
                </BoxInput>
              </BoxWrapperInput>
              <BoxWrapperInput>
                <BoxInput>
                  <TitleInput>Email</TitleInput>
                  <InputCustomer size="small" fullWidth placeholder="Nhập email" />
                </BoxInput>
                <BoxInput>
                  <TitleInput>Chứng minh thư</TitleInput>
                  <InputCustomer size="small" fullWidth placeholder="Nhập chứng minh thư" />
                </BoxInput>
              </BoxWrapperInput>
            </WrapperLeft>
          </BoxLeft>
          <BoxRight item xs={12} sm={12} md={12} lg={6} xl={6}>
            <WrapperRight>right</WrapperRight>
          </BoxRight>
        </BoxContent>
      </Scrollbar>
    </RootStyle>
  );
}

export default CreateCustomer;
