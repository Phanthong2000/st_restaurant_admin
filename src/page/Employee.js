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
      name: '???nh ?????i di???n',
      width: '10%'
    },
    {
      name: 'H??? t??n',
      width: '20%'
    },
    {
      name: 'S??? ??i???n tho???i',
      width: '15%'
    },
    {
      name: 'Gi???i t??nh',
      width: '10%'
    },
    {
      name: 'T??nh tr???ng',
      width: '15%'
    },
    {
      name: 'Xem th??ng tin',
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
  const addEmployee = (employee, image) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Th??m nh??n vi??n'
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
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: 'Th??m nh??n vi??n'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Th??m nh??n vi??n th??nh c??ng',
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
            placeholder="T??m ki???m kh??ch h??ng"
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
              Danh s??ch nh??n vi??n
            </Typography>
            <ButtonAddEmployee onClick={() => dispatch(actionEmployeeModalAddEmployee(true))}>
              Th??m nh??n vi??n
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
                  <TableCell colSpan={7}>
                    <Tooltip title="V??? ?????u b???ng">
                      <IconButton onClick={goToStartTable} disabled={page === 0}>
                        <Icon icon="bi:skip-start-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="?????n cu???i b???ng">
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
      {/* <AddEmployee addEmployee={addEmployee} /> */}
      {modalEditEmployee.status && <ModalEditEmployee />}
    </RootStyle>
  );
}

export default Employee;
