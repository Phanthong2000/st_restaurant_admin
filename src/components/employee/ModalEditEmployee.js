import React, { useEffect, useState } from 'react';
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
import api from '../../assets/api/api';
import { actionUserSnackbar } from '../../redux/actions/userAction';
import {
  actionGetAllEmployees,
  actionEmployeeModalEditEmployee
} from '../../redux/actions/employeeAction';

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
function ModalEditEmployee() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState(
    'https://images.cdn2.stockunlimited.net/clipart/employee_1565984.jpg'
  );
  const modalEditEmployee = useSelector((state) => state.employee.modalEditEmployee);
  useEffect(() => {
    setGender(modalEditEmployee.employee.gioiTinh);
    setStatus(modalEditEmployee.employee.taiKhoan.trangThai);
    return function () {
      return null;
    };
  }, [modalEditEmployee]);
  const handleClose = () => {
    dispatch(
      actionEmployeeModalEditEmployee({
        status: false,
        employee: {}
      })
    );
  };
  const CustomerSchema = Yup.object().shape({
    fullname: Yup.string().required('Vui lòng nhập họ tên'),
    username: Yup.string()
      .matches('^.{6,32}$', 'Tên đăng nhập không hợp lệ')
      .required('Vui lòng nhập tên đăng nhập'),
    phone: Yup.string()
      .matches('^0[0-9]{8,10}$', 'Số điện thoại không hợp lệ')
      .required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ'),
    identification: Yup.string().matches('^[0-9]{10,12}$', 'Chứng minh thư không hợp lệ')
  });
  const formik = useFormik({
    initialValues: {
      fullname: `${modalEditEmployee.employee.hoTen}`,
      username: `${modalEditEmployee.employee.taiKhoan.tenDangNhap}`,
      phone: `${modalEditEmployee.employee.soDienThoai}`,
      email: `${modalEditEmployee.employee.email === null ? '' : modalEditEmployee.employee.email}`,
      identification: `${
        modalEditEmployee.employee.chungMinhThu === null
          ? ''
          : modalEditEmployee.employee.chungMinhThu
      }`,
      address: `${
        modalEditEmployee.employee.diaChi === null ? '' : modalEditEmployee.employee.diaChi
      }`
    },
    validationSchema: CustomerSchema,
    onSubmit: () => {
      const employee = {
        anhDaiDien: avatar,
        hoTen: values.fullname,
        soDienThoai: values.phone,
        email: values.email,
        chungMinhThu: values.identification,
        diaChi: values.address,
        ngaySinh: birthday,
        gioiTinh: gender
      };
      if (modalEditEmployee.employee.taiKhoan.trangThai !== status) {
        axios
          .put(`${api}taiKhoan/edit`, {
            ...modalEditEmployee.employee.taiKhoan,
            trangThai: status
          })
          .then((res) => {
            axios
              .put(`${api}nhanVien/edit`, {
                ...modalEditEmployee.employee,
                ...employee,
                taiKhoan: {
                  ...res.data
                }
              })
              .then((res) => {
                dispatch(actionGetAllEmployees());
                dispatch(
                  actionUserSnackbar({
                    status: true,
                    content: 'Sửa thông tin nhân viên thành công',
                    type: 'success'
                  })
                );
                handleClose();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .put(`${api}nhanVien/edit`, {
            ...modalEditEmployee.employee,
            ...employee
          })
          .then((res) => {
            dispatch(actionGetAllEmployees());
            dispatch(
              actionUserSnackbar({
                status: true,
                content: 'Sửa thông tin nhân viên thành công',
                type: 'success'
              })
            );
            handleClose();
          })
          .catch((err) => console.log(err));
      }
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps } = formik;
  if (modalEditEmployee.employee.hoTen === undefined) return null;
  return (
    <Modal open={modalEditEmployee.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thông tin nhân viên</Typography>
          <IconButton onClick={handleClose}>
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
                  <FormControl sx={{ width: '100%', marginTop: '10px' }}>
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
                  <FormControl sx={{ width: '100%', marginTop: '10px' }}>
                    <FormLabel>Tình trạng</FormLabel>
                    <RadioGroup row>
                      <FormControlLabel
                        value="Đang làm"
                        control={
                          <Radio
                            onClick={() => setStatus('Đang làm')}
                            checked={status === 'Đang làm'}
                          />
                        }
                        label="Đang làm"
                      />
                      <FormControlLabel
                        value="Đã nghỉ"
                        control={
                          <Radio
                            onClick={() => setStatus('Đã nghỉ')}
                            checked={status === 'Đã nghỉ'}
                          />
                        }
                        label="Nghỉ việc"
                      />
                    </RadioGroup>
                  </FormControl>
                </BoxInput>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                  <Typography sx={{ color: 'red' }}>{error}</Typography>
                  <ButtonAddEmployee type="submit">Sửa thông tin nhân viên</ButtonAddEmployee>
                </Box>
              </Form>
            </FormikProvider>
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalEditEmployee;
