import React from 'react';
import {
  Avatar,
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const run = keyframes`
    0% {
      left: 0;
      transform: translateX(-100%);
    }
    100% {
      left: 0;
      transform: translateX(0);
    }`;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function TableRowBook({ index, book }) {
  return (
    <TableRow sx={{ animation: `${run} ${0.5 + index / 3}s ease` }}>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={book.khachHang.anhDaiDien} />
        <Box sx={{ marginLeft: '10px' }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
            {book.khachHang.hoTen}
          </Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: 'gray' }}>
            SĐT: {book.khachHang.soDienThoai}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>{moment(Date.parse(book.thoiGianNhanBan)).format(`hh:mm a DD/MM/YYYY`)}</TableCell>
      <TableCell>{moment(Date.parse(book.createAt)).format(`hh:mm a DD/MM/YYYY`)}</TableCell>
    </TableRow>
  );
}
function TableNewUserOrder() {
  const newBooks = useSelector((state) => state.order.newBooks);
  const navigate = useNavigate();
  const header = [
    {
      name: 'Khách hàng',
      width: '40%'
    },
    {
      name: 'Thời gian nhận bàn',
      width: '30%'
    },
    {
      name: 'Thời gian đặt bàn',
      width: '30%'
    }
  ];
  const goToBook = () => {
    navigate(`/home/book`);
  };
  return (
    <RootStyle>
      <Box>
        <TableContainer
          sx={{
            borderRadius: '10px',
            marginTop: '10px',
            border: `1px solid lightgrey`,
            padding: '10px'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {header.map((item, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: item.width,
                      color: '#000',
                      paddingTop: '0px',
                      paddingBottom: '0px',
                      textAlign: 'left',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {newBooks.slice(0, 5).map((item, index) => (
                <TableRowBook key={index} index={index} book={item} />
              ))}
            </TableBody>
          </Table>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography
              onClick={goToBook}
              sx={{
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '5px',
                '&:hover': { color: 'gray' }
              }}
            >
              Xem thêm
            </Typography>
          </Box>
        </TableContainer>
      </Box>
    </RootStyle>
  );
}

export default TableNewUserOrder;
