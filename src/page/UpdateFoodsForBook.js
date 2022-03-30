import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  Input,
  InputBase,
  Paper,
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
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { Icon } from '@iconify/react';
import axios from 'axios';
import {
  actionGetBooksByKeyword,
  actionOrderSetFood,
  actionOrderUpdateFoodsForBook
} from '../redux/actions/orderAction';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import { actionGetAllFoodsByName, actionFoodGetTypeChosen } from '../redux/actions/foodAction';
import TypeFoodItem from '../components/food/TypeFoodItem';
import BoxTypeFoodOrder from '../components/order/BoxTypeFoodOrder';
import TableRowFoodChosen from '../components/order/TableRowFoodChosen';
import ModalInformationFood from '../components/order/ModalInformationFood';
import api from '../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 2)
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
  width: '100%',
  marginTop: '10px'
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
function UpdateFoodsForBook() {
  const updateFoodsForBook = useSelector((state) => state.order.updateFoodsForBook);
  const modalInformationFood = useSelector((state) => state.order.modalInformationFood);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.order.foods);
  const typefoods = useSelector((state) => state.food.typefoods);
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const [search, setSearch] = useState('');
  const headerFood = [
    { name: 'STT', minWidth: '10%' },
    { name: 'Tên món ăn', minWidth: '25%' },
    { name: 'Giá', minWidth: '20%' },
    { name: 'Thành tiền', minWidth: '20%' }
  ];
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
  useEffect(() => {
    if (updateFoodsForBook.id === undefined) {
      navigate('/home/book');
      dispatch(
        actionUserSnackbar({
          status: true,
          content: 'Chưa chọn đơn đặt bàn muốn thêm món ăn',
          type: 'error'
        })
      );
    }
    return function () {
      dispatch(actionOrderUpdateFoodsForBook({}));
      dispatch(actionGetAllFoodsByName(''));
      dispatch(actionOrderSetFood([]));
      dispatch(
        actionFoodGetTypeChosen({
          id: '',
          name: 'all'
        })
      );
    };
  }, [updateFoodsForBook]);
  const getTotal = () => {
    let total = 0;
    updateFoodsForBook.listChiTietDonDatBan.forEach((don) => {
      total += don.monAn.donGia * don.soLuong;
    });
    return total;
  };
  const getTotalNew = () => {
    if (foods.length === 0) {
      return 0;
    }
    let total = 0;
    foods.forEach((food) => {
      total += food.food.donGia * food.quantity;
    });
    return total;
  };
  const searchFood = (text) => {
    setSearch(text);
    dispatch(actionGetAllFoodsByName(text));
  };
  const chooseTypeAll = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: '',
        name: 'all'
      })
    );
  };
  const confirm = () => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thêm món mới vào đơn đặt bàn'
      })
    );
    const foodsNew = [];
    foods.forEach((food) => {
      foodsNew.push({
        monAn: food.food,
        soLuong: food.quantity
      });
    });
    const bookNew = {
      ...updateFoodsForBook,
      listChiTietDonDatBan: updateFoodsForBook.listChiTietDonDatBan.concat(foodsNew)
    };
    axios
      .put(`${api}donDatBan/edit`, {
        ...bookNew
      })
      .then(() => {
        dispatch(actionGetBooksByKeyword(''));
        dispatch(
          actionUserBackdrop({
            status: false,
            content: 'Thêm món mới vào đơn đặt bàn'
          })
        );
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Thêm món mới vào đơn đặt bàn thành công',
            type: 'success'
          })
        );
        navigate('/home/book');
      });
  };
  if (updateFoodsForBook.id === undefined) return null;
  return (
    <RootStyle>
      <Typography sx={{ fontSize: '25px', fontWeight: 'bold' }}>
        Thêm món ăn cho đơn đặt bàn
      </Typography>
      <Card sx={{ background: '#fff', marginTop: '20px' }} elevation={3}>
        <BoxInformationCustomer container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              Thông tin khách hàng đặt bàn
            </Typography>
          </Grid>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <TitleInformation sx={{ fontSize: '16px' }}>Họ tên:</TitleInformation>
            <InputInfo
              disabled
              value={updateFoodsForBook.khachHang.hoTen}
              fullWidth
              placeholder="Aa"
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <TitleInformation sx={{ fontSize: '16px' }}>Email:</TitleInformation>
            <InputInfo
              disabled
              value={updateFoodsForBook.khachHang.email}
              fullWidth
              placeholder="Aa"
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <TitleInformation sx={{ fontSize: '16px' }}>Số điện thoại:</TitleInformation>
            <InputInfo
              disabled
              value={updateFoodsForBook.khachHang.soDienThoai}
              fullWidth
              placeholder="0123456789"
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian nhận bàn:</Typography>
            <DatePicker
              disabled
              customInput={<InputInfo fullWidth />}
              selected={Date.parse(updateFoodsForBook.thoiGianNhanBan)}
              showTimeSelect
              dateFormat="dd/MM/yyyy, hh:mm a"
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian đặt bàn:</Typography>
            <DatePicker
              disabled
              customInput={<InputInfo fullWidth />}
              selected={Date.parse(updateFoodsForBook.createAt)}
              showTimeSelect
              dateFormat="dd/MM/yyyy, hh:mm a"
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <Typography sx={{ fontSize: '16px' }}>Số khách:</Typography>
            <InputInfo disabled value={updateFoodsForBook.soLuongKhach} fullWidth placeholder="0" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng:</Typography>
            <InputInfo
              disabled
              value={`${updateFoodsForBook.thoiGianDuKienSuDung}p`}
              fullWidth
              placeholder="0"
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={3} xl={3}>
            <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
            <InputInfo disabled value={updateFoodsForBook.ghiChu} fullWidth placeholder="Aa" />
          </InputWapper>
        </BoxInformationCustomer>
      </Card>
      <Card sx={{ width: '100%', marginTop: '10px', padding: '10px' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>
          Danh sách món ăn đã đặt
        </Typography>
        <Box sx={{ padding: '10px' }}>
          <TableContainer>
            <Table>
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
                {updateFoodsForBook.listChiTietDonDatBan.map((item, index) => (
                  <TableRowFood key={index} index={index} food={item} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#000'
                    }}
                  >
                    Tổng tiền:
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}
                  >
                    {`${getTotal().toLocaleString('es-US')} vnd`}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Card>
      <BoxTable>
        <Paper sx={{ width: '100%', overflow: 'hidden', background: '#fff', padding: '10px' }}>
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
                      fontSize: '16px',
                      color: '#000'
                    }}
                  >
                    Tổng tiền các món mới
                  </TableCell>
                  <TableCell
                    colSpan={4}
                    sx={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}
                  >
                    {`${getTotalNew().toLocaleString('es-US')} vnd`}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#000'
                    }}
                  >
                    Tổng tiền tất cả:
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                    {`${(getTotalNew() + getTotal()).toLocaleString('es-US')} vnd`}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'right' }} colSpan={4}>
                    <ButtonPay onClick={confirm} disabled={foods.length === 0}>
                      Đồng ý
                    </ButtonPay>
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
      {modalInformationFood.status && <ModalInformationFood />}
    </RootStyle>
  );
}

export default UpdateFoodsForBook;
