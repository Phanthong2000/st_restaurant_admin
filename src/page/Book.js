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
  display: 'flex'
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
              booksByKeyword.at(i).thoiGianDuKienSuDung * 60 * 1000) >
            0 &&
          booksByKeyword.at(i).trangThai === `0`
        ) {
          notPages.push(booksByKeyword.at(i));
        }
      } else if (sortBook === `0`) {
        if (
          new Date().getTime() -
            (Date.parse(booksByKeyword.at(i).thoiGianNhanBan) +
              booksByKeyword.at(i).thoiGianDuKienSuDung * 60 * 1000) <
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
      name: 'Thời gian đặt bàn',
      width: '10%'
    },
    {
      name: 'Số loại bàn',
      width: '10%'
    },
    {
      name: 'Khu vực',
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
    navigate('/home/order');
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
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase
            value={search}
            onChange={(e) => searchBooks(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm đơn đặt bàn..."
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
            <Table>
              <TableHead>
                <TableRow sx={{ background: 'gray' }}>
                  {header.map((item, index) => (
                    <TableCell
                      key={index}
                      sx={{ width: item.width, color: '#fff', fontWeight: 'bold' }}
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
                  <TableCell colSpan={12}>
                    <Tooltip title="Về đầu bảng">
                      <IconButton onClick={goToStartTable} disabled={page === 0}>
                        <Icon icon="bi:skip-start-fill" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Đến cuối bảng">
                      <IconButton
                        disabled={
                          ((booksByKeyword.length - 1) / 5)
                            .toString()
                            .substring(
                              0,
                              ((booksByKeyword.length - 1) / 5).toFixed(1).toString().indexOf('.')
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
      </Scrollbar>
      {modalEditBook.status && <ModalEditBook />}
    </RootStyle>
  );
}

export default Book;
