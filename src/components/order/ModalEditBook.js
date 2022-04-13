import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Scrollbar } from 'smooth-scrollbar-react';
import axios from 'axios';
import { actionGetBooksByKeyword, actionOrderModalEditBook } from '../../redux/actions/orderAction';
import api from '../../assets/api/api';
import { actionUserSnackbar } from '../../redux/actions/userAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '700px',
  background: '#fff',
  padding: theme.spacing(2, 2, 2),
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    width: '500px'
  }
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '600px',
  display: 'flex'
}));
const Input = styled(TextField)(({ theme }) => ({
  marginTop: '10px'
}));
const ButtonEdit = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '10px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
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
      width: '40%'
    },
    {
      name: 'Số người',
      width: '30%'
    },
    {
      name: 'Khu vực',
      width: '20%'
    }
  ];
  return (
    <TableContainer>
      <Table sx={{ marginTop: '10px' }}>
        <TableHead>
          <TableRow sx={{ background: 'gray' }}>
            {headers.map((item, index) => (
              <TableCell key={index} sx={{ width: item.width, color: '#fff', fontWeight: 'bold' }}>
                {item.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listBan.map((item, index) => (
            <TableRow
              sx={
                index % 2 === 0
                  ? { background: 'lightgrey', color: '#fff' }
                  : { background: '#fff', color: '#000' }
              }
              key={index}
            >
              <Cell>{index + 1}</Cell>
              <Cell>{item.tenBan}</Cell>
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
    <RootStyle sx={{ background: index % 2 !== 0 && 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>{food.monAn.tenMonAn}</Cell>
      <Cell>{`${food.monAn.donGia.toLocaleString('es-US')} vnđ`}</Cell>
      <Cell>{food.ghiChu}</Cell>
      <Cell>{`${(food.monAn.donGia * food.soLuong).toLocaleString('es-US')} vnđ`}</Cell>
    </RootStyle>
  );
}
function TableFood({ tab, listChiTietDonDatBan }) {
  const headerFood = [
    { name: 'STT', minWidth: '10%' },
    { name: 'Tên món ăn', minWidth: '25%' },
    { name: 'Giá', minWidth: '20%' },
    { name: 'Ghi chú', minWidth: '20%' },
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
    <Box sx={{ marginTop: '10px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headerFood.map((item, index) => (
                <TableCell
                  key={index}
                  sx={{
                    width: item.minWidth,
                    background: 'gray',
                    color: '#fff'
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
function ModalEditBook() {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');
  const modalEditBook = useSelector((state) => state.order.modalEditBook);
  // const [tab, setTab] = useState(modalEditBook.book.listLoaiBan.at(0).order);
  useEffect(() => {
    setStatus(modalEditBook.book.trangThai);
    return function () {
      return null;
    };
  }, []);
  const handleClose = () => {
    dispatch(
      actionOrderModalEditBook({
        status: false,
        book: {}
      })
    );
  };
  const getTotal = () => {
    let total = 0;
    modalEditBook.book.listChiTietDonDatBan.forEach((item) => {
      total += item.monAn.donGia * item.soLuong;
    });
    return total;
  };
  const checkStatus = () => {
    if (
      modalEditBook.book.trangThai === `0` &&
      new Date().getTime() -
        (Date.parse(modalEditBook.book.thoiGianNhanBan) +
          modalEditBook.book.thoiGianDuKienSuDung * 60 * 1000) <=
        0
    )
      return `Chưa sử dụng`;
    if (modalEditBook.book.trangThai === '1') return 'Đã sử dụng';
    if (
      new Date().getTime() -
        (Date.parse(modalEditBook.book.thoiGianNhanBan) +
          modalEditBook.book.thoiGianDuKienSuDung * 60 * 1000) >
        0 &&
      modalEditBook.book.trangThai === `0`
    )
      return `Đã quá hạn`;
    if (modalEditBook.book.trangThai === '2') return 'Đang sử dụng';
  };
  const edit = () => {
    const book = {
      ...modalEditBook.book,
      trangThai: status
    };
    axios
      .put(
        `${api}donDatBan/edit`,
        {
          ...book
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        dispatch(actionGetBooksByKeyword(''));
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Cập nhật đơn đặt bàn thành công',
            type: 'success'
          })
        );
        handleClose();
      })
      .catch((err) => console.log(err));
  };
  // const handleChangeTab = (event, newValue) => {
  //   setTab(newValue);
  // };
  return (
    <Modal open={modalEditBook.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Thông tin đơn đặt bàn
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar style={{ padding: '0px 10px' }} alwaysShowTracks>
            <Box> </Box>
            <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
              Thời gian đặt bàn:
              {` ${moment(modalEditBook.book.createAt).format('hh:mm a DD/MM/YYYY')}`}
            </Typography>
            <Input
              fullWidth
              disabled
              label="Thời gian nhận bàn"
              value={moment(modalEditBook.book.thoiGianNhanBan).format(`hh:mm a DD/MM/YYYY`)}
            />
            <Input
              fullWidth
              disabled
              label="Thời gian dự kiến sử dụng"
              value={`${modalEditBook.book.thoiGianDuKienSuDung / (60 * 1000)}p`}
            />
            <Input
              fullWidth
              disabled
              label="Số lượng khách"
              value={modalEditBook.book.soLuongKhach}
            />
            <Input
              fullWidth
              disabled
              label="Tên khách hàng"
              value={modalEditBook.book.khachHang.hoTen}
            />
            <Input
              fullWidth
              disabled
              label="Số điện thoại"
              value={modalEditBook.book.khachHang.soDienThoai}
            />
            <Input
              multiline
              fullWidth
              minRows={5}
              maxRows={5}
              disabled
              label="Ghi chú"
              value={modalEditBook.book.ghiChu}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '10px'
              }}
            >
              <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                Số lượng món ăn: {modalEditBook.book.listChiTietDonDatBan.length}
              </Typography>
              <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                Tổng tiền: {getTotal().toLocaleString(`es-US`)} vnđ
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
              {/* <Tabs value={tab} onChange={handleChangeTab}>
                {modalEditBook.book.listLoaiBan.map((item, index) => (
                  <Tab key={index} value={item.order} label={`Loại ${item.order}`} />
                ))}
              </Tabs> */}
              <TableFood listChiTietDonDatBan={modalEditBook.book.listChiTietDonDatBan} />
              <Typography
                sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px', marginTop: '20px' }}
              >
                Danh sách bàn:
              </Typography>
              <TableTable listBan={modalEditBook.book.listBan} />
            </Box>
            <Box sx={{ marginTop: '10px' }}>
              {checkStatus() === 'Đã quá hạn' ? (
                <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                  Trạng thái: Đã quá hạn
                </Typography>
              ) : (
                <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                  <FormLabel>Trạng thái</FormLabel>
                  <RadioGroup row>
                    <FormControlLabel
                      disabled={checkStatus() === 'Đang sử dụng' || checkStatus() === 'Đã sử dụng'}
                      value="0"
                      control={<Radio onClick={() => setStatus('0')} checked={status === '0'} />}
                      label="Chưa sử dụng"
                    />
                    <FormControlLabel
                      disabled={checkStatus() === 'Đã sử dụng'}
                      value="2"
                      control={<Radio onClick={() => setStatus('2')} checked={status === '2'} />}
                      label="Đang sử dụng"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </Box>
            {checkStatus() !== 'Đã sử dụng' && checkStatus() !== 'Đã quá hạn' && (
              <Box
                sx={{ width: '100%', marginTop: `10px`, textAlign: 'center', marginBottom: '10px' }}
              >
                <ButtonEdit disabled={status === modalEditBook.book.trangThai} onClick={edit}>
                  Cập nhật
                </ButtonEdit>
              </Box>
            )}
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalEditBook;
