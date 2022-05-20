import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  InputBase,
  styled,
  Typography,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Card,
  TableFooter,
  IconButton,
  Tooltip
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useLocation, useNavigate } from 'react-router-dom';
import TableRowBook from '../components/order/TableRowBook';
import { actionGetBooksByKeyword } from '../redux/actions/orderAction';
import ModalEditBook from '../components/order/ModalEditBook';
import BoxSort from '../components/order/BoxSort';
import { actionUserChooseNotification } from '../redux/actions/userAction';

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
  marginTop: '10px',
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
const BoxListFood = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0.5, 2)
}));
const ButtonOrder = styled(Button)(({ theme }) => ({
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
function Book() {
  const booksByKeyword = useSelector((state) => state.order.booksByKeyword);
  const modalEditBook = useSelector((state) => state.order.modalEditBook);
  const sortBook = useSelector((state) => state.order.sortBook);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chooseNotification = useSelector((state) => state.user.chooseNotification);
  const supportChooseNotification = useSelector((state) => state.user.supportChooseNotification);
  const { pathname } = useLocation();
  const getBooksByPage = (page) => {
    const notPages = [];
    for (let i = 0; i < booksByKeyword.length; i += 1) {
      if (sortBook === 'all') {
        notPages.push(booksByKeyword.at(i));
      } else if (sortBook === '4') {
        if (
          new Date().getTime() -
            (Date.parse(booksByKeyword.at(i).thoiGianNhanBan) +
              booksByKeyword.at(i).thoiGianDuKienSuDung) >
            0 &&
          booksByKeyword.at(i).trangThai === `0`
        ) {
          notPages.push(booksByKeyword.at(i));
        }
      } else if (sortBook === `0`) {
        if (
          new Date().getTime() -
            (Date.parse(booksByKeyword.at(i).thoiGianNhanBan) +
              booksByKeyword.at(i).thoiGianDuKienSuDung) <
            0 &&
          booksByKeyword.at(i).trangThai === `0`
        ) {
          notPages.push(booksByKeyword.at(i));
        }
      } else if (booksByKeyword.at(i).trangThai === sortBook) {
        notPages.push(booksByKeyword.at(i));
      }
    }
    setQuantity(notPages.length);
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < notPages.length; i += 1) {
      if (sortBook === 'all') {
        if (i >= start && i < end) {
          data.push(notPages.at(i));
        }
      } else if (i >= start && i < end) {
        data.push(notPages.at(i));
      }
    }
    setBooks(data);
  };
  useEffect(() => {
    if (chooseNotification.id === '') {
      getBooksByPage(0);
      setPage(0);
    } else {
      getBooksByPage(chooseNotification.page);
      setPage(chooseNotification.page);
    }
    return function () {
      return null;
    };
  }, [booksByKeyword, sortBook, supportChooseNotification]);
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
    getBooksByPage(newValue);
    dispatch(
      actionUserChooseNotification({
        id: '',
        page: 0
      })
    );
  };
  const searchBooks = (text) => {
    setSearch(text);
    dispatch(actionGetBooksByKeyword(text));
  };
  const header = [
    {
      name: 'STT',
      width: '5%'
    },
    {
      name: 'Tên khách hàng',
      width: '15%'
    },
    {
      name: 'Số điện thoại',
      width: '10%'
    },
    {
      name: 'Thời gian nhận bàn',
      width: '10%'
    },
    {
      name: 'Thời gian sử dụng dự kiến',
      width: '20%'
    },
    {
      name: 'Thời gian đặt bàn',
      width: '10%'
    },
    {
      name: 'Số lượng món ăn',
      width: '10%'
    },
    {
      name: 'Số lượng khách',
      width: '10%'
    },
    {
      name: 'Tổng tiền',
      width: '10%'
    },
    {
      name: 'Trạng thái',
      width: '10%'
    },
    {
      name: 'Xem thông tin',
      width: '10%'
    },
    {
      name: 'Thêm món ăn',
      width: '10%'
    },
    {
      name: 'Tính tiền',
      width: '10%'
    }
  ];
  const order = () => {
    navigate('/home/order-booking');
  };
  const goToStartTable = () => {
    dispatch(
      actionUserChooseNotification({
        id: '0',
        page: 0
      })
    );
    setPage(0);
    getBooksByPage(0);
  };
  const goToEndTable = () => {
    dispatch(
      actionUserChooseNotification({
        id: '0',
        page: 0
      })
    );
    // const index = booksByKeyword.findIndex((item) => item.id === book.id);
    const page = ((booksByKeyword.length - 1) / 5)
      .toString()
      .substring(0, ((booksByKeyword.length - 1) / 5).toFixed(1).toString().indexOf('.'));
    console.log(typeof page);
    setPage(parseInt(page, 10));
    getBooksByPage(parseInt(page, 10));
  };
  const handleNext = () => {
    if (
      ((booksByKeyword.length - 1) / 5)
        .toString()
        .substring(0, ((booksByKeyword.length - 1) / 5).toFixed(1).toString().indexOf('.')) !==
      `${page}`
    ) {
      getBooksByPage(page + 1);
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 0) {
      getBooksByPage(page - 1);
      setPage(page - 1);
    }
  };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase
            value={search}
            onChange={(e) => searchBooks(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm đơn đặt bàn (tên, sđt, email, cmnd khách hàng)..."
          />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
        <BoxSort />
        <Box>
          <BoxListFood>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
              Danh sách đơn đặt bàn
            </Typography>
            <ButtonOrder onClick={order}>Đặt bàn</ButtonOrder>
          </BoxListFood>
        </Box>
        <Box sx={{ width: '100%', padding: '0px 10px' }}>
          <TableContainer sx={{ borderRadius: '10px' }}>
            <Table sx={{ background: '#fff' }}>
              <TableHead>
                <TableRow>
                  {header.map((item, index) => (
                    <TableCell
                      key={index}
                      sx={{ width: item.width, color: '#000', fontWeight: 'bold' }}
                    >
                      {item.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((item, index) => (
                  <TableRowBook key={index} index={index + page * 5} book={item} />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={13}>
                    <BoxPage>
                      <CountPage>{page * 5 + 1}</CountPage>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
                      <CountPage>
                        {page * 5 + 5 >= booksByKeyword.length
                          ? booksByKeyword.length
                          : page * 5 + 5}
                      </CountPage>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
                      <CountPage>{booksByKeyword.length}</CountPage>
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
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-to-left" />
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
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-left" />
                        )}
                      </ButtonChangePage>
                      <QuantityPage>{page + 1}</QuantityPage>
                      <ButtonChangePage
                        sx={{
                          background:
                            ((booksByKeyword.length - 1) / 5)
                              .toString()
                              .substring(
                                0,
                                ((booksByKeyword.length - 1) / 5).toFixed(1).toString().indexOf('.')
                              ) === `${page}` && 'red'
                        }}
                        onClick={handleNext}
                      >
                        {((booksByKeyword.length - 1) / 5)
                          .toString()
                          .substring(
                            0,
                            ((booksByKeyword.length - 1) / 5).toFixed(1).toString().indexOf('.')
                          ) === `${page}` ? (
                          <Icon
                            style={{ width: '25px', height: '25px', color: '#fff' }}
                            icon="bx:x"
                          />
                        ) : (
                          <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-right" />
                        )}
                      </ButtonChangePage>
                      <ButtonChangePage
                        sx={{
                          background:
                            ((booksByKeyword.length - 1) / 5)
                              .toString()
                              .substring(
                                0,
                                ((booksByKeyword.length - 1) / 5).toFixed(1).toString().indexOf('.')
                              ) === `${page}` && 'red',
                          marginLeft: '10px'
                        }}
                        onClick={goToEndTable}
                      >
                        {((booksByKeyword.length - 1) / 5)
                          .toString()
                          .substring(
                            0,
                            ((booksByKeyword.length - 1) / 5).toFixed(1).toString().indexOf('.')
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
          {/* <TablePagination
            rowsPerPageOptions
            component="div"
            count={quantity}
            rowsPerPage={5}
            page={page}
            onPageChange={handleChangePage}
          /> */}
        </Box>
      </Scrollbar>
      {modalEditBook.status && <ModalEditBook />}
    </RootStyle>
  );
}

export default Book;
