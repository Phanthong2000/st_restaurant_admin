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
  Tooltip,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
const ImageTypeFood = styled('img')(({ theme }) => ({
  width: '100%',
  height: '300px'
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
function ModalEditTypeFood({ editTypeFood }) {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const typefoods = useSelector((state) => state.food.typefoods);
  const modalEditTypeFood = useSelector((state) => state.food.modalEditTypeFood);
  const [error, setError] = useState('');
  const [imageNew, setImageNew] = useState();
  const handleClose = () => {
    dispatch(
      actionFoodModalEditTypeFood({
        status: false,
        typefood: {}
      })
    );
  };
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setImageNew(files[0]);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'H??nh ???nh lo???i th???c ??n ph???i nh??? h??n 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  const FoodSchema = Yup.object().shape({
    name: Yup.string().required('Vui l??ng nh???p t??n m??n ??n')
  });
  const formik = useFormik({
    initialValues: {
      name: `${modalEditTypeFood.typefood.tenLoaiMonAn}`
    },
    validationSchema: FoodSchema,
    onSubmit: () => {
      let flag = false;
      typefoods.forEach((food) => {
        if (food.tenLoaiMonAn === values.name && food.id !== modalEditTypeFood.typefood.id) {
          flag = true;
        }
      });
      if (flag) {
        setError('T??n lo???i m??n ???? t???n t???i');
      } else if (!imageNew) {
        axios
          .put(
            `${api}loaiMonAn/edit`,
            {
              ...modalEditTypeFood.typefood,
              tenLoaiMonAn: values.name
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            }
          )
          .then((res) => {
            setError('');
            dispatch(actionGetAllFoods());
            dispatch(actionGetAllTypeFoods());
            dispatch(
              actionUserSnackbar({
                status: true,
                content: 'S???a th??ng tin lo???i m??n th??nh c??ng',
                type: 'success'
              })
            );
            handleClose();
          })
          .catch((err) => console.log(err));
      } else {
        const typefoodNew = {
          ...modalEditTypeFood.typefood,
          tenLoaiMonAn: values.name
        };
        setError('');
        editTypeFood(typefoodNew, imageNew);
        handleClose();
      }
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  return (
    <Modal open={modalEditTypeFood.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Th??ng tin lo???i m??n ??n
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {imageNew ? (
            <>
              <ImageTypeFood src={URL.createObjectURL(imageNew)} />
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <IconButton onClick={() => setImageNew(null)}>
                  <Tooltip title="B??? ch???n h??nh ???nh">
                    <Icon
                      style={{ color: 'red', width: '40px', height: '40px' }}
                      icon="ant-design:close-square-filled"
                    />
                  </Tooltip>
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              <ImageTypeFood src={modalEditTypeFood.typefood.hinhAnh} />
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <ButtonAdd onClick={() => fileRef.current.click()}>Ch???n h??nh ???nh m???i</ButtonAdd>
              </Box>
            </>
          )}
        </Box>
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
                    label="T??n m??n ??n"
                  />
                </BoxInput>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{error}</Typography>
                  <ButtonAddEmployee
                    disabled={values.name === modalEditTypeFood.typefood.tenLoaiMonAn && !imageNew}
                    type="submit"
                  >
                    S???a th??ng tin lo???i m??n ??n
                  </ButtonAddEmployee>
                </Box>
              </Form>
            </FormikProvider>
          </Scrollbar>
        </BoxContent>
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

export default ModalEditTypeFood;
