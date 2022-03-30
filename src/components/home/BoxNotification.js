import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
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
  useEffect(() => {
    window.addEventListener('click', () => {
      // dispatch(actionUserBoxNotification(false));
    });
    return function () {
      return null;
    };
  }, []);
  const notifications = [
    {
      nguoiGui: {
        id: '622303dd5e6dda0d06f05e4f',
        createAt: '2022-03-05T06:31:57.083+00:00',
        updateAt: '2022-03-05T06:31:57.083+00:00',
        hoTen: 'Phan Văn Thông',
        email: 'phanthong2k000@gmail.com',
        soDienThoai: '0971026910',
        chungMinhThu: '3325422681',
        diaChi: 'Thị xã Sông Cầu',
        gioiTinh: 'Nam',
        ngaySinh: '2000-10-07T17:00:00.000+00:00',
        anhDaiDien:
          'https://firebasestorage.googleapis.com/v0/b/restaurant-43699.appspot.com/o/avatar%2F622303dd5e6dda0d06f05e4f.1648571190066?alt=media&token=ca8cec4e-349b-4c08-966f-e298b75876e9',
        taiKhoan: {
          id: '622303dd5e6dda0d06f05e4e',
          createAt: '2022-03-05T06:31:57.053+00:00',
          updateAt: '2022-03-05T06:31:57.053+00:00',
          tenDangNhap: 'thong123',
          matKhau: '123456',
          trangThai: 'Hiệu lực',
          vaiTro: {
            id: '62218ccee2b13e0af35b067d',
            createAt: '2022-03-04T03:51:42.187+00:00',
            updateAt: '2022-03-04T03:51:42.187+00:00',
            tenVaiTro: 'CUSTOMER'
          }
        }
      },
      noiDung: '622ac352fa9c861f18c0211d',
      trangThai: 'Chưa đọc',
      loai: 'Đặt bàn'
    },
    {
      nguoiGui: {
        id: '622303dd5e6dda0d06f05e4f',
        createAt: '2022-03-05T06:31:57.083+00:00',
        updateAt: '2022-03-05T06:31:57.083+00:00',
        hoTen: 'Phan Văn Thông',
        email: 'phanthong2k000@gmail.com',
        soDienThoai: '0971026910',
        chungMinhThu: '3325422681',
        diaChi: 'Thị xã Sông Cầu',
        gioiTinh: 'Nam',
        ngaySinh: '2000-10-07T17:00:00.000+00:00',
        anhDaiDien:
          'https://firebasestorage.googleapis.com/v0/b/restaurant-43699.appspot.com/o/avatar%2F622303dd5e6dda0d06f05e4f.1648571190066?alt=media&token=ca8cec4e-349b-4c08-966f-e298b75876e9',
        taiKhoan: {
          id: '622303dd5e6dda0d06f05e4e',
          createAt: '2022-03-05T06:31:57.053+00:00',
          updateAt: '2022-03-05T06:31:57.053+00:00',
          tenDangNhap: 'thong123',
          matKhau: '123456',
          trangThai: 'Hiệu lực',
          vaiTro: {
            id: '62218ccee2b13e0af35b067d',
            createAt: '2022-03-04T03:51:42.187+00:00',
            updateAt: '2022-03-04T03:51:42.187+00:00',
            tenVaiTro: 'CUSTOMER'
          }
        }
      },
      noiDung: '62433cfc7186fd282c04e7c4',
      trangThai: 'Đã đọc',
      loai: 'Đặt bàn'
    }
  ];
  return (
    <RootStyle boxShadow={3}>
      <ArrowToNotification icon="ant-design:caret-right-filled" />
      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Thông báo</Typography>
      <BoxContent>
        <Scrollbar alwaysShowTracks>
          {notifications.map((item, index) => (
            <Notification key={index} notification={item} />
          ))}
        </Scrollbar>
      </BoxContent>
    </RootStyle>
  );
}

export default BoxNotification;
