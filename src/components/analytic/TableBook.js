import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Popper,
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useReactToPrint } from 'react-to-print';
import PrinterBook from './PrinterBook';

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
const ButtonType = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  fontWeight: 'bold',
  marginRight: '10px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function TableRowBook({ book, index }) {
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
function TableBook() {
  const printRef = useRef();
  const booksByKeyword = useSelector((state) => state.order.booksByKeyword);
  const [from, setFrom] = useState();
  const [bookTable, setBookTable] = useState([]);
  const [to, setTo] = useState();
  const user = useSelector((state) => state.user.user);
  const [status, setStatus] = useState('all');
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    setBookTable(booksByKeyword);
    return function () {
      return null;
    };
  }, [booksByKeyword]);
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
  const handleChangeStatus = (status) => {
    setStatus(status);
    if (status === 'all') {
      setBookTable(booksByKeyword);
      setFrom();
      setTo();
    }
  };
  const handleSearch = () => {
    const start = Date.parse(from);
    const end = Date.parse(to);
    if (status === 'setting' && from && to) {
      if (start === end) {
        setBookTable(
          booksByKeyword.filter(
            (book) =>
              Date.parse(book.createAt) >= start && Date.parse(book.createAt) <= start + 86400000
          )
        );
      } else {
        setBookTable(
          booksByKeyword.filter(
            (book) => Date.parse(book.createAt) >= start && Date.parse(book.createAt) <= end
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
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });
  return (
    <RootStyle>
      <BoxTitle>
        <Title>Danh sách đơn đặt bàn</Title>
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
        <ButtonDownload onClick={handlePrint}>
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
          <Table stickyHeader>
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
              {bookTable.map((item, index) => (
                <TableRowBook key={index} book={item} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div style={{ display: 'none' }}>
        <PrinterBook status={status} from={from} to={to} printRef={printRef} books={bookTable} />
      </div>
    </RootStyle>
  );
}

export default TableBook;
