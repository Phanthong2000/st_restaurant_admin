import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  createFilterOptions,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import moment from 'moment';
import { Scrollbar } from 'smooth-scrollbar-react';
import {
  actionFoodModalEditFood,
  actionFoodModalEditTypeFood,
  actionGetAllFoods,
  actionGetAllTypeFoods
} from '../../redux/actions/foodAction';
import api from '../../assets/api/api';
import { actionUserSnackbar } from '../../redux/actions/userAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
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
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '600px',
  display: 'flex'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1, 3),
  marginTop: '10px'
}));
const Input = styled(TextField)(({ theme }) => ({
  marginTop: '10px'
}));
const ButtonAddEmployee = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '10px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function ModalEditTypeFood() {
  const dispatch = useDispatch();
  const typefoods = useSelector((state) => state.food.typefoods);
  const modalEditTypeFood = useSelector((state) => state.food.modalEditTypeFood);
  const [error, setError] = useState('');
  const handleClose = () => {
    dispatch(
      actionFoodModalEditTypeFood({
        status: false,
        typefood: {}
      })
    );
  };

  const FoodSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên món ăn')
  });
  const formik = useFormik({
    initialValues: {
      name: `${modalEditTypeFood.typefood.tenLoaiMonAn}`
    },
    validationSchema: FoodSchema,
    onSubmit: () => {
      if (values.name === modalEditTypeFood.typefood.tenLoaiMonAn) {
        setError('Tên trùng với tên hiện tại');
      } else {
        let flag = false;
        typefoods.forEach((food) => {
          if (food.tenLoaiMonAn === values.name) {
            flag = true;
          }
        });
        if (flag) {
          setError('Tên loại món đã tồn tại');
        } else {
          axios
            .put(`${api}loaiMonAn/edit`, {
              ...modalEditTypeFood.typefood,
              tenLoaiMonAn: values.name
            })
            .then((res) => {
              setError('');
              dispatch(actionGetAllFoods());
              dispatch(actionGetAllTypeFoods());
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Cập nhật thông tin loại món thành công',
                  type: 'success'
                })
              );
              handleClose();
            })
            .catch((err) => console.log(err));
        }
      }
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  return (
    <Modal open={modalEditTypeFood.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Thông tin loại món ăn
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar alwaysShowTracks>
            <Box> </Box>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <BoxInput>
                  <Input
                    fullWidth
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    label="Tên món ăn"
                  />
                </BoxInput>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{error}</Typography>
                  <ButtonAddEmployee type="submit">Sửa thông tin loại món ăn</ButtonAddEmployee>
                </Box>
              </Form>
            </FormikProvider>
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalEditTypeFood;
