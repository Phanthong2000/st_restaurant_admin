import React, { useEffect, useState, useRef } from 'react';
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
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import api from '../assets/api/api';
import {
  actionGetBooksByKeyword,
  actionGetOrdersNow,
  actionGetTotalNow,
  actionNewBooks,
  actionOrderModalPayOrder
} from '../redux/actions/orderAction';
import {
  actionOrderDateNow,
  actionOrderMonthNow,
  actionOrderYearNow,
  actionRevenueDateNow,
  actionRevenueMonthNow,
  actionRevenueYearNow,
  actionGetAllOrders,
  actionColumnRevenueOrder,
  actionColumnRevenueRevenue,
  actionGetRevenueWeek,
  actionGetOrderWeek,
  actionColumnRevenueMonth
} from '../redux/actions/analyticAction';
import ModalPayOrder from '../components/order/ModalPayOrder';
import ModalOrderToPrint from '../components/order/ModalOrderToPrint';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
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
  height: `${heightScreen - 100}px`
}));
const InputWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: '20px'
}));
const TitleInformation = styled(Typography)(({ theme }) => ({
  color: theme.palette.main,
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%',
  color: theme.palette.black,
  fontWeight: 'bold'
}));
const ButtonWayPay = styled(Box)(({ theme }) => ({
  width: '300px',
  background: theme.palette.main,
  color: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 10px',
  borderRadius: '10px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
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
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  fontSize: '18px',
  marginTop: '20px',
  ':hover': {
    background: theme.palette.mainHover
    // color: theme.palette.gray
  }
}));
const BoxTableTable = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  marginTop: '10px',
  background: theme.palette.white
}));
function TableItem({ table }) {
  const BoxTable = styled(Grid)(({ theme }) => ({
    width: '100%',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.main}`
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.gray,
    fontWeight: 'bold'
  }));
  const IconTable = styled(Icon)(({ theme }) => ({
    width: '40px',
    height: '40px',
    color: theme.palette.gray
  }));
  return (
    <Grid sx={{ padding: '5px', width: '100%' }} item xs={4} sm={4} md={2} lg={2} xl={2}>
      <BoxTable>
        <Title>{table.tenBan}</Title>
        <IconTable icon="ic:round-table-restaurant" />
        <Title>{table.loaiBan}</Title>
        <Title>S??? ng?????i: {table.soNguoiToiDa}</Title>
      </BoxTable>
    </Grid>
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
      <Cell>{`${food.monAn.donGia.toLocaleString('es-US')} vn??`}</Cell>
      <Cell>{food.ghiChu}</Cell>
      <Cell>{`${(food.monAn.donGia * food.soLuong).toLocaleString('es-US')} vn??`}</Cell>
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
      {payment.tenHinhThucThanhToan}
    </ListItemButton>
  );
}
function TableFood({ tab, listChiTietDonDatBan }) {
  const headerFood = [
    { name: 'STT', minWidth: '10%' },
    { name: 'T??n m??n ??n', minWidth: '25%' },
    { name: 'Gi??', minWidth: '20%' },
    { name: 'Ghi ch??', minWidth: '20%' },
    { name: 'Th??nh ti???n', minWidth: '20%' }
  ];
  return (
    <Box sx={{ padding: '10px' }}>
      <TableContainer>
        <Table sx={{ border: `1px solid lightgrey`, borderRadius: '10px' }}>
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
        </Table>
      </TableContainer>
    </Box>
  );
}
function PayOrder() {
  const printRef = useRef();
  const user = useSelector((state) => state.user.user);
  const bookPayOrder = useSelector((state) => state.order.bookPayOrder);
  const allWayPay = useSelector((state) => state.order.allWayPay);
  const modalPayOrder = useSelector((state) => state.order.modalPayOrder);
  const [wayPay, setWayPay] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tab, setTab] = useState(1);
  const [description, setDescription] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalConfirm, setModalConfirm] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  useEffect(() => {
    if (bookPayOrder.id === undefined) {
      navigate('/home/book');
      dispatch(
        actionUserSnackbar({
          status: true,
          content: 'Vui l??ng ch???n ????n ?????t b??n mu???n thanh to??n',
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
  const getDeposit = () => {
    let total = 0;
    bookPayOrder.listChiTietDonDatBan.forEach((item) => {
      if (!item.ghiChu || item.ghiChu === 'Ban ?????u') total += item.monAn.donGia * item.soLuong;
    });
    return total * 0.3;
  };
  const getTotal = () => {
    let total = 0;
    bookPayOrder.listChiTietDonDatBan.forEach((item) => {
      total += item.monAn.donGia * item.soLuong;
    });
    return total;
  };
  const chooseWayPay = (payment) => {
    setWayPay(payment);
  };
  const openModalConfirm = () => {
    dispatch(actionOrderModalPayOrder(true));
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current
  });
  const confirm = () => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: '??ang x??? l?? thanh to??n'
      })
    );
    const bookNew = {
      ...bookPayOrder,
      trangThai: '1'
    };
    axios
      .put(
        `${api}donDatBan/edit`,
        {
          ...bookNew
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then(() => {
        axios
          .post(
            `${api}hoaDon/create`,
            {
              donDatBan: {
                id: bookPayOrder.id
              },
              ghiChu: description,
              ngayLap: moment(new Date().getTime()).format(),
              nguoiQuanLy: {
                id: user.id
              },
              hinhThucThanhToan: {
                id: wayPay.id
              }
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            }
          )
          .then(() => {
            dispatch(actionGetOrdersNow());
            dispatch(actionGetBooksByKeyword(''));
            dispatch(actionGetAllOrders());
            dispatch(actionGetTotalNow());
            dispatch(actionNewBooks());
            dispatch(actionRevenueDateNow());
            dispatch(actionOrderDateNow());
            dispatch(actionRevenueMonthNow());
            dispatch(actionOrderMonthNow());
            dispatch(actionRevenueYearNow());
            dispatch(actionOrderYearNow());
            dispatch(actionGetRevenueWeek());
            dispatch(actionGetOrderWeek());
            dispatch(actionColumnRevenueOrder(new Date().getFullYear()));
            dispatch(actionColumnRevenueRevenue(new Date().getFullYear()));
            dispatch(actionColumnRevenueMonth(new Date().getFullYear()));
            handlePrint();
            setTimeout(() => {
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: '??ang x??? l?? thanh to??n'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: `Thanh to??n cho kh??ch h??ng ${bookPayOrder.khachHang.hoTen} th??nh c??ng`,
                  type: 'success'
                })
              );
              navigate('/home/app');
            }, 5000);
          });
      });
  };
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  if (bookPayOrder.id === undefined) return null;
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxContent container>
          <BoxLeft item xs={12} sm={12} md={12} lg={8} xl={8}>
            <Title>Thanh to??n ?????t b??n</Title>
            <Card sx={{ width: '100%', marginTop: '10px', padding: '10px', background: '#fff' }}>
              <Typography sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                Danh s??ch m??n ??n ???? ?????t
              </Typography>
              <Box>
                {/* <Tabs value={tab} onChange={handleChange}>
                  {bookPayOrder.listLoaiBan.map((item, index) => (
                    <Tab label={`Lo???i: ${item.order}`} key={index} value={item.order} />
                  ))}
                </Tabs> */}
                <TableFood listChiTietDonDatBan={bookPayOrder.listChiTietDonDatBan} tab={tab} />
              </Box>
            </Card>
            <BoxTableTable>
              <Typography sx={{ fontSize: '18px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                Danh s??ch b??n
              </Typography>
              <Grid container sx={{ width: '100%' }}>
                {bookPayOrder.listBan.map((item, index) => (
                  <TableItem key={index} table={item} />
                ))}
              </Grid>
            </BoxTableTable>
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
                        Ch???n h??nh th???c thanh to??n
                      </Typography>
                      <Icon style={{ width: '30px', height: '30px' }} icon="bx:chevron-down" />
                    </ButtonWayPay>
                    <Typography sx={{ color: 'red', fontWeight: 'bold', fontSize: '14px' }}>
                      Vui l??ng ch???n h??nh th???c thanh to??n
                    </Typography>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ButtonWayPay onClick={handleClick}>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {wayPay.tenHinhThucThanhToan}
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
                    {allWayPay.map((item, index) => (
                      <PaymentItem
                        click={chooseWayPay}
                        handleClose={handleClick}
                        key={index}
                        payment={item}
                      />
                    ))}
                  </Card>
                </Popper>
                <TextField
                  sx={{ marginTop: '20px' }}
                  fullWidth
                  multiline
                  minRows={5}
                  maxRows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="filled-basic"
                  label="Ghi ch??"
                  variant="filled"
                />
              </Grid>
              <Grid sx={{ padding: '10px' }} item xs={12} sm={12} md={12} lg={6} xl={6}>
                <BoxPrice>
                  <PriceDetail>T???ng c??c m??n ??n: </PriceDetail>
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
                  <PriceDetail>Ti???n c???c: </PriceDetail>
                  <PriceDetail>{` ${getDeposit().toLocaleString(`es-US`)}`}</PriceDetail>
                </BoxPrice>
                <BoxPrice>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail>+</PriceDetail>
                  <PriceDetail> </PriceDetail>
                </BoxPrice>
                <BoxPrice>
                  <PriceDetail>
                    Ph??? thu({bookPayOrder.listBan.filter((table) => table.loaiBan === 'Vip').length}{' '}
                    b??n vip):
                  </PriceDetail>
                  <PriceDetail>{`${(
                    bookPayOrder.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000
                  ).toLocaleString(`es-US`)}`}</PriceDetail>
                </BoxPrice>
                <BoxPrice>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail> </PriceDetail>
                  <PriceDetail>+</PriceDetail>
                  <PriceDetail> </PriceDetail>
                </BoxPrice>
                <BoxPrice>
                  <PriceDetail>Thu??? VAT(10%): </PriceDetail>
                  <PriceDetail>{` ${(getTotal() * 0.1).toLocaleString(`es-US`)}`}</PriceDetail>
                </BoxPrice>
                <Divider sx={{ margin: '10px 0px' }} />
                <BoxPrice>
                  <PriceDetail>T???ng ti???n c??n l???i: </PriceDetail>
                  <PriceDetail>{` ${(
                    getTotal() +
                    getTotal() * 0.1 -
                    getDeposit() +
                    bookPayOrder.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000
                  ).toLocaleString(`es-US`)} vn??`}</PriceDetail>
                </BoxPrice>
              </Grid>
            </Grid>
          </BoxLeft>
          <BoxRight item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Card sx={{ background: '#fff', padding: '10px', minHeight: '100%' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px', fontFamily: 'sans-serif' }}>
                Th??ng tin ????n ?????t b??n
              </Typography>
              <InputWrapper>
                <TitleInformation>H??? t??n</TitleInformation>
                <InputInfo value={bookPayOrder.khachHang.hoTen} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>S??? ??i???n tho???i</TitleInformation>
                <InputInfo value={bookPayOrder.khachHang.soDienThoai} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Email</TitleInformation>
                <InputInfo value={bookPayOrder.khachHang.email} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Th???i gian nh???n b??n</TitleInformation>
                <InputInfo
                  value={moment(Date.parse(bookPayOrder.thoiGianNhanBan)).format(
                    `hh:mm a DD/MM/yyyy`
                  )}
                />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Th???i gian ?????t b??n</TitleInformation>
                <InputInfo
                  value={moment(Date.parse(bookPayOrder.createAt)).format(`hh:mm a DD/MM/yyyy`)}
                />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>S??? l?????ng kh??ch</TitleInformation>
                <InputInfo value={`${bookPayOrder.soLuongKhach} ng?????i`} />
              </InputWrapper>
              <InputWrapper>
                <TitleInformation>Th???i gian ?????t b??n</TitleInformation>
                <InputInfo value={`${bookPayOrder.thoiGianDuKienSuDung / (60 * 1000)}p`} />
              </InputWrapper>
              <ButtonConfirm onClick={openModalConfirm} disabled={wayPay.id === undefined}>
                X??c nh???n thanh to??n
              </ButtonConfirm>
            </Card>
          </BoxRight>
        </BoxContent>
        <Box> </Box>
        <div style={{ display: 'none' }}>
          <ModalOrderToPrint
            book={bookPayOrder}
            totalBefore={getTotal}
            deposit={getDeposit}
            vip={bookPayOrder.listBan.filter((table) => table.loaiBan === 'Vip').length}
            totalAfter={
              getTotal() +
              getTotal() * 0.1 -
              getDeposit() +
              bookPayOrder.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000
            }
            printRef={printRef}
          />
        </div>
      </Scrollbar>

      {modalPayOrder && (
        <ModalPayOrder
          open={modalConfirm}
          close={() => setModalConfirm(false)}
          getTotal={
            getTotal() +
            getTotal() * 0.1 -
            getDeposit() +
            bookPayOrder.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000
          }
          confirm={confirm}
        />
      )}
    </RootStyle>
  );
}

export default PayOrder;
