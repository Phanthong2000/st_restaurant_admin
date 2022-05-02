import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  InputBase,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Scrollbar } from 'smooth-scrollbar-react';
import axios from 'axios';
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import FoodTableRow from '../components/food/FoodTableRow';
import TypeFoodTableRow from '../components/food/TypeFoodTableRow';
import ModalAddTypeFood from '../components/food/ModalAddTypeFood';
import {
  actionFoodModalAddTypeFood,
  actionGetAllFoodsByName,
  actionGetAllTypeFoods
} from '../redux/actions/foodAction';
import ModalEditFood from '../components/food/ModalEditFood';
import ModalEditTypeFood from '../components/food/ModalEditTypeFood';
import BoxSort from '../components/food/BoxSort';
import api from '../assets/api/api';
import { actionUserSnackbar, actionUserBackdrop } from '../redux/actions/userAction';
import { storage } from '../firebase-config';
import ModalUserLove from '../components/food/ModalUserLove';
import FoodItemGrid from '../components/food/FoodItemGrid';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '50%',
  marginLeft: '25%',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.black}`,
  borderRadius: '20px',
  marginTop: '20px',
  paddingLeft: '15px'
}));
const BoxButtonSearch = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.main,
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  marginRight: '1.5px',
  width: '50px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxListFood = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2)
}));
const ButtonAddFood = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxPage = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end'
}));
const ButtonChangePage = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  color: theme.palette.white,
  background: theme.palette.main,
  borderRadius: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));
const QuantityPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '50px',
  textAlign: 'center'
}));
const CountPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '13px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '30px',
  textAlign: 'center',
  cursor: 'pointer'
}));
const ButtonOptionChosen = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: theme.palette.main,
  color: theme.palette.white,
  marginRight: '10px',
  cursor: 'pointer'
}));
const ButtonOptionDontChoose = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: theme.palette.white,
  color: theme.palette.main,
  border: `1px solid ${theme.palette.main}`,
  marginRight: '10px',
  cursor: 'pointer'
}));
const IconOption = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px'
}));
function Food() {
  const dispatch = useDispatch();
  const [pageFood, setPageFood] = useState(0);
  const [pageType, setPageType] = useState(0);
  const typefoods = useSelector((state) => state.food.typefoods);
  const foodsByName = useSelector((state) => state.food.foodsByName);
  const navigate = useNavigate();
  const [foodTable, setFoodTable] = useState([]);
  const [typeTable, setTypeTable] = useState([]);
  const [search, setSearch] = useState('');
  const modalEditFood = useSelector((state) => state.food.modalEditFood);
  const modalEditTypeFood = useSelector((state) => state.food.modalEditTypeFood);
  const sortFood = useSelector((state) => state.food.sortFood);
  const [quantity, setQuantity] = useState(0);
  const modalAddTypeFood = useSelector((state) => state.food.modalAddTypeFood);
  const modalUserLove = useSelector((state) => state.food.modalUserLove);
  const [view, setView] = useState('grid');
  const getFoodByPage = (page) => {
    const notPages = [];
    foodsByName.forEach((food) => {
      if (sortFood === 'all') {
        notPages.push(food);
      } else if (sortFood === food.trangThai) {
        notPages.push(food);
      }
    });
    setQuantity(notPages.length);
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < notPages.length; i += 1) {
      if (i >= start && i < end) {
        data.push(notPages.at(i));
      }
    }
    setFoodTable(data);
  };
  const getTypeByPage = (page) => {
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < typefoods.length; i += 1) {
      if (i >= start && i < end) {
        data.push(typefoods.at(i));
      }
    }
    setTypeTable(data);
  };
  useEffect(() => {
    getFoodByPage(0);
    setPageFood(0);
    return function () {
      return null;
    };
  }, [foodsByName, sortFood]);
  useEffect(() => {
    getTypeByPage(0);
    setPageType(0);
    return function () {
      return null;
    };
  }, [typefoods]);
  const searchFood = (text) => {
    setSearch(text);
    dispatch(actionGetAllFoodsByName(text));
  };
  const handleChangePage = (event, newValue) => {
    setPageFood(newValue);
    getFoodByPage(newValue);
  };
  const handleChangePageType = (event, newValue) => {
    setPageType(newValue);
    getTypeByPage(newValue);
  };
  const headerFood = [
    { name: 'STT', minWidth: '5%' },
    { name: 'Hình ảnh', minWidth: '15%' },
    { name: 'Tên món ăn', minWidth: '20%' },
    { name: 'Yêu thích', minWidth: '10%' },
    { name: 'Giá', minWidth: '10%' },
    { name: 'Loại', minWidth: '10%' },
    { name: 'Trạng thái', minWidth: '10%' },
    { name: 'Xem thông tin', minWidth: '15%' }
  ];
  const headerType = [
    { name: 'STT', minWidth: '10%' },
    { name: 'Hình ảnh', minWidth: '30%' },
    { name: 'Tên loại', minWidth: '30%' },
    { name: 'Xem thông tin', minWidth: '30%' }
  ];
  const goToCreateFood = () => {
    navigate('/home/food-create');
  };
  const goToStartTable = () => {
    getFoodByPage(0);
    setPageFood(0);
  };
  const goToEndTable = () => {
    const page = ((quantity - 1) / 5)
      .toString()
      .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.'));
    getFoodByPage(parseInt(page, 10));
    setPageFood(parseInt(page, 10));
  };
  const addTypeFood = (name, image) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thêm loại món ăn'
      })
    );
    const storageRef = ref(storage, `foods/${name}.${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .post(
              `${api}loaiMonAn/create`,
              {
                tenLoaiMonAn: name,
                hinhAnh: downloadURL
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
              }
            )
            .then((res) => {
              dispatch(actionGetAllTypeFoods());
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: 'Thêm loại món ăn'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Thêm loại món thành công',
                  type: 'success'
                })
              );
            })
            .catch((err) => console.log(err));
        });
      }
    );
  };
  const editTypeFood = (typefood, image) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Sửa thông tin loại món ăn'
      })
    );
    const storageRef = ref(storage, `foods/${typefood.tenLoaiMonAn}.${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .put(
              `${api}loaiMonAn/edit`,
              {
                ...typefood,
                hinhAnh: downloadURL
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
              }
            )
            .then((res) => {
              dispatch(actionGetAllTypeFoods());
              dispatch(actionGetAllFoodsByName(''));
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: 'Sửa thông tin loại món ăn'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Sửa thông tin loại món thành công',
                  type: 'success'
                })
              );
            })
            .catch((err) => console.log(err));
        });
      }
    );
  };
  const handleNextFood = () => {
    if (
      ((quantity - 1) / 5)
        .toString()
        .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) !== `${pageFood}`
    ) {
      getFoodByPage(pageFood + 1);
      setPageFood(pageFood + 1);
    }
  };
  const handlePrevFood = () => {
    if (pageFood > 0) {
      getFoodByPage(pageFood - 1);
      setPageFood(pageFood - 1);
    }
  };
  const handleNextType = () => {
    if (
      ((typefoods.length - 1) / 5)
        .toString()
        .substring(0, ((typefoods.length - 1) / 5).toFixed(1).toString().indexOf('.')) !==
      `${pageType}`
    ) {
      getTypeByPage(pageType + 1);
      setPageType(pageType + 1);
    }
  };
  const handlePrevType = () => {
    if (pageType > 0) {
      getTypeByPage(pageType - 1);
      setPageType(pageType - 1);
    }
  };
  const goToStartTableType = () => {
    getTypeByPage(0);
    setPageType(0);
  };
  const goToEndTableType = () => {
    const page = ((typefoods.length - 1) / 5)
      .toString()
      .substring(0, ((typefoods.length - 1) / 5).toFixed(1).toString().indexOf('.'));
    getTypeByPage(parseInt(page, 10));
    setPageType(parseInt(page, 10));
  };
  const handleChooseView = (view) => {
    setView(view);
  };
  return (
    <RootStyle>
      <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
        <BoxSearch>
          <InputBase
            value={search}
            onChange={(e) => searchFood(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm món ăn (tên món ăn)..."
          />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
        <BoxSort />
        <Box sx={{ marginTop: '20px' }}>
          <BoxListFood>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Danh sách món ăn</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {view === 'grid' ? (
                <ButtonOptionChosen>
                  <IconOption icon="fluent:grid-16-filled" />
                </ButtonOptionChosen>
              ) : (
                <ButtonOptionDontChoose onClick={() => handleChooseView('grid')}>
                  <IconOption icon="fluent:grid-16-regular" />
                </ButtonOptionDontChoose>
              )}
              {view === 'table' ? (
                <ButtonOptionChosen>
                  <IconOption icon="fluent:table-freeze-row-16-filled" />
                </ButtonOptionChosen>
              ) : (
                <ButtonOptionDontChoose onClick={() => handleChooseView('table')}>
                  <IconOption icon="fluent:table-freeze-row-16-regular" />
                </ButtonOptionDontChoose>
              )}
              <ButtonAddFood onClick={goToCreateFood}>Thêm món ăn</ButtonAddFood>
            </Box>
          </BoxListFood>
          {view === 'grid' ? (
            <>
              <Grid sx={{ width: '100%' }} container>
                {foodTable.map((item, index) => (
                  <FoodItemGrid index={index + pageFood * 5} key={item.id} food={item} />
                ))}
              </Grid>
              <BoxPage sx={{ marginTop: '10px' }}>
                <CountPage>{pageFood * 5 + 1}</CountPage>
                <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                <CountPage>{pageFood * 5 + 5 >= quantity ? quantity : pageFood * 5 + 5}</CountPage>
                <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                <CountPage>{quantity}</CountPage>
                <ButtonChangePage
                  sx={{ background: pageFood === 0 && 'red', marginRight: '10px' }}
                  onClick={goToStartTable}
                >
                  {pageFood === 0 ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-to-left" />
                  )}
                </ButtonChangePage>
                <ButtonChangePage
                  sx={{ background: pageFood === 0 && 'red' }}
                  onClick={handlePrevFood}
                >
                  {pageFood === 0 ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-left" />
                  )}
                </ButtonChangePage>
                <QuantityPage>{pageFood + 1}</QuantityPage>
                <ButtonChangePage
                  sx={{
                    background:
                      ((quantity - 1) / 5)
                        .toString()
                        .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                        `${pageFood}` && 'red'
                  }}
                  onClick={handleNextFood}
                >
                  {((quantity - 1) / 5)
                    .toString()
                    .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                  `${pageFood}` ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-right" />
                  )}
                </ButtonChangePage>
                <ButtonChangePage
                  sx={{
                    background:
                      ((quantity - 1) / 5)
                        .toString()
                        .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                        `${pageFood}` && 'red',
                    marginLeft: '10px'
                  }}
                  onClick={goToEndTable}
                >
                  {((quantity - 1) / 5)
                    .toString()
                    .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                  `${pageFood}` ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-from-left" />
                  )}
                </ButtonChangePage>
              </BoxPage>
            </>
          ) : (
            <TableContainer>
              <Table sx={{ background: '#fff', borderRadius: '10px' }}>
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
                  {foodTable.map((item, index) => (
                    <FoodTableRow key={index} food={item} index={index + pageFood * 5} />
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={8}>
                      <BoxPage>
                        <CountPage>{pageFood * 5 + 1}</CountPage>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                        <CountPage>
                          {pageFood * 5 + 5 >= quantity ? quantity : pageFood * 5 + 5}
                        </CountPage>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                        <CountPage>{quantity}</CountPage>
                        <ButtonChangePage
                          sx={{ background: pageFood === 0 && 'red', marginRight: '10px' }}
                          onClick={goToStartTable}
                        >
                          {pageFood === 0 ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:arrow-to-left"
                            />
                          )}
                        </ButtonChangePage>
                        <ButtonChangePage
                          sx={{ background: pageFood === 0 && 'red' }}
                          onClick={handlePrevFood}
                        >
                          {pageFood === 0 ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:chevron-left"
                            />
                          )}
                        </ButtonChangePage>
                        <QuantityPage>{pageFood + 1}</QuantityPage>
                        <ButtonChangePage
                          sx={{
                            background:
                              ((quantity - 1) / 5)
                                .toString()
                                .substring(
                                  0,
                                  ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                                ) === `${pageFood}` && 'red'
                          }}
                          onClick={handleNextFood}
                        >
                          {((quantity - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${pageFood}` ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:chevron-right"
                            />
                          )}
                        </ButtonChangePage>
                        <ButtonChangePage
                          sx={{
                            background:
                              ((quantity - 1) / 5)
                                .toString()
                                .substring(
                                  0,
                                  ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                                ) === `${pageFood}` && 'red',
                            marginLeft: '10px'
                          }}
                          onClick={goToEndTable}
                        >
                          {((quantity - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${pageFood}` ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:arrow-from-left"
                            />
                          )}
                        </ButtonChangePage>
                      </BoxPage>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}
        </Box>
        <Box sx={{ margin: '20px 0px', width: '70%', marginLeft: '15%' }}>
          <BoxListFood>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              Danh sách loại món ăn
            </Typography>
            <ButtonAddFood onClick={() => dispatch(actionFoodModalAddTypeFood(true))}>
              Thêm loại món ăn
            </ButtonAddFood>
          </BoxListFood>
          <TableContainer>
            <Table sx={{ background: '#fff', borderRadius: '10px' }}>
              <TableHead>
                <TableRow>
                  {headerType.map((item, index) => (
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
                {typefoods.length === 0 ? (
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center' }} colSpan={2}>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                        Chưa có loại món ăn
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  <>
                    {typeTable.map((item, index) => (
                      <TypeFoodTableRow key={index} type={item} index={index + pageType * 5} />
                    ))}
                  </>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4}>
                    <BoxPage>
                      <CountPage>{pageType * 5 + 1}</CountPage>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                      <CountPage>
                        {pageType * 5 + 5 >= typefoods.length ? typefoods.length : pageType * 5 + 5}
                      </CountPage>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                      <CountPage>{typefoods.length}</CountPage>
                      <ButtonChangePage
                        sx={{ background: pageType === 0 && 'red', marginRight: '10px' }}
                        onClick={goToStartTableType}
                      >
                        {pageType === 0 ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-to-left" />
                        )}
                      </ButtonChangePage>
                      <ButtonChangePage
                        sx={{ background: pageType === 0 && 'red' }}
                        onClick={handlePrevType}
                      >
                        {pageType === 0 ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-left" />
                        )}
                      </ButtonChangePage>
                      <QuantityPage>{pageType + 1}</QuantityPage>
                      <ButtonChangePage
                        sx={{
                          background:
                            ((typefoods.length - 1) / 5)
                              .toString()
                              .substring(
                                0,
                                ((typefoods.length - 1) / 5).toFixed(1).toString().indexOf('.')
                              ) === `${pageType}` && 'red'
                        }}
                        onClick={handleNextType}
                      >
                        {((typefoods.length - 1) / 5)
                          .toString()
                          .substring(
                            0,
                            ((typefoods.length - 1) / 5).toFixed(1).toString().indexOf('.')
                          ) === `${pageType}` ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-right" />
                        )}
                      </ButtonChangePage>
                      <ButtonChangePage
                        sx={{
                          background:
                            ((typefoods.length - 1) / 5)
                              .toString()
                              .substring(
                                0,
                                ((typefoods.length - 1) / 5).toFixed(1).toString().indexOf('.')
                              ) === `${pageType}` && 'red',
                          marginLeft: '10px'
                        }}
                        onClick={goToEndTableType}
                      >
                        {((typefoods.length - 1) / 5)
                          .toString()
                          .substring(
                            0,
                            ((typefoods.length - 1) / 5).toFixed(1).toString().indexOf('.')
                          ) === `${pageType}` ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon
                            style={{ width: '25px', height: '25px' }}
                            icon="bx:arrow-from-left"
                          />
                        )}
                      </ButtonChangePage>
                    </BoxPage>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={false}
            component="div"
            count={typefoods.length}
            rowsPerPage={5}
            page={pageType}
            onPageChange={handleChangePageType}
          /> */}
        </Box>
      </Scrollbar>
      {modalAddTypeFood && <ModalAddTypeFood addTypeFood={addTypeFood} />}
      {modalEditFood.status && <ModalEditFood />}
      {modalEditTypeFood.status && <ModalEditTypeFood editTypeFood={editTypeFood} />}
      {modalUserLove.status && <ModalUserLove />}
    </RootStyle>
  );
}

export default Food;
