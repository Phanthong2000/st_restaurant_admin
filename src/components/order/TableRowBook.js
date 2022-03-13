import React from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { actionOrderModalEditBook } from '../../redux/actions/orderAction';

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
  const dispatch = useDispatch();
  const getTotal = () => {
    let total = 0;
    book.listChiTietDonDatBan.forEach((don) => {
      total += don.monAn.donGia * don.soLuong;
    });
    return total;
  };
  const checkStatus = () => {
    if (
      book.trangThai === `0` &&
      new Date().getTime() -
        (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung * 60 * 1000) <=
        0
    )
      return `Chưa sử dụng`;
    if (book.trangThai === '1') return 'Đã sử dụng';
    if (
      new Date().getTime() -
        (Date.parse(book.thoiGianNhanBan) + book.thoiGianDuKienSuDung * 60 * 1000) >
        0 &&
      book.trangThai === `0`
    )
      return `Đã quá hạn`;
    if (book.trangThai === '2') return 'Đang sử dụng';
  };
  return (
    <RootStyle sx={{ background: index % 2 === 0 ? '#fff' : 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>{book.khachHang.hoTen}</Cell>
      <Cell>{book.khachHang.soDienThoai}</Cell>
      <Cell>{moment(book.thoiGianNhanBan).format(`hh:mm a DD/MM/yyyy`)}</Cell>
      <Cell>{moment(book.createAt).format(`hh:mm a DD/MM/yyyy`)}</Cell>
      <Cell>{book.listChiTietDonDatBan.length}</Cell>
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
          <IconButton>
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
