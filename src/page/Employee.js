import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import CustomerTableRow from '../components/customer/CustomerTableRow';
import AddEmployee from '../components/employee/AddEmployee';
import {
  actionEmployeeModalAddEmployee,
  actionGetAllEmployees,
  actionGetEmployeesByKeywords
} from '../redux/actions/employeeAction';
import EmployeeTableRow from '../components/employee/EmployeeTableRow';
import ModalEditEmployee from '../components/employee/ModalEditEmployee';
import BoxSort from '../components/employee/BoxSort';
import { actionUserBackdrop, actionUserSnackbar } from '../redux/actions/userAction';
import { storage } from '../firebase-config';
import api from '../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex'
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '50%',
  marginLeft: '25%',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.black}`,
  borderRadius: '20px',
  marginTop: '20px',
  paddingLeft: '15px'
}));
const BoxButtonSearch = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.main,
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  marginRight: '1.5px',
  width: '50px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxListEmployee = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2)
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
function Employee() {
  const employees = useSelector((state) => state.employee.employeesKeyword);
  const modalEditEmployee = useSelector((state) => state.employee.modalEditEmployee);
  const sortEmployee = useSelector((state) => state.employee.sortEmployee);
  const [page, setPage] = useState(0);
  const [employeeTable, setEmployeeTable] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const setEmployees = (page) => {
    const notPages = [];
    employees.forEach((customer) => {
      if (sortEmployee === 'all') {
        notPages.push(customer);
      } else if (customer.taiKhoan.trangThai === sortEmployee) {
        notPages.push(customer);
      }
    });
    setQuantity(notPages.length);
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < notPages.length; i += 1) {
      if (i >= start && i < end) {
        data.push(notPages.at(i));
      }
    }
    setEmployeeTable(data);
  };
  const searchEmployees = (text) => {
    setSearch(text);
    dispatch(actionGetEmployeesByKeywords(text));
  };
  useEffect(() => {
    setEmployees(0);
    setPage(0);
    return function () {
      // searchEmployees('');
    };
  }, [employees, sortEmployee]);
  const header = [
    {
      name: 'STT',
      width: '5%'
    },
    {
      name: 'Ảnh đại diện',
      width: '10%'
    },
    {
      name: 'Họ tên',
      width: '20%'
    },
    {
      name: 'Số điện thoại',
      width: '15%'
    },
    {
      name: 'Giới tính',
      width: '10%'
    },
    {
      name: 'Tình trạng',
      width: '15%'
    },
    {
      name: 'Xem thông tin',
      width: '10%'
    }
  ];
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
    setEmployees(newValue);
  };
  const goToStartTable = () => {
    setPage(0);
    setEmployees(0);
  };
  const goToEndTable = () => {
    const page = ((employees.length - 1) / 5)
      .toString()
      .substring(0, ((employees.length - 1) / 5).toFixed(1).toString().indexOf('.'));
    setPage(parseInt(page, 10));
    setEmployees(parseInt(page, 10));
  };
  const addEmployee = (account, employee, image) => {
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
            .post(`${api}nhanVien/create`, {
              ...employee,
              anhDaiDien: downloadURL,
              taiKhoan: {
                id: account.id
              }
            })
            .then((res) => {
              dispatch(actionGetEmployeesByKeywords(''));
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
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase
            onChange={(e) => searchEmployees(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm khách hàng"
          />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
        <BoxSort />
        <Box sx={{ marginTop: '20px' }}>
          <BoxListEmployee>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              Danh sách nhân viên
            </Typography>
            <ButtonAddEmployee onClick={() => dispatch(actionEmployeeModalAddEmployee(true))}>
              Thêm nhân viên
            </ButtonAddEmployee>
          </BoxListEmployee>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {header.map((item, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        width: item.minWidth,
                        fontWeight: 'bold',
                        background: 'gray',
                        color: '#fff'
                      }}
                    >
                      {item.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeTable.map((item, index) => (
                  <EmployeeTableRow key={index} employee={item} index={index + page * 5} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={11}>
                    <Tooltip title="Về đầu bảng">
                      <IconButton onClick={goToStartTable} disabled={page === 0}>
                        <Icon icon="bi:skip-start-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Đến cuối bảng">
                      <IconButton
                        disabled={
                          ((employees.length - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((employees.length - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${page}`
                        }
                        onClick={goToEndTable}
                      >
                        <Icon icon="bi:skip-end-fill" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={false}
            component="div"
            count={quantity}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      </Scrollbar>
      <AddEmployee addEmployee={addEmployee} />
      {modalEditEmployee.status && <ModalEditEmployee />}
    </RootStyle>
  );
}

export default Employee;
