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
  Typography,
  Grid
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
import CustomerItemGrid from '../components/customer/CustomerItemGrid';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
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
const BoxPage = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end'
}));
const ButtonChangePage = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  color: theme.palette.white,
  background: theme.palette.main,
  borderRadius: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));
const QuantityPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '50px',
  textAlign: 'center'
}));
const CountPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '13px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '30px',
  textAlign: 'center'
}));
const ButtonOptionChosen = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: theme.palette.main,
  color: theme.palette.white,
  marginRight: '10px',
  cursor: 'pointer'
}));
const ButtonOptionDontChoose = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  background: theme.palette.white,
  color: theme.palette.main,
  border: `1px solid ${theme.palette.main}`,
  marginRight: '10px',
  cursor: 'pointer'
}));
const IconOption = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px'
}));
function Customer() {
  const customers = useSelector((state) => state.customer.customersKeyword);
  const modalEditCustomer = useSelector((state) => state.customer.modalEditCustomer);
  const sortCustomer = useSelector((state) => state.customer.sortCustomer);
  const [page, setPage] = useState(0);
  const [customerTable, setCustomerTable] = useState([]);
  const [view, setView] = useState('grid');
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
    // {
    //   name: 'Giới tính',
    //   width: '10%'
    // },
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
    }
    // {
    //   name: 'Đặt bàn',
    //   width: '10%'
    // }
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
    const page = ((quantity - 1) / 5)
      .toString()
      .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.'));
    setPage(parseInt(page, 10));
    getCustomerByPage(parseInt(page, 10));
  };
  const addCustomer = (customer, image) => {
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
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          axios
            .post(`${api}khachHang/create`, {
              ...customer,
              anhDaiDien: downloadURL
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
  const handleNext = () => {
    if (
      ((quantity - 1) / 5)
        .toString()
        .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) !== `${page}`
    ) {
      getCustomerByPage(page + 1);
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 0) {
      getCustomerByPage(page - 1);
      setPage(page - 1);
    }
  };
  const handleChooseView = (view) => {
    setView(view);
  };
  return (
    <RootStyle>
      <Scrollbar style={{ padding: '0px 10px' }} alwaysShowTracks>
        <BoxSearch>
          <InputBase
            value={search}
            onChange={(e) => searchCustomer(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm khách hàng (tên, sđt, email, cmnd khách hàng)..."
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {view === 'grid' ? (
                <ButtonOptionChosen>
                  <IconOption icon="fluent:grid-16-filled" />
                </ButtonOptionChosen>
              ) : (
                <ButtonOptionDontChoose onClick={() => handleChooseView('grid')}>
                  <IconOption icon="fluent:grid-16-regular" />
                </ButtonOptionDontChoose>
              )}
              {view === 'table' ? (
                <ButtonOptionChosen>
                  <IconOption icon="fluent:table-freeze-row-16-filled" />
                </ButtonOptionChosen>
              ) : (
                <ButtonOptionDontChoose onClick={() => handleChooseView('table')}>
                  <IconOption icon="fluent:table-freeze-row-16-regular" />
                </ButtonOptionDontChoose>
              )}{' '}
              <ButtonAddCustomer onClick={() => dispatch(actionCustomerModalAddCustomer(true))}>
                Thêm khách hàng
              </ButtonAddCustomer>
            </Box>
          </BoxListCustomer>
          {view === 'grid' ? (
            <>
              <Grid sx={{ width: '100%' }} container>
                {customerTable.map((item, index) => (
                  <CustomerItemGrid index={index + page * 5} key={item.id} customer={item} />
                ))}
              </Grid>
              <BoxPage sx={{ padding: '10px' }}>
                <CountPage>{page * 5 + 1}</CountPage>
                <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                <CountPage>{page * 5 + 5 >= quantity ? quantity : page * 5 + 5}</CountPage>
                <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                <CountPage>{quantity}</CountPage>
                <ButtonChangePage
                  sx={{ background: page === 0 && 'red', marginRight: '10px' }}
                  onClick={goToStartTable}
                >
                  {page === 0 ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-to-left" />
                  )}
                </ButtonChangePage>
                <ButtonChangePage sx={{ background: page === 0 && 'red' }} onClick={handlePrev}>
                  {page === 0 ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-left" />
                  )}
                </ButtonChangePage>
                <QuantityPage>{page + 1}</QuantityPage>
                <ButtonChangePage
                  sx={{
                    background:
                      ((quantity - 1) / 5)
                        .toString()
                        .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                        `${page}` && 'red'
                  }}
                  onClick={handleNext}
                >
                  {((quantity - 1) / 5)
                    .toString()
                    .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                  `${page}` ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-right" />
                  )}
                </ButtonChangePage>
                <ButtonChangePage
                  sx={{
                    background:
                      ((quantity - 1) / 5)
                        .toString()
                        .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                        `${page}` && 'red',
                    marginLeft: '10px'
                  }}
                  onClick={goToEndTable}
                >
                  {((quantity - 1) / 5)
                    .toString()
                    .substring(0, ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')) ===
                  `${page}` ? (
                    <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
                  ) : (
                    <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-from-left" />
                  )}
                </ButtonChangePage>
              </BoxPage>
            </>
          ) : (
            <TableContainer>
              <Table sx={{ background: '#fff', borderRadius: '10px' }}>
                <TableHead>
                  <TableRow>
                    {header.map((item, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          width: item.minWidth,
                          fontWeight: 'bold',
                          color: '#000'
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
                    <TableCell colSpan={7}>
                      <BoxPage>
                        <CountPage>{page * 5 + 1}</CountPage>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                        <CountPage>{page * 5 + 5 >= quantity ? quantity : page * 5 + 5}</CountPage>
                        <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                        <CountPage>{quantity}</CountPage>
                        <ButtonChangePage
                          sx={{ background: page === 0 && 'red', marginRight: '10px' }}
                          onClick={goToStartTable}
                        >
                          {page === 0 ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:arrow-to-left"
                            />
                          )}
                        </ButtonChangePage>
                        <ButtonChangePage
                          sx={{ background: page === 0 && 'red' }}
                          onClick={handlePrev}
                        >
                          {page === 0 ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:chevron-left"
                            />
                          )}
                        </ButtonChangePage>
                        <QuantityPage>{page + 1}</QuantityPage>
                        <ButtonChangePage
                          sx={{
                            background:
                              ((quantity - 1) / 5)
                                .toString()
                                .substring(
                                  0,
                                  ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                                ) === `${page}` && 'red'
                          }}
                          onClick={handleNext}
                        >
                          {((quantity - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${page}` ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:chevron-right"
                            />
                          )}
                        </ButtonChangePage>
                        <ButtonChangePage
                          sx={{
                            background:
                              ((quantity - 1) / 5)
                                .toString()
                                .substring(
                                  0,
                                  ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                                ) === `${page}` && 'red',
                            marginLeft: '10px'
                          }}
                          onClick={goToEndTable}
                        >
                          {((quantity - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((quantity - 1) / 5).toFixed(1).toString().indexOf('.')
                            ) === `${page}` ? (
                            <Icon
                              style={{ width: '25px', height: '25px', color: '#fff' }}
                              icon="bx:x"
                            />
                          ) : (
                            <Icon
                              style={{ width: '25px', height: '25px' }}
                              icon="bx:arrow-from-left"
                            />
                          )}
                        </ButtonChangePage>
                      </BoxPage>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}

          {/* <TablePagination
            rowsPerPageOptions
            component="div"
            count={quantity}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          /> */}
        </Box>
        {/* <ReactHtmlTableToExcel table="tb" filename="test" sheet="Sheet" buttonText="btn test" /> */}
      </Scrollbar>
      <AddCustomer add={addCustomer} />
      {/* {modalEditCustomer.status && <ModalEditCustomer />} */}
    </RootStyle>
  );
}

export default Customer;
