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
  Typography,
  Tooltip
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
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
const ImageTypeFood = styled('img')(({ theme }) => ({
  width: '100%',
  height: '300px'
}));
function ModalAddTypeFood({ addTypeFood }) {
  const fileRef = useRef();
  const [error, setError] = useState('');
  const modalAddTypeFood = useSelector((state) => state.food.modalAddTypeFood);
  const [input, setInput] = useState('');
  const typefoods = useSelector((state) => state.food.typefoods);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  useEffect(() => {
    console.log(' ');
    return function () {
      setError('');
    };
  }, []);
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setImage(files[0]);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Hình ảnh loại thức ăn phải nhỏ hơn 2MB',
            type: 'error'
          })
        );
      }
    }
  };
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
      } else if (!image) {
        setError('Vui lòng chọn hình ảnh loại món ăn');
      } else {
        addTypeFood(input, image);
        setError('');
        setInput('');
        dispatch(actionFoodModalAddTypeFood(false));
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
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {image ? (
            <>
              <ImageTypeFood src={URL.createObjectURL(image)} />
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton onClick={() => setImage(null)}>
                  <Tooltip title="Bỏ chọn hình ảnh">
                    <Icon
                      style={{ color: 'red', width: '40px', height: '40px' }}
                      icon="ant-design:close-square-filled"
                    />
                  </Tooltip>
                </IconButton>
              </Box>
            </>
          ) : (
            <Box
              onClick={() => fileRef.current.click()}
              sx={{
                width: '100%',
                color: 'gray',
                outline: `2px solid gray`,
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                '&:hover': { background: 'lightgrey' }
              }}
            >
              <Box>
                <Icon style={{ width: '100px', height: '100px' }} icon="bx:image-add" />
                <Typography sx={{ fontWeight: 'bold', fontSize: '16px' }}>Chọn hình ảnh</Typography>
              </Box>
            </Box>
          )}
        </Box>
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
        <input
          onClick={(e) => {
            e.target.value = null;
          }}
          accept=".png, .jpg, .jpeg"
          onChange={(e) => onChangeFile(e.target.files)}
          ref={fileRef}
          style={{ display: 'none' }}
          type="file"
        />
      </BoxModal>
    </Modal>
  );
}

export default ModalAddTypeFood;
