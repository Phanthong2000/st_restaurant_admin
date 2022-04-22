import React from 'react';
import {
  styled,
  Box,
  Typography,
  Divider,
  TableRow,
  Table,
  TableContainer,
  TableCell,
  TableHead,
  TableBody
} from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));
const ImageRestaurant = styled('img')(({ theme }) => ({
  width: '100px',
  height: '100px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '25px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: 'bold'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}));
const TitleInfo = styled(Typography)(({ theme }) => ({
  width: '100%',
  color: 'gray',
  fontSize: '16px',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  marginTop: '20px'
}));
const Info = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  textAlign: 'left',
  width: '100%'
}));
function TableTable({ listBan }) {
  const Cell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold'
  }));
  const headers = [
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Tên bàn',
      width: '25%'
    },
    {
      name: 'Loại bàn',
      width: '25%'
    },
    {
      name: 'Số người',
      width: '20%'
    },
    {
      name: 'Khu vực',
      width: '20%'
    }
  ];
  return (
    <TableContainer>
      <Table sx={{ marginTop: '10px', border: `1px solid lightgrey` }}>
        <TableHead>
          <TableRow>
            {headers.map((item, index) => (
              <TableCell key={index} sx={{ width: item.width, color: '#000', fontWeight: 'bold' }}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listBan.map((item, index) => (
            <TableRow sx={{ background: index % 2 !== 0 && '#f0fafc' }} key={index}>
              <Cell>{index + 1}</Cell>
              <Cell>{item.tenBan}</Cell>
              <Cell>{item.loaiBan}</Cell>
              <Cell>{item.soNguoiToiDa}</Cell>
              <Cell>{item.khuVuc.tenKhuVuc}</Cell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function TableRowFood({ food, index }) {
  const RootStyle = styled(TableRow)(({ theme }) => ({
    background: theme.palette.white
  }));
  const Cell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold'
  }));
  return (
    <RootStyle sx={{ background: index % 2 !== 0 && '#f0fafc' }}>
      <Cell>{index + 1}</Cell>
      <Cell>{food.monAn.tenMonAn}</Cell>
      <Cell>{`${food.monAn.donGia.toLocaleString('es-US')} vnđ`}</Cell>
      <Cell>{food.soLuong}</Cell>
      <Cell>{food.ghiChu}</Cell>
      <Cell>{`${(food.monAn.donGia * food.soLuong).toLocaleString('es-US')} vnđ`}</Cell>
    </RootStyle>
  );
}
function TableFood({ tab, listChiTietDonDatBan }) {
  const headerFood = [
    { name: 'STT', minWidth: '5%' },
    { name: 'Tên món ăn', minWidth: '20%' },
    { name: 'Giá', minWidth: '20%' },
    { name: 'Số lượng', minWidth: '20px' },
    { name: 'Ghi chú', minWidth: '15%' },
    { name: 'Thành tiền', minWidth: '20%' }
  ];
  // const getTotalTab = () => {
  //   let total = 0;
  //   loaiBan.listChiTietDonDatBan.forEach((food) => {
  //     total += food.monAn.donGia * food.soLuong;
  //   });
  //   return total;
  // };

  // if (tab !== loaiBan.order) return null;
  return (
    <Box sx={{ marginTop: '10px', width: '100%' }}>
      <TableContainer>
        <Table sx={{ border: `1px solid lightgrey` }}>
          <TableHead>
            <TableRow>
              {headerFood.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: item.minWidth,
                    fontWeight: 'bold',
                    color: '#000'
                  }}
                >
                  {item.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listChiTietDonDatBan.map((item, index) => (
              <TableRowFood key={index} index={index} food={item} />
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={6} sx={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                Tổng tiền loại {loaiBan.order}: {`${getTotalTab().toLocaleString('es-US')} vnd`}
              </TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>
    </Box>
  );
}
ModalOrderToPrint.prototype = {
  printRef: PropTypes.object,
  book: PropTypes.object,
  vip: PropTypes.number
};
function ModalOrderToPrint({ printRef, book, totalBefore, totalAfter, deposit, vip }) {
  const user = useSelector((state) => state.user.user);
  const checkRole = () => {
    if (user.taiKhoan.vaiTro.tenVaiTro === 'EMPLOYEE') return `Nhân viên`;
    return `Quản lý`;
  };
  return (
    <RootStyle ref={printRef}>
      <BoxTitle>
        <Box sx={{ width: '30%', display: 'flex', justifyContent: 'center' }}>
          <ImageRestaurant src="https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-512.png" />
        </Box>
        <Box
          sx={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Title>Nhà hàng ST Restaurant</Title>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: 'sans-serif',
              textAlign: 'center'
            }}
          >
            Địa chỉ: 1/11/46 Đặng Thuỳ Trâm, phường 13, quận Bình Thạnh, Thành phố Hồ chí Minh
          </Typography>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: 'sans-serif',
              textAlign: 'center'
            }}
          >
            Số điện thoại: 097.102.69.10
          </Typography>
        </Box>
      </BoxTitle>
      <Divider sx={{ margin: '20px 10px' }} />
      <BoxContent>
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif', color: 'red' }}
        >
          Hoá đơn thanh toán
        </Typography>
        <TitleInfo>
          Ngày lập hoá đơn: {moment(new Date().getTime()).format(`hh:mm a DD/MM/YYYY`)}
        </TitleInfo>
        <TitleInfo>Thông tin khách hàng</TitleInfo>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <Info>Tên khách hàng: {book.khachHang.hoTen}</Info>
          <Info>Số điện thoại: {book.khachHang.soDienThoai}</Info>
          <Info>Thời gian đặt bàn: {moment(book.createAt).format(`hh:mm a DD/MM/YYYY`)}</Info>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '10px',
            marginLeft: '10px'
          }}
        >
          <Info>
            Thời gian nhận bàn: {moment(book.thoiGianNhanBan).format(`hh:mm a DD/MM/YYYY`)}
          </Info>
          <Info>Số lượng khách: {book.soLuongKhach}</Info>
          <Info>
            Người lập hoá đơn: {user.hoTen} - {checkRole()}
          </Info>
        </Box>
        <TitleInfo>Danh sách món ăn</TitleInfo>
        <TableFood listChiTietDonDatBan={book.listChiTietDonDatBan} />
        <TitleInfo>Danh sách bàn</TitleInfo>
        <TableTable listBan={book.listBan} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Box> </Box>
          <Box sx={{ marginTop: '20px' }}>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info>Tổng tiền món ăn:</Info>
              <Info>{totalBefore().toLocaleString(`es-US`)}</Info>
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info> </Info>
              <Info>-</Info>
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info>Tiền cọc:</Info>
              <Info>{deposit().toLocaleString(`es-US`)}</Info>
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info> </Info>
              <Info>+</Info>
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info>Phụ thu ({vip} bàn vip):</Info>
              <Info>{(vip * 100000).toLocaleString(`es-US`)}</Info>
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info> </Info>
              <Info>+</Info>
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info>Thuế VAT(10%):</Info>
              <Info>{(totalBefore() * 0.1).toLocaleString(`es-US`)}</Info>
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Divider sx={{ width: '100%', marginTop: '10px' }} />
            </Box>
            <Box
              sx={{
                width: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Info> </Info>
              <Info>{totalAfter.toLocaleString(`es-US`)} vnđ</Info>
            </Box>
          </Box>
        </Box>
      </BoxContent>
    </RootStyle>
  );
}

export default ModalOrderToPrint;
