import React, { useEffect } from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';
import {
  actionOrderModalEditBook,
  actionOrderUpdateFoodsForBook,
  actionOrderBookPayOrder
} from '../../redux/actions/orderAction';
import { actionUserChooseNotification } from '../../redux/actions/userAction';

const bounce = keyframes`
  from{
    transform: scale(1)
  }

  50% {
    transform: scale(1.2)
  }

  to {
    transform: scale(1)
  }
`;
const RootStyle = styled(TableRow)(({ theme }) => ({
  width: '100%'
}));
const Cell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
TableRowBook.prototype = {
  book: PropTypes.object,
  index: PropTypes.number
};
function TableRowBook({ book, index }) {
  const chooseNotification = useSelector((state) => state.user.chooseNotification);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getTotal = () => {
    let total = 0;
    book.listChiTietDonDatBan.forEach((item) => {
      total += item.monAn.donGia * item.soLuong;
    });
    return total + book.listBan.filter((table) => table.loaiBan === 'Vip').length * 100000;
  };
  const checkStatus = () => {
    if (
      book.trangThai === `0` &&
      new Date().getTime() - (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung) <= 0
    )
      return `Chưa sử dụng`;
    if (book.trangThai === '1') return 'Đã sử dụng';
    if (
      new Date().getTime() - (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung) > 0 &&
      book.trangThai === `0`
    )
      return `Đã quá hạn`;
    if (book.trangThai === '2') return 'Đang sử dụng';
  };
  const updateBook = () => {
    dispatch(actionOrderUpdateFoodsForBook(book));
    navigate('/home/update-foods-book');
  };
  const goToPayOrder = () => {
    dispatch(actionOrderBookPayOrder(book));
    navigate('/home/pay-order');
  };
  return (
    <RootStyle
      sx={{
        background: index % 2 === 0 ? '#fff' : '#f0fafc',
        animation: book.id === chooseNotification.id && `${bounce} 3s alternate`
      }}
    >
      <Cell>{index + 1}</Cell>
      <Cell>{book.khachHang.hoTen}</Cell>
      <Cell>{book.khachHang.soDienThoai}</Cell>
      <Cell>{moment(book.thoiGianNhanBan).format(`hh:mm a DD/MM/yyyy`)}</Cell>
      <Cell>{book.thoiGianDuKienSuDung / (60 * 1000)}p</Cell>
      <Cell>{moment(book.createAt).format(`hh:mm a DD/MM/yyyy`)}</Cell>
      <Cell>{book.listChiTietDonDatBan.length}</Cell>
      <Cell>{book.soLuongKhach}</Cell>
      <Cell>{getTotal().toLocaleString(`es-US`)} vnđ</Cell>
      <Cell>{checkStatus()}</Cell>
      <Cell>
        <IconButton
          onClick={() =>
            dispatch(
              actionOrderModalEditBook({
                status: true,
                book
              })
            )
          }
        >
          <IconSeeInfo icon="el:eye-open" />
        </IconButton>
      </Cell>
      <Cell>
        {checkStatus() === 'Đang sử dụng' ? (
          <IconButton onClick={updateBook}>
            <IconSeeInfo style={{ color: 'green' }} icon="bxs:bookmark-plus" />
          </IconButton>
        ) : (
          <IconButton>
            <Icon style={{ color: 'red' }} icon="ep:close-bold" />
          </IconButton>
        )}
      </Cell>
      <Cell>
        {checkStatus() === 'Đang sử dụng' ? (
          <IconButton onClick={goToPayOrder}>
            <IconSeeInfo icon="emojione-v1:money-bag" />
          </IconButton>
        ) : (
          <IconButton>
            <Icon style={{ color: 'red' }} icon="ep:close-bold" />
          </IconButton>
        )}
      </Cell>
    </RootStyle>
  );
}

export default TableRowBook;
