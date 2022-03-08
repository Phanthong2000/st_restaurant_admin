import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  InputBase,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useDispatch, useSelector } from 'react-redux';
import FoodTableRow from '../components/food/FoodTableRow';
import TypeFoodTableRow from '../components/food/TypeFoodTableRow';
import ModalAddTypeFood from '../components/food/ModalAddTypeFood';
import { actionFoodModalAddTypeFood } from '../redux/actions/foodAction';
import ModalEditFood from '../components/food/ModalEditFood';
import ModalEditTypeFood from '../components/food/ModalEditTypeFood';

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
  const foods = useSelector((state) => state.food.foods);
  const navigate = useNavigate();
  const [foodTable, setFoodTable] = useState([]);
  const [typeTable, setTypeTable] = useState([]);
  const modalEditFood = useSelector((state) => state.food.modalEditFood);
  const modalEditTypeFood = useSelector((state) => state.food.modalEditTypeFood);
  const getFoodByPage = (page) => {
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < foods.length; i += 1) {
      if (i >= start && i < end) {
        data.push(foods.at(i));
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
  }, [foods]);
  useEffect(() => {
    getTypeByPage(0);
    setPageType(0);
    return function () {
      return null;
    };
  }, [typefoods]);
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
    { name: 'Hình ảnh', minWidth: '20%' },
    { name: 'Tên món ăn', minWidth: '30%' },
    { name: 'Giá', minWidth: '10%' },
    { name: 'Loại', minWidth: '10%' },
    { name: 'Trạng thái', minWidth: '10%' },
    { name: 'Xem thông tin', minWidth: '10%' }
  ];
  const headerType = [
    { name: 'STT', minWidth: '10%' },
    { name: 'Tên loại', minWidth: '40%' },
    { name: 'Xem thông tin', minWidth: '30%' }
  ];
  const goToCreateFood = () => {
    navigate('/home/food-create');
  };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase fullWidth placeholder="Tìm kiếm món ăn" />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
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
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={false}
            component="div"
            count={foods.length}
            rowsPerPage={5}
            page={pageFood}
            onPageChange={handleChangePage}
          />
        </Box>
        <Box sx={{ margin: '20px 0px', width: '50%', marginLeft: '25%' }}>
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
      <ModalAddTypeFood />
      {modalEditFood.status && <ModalEditFood />}
      {modalEditTypeFood.status && <ModalEditTypeFood />}
    </RootStyle>
  );
}

export default Food;
