import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserSnackbar } from '../../redux/actions/userAction';
import api from '../../assets/api/api';
import { actionFoodModalAddTypeFood, actionGetAllTypeFoods } from '../../redux/actions/foodAction';

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
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '20px'
}));
const ButtonAdd = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  color: theme.palette.white,
  background: theme.palette.main,
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function ModalAddTypeFood() {
  const [error, setError] = useState('');
  const modalAddTypeFood = useSelector((state) => state.food.modalAddTypeFood);
  const [input, setInput] = useState('');
  const typefoods = useSelector((state) => state.food.typefoods);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(' ');
    return function () {
      setError('');
    };
  }, []);
  const add = () => {
    if (input.match('^.{1,20}$')) {
      let flag = true;
      typefoods.forEach((type) => {
        if (type.tenLoaiMonAn.toLowerCase() === input.toLowerCase()) {
          flag = false;
        }
      });
      if (!flag) {
        setError('Tên món ăn đã tồn tại. Vui lòng nhập tên khác');
      } else {
        axios
          .post(`${api}loaiMonAn/create`, {
            tenLoaiMonAn: input
          })
          .then((res) => {
            setError('');
            setInput('');
            dispatch(actionGetAllTypeFoods());
            dispatch(actionFoodModalAddTypeFood(false));
            dispatch(
              actionUserSnackbar({
                status: true,
                content: 'Thêm loại loại món thành công',
                type: 'success'
              })
            );
          })
          .catch((err) => console.log(err));
      }
    } else {
      setError('Tên loại món ăn không hợp lệ');
    }
  };
  return (
    <Modal open={modalAddTypeFood} onClose={() => dispatch(actionFoodModalAddTypeFood(false))}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thêm loại món ăn</Typography>
          <IconButton onClick={() => dispatch(actionFoodModalAddTypeFood(false))}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxInput>
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            label="Tên loại món ăn"
          />
          <Typography sx={{ color: 'red', width: '100%', textAlign: 'center' }}>{error}</Typography>
        </BoxInput>
        <Divider sx={{ margin: '20px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <ButtonAdd onClick={add}>Thêm loại món ăn</ButtonAdd>
        </Box>
      </BoxModal>
    </Modal>
  );
}

export default ModalAddTypeFood;
