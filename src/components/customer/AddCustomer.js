import React, { useState, useRef } from 'react';
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
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { Scrollbar } from 'smooth-scrollbar-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import api from '../../assets/api/api';
import {
  actionCustomerModalAddCustomer,
  actionGetAllCustomerByKeyword,
  actionGetAllCustomers,
  actionGetNewCustomerInWeek
} from '../../redux/actions/customerAction';
import { actionUserSnackbar } from '../../redux/actions/userAction';
import { storage } from '../../firebase-config';
import { actionColumnCustomersYear } from '../../redux/actions/analyticAction';

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
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));
const AvatarEmployee = styled(Avatar)(({ theme }) => ({
  width: '100px',
  height: '100px',
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
AddCustomer.prototype = {
  add: PropTypes.func
};
function AddCustomer({ add }) {
  const fileRef = useRef();
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
  const [image, setImage] = useState({});
  const modalAddCustomer = useSelector((state) => state.customer.modalAddCustomer);
  const handleClose = () => {
    dispatch(actionCustomerModalAddCustomer(false));
  };
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setAvatar(URL.createObjectURL(files[0]));
        setImage(files[0]);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: '???nh ?????i di???n ph???i nh??? h??n 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  const LoginSchema = Yup.object().shape({
    fullname: Yup.string().required('Vui l??ng nh???p h??? t??n'),
    username: Yup.string()
      .matches('^.{6,32}$', 'T??n ????ng nh???p kh??ng h???p l???')
      .required('Vui l??ng nh???p t??n ????ng nh???p'),
    phone: Yup.string()
      .matches('^0[0-9]{8,10}$', 'S??? ??i???n tho???i kh??ng h???p l???')
      .required('Vui l??ng nh???p s??? ??i???n tho???i'),
    email: Yup.string().email('Email kh??ng h???p l???'),
    identification: Yup.string()
      .matches('^[0-9]{10,12}$', 'Ch???ng minh th?? kh??ng h???p l???')
      .required('Vui l??ng nh???p ch???ng minh th??'),
    password: Yup.string()
      .matches('^.{6,32}$', 'M???t kh???u kh??ng h???p l???')
      .required('Vui l??ng nh???p m???t kh???u')
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
        setErrorRePassword('X??c nh???n m???t kh???u kh??ng tr??ng kh???p');
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
          gioiTinh: gender,
          taiKhoan: {
            tenDangNhap: values.username,
            matKhau: values.password
          }
        };
        axios
          .get(`${api}taiKhoan/detail/tenDangNhap/${values.username}`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          })
          .then((res) => {
            setError('T??n ????ng nh???p ???? t???n t???i');
          })
          .catch((err) => {
            setError('');
            if (
              avatar === 'https://tinhdaunhuy.com/wp-content/uploads/2015/08/default-avatar.jpg'
            ) {
              axios
                .post(`${api}khachHang/create`, {
                  ...customer
                })
                .then((res) => {
                  dispatch(actionGetAllCustomers());
                  dispatch(actionGetNewCustomerInWeek());
                  dispatch(actionGetAllCustomerByKeyword(''));
                  dispatch(actionColumnCustomersYear(new Date().getFullYear()));
                  dispatch(
                    actionUserSnackbar({
                      status: true,
                      content: 'Th??m kh??ch h??ng th??nh c??ng',
                      type: 'success'
                    })
                  );
                  handleClose();
                })
                .catch((err) => console.log(err));
            } else {
              add(customer, image);
              handleClose();
            }
          })
          .catch((err) => console.log(err));
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Modal open={modalAddCustomer} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Th??m kh??ch h??ng</Typography>
          <IconButton onClick={() => dispatch(actionCustomerModalAddCustomer(false))}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar alwaysShowTracks>
            <BoxAvatar>
              <AvatarEmployee src={avatar} />
              <ButtonChooseAvatar onClick={() => fileRef.current.click()}>
                Ch???n ???nh
              </ButtonChooseAvatar>
            </BoxAvatar>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <BoxInput>
                  <Input
                    {...getFieldProps('fullname')}
                    error={Boolean(touched.fullname && errors.fullname)}
                    helperText={touched.fullname && errors.fullname}
                    fullWidth
                    label="H??? t??n"
                  />
                  <Input
                    {...getFieldProps('username')}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                    fullWidth
                    label="T??n ????ng nh???p"
                  />
                  <Input
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                    fullWidth
                    label="S??? ??i???n tho???i"
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
                    label="Ch???ng minh th??"
                  />
                  <DatePicker
                    customInput={
                      <Input
                        error={Boolean(errorBirthday)}
                        helperText={errorBirthday}
                        label="Ng??y sinh"
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
                    label="M???t kh???u"
                  />
                  <Input
                    error={Boolean(errorRePassword)}
                    helperText={errorRePassword}
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    fullWidth
                    type="password"
                    label="X??c nh???n m???t kh???u"
                  />
                  <FormControl sx={{ marginTop: '10px' }}>
                    <FormLabel>Gi???i t??nh</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        value="Nam"
                        control={
                          <Radio onClick={() => setGender('Nam')} checked={gender === 'Nam'} />
                        }
                        label="Nam"
                      />
                      <FormControlLabel
                        value="N???"
                        control={
                          <Radio onClick={() => setGender('N???')} checked={gender === 'N???'} />
                        }
                        label="N???"
                      />
                    </RadioGroup>
                  </FormControl>
                </BoxInput>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{error}</Typography>
                  <ButtonAddEmployee type="submit">Th??m kh??ch h??ng</ButtonAddEmployee>
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

export default AddCustomer;
