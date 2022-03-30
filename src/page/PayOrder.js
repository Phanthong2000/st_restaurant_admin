import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Input,
  ListItemButton,
  Modal,
  Popper,
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
import { Icon } from '@iconify/react';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import api from '../assets/api/api';
import { actionGetBooksByKeyword, actionNewBooks } from '../redux/actions/orderAction';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex'
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(0, 2)
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 1)
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 1),
  minHeight: `${heightScreen - 100}px`
}));
const InputWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: '20px'
}));
const TitleInformation = styled(Typography)(({ theme }) => ({
  color: theme.palette.lightgrey,
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%',
  color: theme.palette.white,
  fontWeight: 'bold'
}));
const ButtonWayPay = styled(Box)(({ theme }) => ({
  width: '300px',
  background: theme.palette.gray,
  color: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 10px',
  borderRadius: '10px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.black,
    color: theme.palette.white
  }
}));
const BoxPrice = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const PriceDetail = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
const ButtonConfirm = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  color: theme.palette.gray,
  background: theme.palette.white,
  fontWeight: 'bold',
  fontSize: '18px',
  marginTop: '20px',
  ':hover': {
    background: theme.palette.lightgrey,
    color: theme.palette.gray
  }
}));
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
      <Cell>{`${(food.monAn.donGia * food.soLuong).toLocaleString('es-US')} vnđ`}</Cell>
    </RootStyle>
  );
}
function PaymentItem({ payment, click, handleClose }) {
  return (
    <ListItemButton
      onClick={() => {
        click(payment);
        handleClose();
      }}
      sx={{ borderRadius: '5px' }}
    >
      {payment.name}
    </ListItemButton>
  );
}
function ModalConfirm({ open, close, confirm }) {
  const BoxModal = styled(Card)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
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
  const ButtonConfirm = styled(Button)(({ theme }) => ({
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
  return (
    <Modal open={open} onClose={close}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Xác nhận thanh toán</Typography>
          <IconButton onClick={close}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center', margin: '20px 0px' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: 'gray' }}>
            Nhắc nhở: Bạn nên thu tiền trước khi xác nhận thanh toán
          </Typography>
        </Box>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <ButtonConfirm onClick={confirm}>Xác nhận</ButtonConfirm>
        </Box>
      </BoxModal>
    </Modal>
  );
}
function PayOrder() {
  const user = useSelector((state) => state.user.user);
  const bookPayOrder = useSelector((state) => state.order.bookPayOrder);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [wayPay, setWayPay] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  useEffect(() => {
    if (bookPayOrder.id === undefined) {
      navigate('/home/book');
      dispatch(
        actionUserSnackbar({
          status: true,
          content: 'Vui lòng chọn đơn đặt bàn muốn thanh toán',
          type: 'error'
        })
      );
    }
    return function () {
      return null;
    };
  }, [bookPayOrder]);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const headerFood = [
    { name: 'STT', minWidth: '10%' },
    { name: 'Tên món ăn', minWidth: '25%' },
    { name: 'Giá', minWidth: '20%' },
    { name: 'Thành tiền', minWidth: '20%' }
  ];
  const payments = [
    {
      id: 1,
      name: 'Thanh toán bằng tiền mặt'
    },
    {
      id: 2,
      name: 'Thanh toán bằng thẻ ATM'
    }
  ];
  const getTotal = () => {
    let total = 0;
    bookPayOrder.listChiTietDonDatBan.forEach((don) => {
      total += don.monAn.donGia * don.soLuong;
    });
    return total;
  };
  const chooseWayPay = (payment) => {
    setWayPay(payment);
  };
  const openModalConfirm = () => {
    setModalConfirm(true);
  };
  const confirm = () => {
    setModalConfirm(false);
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Đang xử lý thanh toán'
      })
    );
    const bookNew = {
      ...bookPayOrder,
      trangThai: '1'
    };
    axios
      .put(`${api}donDatBan/edit`, {
        ...bookNew
      })
      .then(() => {
        dispatch(actionGetBooksByKeyword(''));
        dispatch(actionNewBooks());
        dispatch(
          actionUserBackdrop({
            status: false,
            content: 'Đang xử lý thanh toán'
          })
        );
        dispatch(
          actionUserSnackbar({
            status: true,
            content: `Thanh toán cho khách hàng ${bookPayOrder.khachHang.hoTen} thành công`,
            type: 'success'
          })
        );
        navigate('/home');
      });
  };
  if (bookPayOrder.id === undefined) return null;
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxContent container>
          <BoxLeft item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Title>Thanh toán đặt bàn</Title>
            <Card sx={{ width: '100%', marginTop: '10px', padding: '10px', background: 'gray' }}>
              <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                Danh sách món ăn đã đặt
              </Typography>
              <Box sx={{ padding: '10px' }}>
                <TableContainer>
                  <Table sx={{ border: `1px solid #fff`, borderRadius: '5px' }}>
                    <TableHead>
                      <TableRow>
                        {headerFood.map((item, index) => (
                          <TableCell
                            key={index}
                            sx={{
                              width: item.minWidth,
                              fontWeight: 'bold',
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
                      {bookPayOrder.listChiTietDonDatBan.map((item, index) => (
                        <TableRowFood key={index} index={index} food={item} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Card>
            <Grid container sx={{ width: '100%', marginTop: '20px' }}>
              <Grid
                sx={{ width: '100%', padding: '10px' }}
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
              >
                {wayPay.id === undefined ? (
                  <>
                    <ButtonWayPay onClick={handleClick}>
                      <Icon
                        style={{ width: '30px', height: '30px' }}
                        icon="fluent:receipt-money-24-filled"
                      />
                      <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Chọn hình thức thanh toán
                      </Typography>
                      <Icon style={{ width: '30px', height: '30px' }} icon="bx:chevron-down" />
                    </ButtonWayPay>
                    <Typography sx={{ color: 'red', fontWeight: 'bold', fontSize: '14px' }}>
                      Vui lòng chọn hình thức thanh toán
                    </Typography>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonWayPay onClick={handleClick}>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {wayPay.name}
                      </Typography>
                      <Icon style={{ width: '30px', height: '30px' }} icon="bx:chevron-down" />
                    </ButtonWayPay>
                    <Icon
                      style={{ color: 'green', width: '30px', height: '30px', marginLeft: '10px' }}
                      icon="ci:check-all"
                    />
                  </Box>
                )}

                <Popper id={id} open={open} anchorEl={anchorEl}>
                  <Card sx={{ width: '300px', padding: '10px', background: '#fff' }}>
                    {payments.map((item, index) => (
                      <PaymentItem
                        click={chooseWayPay}
                        handleClose={handleClick}
                        key={index}
                        payment={item}
                      />
                    ))}
                  </Card>
                </Popper>
              </Grid>
              <Grid sx={{ padding: '10px' }} item xs={12} sm={12} md={12} lg={6} xl={6}>
                <BoxPrice>
                  <PriceDetail>Tổng các món ăn: </PriceDetail>
                  <PriceDetail>{` ${getTotal().toLocaleString(`es-US`)}`}</PriceDetail>
                </BoxPrice>
                <BoxPrice>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail>-</PriceDetail>
                  <PriceDetail> </PriceDetail>
                </BoxPrice>
                <BoxPrice>
                  <PriceDetail>Tiền cọc: </PriceDetail>
                  <PriceDetail>{` ${(getTotal() * 0.3).toLocaleString(`es-US`)}`}</PriceDetail>
                </BoxPrice>
                <Divider sx={{ margin: '10px 0px' }} />
                <BoxPrice>
                  <PriceDetail>Tổng tiền còn lại: </PriceDetail>
                  <PriceDetail>{` ${(getTotal() * 0.7).toLocaleString(`es-US`)} vnđ`}</PriceDetail>
                </BoxPrice>
              </Grid>
            </Grid>
          </BoxLeft>
          <BoxRight item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Card sx={{ background: 'gray', padding: '10px', minHeight: '100%' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif' }}>
                Thông tin đơn đặt bàn
              </Typography>
              <InputWrapper>
                <TitleInformation>Họ tên</TitleInformation>
                <InputInfo value={bookPayOrder.khachHang.hoTen} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Số điện thoại</TitleInformation>
                <InputInfo value={bookPayOrder.khachHang.soDienThoai} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Email</TitleInformation>
                <InputInfo value={bookPayOrder.khachHang.email} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Thời gian nhận bàn</TitleInformation>
                <InputInfo
                  value={moment(Date.parse(bookPayOrder.thoiGianNhanBan)).format(
                    `hh:mm a DD/MM/yyyy `
                  )}
                />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Thời gian đặt bàn</TitleInformation>
                <InputInfo
                  value={moment(Date.parse(bookPayOrder.createAt)).format(`hh:mm a DD/MM/yyyy `)}
                />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Số lượng khách</TitleInformation>
                <InputInfo value={`${bookPayOrder.soLuongKhach} người`} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Thời gian đặt bàn</TitleInformation>
                <InputInfo value={`${bookPayOrder.thoiGianDuKienSuDung}p`} />
              </InputWrapper>
              <ButtonConfirm onClick={openModalConfirm} disabled={wayPay.id === undefined}>
                Xác nhận thanh toán
              </ButtonConfirm>
            </Card>
          </BoxRight>
        </BoxContent>
        <Box> </Box>
      </Scrollbar>
      <ModalConfirm open={modalConfirm} close={() => setModalConfirm(false)} confirm={confirm} />
    </RootStyle>
  );
}

export default PayOrder;