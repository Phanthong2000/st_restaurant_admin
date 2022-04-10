import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Input,
  InputBase,
  Paper,
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
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
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
import TableRowFoodChosen from '../components/order/TableRowFoodChosen';
import ModalInformationFood from '../components/order/ModalInformationFood';
import api from '../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 2),
  display: 'flex'
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
const BoxTable = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  display: 'flex',
  borderRadius: '5px',
  marginTop: '10px',
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
const Total = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px'
}));
function FoodItemOrder({ food, tab, handleChooseFood, foodsMany }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  // const seeInformation = () => {
  //   dispatch(
  //     actionOrderModalInformation({
  //       status: true,
  //       food
  //     })
  //   );
  // };
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
    handleChooseFood(
      foodsMany
        .slice(0, tab - 1)
        .concat([data])
        .concat(foodsMany.slice(tab, foodsMany.length))
    );
    window.scrollTo({ left: 0, top: 500, behavior: 'smooth' });
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
          <ButtonSeeInformation>Xem thông tin</ButtonSeeInformation>
          <ButtonChooseFood onClick={chooseFood}>Chọn món</ButtonChooseFood>
        </Box>
      </BoxFood>
    </RootStyle>
  );
}
function BoxTypeFoodOrder({ type, tab, handleChooseFood, foodsMany }) {
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
          <FoodItemOrder
            foodsMany={foodsMany}
            tab={tab}
            handleChooseFood={handleChooseFood}
            key={index}
            food={item}
          />
        ))}
      </GridFood>
    </RootStyle>
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
function TableFood({ loaiBan, tab }) {
  const headerFood = [
    { name: 'STT', minWidth: '10%' },
    { name: 'Tên món ăn', minWidth: '25%' },
    { name: 'Giá', minWidth: '20%' },
    { name: 'Ghi chú', minWidth: '20%' },
    { name: 'Thành tiền', minWidth: '20%' }
  ];
  const getTotalTab = () => {
    let total = 0;
    loaiBan.listChiTietDonDatBan.forEach((food) => {
      total += food.monAn.donGia * food.soLuong;
    });
    return total;
  };
  if (loaiBan.order !== tab) return null;
  return (
    <Box sx={{ padding: '10px' }}>
      <Typography sx={{ fontWeight: 'bold' }}>
        Số người mỗi bàn: {loaiBan.soNguoiMoiBan} - Số bàn: {loaiBan.soLuongBan}
      </Typography>
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
            {loaiBan.listChiTietDonDatBan.map((item, index) => (
              <TableRowFood key={index} index={index} food={item} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} sx={{ fontWeight: 'bold', fontSize: '16px', color: '#000' }}>
                Tổng tiền loại {loaiBan.order}: {`${getTotalTab().toLocaleString('es-US')} vnd`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
function TableTabChooseFood({ tab, table, foodsMany, handleChooseFood }) {
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
  const getTotalNew = () => {
    let total = 0;
    table.foods.forEach((item) => {
      total += item.food.donGia * item.soLuong;
    });
    return total;
  };
  const deleteFoodChosen = (food) => {
    let data = foodsMany.at(tab - 1);
    data = {
      ...data,
      foods: data.foods.filter((item) => item.food.id !== food.id)
    };
    handleChooseFood(
      foodsMany
        .slice(0, tab - 1)
        .concat([data])
        .concat(foodsMany.slice(tab, foodsMany.length))
    );
  };
  const plusQuantity = (food, index) => {
    let data = foodsMany.at(tab - 1);
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
    handleChooseFood(
      foodsMany
        .slice(0, tab - 1)
        .concat([data])
        .concat(foodsMany.slice(tab, foodsMany.length))
    );
  };
  const minusQuantity = (food, index) => {
    let data = foodsMany.at(tab - 1);
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
      handleChooseFood(
        foodsMany
          .slice(0, tab - 1)
          .concat([data])
          .concat(foodsMany.slice(tab, foodsMany.length))
      );
    }
  };
  if (table.order !== tab) return null;
  return (
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
            {table.foods.length === 0 ? (
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
                {table.foods.map((item, index) => (
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
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={6}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  color: '#000'
                }}
              >
                Tổng tiền các món mới loại bàn {table.order}:{' '}
                {`${getTotalNew().toLocaleString('es-US')} vnd`}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
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
  const [tab, setTab] = useState();
  const [tabChooseFood, setTabChooseFood] = useState();
  const [search, setSearch] = useState('');
  const [foodsMany, setFoodsMany] = useState([]);
  useEffect(() => {
    const data = [];
    updateFoodsForBook.listLoaiBan.forEach((item) => {
      data.push({
        order: item.order,
        foods: []
      });
    });
    setFoodsMany(data);
    setTab(updateFoodsForBook.listLoaiBan.at(0).order);
    setTabChooseFood(updateFoodsForBook.listLoaiBan.at(0).order);
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
    let newTotal = 0;
    updateFoodsForBook.listLoaiBan.forEach((loaiBan) => {
      loaiBan.listChiTietDonDatBan.forEach((item) => {
        total += item.monAn.donGia * item.soLuong;
      });
    });
    foodsMany.forEach((item) => {
      item.foods.forEach((food) => {
        newTotal += food.food.donGia * food.soLuong;
      });
    });
    return total + newTotal;
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
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const handleChangeTabChooseFood = (event, newValue) => {
    setTabChooseFood(newValue);
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
        soLuong: food.quantity,
        ghiChu: 'Thêm sau'
      });
    });
    const bookNew = {
      ...updateFoodsForBook,
      listChiTietDonDatBan: updateFoodsForBook.listChiTietDonDatBan.concat(foodsNew)
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
  const handleChooseFood = (foodsMany) => {
    setFoodsMany(foodsMany);
  };
  const handlePay = () => {
    let temp = 0;
    foodsMany.forEach((item) => {
      if (item.foods.length === 0) {
        temp += 1;
      }
    });
    if (temp === foodsMany.length) {
      dispatch(
        actionUserSnackbar({
          status: true,
          content: `Vui lòng chọn món ăn`,
          type: 'error'
        })
      );
    } else {
      dispatch(
        actionUserBackdrop({
          status: true,
          content: 'Cập nhật đơn đặt bàn'
        })
      );
      const data = [];
      updateFoodsForBook.listLoaiBan.forEach((loaiBan) => {
        const listBookDetail = [];
        foodsMany.forEach((item) => {
          if (loaiBan.order === item.order) {
            item.foods.forEach((food) => {
              listBookDetail.push({
                monAn: food.food,
                soLuong: food.soLuong,
                ghiChu: 'Thêm sau'
              });
            });
          }
        });
        data.push({
          order: loaiBan.order,
          soNguoiMoiBan: loaiBan.soNguoiMoiBan,
          soLuongBan: loaiBan.soLuongBan,
          listChiTietDonDatBan: loaiBan.listChiTietDonDatBan.concat(listBookDetail)
        });
      });
      const newBook = {
        ...updateFoodsForBook,
        listLoaiBan: data
      };
      axios
        .put(
          `${api}donDatBan/edit`,
          {
            ...newBook
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
            actionUserBackdrop({
              status: false,
              content: 'Cập nhật đơn đặt bàn'
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
        });
    }
  };
  if (updateFoodsForBook.id === undefined) return null;
  return (
    <RootStyle>
      <Scrollbar style={{ padding: '0px 10px' }} alwaysShowTracks>
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
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <TitleInformation sx={{ fontSize: '16px' }}>Họ tên:</TitleInformation>
              <InputInfo
                disabled
                value={updateFoodsForBook.khachHang.hoTen}
                fullWidth
                placeholder="Aa"
              />
            </InputWapper>
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <TitleInformation sx={{ fontSize: '16px' }}>Email:</TitleInformation>
              <InputInfo
                disabled
                value={updateFoodsForBook.khachHang.email}
                fullWidth
                placeholder="Aa"
              />
            </InputWapper>
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <TitleInformation sx={{ fontSize: '16px' }}>Số điện thoại:</TitleInformation>
              <InputInfo
                disabled
                value={updateFoodsForBook.khachHang.soDienThoai}
                fullWidth
                placeholder="0123456789"
              />
            </InputWapper>
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <Typography sx={{ fontSize: '16px' }}>Thời gian nhận bàn:</Typography>
              <DatePicker
                disabled
                customInput={<InputInfo fullWidth />}
                selected={Date.parse(updateFoodsForBook.thoiGianNhanBan)}
                showTimeSelect
                dateFormat="dd/MM/yyyy, hh:mm a"
              />
            </InputWapper>
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <Typography sx={{ fontSize: '16px' }}>Thời gian đặt bàn:</Typography>
              <DatePicker
                disabled
                customInput={<InputInfo fullWidth />}
                selected={Date.parse(updateFoodsForBook.createAt)}
                showTimeSelect
                dateFormat="dd/MM/yyyy, hh:mm a"
              />
            </InputWapper>
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <Typography sx={{ fontSize: '16px' }}>Số người sử dụng:</Typography>
              <InputInfo
                disabled
                value={updateFoodsForBook.soLuongKhach}
                fullWidth
                placeholder="0"
              />
            </InputWapper>
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <Typography sx={{ fontSize: '16px' }}>Thời gian sử dụng:</Typography>
              <InputInfo
                disabled
                value={`${updateFoodsForBook.thoiGianDuKienSuDung / (60 * 1000)}p`}
                fullWidth
                placeholder="0"
              />
            </InputWapper>
            <InputWapper item xs={6} sm={6} md={6} lg={4} xl={4}>
              <Typography sx={{ fontSize: '16px' }}>Khu vực:</Typography>
              <InputInfo
                disabled
                value={updateFoodsForBook.khuVuc && updateFoodsForBook.khuVuc.tenKhuVuc}
                fullWidth
                placeholder="Aa"
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
          <Box sx={{ width: '100%' }}>
            <Tabs value={tab} onChange={handleChangeTab}>
              {updateFoodsForBook.listLoaiBan.map((item, index) => (
                <Tab key={index} value={item.order} label={`Loại ${item.order}`} />
              ))}
            </Tabs>
            {updateFoodsForBook.listLoaiBan.map((item, index) => (
              <TableFood key={index} tab={tab} loaiBan={item} />
            ))}
          </Box>
        </Card>
        <BoxTable>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tabChooseFood}
            onChange={handleChangeTabChooseFood}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: '100px' }}
          >
            {foodsMany.map((item, index) => (
              <Tab value={item.order} key={index} label={`Loại ${item.order}`} />
            ))}
          </Tabs>
          <Box sx={{ width: '100%', padding: '20px' }}>
            {foodsMany.map((item, index) => (
              <TableTabChooseFood
                foodsMany={foodsMany}
                handleChooseFood={handleChooseFood}
                key={index}
                table={item}
                tab={tabChooseFood}
              />
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
              <ButtonPay onClick={handlePay}>Đồng ý</ButtonPay>
            </Box>
          </Box>
        </BoxTable>
        {/* <BoxTable>
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
      </BoxTable> */}
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
                <BoxTypeFoodOrder
                  key={index}
                  handleChooseFood={handleChooseFood}
                  type={item}
                  foodsMany={foodsMany}
                  tab={tabChooseFood}
                />
              ))}
            </>
          ) : (
            <BoxTypeFoodOrder
              type={typeChosen}
              foodsMany={foodsMany}
              handleChooseFood={handleChooseFood}
              tab={tabChooseFood}
            />
          )}
        </BoxAllFood>
        {modalInformationFood.status && <ModalInformationFood />}
      </Scrollbar>
    </RootStyle>
  );
}

export default UpdateFoodsForBook;
