import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Grid,
  Input,
  InputBase,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import TypeFoodItem from '../components/food/TypeFoodItem';
import { actionFoodGetTypeChosen, actionGetAllFoodsByName } from '../redux/actions/foodAction';
import BoxTypeFoodOrder from '../components/order/BoxTypeFoodOrder';
import TableRowFoodChosen from '../components/order/TableRowFoodChosen';
import { actionUserShowHotToast, actionUserSnackbar } from '../redux/actions/userAction';
import ModalInformationFood from '../components/order/ModalInformationFood';
import {
  actionGetBooksByKeyword,
  actionGetBooksNow,
  actionNewBooks,
  actionOrderGetOrder,
  actionOrderGetUser,
  actionOrderSetFood
} from '../redux/actions/orderAction';
import api from '../assets/api/api';
import {
  actionBookDateNow,
  actionBookMonthNow,
  actionBookYearNow,
  actionColumnRevenueBook
} from '../redux/actions/analyticAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 2),
  marginTop: '60px'
}));
const BoxInformationCustomer = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3, 10)
}));
const InputWapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: '20px',
  marginTop: '10px'
}));
const TitleInformation = styled(Typography)(({ theme }) => ({
  color: theme.palette.black
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%',
  color: theme.palette.white
}));
const BoxAllFood = styled(Card)(({ theme }) => ({
  width: '90%',
  margin: '20px 5%'
}));
const BoxTable = styled(Box)(({ theme }) => ({
  width: '80%',
  marginLeft: '10%',
  [theme.breakpoints.down('md')]: {
    width: '98%',
    marginLeft: '1%'
  }
}));
const CellHeader = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  [theme.breakpoints.down('md')]: {
    fontSize: '12px'
  }
}));
const ButtonPay = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  fontSize: '18px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxSearch = styled(Card)(({ theme }) => ({
  width: '50%',
  marginLeft: '25%',
  background: theme.palette.white,
  marginTop: '20px',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '80%',
    marginLeft: '10%'
  }
}));
const TitleSearch = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxInputSearch = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.black}`,
  padding: theme.spacing(1, 3),
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px'
}));
const InputSearch = styled(InputBase)(({ theme }) => ({
  fontSize: '16px'
}));
const BoxButtonSearch = styled(Box)(({ theme }) => ({
  background: theme.palette.main,
  color: theme.palette.white,
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxSort = styled(Card)(({ theme }) => ({
  width: '60%',
  margin: '20px 20%',
  background: theme.palette.white,
  display: 'flex',
  padding: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '90%',
    marginLeft: '5%',
    display: 'block'
  }
}));
const ButtonSortPrice = styled(Button)(({ theme }) => ({
  width: '100px',
  fontSize: '12px',
  marginLeft: '10px',
  background: theme.palette.lightgrey,
  color: theme.palette.black,
  textTransform: 'none',
  ':hover': {
    background: theme.palette.mainHover
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
function OrderChooseFood() {
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.order.foods);
  const userOrder = useSelector((state) => state.order.userOrder);
  const book = useSelector((state) => state.order.book);
  const navigate = useNavigate();
  const modalInformationFood = useSelector((state) => state.order.modalInformationFood);
  const typefoods = useSelector((state) => state.food.typefoods);
  const [search, setSearch] = useState('');
  useEffect(() => {
    if (book.customerName === '') navigate('/home/order');
    return function () {
      dispatch(
        actionOrderGetOrder({
          customerName: '',
          email: '',
          phone: '',
          date: 0,
          quantityCustomer: 0,
          timeUse: 0,
          description: '',
          area: {},
          customerId: ''
        })
      );
      dispatch(actionOrderGetUser({}));
      dispatch(actionOrderSetFood([]));
    };
  }, []);

  const chooseTypeAll = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: '',
        name: 'all'
      })
    );
  };
  const headers = [
    { name: 'STT', minWidth: '10%', align: 'left' },
    {
      name: 'Tên món ăn',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: 'Đơn giá',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: 'Số lượng',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: 'Thành tiền',
      minWidth: '20%',
      align: 'left'
    },
    {
      name: 'Bỏ chọn',
      minWidth: '10%',
      align: 'right'
    }
  ];
  const searchFood = (text) => {
    setSearch(text);
    dispatch(actionGetAllFoodsByName(text));
  };
  const getTotal = () => {
    if (foods.length === 0) {
      return 0;
    }
    let total = 0;
    foods.forEach((food) => {
      total += food.food.donGia * food.quantity;
    });
    return total;
  };
  const payForOrder = () => {
    if (foods.length === 0) {
      dispatch(
        actionUserSnackbar({
          status: true,
          content: 'Vui lòng chọn món ăn',
          type: 'error'
        })
      );
    } else {
      const listChiTietDonDatBan = [];
      foods.forEach((food) => {
        listChiTietDonDatBan.push({
          monAn: {
            id: food.food.id
          },
          soLuong: food.quantity,
          ghiChu: 'Ban đầu'
        });
      });
      const order = {
        khachHang: {
          id: book.customerId
        },
        soLuongKhach: book.quantityCustomer,
        thoiGianDuKienSuDung: book.timeUse.time,
        thoiGianNhanBan: moment(book.date).format(),
        trangThai: '0',
        ghiChu: book.description,
        listChiTietDonDatBan,
        khuVuc: {
          id: book.area.id
        }
      };
      axios
        .post(
          `${api}donDatBan/create`,
          {
            ...order
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        .then((res) => {
          dispatch(actionGetBooksNow());
          dispatch(actionGetBooksByKeyword(''));
          dispatch(actionNewBooks());
          dispatch(actionBookDateNow());
          dispatch(actionBookMonthNow());
          dispatch(actionBookYearNow());
          dispatch(actionColumnRevenueBook(new Date().getFullYear()));
          dispatch(
            actionUserSnackbar({
              status: true,
              content: 'Đặt bàn thành công',
              type: 'success'
            })
          );
          navigate('/home/book');
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <RootStyle>
      <Card sx={{ background: '#fff' }} elevation={3}>
        <BoxInformationCustomer container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              Thông tin khách hàng đặt bàn
            </Typography>
          </Grid>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <TitleInformation sx={{ fontSize: '16px' }}>Họ tên:</TitleInformation>
            <InputInfo disabled value={book.customerName} fullWidth placeholder="Aa" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <TitleInformation sx={{ fontSize: '16px' }}>Email:</TitleInformation>
            <InputInfo disabled value={book.email} fullWidth placeholder="Aa" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <TitleInformation sx={{ fontSize: '16px' }}>Số điện thoại:</TitleInformation>
            <InputInfo disabled value={book.phone} fullWidth placeholder="0123456789" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian nhận bàn:</Typography>
            <DatePicker
              disabled
              customInput={<InputInfo fullWidth />}
              selected={book.date}
              showTimeSelect
              dateFormat="dd/MM/yyyy, hh:mm a"
              // onChange={(newValue) => {
              //   console.log(newValue.getTime());
              //   setDateUse(newValue);
              // }}
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian đặt bàn:</Typography>
            <DatePicker
              disabled
              customInput={<InputInfo fullWidth />}
              selected={new Date().getTime()}
              showTimeSelect
              dateFormat="dd/MM/yyyy, hh:mm a"
              // onChange={(newValue) => {
              //   console.log(newValue.getTime());
              //   setDateUse(newValue);
              // }}
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Số khách:</Typography>
            <InputInfo disabled value={book.quantityCustomer} fullWidth placeholder="0" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng:</Typography>
            <InputInfo disabled value={book.timeUse.label} fullWidth placeholder="0" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Khu vực:</Typography>
            <InputInfo disabled value={book.area.tenKhuVuc} fullWidth placeholder="0" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
            <InputInfo disabled value={book.description} fullWidth placeholder="Aa" />
          </InputWapper>
        </BoxInformationCustomer>
      </Card>
      <Box sx={{ width: '100%', padding: '20px 0px', marginTop: '10px' }}>
        <BoxTable>
          <Paper sx={{ width: '100%', overflow: 'hidden', background: '#fff' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead sx={{ background: 'gray' }}>
                  <TableRow>
                    {headers.map((item, index) => (
                      <CellHeader
                        sx={{ textAlign: item.align, width: item.minWidth, color: '#fff' }}
                        key={index}
                      >
                        {item.name}
                      </CellHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {foods.length === 0 ? (
                    <TableRow>
                      <TableCell
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '20px',
                          fontFamily: 'sans-serif',
                          textAlign: 'center'
                        }}
                        colSpan={6}
                      >
                        Khách hàng chưa chọn món ăn
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {foods.map((item, index) => (
                        <TableRowFoodChosen key={index} index={index} cell={item} />
                      ))}
                    </>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        color: '#000',
                        textAlign: 'right'
                      }}
                    >
                      Tổng tiền:
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '20px', color: '#000' }}>
                      {`${getTotal().toLocaleString('es-US')} vnd`}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }} colSpan={3}>
                      <ButtonPay onClick={payForOrder}>Thanh toán</ButtonPay>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </BoxTable>
        <BoxSearch elevation={3}>
          <TitleSearch>Tìm kiếm món ăn</TitleSearch>
          <BoxInputSearch>
            <InputSearch
              value={search}
              onChange={(e) => searchFood(e.target.value)}
              placeholder="Tìm kiếm ..."
              fullWidth
            />
            <BoxButtonSearch>
              <Icon style={{ width: '30px', height: '30px' }} icon="ant-design:search-outlined" />
            </BoxButtonSearch>
          </BoxInputSearch>
        </BoxSearch>
        <BoxSort elevation={3}>
          <Typography sx={{ color: '#000', fontSize: '16px', fontWeight: 'bold' }}>
            Sắp xếp theo
          </Typography>
          <ButtonSortPrice
            onClick={chooseTypeAll}
            sx={typeChosen.name === 'all' && { background: '#3C58C9', color: '#fff' }}
          >
            Tất cả
          </ButtonSortPrice>
          {typefoods.map((item, index) => (
            <TypeFoodItem key={index} type={item} />
          ))}
        </BoxSort>
        <BoxAllFood elevation={3}>
          {typeChosen.name === 'all' ? (
            <>
              {typefoods.map((item, index) => (
                <BoxTypeFoodOrder key={index} type={item} />
              ))}
            </>
          ) : (
            <BoxTypeFoodOrder type={typeChosen} />
          )}
        </BoxAllFood>
      </Box>
      {modalInformationFood.status && <ModalInformationFood />}
    </RootStyle>
  );
}

export default OrderChooseFood;
