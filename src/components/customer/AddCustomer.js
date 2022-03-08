import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  Avatar,
  Box,
  Button,
  Card,
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
import { Scrollbar } from 'smooth-scrollbar-react';
import api from '../../assets/api/api';
import {
  actionCustomerModalAddCustomer,
  actionGetAllCustomerByKeyword
} from '../../redux/actions/customerAction';
import { actionUserSnackbar } from '../../redux/actions/userAction';

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
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '600px',
  overflow: 'auto',
  display: 'flex'
}));
const BoxAvatar = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center'
}));
const AvatarEmployee = styled(Avatar)(({ theme }) => ({
  width: '20%',
  marginLeft: '40%',
  height: '20%',
  border: `1px solid ${theme.palette.main}`
}));
const ButtonChooseAvatar = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '10px',
  ':hover': {
    background: theme.palette.mainHover
  }
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
function AddCustomer() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState('Nam');
  const [birthday, setBirthday] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errorRePassword, setErrorRePassword] = useState('');
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState(
    'https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg'
  );
  const modalAddCustomer = useSelector((state) => state.customer.modalAddCustomer);
  const handleClose = () => {
    dispatch(actionCustomerModalAddCustomer(false));
  };
  const LoginSchema = Yup.object().shape({
    fullname: Yup.string().required('Vui lòng nhập họ tên'),
    username: Yup.string()
      .matches('^.{6,32}$', 'Tên đăng nhập không hợp lệ')
      .required('Vui lòng nhập tên đăng nhập'),
    phone: Yup.string()
      .matches('^0[0-9]{8,10}$', 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ'),
    identification: Yup.string()
      .matches('^[0-9]{10,12}$', 'Chứng minh thư không hợp lệ')
      .required('Vui lòng nhập chứng minh thư'),
    password: Yup.string()
      .matches('^.{6,32}$', 'Mật khẩu không hợp lệ')
      .required('Vui lòng nhập mật khẩu')
  });
  const formik = useFormik({
    initialValues: {
      fullname: '',
      username: '',
      phone: '',
      email: '',
      identification: '',
      address: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      if (rePassword !== values.password) {
        setErrorRePassword('Xác nhận mật khẩu không trùng khớp');
      } else {
        setErrorBirthday('');
        setErrorRePassword('');
        const customer = {
          anhDaiDien: avatar,
          hoTen: values.fullname,
          soDienThoai: values.phone,
          email: values.email,
          chungMinhThu: values.identification,
          diaChi: values.address,
          ngaySinh: birthday,
          gioiTinh: gender
        };
        axios
          .get(`${api}taiKhoan/detail/tenDangNhap/${values.username}`)
          .then((res) => {
            setError('Tên đăng nhập đã tồn tại');
          })
          .catch((err) => {
            axios
              .get(`${api}vaiTro/detail/tenVaiTro/CUSTOMER`)
              .then((res) => {
                axios
                  .post(`${api}taiKhoan/create/`, {
                    tenDangNhap: values.username,
                    matKhau: values.password,
                    trangThai: 'Hoạt động',
                    vaiTro: {
                      id: res.data.id
                    }
                  })
                  .then((res) => {
                    axios
                      .post(`${api}khachHang/create`, {
                        ...customer,
                        taiKhoan: {
                          id: res.data.id
                        }
                      })
                      .then((res) => {
                        dispatch(actionGetAllCustomerByKeyword(''));
                        dispatch(
                          actionUserSnackbar({
                            status: true,
                            content: 'Thêm khách hàng thành công',
                            type: 'success'
                          })
                        );
                        handleClose();
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          });
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Modal open={modalAddCustomer} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thêm khách hàng</Typography>
          <IconButton onClick={() => dispatch(actionCustomerModalAddCustomer(false))}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar alwaysShowTracks>
            <BoxAvatar>
              <AvatarEmployee src={avatar} />
              <ButtonChooseAvatar>Chọn ảnh</ButtonChooseAvatar>
            </BoxAvatar>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <BoxInput>
                  <Input
                    {...getFieldProps('fullname')}
                    error={Boolean(touched.fullname && errors.fullname)}
                    helperText={touched.fullname && errors.fullname}
                    fullWidth
                    label="Họ tên"
                  />
                  <Input
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    fullWidth
                    label="Tên đăng nhập"
                  />
                  <Input
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                    fullWidth
                    label="Số điện thoại"
                  />
                  <Input
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    label="Email"
                  />
                  <Input
                    {...getFieldProps('identification')}
                    error={Boolean(touched.identification && errors.identification)}
                    helperText={touched.identification && errors.identification}
                    fullWidth
                    label="Chứng minh thư"
                  />
                  <DatePicker
                    customInput={
                      <Input
                        error={Boolean(errorBirthday)}
                        helperText={errorBirthday}
                        label="Ngày sinh"
                        fullWidth
                      />
                    }
                    selected={birthday}
                    dateFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      console.log(newValue);
                      setBirthday(newValue);
                    }}
                  />
                  <Input
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    type="password"
                    fullWidth
                    label="Mật khẩu"
                  />
                  <Input
                    error={Boolean(errorRePassword)}
                    helperText={errorRePassword}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    fullWidth
                    type="password"
                    label="Xác nhận mật khẩu"
                  />
                  <FormControl sx={{ marginTop: '10px' }}>
                    <FormLabel>Giới tính</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        value="Nam"
                        control={
                          <Radio onClick={() => setGender('Nam')} checked={gender === 'Nam'} />
                        }
                        label="Nam"
                      />
                      <FormControlLabel
                        value="Nữ"
                        control={
                          <Radio onClick={() => setGender('Nữ')} checked={gender === 'Nữ'} />
                        }
                        label="Nữ"
                      />
                    </RadioGroup>
                  </FormControl>
                </BoxInput>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{error}</Typography>
                  <ButtonAddEmployee type="submit">Thêm khách hàng</ButtonAddEmployee>
                </Box>
              </Form>
            </FormikProvider>
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default AddCustomer;
