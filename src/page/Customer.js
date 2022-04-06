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
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import CustomerTableRow from '../components/customer/CustomerTableRow';
import AddCustomer from '../components/customer/AddCustomer';
import {
  actionCustomerModalAddCustomer,
  actionCustomerGetAllCustomersByKeyword,
  actionGetAllCustomerByKeyword,
  actionGetNewCustomerInWeek
} from '../redux/actions/customerAction';
import ModalEditCustomer from '../components/customer/ModalEditCustomer';
import BoxSort from '../components/customer/BoxSort';

import api from '../assets/api/api';
import { storage } from '../firebase-config';
import { actionUserSnackbar, actionUserBackdrop } from '../redux/actions/userAction';

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
  const sortCustomer = useSelector((state) => state.customer.sortCustomer);
  const [page, setPage] = useState(0);
  const [customerTable, setCustomerTable] = useState([]);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const getCustomerByPage = (page) => {
    const notPages = [];
    customers.forEach((customer) => {
      if (sortCustomer === 'all') {
        notPages.push(customer);
      } else if (customer.taiKhoan.trangThai === sortCustomer) {
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
    setCustomerTable(data);
  };
  useEffect(() => {
    getCustomerByPage(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [customers, sortCustomer]);
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
      name: 'Hoạt động',
      width: '15%'
    },
    {
      name: 'Xem thông tin',
      width: '10%'
    },
    {
      name: 'Đặt bàn',
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
  const goToStartTable = () => {
    setPage(0);
    getCustomerByPage(0);
  };
  const goToEndTable = () => {
    const page = ((customers.length - 1) / 5)
      .toString()
      .substring(0, ((customers.length - 1) / 5).toFixed(1).toString().indexOf('.'));
    setPage(parseInt(page, 10));
    getCustomerByPage(parseInt(page, 10));
  };
  const addCustomer = (account, customer, image) => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thêm khách hàng'
      })
    );
    const storageRef = ref(storage, `avatar/${customer.hoTen}.${new Date().getTime()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .post(`${api}khachHang/create`, {
              ...customer,
              anhDaiDien: downloadURL,
              taiKhoan: {
                id: account.id
              }
            })
            .then((res) => {
              dispatch(actionGetNewCustomerInWeek());
              dispatch(actionGetAllCustomerByKeyword(''));
              dispatch(
                actionUserBackdrop({
                  status: false,
                  content: 'Thêm khách hàng'
                })
              );
              dispatch(
                actionUserSnackbar({
                  status: true,
                  content: 'Thêm khách hàng thành công',
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
        <BoxSort />
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
            <Table id="tb">
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
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={9}>
                    <Tooltip title="Về đầu bảng">
                      <IconButton onClick={goToStartTable} disabled={page === 0}>
                        <Icon icon="bi:skip-start-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Đến cuối bảng">
                      <IconButton
                        disabled={
                          ((customers.length - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((customers.length - 1) / 5).toFixed(1).toString().indexOf('.')
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
            rowsPerPageOptions
            component="div"
            count={quantity}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          />
        </Box>
        {/* <ReactHtmlTableToExcel table="tb" filename="test" sheet="Sheet" buttonText="btn test" /> */}
      </Scrollbar>
      <AddCustomer add={addCustomer} />
      {modalEditCustomer.status && <ModalEditCustomer />}
    </RootStyle>
  );
}

export default Customer;
