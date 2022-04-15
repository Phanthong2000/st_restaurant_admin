import React, { useEffect, useState } from 'react';
import {
  styled,
  Box,
  Grid,
  Typography,
  Button,
  Card,
  InputBase,
  Avatar,
  Divider
} from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase-config';
import ChooseEmployee from '../components/employee/ChooseEmployee';
import AddEmployee from '../components/employee/AddEmployee';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import api from '../assets/api/api';
import {
  actionEmployeeModalAddEmployee,
  actionEmployeeModalEditEmployee,
  actionGetAllEmployees,
  actionGetEmployeesByKeywords
} from '../redux/actions/employeeAction';
import ModalEditEmployee from '../components/employee/ModalEditEmployee';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary
}));
const ButtonAddEmployee = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%',
  marginTop: '20px'
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const WrapperLeft = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px'
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  background: theme.palette.lightgrey,
  padding: '5px 10px',
  borderRadius: '20px'
}));
const InputSearch = styled(InputBase)(({ theme }) => ({
  width: '100%',
  marginLeft: '10px'
}));
const BoxSort = styled(Box)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  marginTop: '10px'
}));
const BoxChooseEmployee = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '390px',
  minHeight: '390px',
  marginTop: '10px',
  display: 'flex'
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const WrapperRight = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px',
  minHeight: '100%',
  display: 'flex'
}));
const BoxDontChooseEmployee = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  minHeight: '100%',
  justifyContent: 'center',
  color: theme.palette.main
}));
const BoxChosenTop = styled(Box)(({ theme }) => ({
  minWidth: '100%',
  display: 'flex',
  padding: '10px',
  justifyContent: 'space-between'
}));
const AvatarEmployee = styled('img')(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.main}`
}));
const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily.primary,
  textTransform: 'capitalize'
}));
const Checkin = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.gray,
  margin: '5px 0px'
}));
const BoxGender = styled(Box)(({ theme }) => ({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mainHover,
  borderRadius: '20px'
}));
const BoxEdit = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.main}`,
  color: theme.palette.main,
  background: theme.palette.white,
  padding: '10px',
  borderRadius: '20px',
  cursor: 'pointer',
  ':hover': {
    background: 'lightgrey'
  }
}));
function BoxInfo({ icon, value, label }) {
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex'
  }));
  const WrapperIcon = styled(Box)(({ theme }) => ({
    color: theme.palette.main,
    borderRadius: '30px',
    border: `1px solid lightgrey`,
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));
  const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary
  }));
  const Value = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary
  }));
  return (
    <Grid sx={{ width: '100%', padding: '20px' }} item xs={12} sm={6} md={6} xl={6} lg={6}>
      <Wrapper>
        <WrapperIcon>
          <Icon style={{ width: '25px', height: '25px' }} icon={icon} />
        </WrapperIcon>
        <Box sx={{ marginLeft: '20px' }}>
          <Label>{label}</Label>
          <Value>{value}</Value>
        </Box>
      </Wrapper>
    </Grid>
  );
}
function ButtonSort({ sort, value, label, handleSort }) {
  const ChipSort = styled(Typography)(({ theme }) => ({
    background: sort === value ? theme.palette.main : theme.palette.white,
    color: sort !== value ? theme.palette.main : theme.palette.white,
    padding: '2px 5px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '12px',
    border: `1px solid ${theme.palette.main}`,
    width: '80px',
    textAlign: 'center'
  }));
  return <ChipSort onClick={() => handleSort(value)}>{label}</ChipSort>;
}
function Employee2() {
  const [sort, setSort] = useState('all');
  const [employeesSort, setEmployeesSort] = useState([]);
  const [employeeChosen, setEmployeeChosen] = useState();
  const modalEditEmployee = useSelector((state) => state.employee.modalEditEmployee);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const employees = useSelector((state) => state.employee.employeesKeyword);
  const sortEmployee = (sort) => {
    if (sort === 'all') {
      setEmployeesSort(employees);
    } else if (sort === 'Đã nghỉ') {
      setEmployeesSort(employees.filter((employee) => employee.taiKhoan.trangThai === 'Đã nghỉ'));
    } else {
      setEmployeesSort(employees.filter((employee) => employee.taiKhoan.trangThai !== 'Đã nghỉ'));
    }
  };
  useEffect(() => {
    sortEmployee(sort);
    return function () {
      return null;
    };
  }, [employees]);
  const handleSort = (value) => {
    setSort(value);
    sortEmployee(value);
  };
  const handleChooseEmployee = (employee) => {
    setEmployeeChosen(employee);
  };
  const addEmployee = (employee, image) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thêm nhân viên'
      })
    );
    const storageRef = ref(storage, `avatar/${employee.hoTen}.${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .post(
              `${api}nhanVien/create`,
              {
                ...employee,
                anhDaiDien: downloadURL
              },
              {
                headers: {
                  Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                  // 'Content-Type': 'application/json'
                }
              }
            )
            .then((res) => {
              dispatch(actionGetEmployeesByKeywords(''));
              handleChooseEmployee(res.data);
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: 'Thêm nhân viên'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Thêm nhân viên thành công',
                  type: 'success'
                })
              );
            })
            .catch((err) => console.log(err));
        });
      }
    );
  };
  const searchEmployees = (text) => {
    setSearch(text);
    dispatch(actionGetEmployeesByKeywords(text));
  };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <Box sx={{ width: '100%', padding: '10px' }}>
          <BoxTitle>
            <Title>Danh sách nhân viên</Title>
            <ButtonAddEmployee onClick={() => dispatch(actionEmployeeModalAddEmployee(true))}>
              Thêm nhân viên
            </ButtonAddEmployee>
          </BoxTitle>
          <BoxContent container>
            <BoxLeft item xs={12} sm={12} md={12} lg={4} xl={4}>
              <WrapperLeft>
                <BoxSearch>
                  <Icon style={{ width: '25px', height: '25px' }} icon="system-uicons:search" />
                  <InputSearch
                    value={search}
                    onChange={(e) => searchEmployees(e.target.value)}
                    fullWidth
                    placeholder="Tìm kiếm nhân viên"
                  />
                </BoxSearch>
                <BoxSort>
                  <ButtonSort handleSort={handleSort} label="Tất cả" value="all" sort={sort} />
                  <ButtonSort
                    handleSort={handleSort}
                    label="Đang làm"
                    value="Đang làm"
                    sort={sort}
                  />
                  <ButtonSort handleSort={handleSort} label="Đã nghỉ" value="Đã nghỉ" sort={sort} />
                </BoxSort>
                <BoxChooseEmployee>
                  <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
                    {employeesSort.map((item, index) => (
                      <ChooseEmployee
                        handleChooseEmployee={handleChooseEmployee}
                        key={item.id}
                        chosen={employeeChosen}
                        employee={item}
                      />
                    ))}
                  </Scrollbar>
                </BoxChooseEmployee>
              </WrapperLeft>
            </BoxLeft>
            <BoxRight item xs={12} sm={12} md={12} lg={8} xl={8}>
              <WrapperRight>
                {employeeChosen ? (
                  <Box sx={{ width: '100%' }}>
                    <BoxChosenTop>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarEmployee src={employeeChosen.anhDaiDien} />
                        <Box sx={{ marginLeft: '10px' }}>
                          <Username>{employeeChosen.hoTen}</Username>
                          <Checkin>
                            Ngày vào làm
                            {moment(employeeChosen.createAt).format(` DD/MM/YYYY`)}
                          </Checkin>
                          <Box sx={{ display: 'flex' }}>
                            <BoxGender>
                              <Icon
                                style={{ color: '#fff' }}
                                icon={
                                  employeeChosen.gioiTinh === 'Nam'
                                    ? `bi:gender-male`
                                    : `bi:gender-female`
                                }
                              />
                              <Typography
                                sx={{
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: '14px',
                                  marginLeft: '5px',
                                  fontFamily: 'sans-serif'
                                }}
                              >
                                {employeeChosen.gioiTinh}
                              </Typography>
                            </BoxGender>
                            <BoxGender
                              sx={{
                                marginLeft: '10px',
                                background: employeeChosen.taiKhoan.trangThai === 'Đã nghỉ' && 'red'
                              }}
                            >
                              <Icon style={{ color: '#fff' }} icon="ps:work-case" />
                              <Typography
                                sx={{
                                  color: '#fff',
                                  fontWeight: 'bold',
                                  fontSize: '14px',
                                  fontFamily: 'sans-serif',
                                  marginLeft: '5px'
                                }}
                              >
                                {employeeChosen.taiKhoan.trangThai === 'Đã nghỉ'
                                  ? `Đã nghỉ`
                                  : `Đang làm`}
                              </Typography>
                            </BoxGender>
                          </Box>
                        </Box>
                      </Box>
                      <Box>
                        <BoxEdit
                          onClick={() =>
                            dispatch(
                              actionEmployeeModalEditEmployee({
                                status: true,
                                employee: employeeChosen
                              })
                            )
                          }
                        >
                          <Icon icon="dashicons:edit-large" />
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              fontSize: '14px',
                              fontFamily: 'sans-serif',
                              marginLeft: '5px'
                            }}
                          >
                            Sửa thông tin
                          </Typography>
                        </BoxEdit>
                      </Box>
                    </BoxChosenTop>
                    <Divider sx={{ margin: '20px 0px' }} />
                    <Grid container>
                      <BoxInfo
                        icon="ant-design:user-outlined"
                        value={employeeChosen.taiKhoan.tenDangNhap}
                        label="Tên đăng nhập"
                      />
                      <BoxInfo
                        icon="carbon:phone"
                        value={employeeChosen.soDienThoai}
                        label="Số điện thoại"
                      />
                      <BoxInfo icon="mi:email" value={employeeChosen.email} label="Email" />
                      <BoxInfo
                        icon="heroicons-outline:identification"
                        value={employeeChosen.chungMinhThu}
                        label="Chứng minh thư"
                      />
                      <BoxInfo
                        icon="mdi:map-marker-outline"
                        value={employeeChosen.diaChi}
                        label="Địa chỉ"
                      />
                    </Grid>
                  </Box>
                ) : (
                  <BoxDontChooseEmployee>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                      <Icon
                        style={{ width: '100px', height: '100px' }}
                        icon="healthicons:info-outline"
                      />
                      <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                        Thông tin nhân viên
                      </Typography>
                    </Box>
                  </BoxDontChooseEmployee>
                )}
              </WrapperRight>
            </BoxRight>
          </BoxContent>
        </Box>
        <Box> </Box>
        <AddEmployee handleChooseEmployee={handleChooseEmployee} addEmployee={addEmployee} />
        {modalEditEmployee.status && (
          <ModalEditEmployee handleChooseEmployee={handleChooseEmployee} />
        )}
      </Scrollbar>
    </RootStyle>
  );
}

export default Employee2;
