import React, { useEffect, useRef, useState } from 'react';
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
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  styled,
  TextField,
  Typography,
  FormLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { Scrollbar } from 'smooth-scrollbar-react';
import PropTypes from 'prop-types';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase-config';
import api from '../../assets/api/api';
import {
  actionCustomerModalAddCustomer,
  actionCustomerModalEditCustomer,
  actionGetAllCustomerByKeyword,
  actionGetAllCustomers
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
ModalEditCustomer.prototype = {
  handleUpdateCustomer: PropTypes.func
};
function ModalEditCustomer({ handleUpdateCustomer }) {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState('');
  const [image, setImage] = useState({});
  const modalEditCustomer = useSelector((state) => state.customer.modalEditCustomer);
  useEffect(() => {
    setGender(modalEditCustomer.customer.gioiTinh);
    setStatus(modalEditCustomer.customer.taiKhoan.trangThai);
    setBirthday(modalEditCustomer.customer.ngaySinh);
    setAvatar(modalEditCustomer.customer.anhDaiDien);
    return function () {
      return null;
    };
  }, [modalEditCustomer]);
  const handleClose = () => {
    dispatch(
      actionCustomerModalEditCustomer({
        status: false,
        customer: {}
      })
    );
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
    identification: Yup.string().matches('^[0-9]{10,12}$', 'Ch???ng minh th?? kh??ng h???p l???')
  });
  const formik = useFormik({
    initialValues: {
      fullname: `${modalEditCustomer.customer.hoTen}`,
      username: `${modalEditCustomer.customer.taiKhoan.tenDangNhap}`,
      phone: `${modalEditCustomer.customer.soDienThoai}`,
      email: `${modalEditCustomer.customer.email === null ? '' : modalEditCustomer.customer.email}`,
      identification: `${
        modalEditCustomer.customer.chungMinhThu === null
          ? ''
          : modalEditCustomer.customer.chungMinhThu
      }`,
      address: `${
        modalEditCustomer.customer.diaChi === null ? '' : modalEditCustomer.customer.diaChi
      }`
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      if (avatar === modalEditCustomer.customer.anhDaiDien) {
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
        if (modalEditCustomer.customer.taiKhoan.trangThai !== status) {
          axios
            .put(
              `${api}taiKhoan/edit`,
              {
                ...modalEditCustomer.customer.taiKhoan,
                trangThai: status
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
              }
            )
            .then((res) => {
              axios
                .put(
                  `${api}khachHang/edit`,
                  {
                    ...modalEditCustomer.customer,
                    ...customer,
                    taiKhoan: {
                      ...res.data
                    }
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
                  }
                )
                .then((res) => {
                  dispatch(actionGetAllCustomers());
                  handleUpdateCustomer(res.data);
                  handleClose();
                  dispatch(actionGetAllCustomerByKeyword(''));
                  dispatch(
                    actionUserSnackbar({
                      status: true,
                      content: 'S???a th??ng tin kh??ch h??ng th??nh c??ng',
                      type: 'success'
                    })
                  );
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        } else {
          axios
            .put(
              `${api}khachHang/edit`,
              {
                ...modalEditCustomer.customer,
                ...customer
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
              }
            )
            .then((res) => {
              handleClose();
              handleUpdateCustomer(res.data);
              dispatch(actionGetAllCustomerByKeyword(''));
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'S???a th??ng tin kh??ch h??ng th??nh c??ng',
                  type: 'success'
                })
              );
            })
            .catch((err) => console.log(err));
        }
      } else {
        const storageRef = ref(storage, `avatar/${values.fullname}.${new Date().getTime()}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const customer = {
                anhDaiDien: downloadURL,
                hoTen: values.fullname,
                soDienThoai: values.phone,
                email: values.email,
                chungMinhThu: values.identification,
                diaChi: values.address,
                ngaySinh: birthday,
                gioiTinh: gender
              };
              if (modalEditCustomer.customer.taiKhoan.trangThai !== status) {
                axios
                  .put(
                    `${api}taiKhoan/edit`,
                    {
                      ...modalEditCustomer.customer.taiKhoan,
                      trangThai: status
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                      }
                    }
                  )
                  .then((res) => {
                    axios
                      .put(
                        `${api}khachHang/edit`,
                        {
                          ...modalEditCustomer.customer,
                          ...customer,
                          taiKhoan: {
                            ...res.data
                          }
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                          }
                        }
                      )
                      .then((res) => {
                        dispatch(actionGetAllCustomers());
                        handleUpdateCustomer(res.data);
                        dispatch(actionGetAllCustomerByKeyword(''));
                        handleClose();
                        dispatch(
                          actionUserSnackbar({
                            status: true,
                            content: 'S???a th??ng tin kh??ch h??ng th??nh c??ng',
                            type: 'success'
                          })
                        );
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              } else {
                axios
                  .put(
                    `${api}khachHang/edit`,
                    {
                      ...modalEditCustomer.customer,
                      ...customer
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                      }
                    }
                  )
                  .then((res) => {
                    handleClose();
                    handleUpdateCustomer(res.data);
                    dispatch(actionGetAllCustomerByKeyword(''));
                    dispatch(
                      actionUserSnackbar({
                        status: true,
                        content: 'S???a th??ng tin kh??ch h??ng th??nh c??ng',
                        type: 'success'
                      })
                    );
                  })
                  .catch((err) => console.log(err));
              }
            });
          }
        );
      }
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  if (modalEditCustomer.customer.hoTen === undefined) return null;
  return (
    <Modal open={modalEditCustomer.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Th??ng tin kh??ch h??ng
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar alwaysShowTracks>
            <BoxAvatar>
              <AvatarEmployee src={avatar} />
              {modalEditCustomer.customer.taiKhoan.trangThai === 'Hi???u l???c' && (
                <ButtonChooseAvatar onClick={() => fileRef.current.click()}>
                  Ch???n ???nh
                </ButtonChooseAvatar>
              )}
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
                    selected={Date.parse(birthday)}
                    dateFormat="dd/MM/yyyy"
                    onChange={(newValue) => {
                      console.log(newValue);
                      setBirthday(newValue);
                    }}
                  />
                  <FormControl sx={{ width: '100%', marginTop: '10px' }}>
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
                  <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                    <FormLabel>T??nh tr???ng</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        value="Hi???u l???c"
                        control={
                          <Radio
                            onClick={() => setStatus('Hi???u l???c')}
                            checked={status === 'Hi???u l???c'}
                          />
                        }
                        label="Hi???u l???c"
                      />
                      <FormControlLabel
                        value="???? kho??"
                        control={
                          <Radio
                            onClick={() => setStatus('???? kho??')}
                            checked={status === '???? kho??'}
                          />
                        }
                        label="Kho??"
                      />
                    </RadioGroup>
                  </FormControl>
                </BoxInput>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{error}</Typography>
                  <ButtonAddEmployee type="submit">S???a th??ng tin kh??ch h??ng</ButtonAddEmployee>
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

export default ModalEditCustomer;
