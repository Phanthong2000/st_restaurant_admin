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
  Card
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useNavigate } from 'react-router-dom';
import TableRowBook from '../components/order/TableRowBook';
import { actionGetBooksByKeyword } from '../redux/actions/orderAction';
import ModalEditBook from '../components/order/ModalEditBook';

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
const BoxListFood = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2)
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
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBooksByPage = (page) => {
    const start = page * 5;
    const end = start + 5;
    const data = [];
    for (let i = 0; i < booksByKeyword.length; i += 1) {
      if (i >= start && i < end) {
        data.push(booksByKeyword.at(i));
      }
    }
    setBooks(data);
  };
  useEffect(() => {
    getBooksByPage(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [booksByKeyword]);
  const handleChangePage = (event, newValue) => {
    setPage(newValue);
    getBooksByPage(newValue);
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
      name: 'Số lượng món',
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
      name: 'Tính tiền',
      width: '10%'
    }
  ];
  const order = () => {
    navigate('/home/order');
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
        <Box>
          <BoxListFood sx={{ marginTop: '20px' }}>
            <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
              Danh sách đơn đặt bàn
            </Typography>
            <ButtonOrder onClick={order}>Đặt bàn</ButtonOrder>
          </BoxListFood>
        </Box>
        <Box sx={{ width: '100%' }}>
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
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions
            component="div"
            count={booksByKeyword.length}
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
