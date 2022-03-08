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
import AddCustomer from '../components/customer/AddCustomer';
import {
  actionCustomerModalAddCustomer,
  actionCustomerGetAllCustomersByKeyword,
  actionGetAllCustomerByKeyword
} from '../redux/actions/customerAction';
import ModalEditCustomer from '../components/customer/ModalEditCustomer';

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
const BoxListCustomer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2)
}));
const ButtonAddCustomer = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function Customer() {
  const customers = useSelector((state) => state.customer.customersKeyword);
  const modalEditCustomer = useSelector((state) => state.customer.modalEditCustomer);
  const [page, setPage] = useState(0);
  const [customerTable, setCustomerTable] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const getCustomerByPage = (page) => {
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < customers.length; i += 1) {
      if (i >= start && i < end) {
        data.push(customers.at(i));
      }
    }
    setCustomerTable(data);
  };
  useEffect(() => {
    getCustomerByPage(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [customers]);
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
      name: 'Trạng thái',
      width: '15%'
    },
    {
      name: 'Xem thông tin',
      width: '10%'
    }
  ];
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
    getCustomerByPage(newValue);
  };
  const searchCustomer = (text) => {
    setSearch(text);
    dispatch(actionGetAllCustomerByKeyword(text));
  };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase
            value={search}
            onChange={(e) => searchCustomer(e.target.value)}
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
        <Box sx={{ marginTop: '20px' }}>
          <BoxListCustomer>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              Danh sách khách hàng
            </Typography>
            <ButtonAddCustomer onClick={() => dispatch(actionCustomerModalAddCustomer(true))}>
              Thêm khách hàng
            </ButtonAddCustomer>
          </BoxListCustomer>
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
              {customerTable.length === 0 ? (
                <TableBody>
                  <TableRow>
                    <TableCell
                      sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}
                      colSpan={7}
                    >
                      Không có khách hàng
                    </TableCell>
                  </TableRow>
                </TableBody>
              ) : (
                <TableBody>
                  {customerTable.map((item, index) => (
                    <CustomerTableRow key={index} customer={item} index={index + page * 5} />
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions
            component="div"
            count={customers.length}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
      </Scrollbar>
      <AddCustomer />
      {modalEditCustomer.status && <ModalEditCustomer />}
    </RootStyle>
  );
}

export default Customer;
