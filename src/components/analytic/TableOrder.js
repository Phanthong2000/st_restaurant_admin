import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ReactHtmlTableToExcel from 'react-html-table-to-excel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px'
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
    order.donDatBan.listLoaiBan.forEach((loaiBan) => {
      loaiBan.listChiTietDonDatBan.forEach((item) => {
        total += item.monAn.donGia * item.soLuong;
      });
    });
    return total;
  };
  return (
    <Row>
      <Cell>{index + 1}</Cell>
      <Cell>{order.donDatBan.khachHang.hoTen}</Cell>
      <Cell>{order.donDatBan.khachHang.soDienThoai}</Cell>
      <Cell>{moment(order.donDatBan.createAt).format(`DD-MM-YYYY`)}</Cell>
      <Cell>{moment(order.createAt).format(`DD-MM-YYYY`)}</Cell>
      <Cell>{getTotal().toLocaleString(`es-US`)}</Cell>
    </Row>
  );
}
function TableOrder() {
  const allOrders = useSelector((state) => state.analytic.allOrders);
  const [from, setFrom] = useState();
  const [orderTable, setOrderTable] = useState([]);
  const [to, setTo] = useState();
  const [status, setStatus] = useState('all');
  useEffect(() => {
    setOrderTable(allOrders);
    return function () {
      return null;
    };
  }, [allOrders]);
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
      name: 'Thời gian đặt bàn',
      width: '20%'
    },
    {
      name: 'Thời gian lập hoá đơn',
      width: '20%'
    },
    {
      name: 'Tổng tiền',
      width: '20%'
    }
  ];
  const handleChangeStatus = (status) => {
    setStatus(status);
    if (status === 'all') {
      setOrderTable(allOrders);
      setFrom();
      setTo();
    }
  };
  const handleSearch = () => {
    const start = Date.parse(from);
    const end = Date.parse(to);
    if (status === 'setting' && from && to) {
      if (start === end) {
        setOrderTable(
          allOrders.filter(
            (order) =>
              Date.parse(order.createAt) >= start && Date.parse(order.createAt) <= start + 86400000
          )
        );
      } else {
        setOrderTable(
          allOrders.filter(
            (order) => Date.parse(order.createAt) >= start && Date.parse(order.createAt) <= end
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
      <BoxTitle>
        <Title>Danh sách hoá đơn</Title>
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
        <ReactHtmlTableToExcel
          table="tb"
          filename={
            status !== 'setting' || !from || !to
              ? `Danh-sach-tat-ca-hoa-don-${moment(new Date()).format('hh:mmaDD/MM/YY')}`
              : `Danh-sach-hoa-don-tu-${moment(from).format('DD/MM/YY')}-den-${moment(to).format(
                  'DD/MM/YY'
                )}-${moment(new Date()).format('hh:mmaDD/MM/YY')}`
          }
          sheet="Sheet"
          buttonText={
            <ButtonDownload>
              <Icon style={{ marginRight: '5px' }} icon="uil:export" />
              Xuất báo cáo
            </ButtonDownload>
          }
        />
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
              {orderTable.map((item, index) => (
                <TableRowOrder key={index} order={item} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </RootStyle>
  );
}

export default TableOrder;
