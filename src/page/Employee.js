import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  InputBase,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import CustomerTableRow from '../components/customer/CustomerTableRow';
import AddEmployee from '../components/employee/AddEmployee';
import { actionEmployeeModalAddEmployee } from '../redux/actions/employeeAction';
import EmployeeTableRow from '../components/employee/EmployeeTableRow';
import ModalEditEmployee from '../components/employee/ModalEditEmployee';

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
  const employees = useSelector((state) => state.employee.employees);
  const modalEditEmployee = useSelector((state) => state.employee.modalEditEmployee);
  const [page, setPage] = useState(0);
  const [employeeTable, setEmployeeTable] = useState([]);
  const dispatch = useDispatch();
  const setEmployees = (page) => {
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < employees.length; i += 1) {
      if (i >= start && i < end) {
        data.push(employees.at(i));
      }
    }
    setEmployeeTable(data);
  };
  useEffect(() => {
    setEmployees(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [employees]);
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
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase fullWidth placeholder="Tìm kiếm khách hàng" />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
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
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={false}
            component="div"
            count={employees.length}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      </Scrollbar>
      <AddEmployee />
      {modalEditEmployee.status && <ModalEditEmployee />}
    </RootStyle>
  );
}

export default Employee;
