import React, { useEffect, useState } from 'react';
import {
  styled,
  Box,
  Card,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableFooter,
  TableRow,
  Typography,
  Button,
  TableHead,
  Input,
  Radio,
  RadioGroup,
  FormControlLabel,
  Tooltip
} from '@mui/material';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import api from '../../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '2px',
  border: `1px solid lightgrey`,
  padding: '10px',
  background: theme.palette.white
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: 'bolder'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const ButtonDownload = styled(Box)(({ theme }) => ({
  fontSize: '13px',
  fontFamily: theme.typography.fontFamily.primary,
  border: `1px solid lightgrey`,
  padding: '2px 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.lightgrey,
  cursor: 'pointer',
  borderRadius: '5px',
  ':hover': {
    background: 'lightgrey'
  }
}));
const CellHeader = styled(TableCell)(({ theme }) => ({
  fontSize: '14x',
  fontFamily: theme.typography.fontFamily.primary,
  padding: 5,
  background: '#fff',
  zIndex: 1
}));
const BoxSort = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  zIndex: 999
}));
const BoxTime = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '5px 10px',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  marginLeft: '5px',
  ':hover': {
    background: theme.palette.lightgrey
  }
}));
const Time = styled(Typography)(({ theme }) => ({
  color: 'gray',
  fontSize: '14px'
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  padding: '5px',
  borderRadius: '10px',
  background: theme.palette.main,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '10px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const IconSearch = styled(Icon)(({ theme }) => ({
  width: '20px',
  height: '20px',
  color: theme.palette.white
}));
const IconTime = styled(Icon)(({ theme }) => ({
  width: '25px',
  height: '25px',
  color: 'gray',
  marginLeft: '5px'
}));
function TableRowCustomer({ customer, index }) {
  const [quantity, setQuantity] = useState(-1);
  const getQuantityBook = () => {
    axios
      .get(`${api}donDatBan/list/maKhachHang/`, {
        params: {
          maKhachHang: customer.id
        },

        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        setQuantity(res.data.length);
      });
  };
  useEffect(() => {
    getQuantityBook();
    return function () {
      return null;
    };
  }, []);
  const Row = styled(TableRow)(({ theme }) => ({
    width: '100%'
  }));
  const Cell = styled(TableCell)(({ theme }) => ({
    padding: 5,
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '12px'
  }));
  if (quantity === -1) return null;
  return (
    <Row>
      <Cell>{index + 1}</Cell>
      <Cell>{customer.hoTen}</Cell>
      <Cell>{customer.soDienThoai}</Cell>
      <Cell>{customer.email}</Cell>
      <Cell>{customer.chungMinhThu}</Cell>
      <Cell>{customer.gioiTinh}</Cell>
      <Cell>{customer.taiKhoan.trangThai}</Cell>
      <Cell>{quantity}</Cell>
      <Cell>{moment(customer.createAt).format(`DD-MM-YYYY`)}</Cell>
    </Row>
  );
}
function TableCustomer() {
  const customers = useSelector((state) => state.customer.customers);
  const [from, setFrom] = useState();
  const user = useSelector((state) => state.user.user);
  const [customerTable, setCustomerTable] = useState([]);
  const [to, setTo] = useState();
  const [status, setStatus] = useState('all');
  useEffect(() => {
    setCustomerTable(customers);
    return function () {
      return null;
    };
  }, [customers]);
  const header = [
    {
      name: 'STT',
      width: '5%'
    },
    {
      name: 'Họ tên',
      width: '15%'
    },
    {
      name: 'Số điện thoại',
      width: '10%'
    },
    {
      name: 'Email',
      width: '15%'
    },
    {
      name: 'CMND',
      width: '10%'
    },
    {
      name: 'Giới tính',
      width: '10%'
    },
    {
      name: 'Trạng thái',
      width: '10%'
    },
    {
      name: 'SL đơn đặt bàn',
      width: '12%'
    },
    {
      name: 'Thời gian tham gia',
      width: '13%'
    }
  ];
  const handleChangeStatus = (status) => {
    setStatus(status);
    if (status === 'all') {
      setCustomerTable(customers);
      setFrom();
      setTo();
    }
  };
  const handleSearch = () => {
    const start = Date.parse(from);
    const end = Date.parse(to);
    if (status === 'setting' && from && to) {
      if (start === end) {
        setCustomerTable(
          customers.filter(
            (customer) =>
              Date.parse(customer.createAt) >= start &&
              Date.parse(customer.createAt) <= start + 86400000
          )
        );
      } else {
        setCustomerTable(
          customers.filter(
            (customer) =>
              Date.parse(customer.createAt) >= start && Date.parse(customer.createAt) <= end
          )
        );
      }
    }
  };
  const handleChangeFrom = (newValue) => {
    setFrom(newValue);
    if (Date.parse(newValue) > to) {
      setTo(newValue);
    }
  };
  return (
    <RootStyle>
      <BoxContent>
        <BoxTitle>
          <Title>Danh sách khách hàng</Title>
          <BoxSort>
            <Box>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={status}
                name="radio-buttons-group"
                sx={{ width: '200px', display: 'flex' }}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio onChange={() => handleChangeStatus('all')} />}
                  label="Tất cả"
                />
                <FormControlLabel
                  value="setting"
                  control={<Radio onChange={() => handleChangeStatus('setting')} />}
                  label="Tuỳ chọn"
                />
              </RadioGroup>
            </Box>
            <Title>Từ</Title>
            <DatePicker
              customInput={
                <BoxTime>
                  <Time>{moment(from).format(`DD/MM/YYYY`)}</Time>
                  <IconTime icon="dashicons:calendar-alt" />
                </BoxTime>
              }
              maxDate={new Date().getTime()}
              disabled={status === 'all'}
              selected={from}
              dateFormat="dd/MM/yyyy"
              onChange={handleChangeFrom}
            />
            <Typography sx={{ fontSize: '20px', margin: `0px 10px` }}>-</Typography>
            <Title>Đến</Title>
            <DatePicker
              customInput={
                <BoxTime>
                  <Time>{moment(to).format(`DD/MM/YYYY`)}</Time>
                  <IconTime icon="dashicons:calendar-alt" />
                </BoxTime>
              }
              maxDate={new Date().getTime()}
              minDate={from}
              disabled={status === 'all'}
              selected={to}
              dateFormat="dd/MM/yyyy"
              onChange={(newValue) => {
                setTo(newValue);
              }}
            />
            <BoxSearch
              onClick={handleSearch}
              sx={
                (status === 'all' || !from || !to) && {
                  background: 'red',
                  cursor: 'not-allowed',
                  '&:hover': { background: 'red' }
                }
              }
            >
              {status === 'all' || !from || !to ? (
                <Tooltip title="Vui lòng chọn tuỳ chọn">
                  <IconSearch icon="ic:round-search-off" />
                </Tooltip>
              ) : (
                <Tooltip title="Xác nhận lọc">
                  <IconSearch icon="ic:round-search" />
                </Tooltip>
              )}
            </BoxSearch>
          </BoxSort>
          <ButtonDownload>
            <Icon style={{ marginRight: '5px' }} icon="uil:export" />
            Xuất báo cáo
          </ButtonDownload>
        </BoxTitle>
        <Box
          sx={{
            border: `1px solid lightgrey`,
            maxHeigh: '500px',
            marginTop: '10px',
            borderRadius: '2px'
          }}
        >
          <TableContainer sx={{ maxHeight: '400px' }}>
            <Table id="tb" stickyHeader>
              <TableRow sx={{ display: 'none' }}>
                <TableCell rowSpan={6} colSpan={3} sx={{ height: '120px', fontWeight: 'bold' }}>
                  <img
                    style={{ width: '100px', height: '100px' }}
                    src="https://cdn2.iconfinder.com/data/icons/building-vol-2/512/restaurant-120.png"
                    alt="imagerestaurant"
                  />
                </TableCell>
              </TableRow>
              <TableRow sx={{ display: 'none' }}>
                <TableCell colSpan={8} sx={{ height: '120px', fontWeight: 'bold' }}>
                  <Typography>Nhà hàng ST Restaurant</Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ display: 'none' }}>
                <TableCell colSpan={8} sx={{ height: '120px', fontWeight: 'bold' }}>
                  <Typography>
                    Địa chỉ: 1/11/46 Đặng Thuỳ Trâm, phường 13, quận Bình Thạnh, Thành phố Hồ Chí
                    Minh
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ display: 'none' }}>
                <TableCell colSpan={8} sx={{ height: '120px', fontWeight: 'bold' }}>
                  <Typography>
                    Danh sách khách hàng
                    {status === 'all'
                      ? ` từ đầu đến nay (${moment(new Date().getTime()).format(`DD/MM/YYYY`)})`
                      : ` từ ${moment(from).format('DD/MM/YYYY')} đến ${moment(to).format(
                          'DD/MM/YYYY'
                        )}`}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ display: 'none' }}>
                <TableCell colSpan={8} sx={{ height: '120px', fontWeight: 'bold' }}>
                  <Typography>
                    Người xuất file:
                    {`Họ và tên: ${user.hoTen} - Số điện thoại: ${user.soDienThoai}`}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow sx={{ display: 'none' }}>
                <TableCell colSpan={8} sx={{ height: '120px', fontWeight: 'bold' }}>
                  <Typography>
                    Xuất file vào lúc:
                    {moment(new Date().getTime()).format(` hh:mm a DD/MM/YYYY`)}
                  </Typography>
                </TableCell>
              </TableRow>
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
                {customerTable.map((item, index) => (
                  <TableRowCustomer key={index} customer={item} index={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </BoxContent>
    </RootStyle>
  );
}

export default TableCustomer;
