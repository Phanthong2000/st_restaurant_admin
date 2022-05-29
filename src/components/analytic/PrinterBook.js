import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
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
  marginTop: '20px',
  textAlign: 'center'
}));
const Info = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  textAlign: 'left',
  width: '100%',
  marginTop: '10px'
}));
PrinterBook.prototype = {
  printRef: PropTypes.object,
  from: PropTypes.any,
  to: PropTypes.any,
  status: PropTypes.string,
  books: PropTypes.array
};
const CellHeader = styled(TableCell)(({ theme }) => ({
  fontSize: '14x',
  fontFamily: theme.typography.fontFamily.primary,
  padding: 5,
  background: '#fff',
  zIndex: 1
}));
function TableRowBook({ book, index }) {
  const Row = styled(TableRow)(({ theme }) => ({
    width: '100%'
  }));
  const Cell = styled(TableCell)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '12px'
  }));
  const getTotal = () => {
    let total = 0;
    book.listChiTietDonDatBan.forEach((item) => {
      total += item.monAn.donGia * item.soLuong;
    });
    return total + book.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000;
  };
  const checkStatus = () => {
    if (
      book.trangThai === `0` &&
      new Date().getTime() -
        (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung * 60 * 1000) <=
        0
    )
      return `Chưa sử dụng`;
    if (book.trangThai === '1') return 'Đã sử dụng';
    if (
      new Date().getTime() -
        (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung * 60 * 1000) >
        0 &&
      book.trangThai === `0`
    )
      return `Đã quá hạn`;
    if (book.trangThai === '2') return 'Đang sử dụng';
  };
  return (
    <Row>
      <Cell>{index + 1}</Cell>
      <Cell>{book.khachHang.hoTen}</Cell>
      <Cell>{book.khachHang.soDienThoai}</Cell>
      <Cell>{moment(book.thoiGianNhanBan).format(`DD-MM-YYYY`)}</Cell>
      <Cell>{moment(book.createAt).format(`DD-MM-YYYY`)}</Cell>
      <Cell>{book.listChiTietDonDatBan.length}</Cell>
      <Cell>{checkStatus()}</Cell>
      <Cell>{getTotal().toLocaleString(`es-US`)}</Cell>
    </Row>
  );
}
function PrinterBook({ printRef, from, to, status, books }) {
  const user = useSelector((state) => state.user.user);
  const checkRole = () => {
    if (user.taiKhoan.vaiTro.tenVaiTro === 'EMPLOYEE') return `Nhân viên`;
    return `Quản lý`;
  };
  const header = [
    {
      name: 'STT',
      width: '5%'
    },
    {
      name: 'Tên khách hàng',
      width: '15%'
    },
    {
      name: 'Số điện thoại',
      width: '10%'
    },
    {
      name: 'Thời gian nhận bàn',
      width: '15%'
    },
    {
      name: 'Thời gian đặt bàn',
      width: '15%'
    },
    {
      name: 'Số lượng món ăn',
      width: '10%'
    },
    {
      name: 'Trạng thái',
      width: '10%'
    },
    {
      name: 'Tổng tiền',
      width: '10%'
    }
  ];
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
          Thống kê đơn đặt bàn
        </Typography>
        {status === 'all' ? (
          <TitleInfo>Tất cả đơn đặt bàn</TitleInfo>
        ) : (
          <TitleInfo>
            Đơn đặt bàn từ: {`${moment(from).format(`DD/MM/YYYY`)}`} đến{' '}
            {`${moment(to).format(`DD/MM/YYYY`)}`}
          </TitleInfo>
        )}
        <TitleInfo>
          Trạng thái đơn đặt bàn: {moment(new Date().getTime()).format(`hh:mm a DD/MM/YYYY`)}
        </TitleInfo>
        <Info>
          Người lập thống kê: {user.hoTen} - {checkRole()}
        </Info>
      </BoxContent>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <CellHeader key={index} sx={{ width: item.width }}>
                  {item.name}
                </CellHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((item, index) => (
              <TableRowBook key={index} book={item} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Info>Số lượng đơn đặt bàn: {books.length}</Info>
    </RootStyle>
  );
}

export default PrinterBook;
