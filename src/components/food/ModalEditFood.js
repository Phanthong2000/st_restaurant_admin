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
  actionGetAllFoods,
  actionGetAllFoodsByName
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
function ImageChosen({ image, click }) {
  const Image = styled('img')(({ theme }) => ({
    width: '50px',
    height: '50px',
    marginRight: '10px'
  }));
  const ButtonRemoveImage = styled(Icon)(({ theme }) => ({
    width: '25px',
    height: '25px',
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.black,
    zIndex: 3,
    cursor: 'pointer'
  }));
  return (
    <IconButton>
      <Image src={image} />
      <ButtonRemoveImage onClick={click} icon="ep:close-bold" />
    </IconButton>
  );
}
function ModalEditFood() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const typefoods = useSelector((state) => state.food.typefoods);
  const modalEditFood = useSelector((state) => state.food.modalEditFood);
  const [avatar, setAvatar] = useState([]);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    setAvatar(modalEditFood.food.hinhAnh);
    setType(modalEditFood.food.loaiMonAn);
    setStatus(modalEditFood.food.trangThai);
    return function () {
      return null;
    };
  }, [modalEditFood]);
  const handleClose = () => {
    dispatch(
      actionFoodModalEditFood({
        status: false,
        food: {}
      })
    );
  };
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: (option) => option.tenLoaiMonAn
  });
  const FoodSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên món ăn'),
    price: Yup.number()
      .integer('Đơn giá không hợp lệ')
      .min(1, 'Đơn giá không hợp lệ')
      .required('Vui lòng nhập đơn giá'),
    description: Yup.string().required('Vui lòng nhập mô tả')
  });
  const formik = useFormik({
    initialValues: {
      name: `${modalEditFood.food.tenMonAn}`,
      price: `${modalEditFood.food.donGia}`,
      description: `${modalEditFood.food.moTa}`
    },
    validationSchema: FoodSchema,
    onSubmit: () => {
      const food = {
        tenMonAn: values.name,
        donGia: values.price,
        moTa: values.description,
        hinhAnh: avatar,
        trangThai: status,
        loaiMonAn: {
          ...type
        }
      };
      if (values.name === modalEditFood.food.tenMonAn) {
        axios
          .put(`${api}monAn/edit`, {
            ...modalEditFood.food,
            ...food
          })
          .then(() => {
            dispatch(actionGetAllFoodsByName(''));
            handleClose();
            dispatch(
              actionUserSnackbar({
                status: true,
                content: 'Cập nhật thông tin món ăn thành công',
                type: 'success'
              })
            );
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .get(`${api}monAn/detail/tenMonAn`, {
            params: {
              tenMonAn: values.name
            }
          })
          .then((res) => {
            setError('Tên món ăn đã tồn tại');
          })
          .catch((err) => {
            axios
              .put(`${api}monAn/edit`, {
                ...modalEditFood.food,
                ...food
              })
              .then(() => {
                dispatch(actionGetAllFoods());
                handleClose();
                dispatch(
                  actionUserSnackbar({
                    status: true,
                    content: 'Cập nhật thông tin món ăn thành công',
                    type: 'success'
                  })
                );
              })
              .catch((err) => console.log(err));
          });
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  if (avatar === undefined) return null;
  return (
    <Modal open={modalEditFood.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thông tin món ăn</Typography>
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
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>Hình ảnh</Typography>
                  {avatar.map((item, index) => {
                    const removeImage = () => {
                      setAvatar([...avatar.filter((image, i) => i !== index)]);
                    };
                    return <ImageChosen key={index} click={removeImage} image={item} />;
                  })}
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                      Được thêm bởi: {modalEditFood.food.nguoiQuanLy.hoTen}
                    </Typography>
                    <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                      Ngày thêm : {`${moment(modalEditFood.food.createAt).format('DD/MM/YYYY')}`}
                    </Typography>
                  </Box>
                  <Typography sx={{ color: 'gray', fontWeight: 'bold', fontSize: '14px' }}>
                    Yêu thích:
                    {!modalEditFood.food.thich || modalEditFood.food.thich.length === 0
                      ? ` 0 `
                      : ` ${modalEditFood.food.thich.length} yêu thích`}
                  </Typography>
                  <Input
                    fullWidth
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    label="Tên món ăn"
                  />
                  <Input
                    fullWidth
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                    label="Đơn giá"
                  />
                  <Autocomplete
                    sx={{ marginTop: '20px', zIndex: 4 }}
                    disablePortal
                    onChange={(event, newValue) => setType(newValue)}
                    options={typefoods}
                    defaultValue={type}
                    disableClearable
                    getOptionLabel={(option) => option.tenLoaiMonAn}
                    filterOptions={filterOptions}
                    renderInput={(params) => (
                      <TextField
                        error={error === 'Vui lòng chọn loại món ăn'}
                        sx={{ color: '#fff' }}
                        {...params}
                        label="Loại món ăn"
                      />
                    )}
                    renderOption={(params, option) => (
                      <Box sx={{ background: '#fff' }} {...params}>
                        {option.tenLoaiMonAn}
                      </Box>
                    )}
                  />
                  <Input
                    multiline
                    label="Mô tả"
                    fullWidth
                    {...getFieldProps('description')}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    minRows={5}
                    maxRows={5}
                  />
                  <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                    <FormLabel>Tình trạng</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        value="Đang bán"
                        control={
                          <Radio
                            onClick={() => setStatus('Đang bán')}
                            checked={status === 'Đang bán'}
                          />
                        }
                        label="Đang bán"
                      />
                      <FormControlLabel
                        value="Hết bán"
                        control={
                          <Radio
                            onClick={() => setStatus('Hết bán')}
                            checked={status === 'Hết bán'}
                          />
                        }
                        label="Hết bán"
                      />
                    </RadioGroup>
                  </FormControl>
                </BoxInput>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{error}</Typography>
                  <ButtonAddEmployee type="submit">Sửa thông tin món ăn</ButtonAddEmployee>
                </Box>
              </Form>
            </FormikProvider>
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalEditFood;
