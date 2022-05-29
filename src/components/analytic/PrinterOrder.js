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
PrinterOrder.prototype = {
  printRef: PropTypes.object,
  from: PropTypes.any,
  to: PropTypes.any,
  status: PropTypes.string,
  orders: PropTypes.array
};
const CellHeader = styled(TableCell)(({ theme }) => ({
  fontSize: '14x',
  fontFamily: theme.typography.fontFamily.primary,
  padding: 5,
  background: '#fff',
  zIndex: 1
}));
function TableRowOrder({ order, index }) {
  const Row = styled(TableRow)(({ theme }) => ({
    width: '100%'
  }));
  const Cell = styled(TableCell)(({ theme }) => ({
    padding: 5,
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '12px'
  }));
  const getTotal = () => {
    let total = 0;
    order.donDatBan.listChiTietDonDatBan.forEach((item) => {
      total += item.monAn.donGia * item.soLuong;
    });
    return (
      total + order.donDatBan.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000
    );
  };
  const checkUserCreate = () => {
    if (order.nhanVien) return `${order.nhanVien.hoTen} - Nhân viên`;
    return `${order.nguoiQuanLy.hoTen} - Quản lý`;
  };
  return (
    <Row>
      <Cell>{index + 1}</Cell>
      <Cell>{order.donDatBan.khachHang.hoTen}</Cell>
      <Cell>{order.donDatBan.khachHang.soDienThoai}</Cell>
      <Cell>{checkUserCreate()}</Cell>
      <Cell>{moment(order.donDatBan.createAt).format(`DD-MM-YYYY`)}</Cell>
      <Cell>{moment(order.createAt).format(`DD-MM-YYYY`)}</Cell>
      <Cell>{getTotal().toLocaleString(`es-US`)}</Cell>
    </Row>
  );
}
function PrinterOrder({ printRef, from, to, status, orders }) {
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
      width: '20%'
    },
    {
      name: 'Số điện thoại',
      width: '15%'
    },
    {
      name: 'Người lập hoá đơn',
      width: '15%'
    },
    {
      name: 'Thời gian đặt bàn',
      width: '15%'
    },
    {
      name: 'Thời gian lập hoá đơn',
      width: '15%'
    },
    {
      name: 'Tổng tiền',
      width: '15%'
    }
  ];
  const getTotalRevenue = (order) => {
    let total = 0;
    order.donDatBan.listChiTietDonDatBan.forEach((ct) => {
      total += ct.monAn.donGia * ct.soLuong;
    });
    return (
      total + order.donDatBan.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000
    );
  };
  const getTotal = () => {
    let total = 0;
    orders.forEach((order) => {
      total += getTotalRevenue(order);
    });
    return total;
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
          Thống kê hoá đơn
        </Typography>
        {status === 'all' ? (
          <TitleInfo>Tất cả hoá đơn</TitleInfo>
        ) : (
          <TitleInfo>
            Hoá đơn từ: {`${moment(from).format(`DD/MM/YYYY`)}`} đến{' '}
            {`${moment(to).format(`DD/MM/YYYY`)}`}
          </TitleInfo>
        )}
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
            {orders.map((item, index) => (
              <TableRowOrder key={index} order={item} index={index} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Info>Tổng tiền của tất cả hoá đơn: {getTotal().toLocaleString('es-US')} vnd</Info>
    </RootStyle>
  );
}

export default PrinterOrder;
