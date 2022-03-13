import React from 'react';
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TableRowBook from './TableRowBook';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  padding: '20px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.gray
}));
const ButtonViewAll = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  fontWeight: 'bold',
  padding: theme.spacing(0.5, 3),
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function NewBooks() {
  const booksByKeyword = useSelector((state) => state.order.booksByKeyword);
  const navigate = useNavigate();
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
    }
  ];
  const viewAll = () => {
    navigate('/home/book  ');
  };
  return (
    <RootStyle>
      <Title>Danh sách đơn đặt bàn mới nhất</Title>
      <TableContainer sx={{ borderRadius: '10px', marginTop: '10px' }}>
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
            {booksByKeyword.map((item, index) => (
              <TableRowBook key={index} index={index} book={item} />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={9} sx={{ textAlign: 'right' }}>
                <ButtonViewAll onClick={viewAll}>Xem tất cả</ButtonViewAll>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </RootStyle>
  );
}

export default NewBooks;
