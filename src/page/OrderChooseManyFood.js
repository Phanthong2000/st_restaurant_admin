import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Input,
  InputBase,
  styled,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
  TableFooter
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TypeFoodItem from '../components/food/TypeFoodItem';
import { actionFoodGetTypeChosen } from '../redux/actions/foodAction';
import {
  actionGetBooksByKeyword,
  actionGetBooksNow,
  actionNewBooks,
  actionOrderGetOrderMany,
  actionOrderModalInformation,
  actionOrderModalPayment,
  actionOrderSetFoodsMany
} from '../redux/actions/orderAction';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import ModalInformationFood from '../components/order/ModalInformationFood';
import ModalPayment from '../components/order/ModalPayment';
import api from '../assets/api/api';
import {
  actionBookDateNow,
  actionBookMonthNow,
  actionBookYearNow,
  actionColumnRevenueBook
} from '../redux/actions/analyticAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
}));
const BoxInformationCustomer = styled(Grid)(({ theme }) => ({
  width: '98%',
  padding: theme.spacing(3, 10),
  background: theme.palette.white,
  margin: '10px 1%',
  border: `1px solid lightgrey`,
  borderRadius: '5px'
}));
const InputWapper = styled(Grid)(({ theme }) => ({
  width: '100%',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: '20px'
}));
const TitleInformation = styled(Typography)(({ theme }) => ({
  color: theme.palette.black
}));
const InputInfo = styled(Input)(({ theme }) => ({
  fontSize: '16px',
  width: '100%',
  color: theme.palette.white
}));
const BoxTable = styled(Box)(({ theme }) => ({
  width: '80%',
  marginLeft: '10%',
  background: theme.palette.white,
  padding: '10px',
  display: 'flex',
  borderRadius: '5px',
  border: `1px solid lightgrey`,
  [theme.breakpoints.down('md')]: {
    width: '98%',
    marginLeft: '1%'
  }
}));
const Total = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px'
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '60%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  margin: '10px 20%',
  padding: theme.spacing(0.5, 0.5, 0.5, 2),
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    marginLeft: '10%'
  }
}));
const InputSearch = styled(InputBase)(({ theme }) => ({
  fontSize: '16px'
}));
const BoxIconSearch = styled(Box)(({ theme }) => ({
  background: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0.5, 2),
  borderRadius: '10px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxSort = styled(Box)(({ theme }) => ({
  width: '60%',
  margin: '20px 20%',
  background: theme.palette.white,
  borderRadius: '5px',
  border: `1px solid lightgrey`,
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
  background: theme.palette.white,
  color: theme.palette.black,
  textTransform: 'none',
  ':hover': {
    background: theme.palette.mainHover
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
const BoxAllFood = styled(Box)(({ theme }) => ({
  width: '90%',
  margin: '20px 5%'
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
function FoodItemOrder({ food, tab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foodsMany = useSelector((state) => state.order.foodsMany);
  const [isChosen, setIsChosen] = useState(false);
  const checkFoodChosenOrder = () => {
    let flag = false;
    foodsMany.at(tab - 1).foods.forEach((item) => {
      if (item.food.id === food.id) {
        flag = true;
      }
    });
    setIsChosen(flag);
  };
  useEffect(() => {
    checkFoodChosenOrder();
    return function () {
      return null;
    };
  }, [foodsMany]);
  const RootStyle = styled(Grid)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2)
  }));
  const BoxFood = styled(Card)(({ theme }) => ({
    width: '100%',
    background: theme.palette.lightgrey,
    padding: theme.spacing(1)
  }));
  const AvatarFood = styled('img')(({ theme }) => ({
    width: '100%',
    borderRadius: '20px',
    height: '300px',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      height: '200px'
    }
  }));
  const BoxNamePrice = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }));
  const NameFood = styled(Typography)(({ theme }) => ({
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    margin: '10px'
  }));
  const PriceFood = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    color: theme.palette.main,
    fontWeight: 'bold',
    marginRight: '20px'
  }));
  const ButtonChooseFood = styled(Button)(({ theme }) => ({
    width: '45%',
    textTransform: 'none',
    color: theme.palette.white,
    background: theme.palette.main,
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily.second,
    marginTop: '20px',
    fontWeight: 'bold',
    ':hover': {
      background: theme.palette.mainHover
    }
  }));
  const ButtonSeeInformation = styled(Button)(({ theme }) => ({
    width: '45%',
    textTransform: 'none',
    color: theme.palette.main,
    background: theme.palette.white,
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily.second,
    marginTop: '20px',
    fontWeight: 'bold',
    ':hover': {
      background: theme.palette.gray,
      color: theme.palette.white
    }
  }));
  const seeInformation = () => {
    dispatch(
      actionOrderModalInformation({
        status: true,
        food
      })
    );
  };
  const checkDescriptionLength = () => {
    if (food.moTa.length < 200) return `${food.moTa}`;
    return `${food.moTa.substring(0, 200)}...`;
  };
  const chooseFood = () => {
    let data = foodsMany.at(tab - 1);
    data = {
      order: tab,
      foods: [...data.foods, { food, soLuong: 1 }]
    };
    dispatch(
      actionOrderSetFoodsMany(
        foodsMany
          .slice(0, tab - 1)
          .concat([data])
          .concat(foodsMany.slice(tab, foodsMany.length))
      )
    );
    window.scrollTo({ left: 0, top: 200, behavior: 'smooth' });
  };
  if (isChosen) return null;
  return (
    <RootStyle item xs={12} sm={6} md={6} lg={4} xl={4}>
      <BoxFood sx={{ '&:hover': { boxShadow: 20 } }}>
        <AvatarFood src={food.hinhAnh.at(0)} />
        <BoxNamePrice>
          <NameFood>{food.tenMonAn}</NameFood>
          <PriceFood>
            <b style={{ fontSize: '20px', color: '#000' }}>Giá: </b>
            {`${food.donGia.toLocaleString('es-US')} vnđ`}
          </PriceFood>
        </BoxNamePrice>
        <Box sx={{ width: '100', display: 'flex', alignItems: 'center', padding: '0px 10px' }}>
          <Icon
            style={{ color: 'red', width: '30px', height: '30px' }}
            icon="ant-design:heart-twotone"
          />
          {!food.listKhachHangThichMonAn ? (
            <Typography sx={{ color: 'gray', fontWeight: 'bold', marginLeft: '5px' }}>
              0 yêu thích
            </Typography>
          ) : (
            <Typography sx={{ color: 'gray', fontWeight: 'bold', marginLeft: '5px' }}>
              {`${food.listKhachHangThichMonAn.length} yêu thích`}
            </Typography>
          )}
        </Box>
        <Typography maxHeight="120px">{checkDescriptionLength()}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <ButtonSeeInformation onClick={seeInformation}>Xem thông tin</ButtonSeeInformation>
          <ButtonChooseFood onClick={chooseFood}>Chọn món</ButtonChooseFood>
        </Box>
      </BoxFood>
    </RootStyle>
  );
}
function BoxTypeFoodOrder({ type, tab }) {
  const [allFoods, setAllFoods] = useState([]);
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const foods = useSelector((state) => state.food.foodsByName);
  const getAllFoodsByType = () => {
    const data = [];
    foods.forEach((food) => {
      if (food.loaiMonAn.id === type.id && food.trangThai === 'Đang bán') data.push(food);
    });
    setAllFoods(data);
  };
  useEffect(() => {
    getAllFoodsByType();
    return function () {
      return null;
    };
  }, [typeChosen, foods]);
  const RootStyle = styled(Box)(({ theme }) => ({
    width: '100%',
    background: theme.palette.white,
    padding: '10px'
  }));
  const Separate = styled(Divider)(({ theme }) => ({
    width: '50%',
    marginLeft: '25%',
    color: theme.palette.black,
    marginTop: '20px',
    fontSize: '20px',
    fontWeight: 'bold'
  }));
  const GridFood = styled(Grid)(() => ({
    width: '100%'
  }));
  return (
    <RootStyle>
      <Separate>{typeChosen.name === 'all' ? type.tenLoaiMonAn : type.name}</Separate>
      <GridFood container>
        {allFoods.map((item, index) => (
          <FoodItemOrder tab={tab} order key={index} food={item} />
        ))}
      </GridFood>
    </RootStyle>
  );
}
function TableTab({ table, value }) {
  const foodsMany = useSelector((state) => state.order.foodsMany);
  const dispatch = useDispatch();
  const BoxTable = styled(Box)(({ theme }) => ({
    width: '100%'
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '18ox',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary
  }));
  const CellHeader = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '18px',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px'
    }
  }));
  const CellBody = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    height: '100px'
  }));
  const IconQuantity = styled(Icon)(({ theme }) => ({
    width: '25px',
    height: '25px',
    color: 'red',
    cursor: 'pointer'
  }));
  const headers = [
    {
      name: 'STT',
      width: '10%'
    },
    {
      name: 'Tên món ăn',
      width: '30%'
    },
    {
      name: 'Đơn giá',
      width: '20%'
    },
    {
      name: 'Số lượng',
      width: '10%'
    },
    {
      name: 'Thành tiền',
      width: '10%'
    },
    {
      name: 'Bỏ chọn',
      width: '10%'
    }
  ];
  const getTotalTab = () => {
    let total = 0;
    foodsMany.at(value - 1).foods.forEach((food) => {
      total += food.food.donGia * food.soLuong;
    });
    return total;
  };
  const deleteFoodChosen = (food) => {
    let data = foodsMany.at(value - 1);
    data = {
      ...data,
      foods: data.foods.filter((item) => item.food.id !== food.id)
    };
    dispatch(
      actionOrderSetFoodsMany(
        foodsMany
          .slice(0, value - 1)
          .concat([data])
          .concat(foodsMany.slice(value, foodsMany.length))
      )
    );
  };
  const plusQuantity = (food, index) => {
    let data = foodsMany.at(value - 1);
    const temp = data.foods.filter((item) => item.food.id === food.id);
    const newFood = {
      ...temp.at(0),
      soLuong: temp.at(0).soLuong + 1
    };
    data = {
      ...data,
      foods: data.foods
        .slice(0, index)
        .concat([newFood])
        .concat(data.foods.slice(index + 1, data.foods.length))
    };
    dispatch(
      actionOrderSetFoodsMany(
        foodsMany
          .slice(0, value - 1)
          .concat([data])
          .concat(foodsMany.slice(value, foodsMany.length))
      )
    );
  };
  const minusQuantity = (food, index) => {
    let data = foodsMany.at(value - 1);
    const temp = data.foods.filter((item) => item.food.id === food.id);
    if (temp.at(0).soLuong === 1) {
      deleteFoodChosen(food);
    } else {
      const newFood = {
        ...temp.at(0),
        soLuong: temp.at(0).soLuong - 1
      };
      data = {
        ...data,
        foods: data.foods
          .slice(0, index)
          .concat([newFood])
          .concat(data.foods.slice(index + 1, data.foods.length))
      };
      dispatch(
        actionOrderSetFoodsMany(
          foodsMany
            .slice(0, value - 1)
            .concat([data])
            .concat(foodsMany.slice(value, foodsMany.length))
        )
      );
    }
  };
  if (table.order !== value) return null;
  return (
    <BoxTable>
      <Title>
        Số người mỗi bàn: {table.soNguoiMoiBan} - Số bàn: {table.soLuongBan}
      </Title>
      <Box sx={{ width: '100%' }}>
        <TableContainer>
          <Table sx={{ border: `1px solid lightgrey` }}>
            <TableHead>
              <TableRow>
                {headers.map((item, index) => (
                  <CellHeader key={index} sx={{ fontWeight: 'bold' }}>
                    {item.name}
                  </CellHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {foodsMany.at(table.order - 1).foods.map((item, index) => (
                <TableRow key={index}>
                  <CellBody>{index + 1}</CellBody>
                  <CellBody>{item.food.tenMonAn}</CellBody>
                  <CellBody>{item.food.donGia.toLocaleString(`es-US`)}</CellBody>
                  <CellBody>
                    <Box sx={{ display: 'flex' }}>
                      <IconQuantity
                        onClick={() => minusQuantity(item.food, index)}
                        icon="akar-icons:circle-minus-fill"
                      />
                      <Typography sx={{ width: '30px', textAlign: 'center' }}>
                        {item.soLuong}
                      </Typography>
                      <IconQuantity
                        onClick={() => plusQuantity(item.food, index)}
                        style={{ color: 'lightgreen' }}
                        icon="akar-icons:circle-plus-fill"
                      />
                    </Box>
                  </CellBody>
                  <CellBody>{(item.soLuong * item.food.donGia).toLocaleString(`es-US`)}</CellBody>
                  <CellBody>
                    <Icon
                      onClick={() => deleteFoodChosen(item.food)}
                      style={{ color: 'red', width: '30px', height: '30px', cursor: 'pointer' }}
                      icon="ci:off-close"
                    />
                  </CellBody>
                </TableRow>
              ))}
              {foodsMany.at(table.order - 1).foods.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}
                  >
                    Khách hàng chưa chọn món ăn
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '20px' }} colSpan={6}>
                  Tổng tiền món ăn của loại bàn {value}: {getTotalTab().toLocaleString(`es-US`)} vnd
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </BoxTable>
  );
}
function OrderChooseManyFood() {
  const bookMany = useSelector((state) => state.order.bookMany);
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const typefoods = useSelector((state) => state.food.typefoods);
  const foodsMany = useSelector((state) => state.order.foodsMany);
  const modalPayment = useSelector((state) => state.order.modalPayment);
  const userOrder = useSelector((state) => state.order.userOrder);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(1);
  const modalInformationFood = useSelector((state) => state.order.modalInformationFood);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const chooseTypeAll = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: '',
        name: 'all'
      })
    );
  };
  const getTotal = () => {
    let total = 0;
    foodsMany.forEach((item) => {
      item.foods.forEach((food) => {
        total += food.food.donGia * food.soLuong;
      });
    });
    return total;
  };
  const handlePay = () => {
    let temp = 0;
    let flagStop = false;
    foodsMany.forEach((item) => {
      if (item.foods.length === 0 && !flagStop) {
        temp = item.order;
        flagStop = true;
      }
    });
    if (temp > 0) {
      dispatch(
        actionUserSnackbar({
          status: true,
          content: `Vui lòng chọn món ăn cho loại bàn ${temp}`,
          type: 'error'
        })
      );
    } else {
      dispatch(
        actionOrderModalPayment({
          status: true,
          book: {}
        })
      );
      // navigate('/home/order-payment-many');
    }
  };
  const confirmPayment = () => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Xử lý đơn đặt bàn'
      })
    );
    const data = [];
    bookMany.listLoaiBan.forEach((loaiBan) => {
      const listBookDetail = [];
      foodsMany.forEach((item) => {
        if (loaiBan.order === item.order) {
          item.foods.forEach((food) => {
            listBookDetail.push({
              monAn: food.food,
              soLuong: food.soLuong,
              ghiChu: 'Thêm đầu'
            });
          });
        }
      });
      data.push({
        order: loaiBan.order,
        soNguoiMoiBan: loaiBan.soNguoiMoiBan,
        soLuongBan: loaiBan.soLuongBan,
        listChiTietDonDatBan: listBookDetail
      });
    });
    const book = {
      khachHang: {
        id: userOrder.id
      },
      soLuongKhach: bookMany.quantityCustomer,
      thoiGianDuKienSuDung: bookMany.timeUse.value,
      thoiGianNhanBan: moment(bookMany.date).format(),
      trangThai: '0',
      ghiChu: bookMany.description,
      khuVuc: {
        id: bookMany.area.id
      },
      listLoaiBan: data
    };
    axios
      .post(
        `${api}donDatBan/create`,
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
        dispatch(actionGetBooksNow());
        dispatch(actionGetBooksByKeyword(''));
        dispatch(actionNewBooks());
        dispatch(actionBookDateNow());
        dispatch(actionBookMonthNow());
        dispatch(actionBookYearNow());
        dispatch(actionColumnRevenueBook(new Date().getFullYear()));
        dispatch(
          actionUserBackdrop({
            status: false,
            content: 'Xử lý đơn đặt bàn'
          })
        );
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Đặt bàn thành công',
            type: 'success'
          })
        );
        navigate('/home/book');
        dispatch(actionOrderSetFoodsMany([]));
        dispatch(
          actionOrderGetOrderMany({
            customerName: '',
            email: '',
            phone: '',
            date: 0,
            quantityCustomer: 0,
            timeUse: 0,
            area: {},
            description: '',
            listLoaiBan: []
          })
        );
      });
  };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxInformationCustomer container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              Thông tin khách hàng đặt bàn
            </Typography>
          </Grid>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <TitleInformation sx={{ fontSize: '16px' }}>Họ tên:</TitleInformation>
            <InputInfo disabled value={bookMany.customerName} fullWidth placeholder="Aa" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <TitleInformation sx={{ fontSize: '16px' }}>Email:</TitleInformation>
            <InputInfo disabled value={bookMany.email} fullWidth placeholder="Aa" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <TitleInformation sx={{ fontSize: '16px' }}>Số điện thoại:</TitleInformation>
            <InputInfo disabled value={bookMany.phone} fullWidth placeholder="0123456789" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian nhận bàn</Typography>
            <DatePicker
              disabled
              customInput={<InputInfo fullWidth />}
              selected={bookMany.date}
              showTimeSelect
              dateFormat="dd/MM/yyyy, hh:mm a"
              // onChange={(newValue) => {
              //   console.log(newValue.getTime());
              //   setDateUse(newValue);
              // }}
            />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian đặt bàn</Typography>
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
            <InputInfo disabled value={bookMany.quantityCustomer} fullWidth placeholder="0" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng:</Typography>
            <InputInfo disabled value={bookMany.timeUse.name} fullWidth placeholder="0" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Khu vực:</Typography>
            <InputInfo disabled value={bookMany.area.tenKhuVuc} fullWidth placeholder="0" />
          </InputWapper>
          <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
            <Typography sx={{ fontSize: '16px' }}>Ghi chú:</Typography>
            <InputInfo disabled value={bookMany.description} fullWidth placeholder="Aa" />
          </InputWapper>
        </BoxInformationCustomer>
        <Box sx={{ width: '100%', padding: '20px 0px' }}>
          <BoxTable>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={tab}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider', minWidth: '100px' }}
            >
              {bookMany.listLoaiBan.map((item, index) => (
                <Tab value={item.order} key={index} label={`Loại ${item.order}`} />
              ))}
            </Tabs>
            <Box sx={{ width: '100%', padding: '20px' }}>
              {bookMany.listLoaiBan.map((item, index) => (
                <TableTab key={index} table={item} value={tab} />
              ))}
              <Box
                sx={{
                  width: '100%',
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Total>Tổng tiền: {getTotal().toLocaleString(`es-US`)} vnd</Total>
                <ButtonPay onClick={handlePay}>Tiếp tục</ButtonPay>
              </Box>
            </Box>
          </BoxTable>
          <BoxSearch>
            <InputSearch fullWidth placeholder="Tìm kiếm món ăn" />
            <BoxIconSearch>
              <Icon
                style={{ color: '#fff', width: '30px', height: '30px' }}
                icon="ant-design:search-outlined"
              />
            </BoxIconSearch>
          </BoxSearch>
          <BoxSort elevation={3}>
            <Typography sx={{ color: '#fff', fontSize: '16px' }}>Sắp xếp theo</Typography>
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
          <BoxAllFood>
            {typeChosen.name === 'all' ? (
              <>
                {typefoods.map((item, index) => (
                  <BoxTypeFoodOrder tab={tab} key={index} type={item} />
                ))}
              </>
            ) : (
              <BoxTypeFoodOrder tab={tab} type={typeChosen} />
            )}
          </BoxAllFood>
        </Box>
        {modalInformationFood.status && <ModalInformationFood tab={tab} />}
        {modalPayment.status && (
          <ModalPayment confirmPayment={confirmPayment} getTotal={getTotal} />
        )}
      </Scrollbar>
    </RootStyle>
  );
}

export default OrderChooseManyFood;
