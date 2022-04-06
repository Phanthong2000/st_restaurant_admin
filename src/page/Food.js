import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
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

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex'
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
    { name: 'STT', minWidth: '10%' },
    { name: 'Hình ảnh', minWidth: '15%' },
    { name: 'Tên món ăn', minWidth: '20%' },
    { name: 'Yêu thích', minWidth: '10%' },
    { name: 'Giá', minWidth: '10%' },
    { name: 'Loại', minWidth: '10%' },
    { name: 'Trạng thái', minWidth: '10%' },
    { name: 'Xem thông tin', minWidth: '10%' }
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
    setPageFood(0);
    getFoodByPage(0);
  };
  const goToEndTable = () => {
    const page = ((foodsByName.length - 1) / 5)
      .toString()
      .substring(0, ((foodsByName.length - 1) / 5).toFixed(1).toString().indexOf('.'));
    setPageFood(parseInt(page, 10));
    getFoodByPage(parseInt(page, 10));
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
            .post(`${api}loaiMonAn/create`, {
              tenLoaiMonAn: name,
              hinhAnh: downloadURL
            })
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
            .put(`${api}loaiMonAn/edit`, {
              ...typefood,
              hinhAnh: downloadURL
            })
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
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase
            value={search}
            onChange={(e) => searchFood(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm món ăn"
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
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Danh sách món ăn</Typography>
            <ButtonAddFood onClick={goToCreateFood}>Thêm món ăn</ButtonAddFood>
          </BoxListFood>
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
                {foodTable.map((item, index) => (
                  <FoodTableRow key={index} food={item} index={index + pageFood * 5} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={8}>
                    <Tooltip title="Về đầu bảng">
                      <IconButton onClick={goToStartTable} disabled={pageFood === 0}>
                        <Icon icon="bi:skip-start-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Đến cuối bảng">
                      <IconButton
                        disabled={
                          ((foodsByName.length - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((foodsByName.length - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${pageFood}`
                        }
                        onClick={goToEndTable}
                      >
                        <Icon icon="bi:skip-end-fill" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={false}
            component="div"
            count={quantity}
            rowsPerPage={5}
            page={pageFood}
            onPageChange={handleChangePage}
          />
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
            <Table>
              <TableHead>
                <TableRow>
                  {headerType.map((item, index) => (
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
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={false}
            component="div"
            count={typefoods.length}
            rowsPerPage={5}
            page={pageType}
            onPageChange={handleChangePageType}
          />
        </Box>
      </Scrollbar>
      {modalAddTypeFood && <ModalAddTypeFood addTypeFood={addTypeFood} />}
      {modalEditFood.status && <ModalEditFood />}
      {modalEditTypeFood.status && <ModalEditTypeFood editTypeFood={editTypeFood} />}
    </RootStyle>
  );
}

export default Food;
