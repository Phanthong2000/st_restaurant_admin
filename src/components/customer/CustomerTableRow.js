import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, styled, TableCell, TableRow } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { actionCustomerModalEditCustomer } from '../../redux/actions/customerAction';

const RootStyle = styled(TableRow)(({ theme }) => ({
  width: '100%'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
CustomerTableRow.prototype = {
  customer: PropTypes.object,
  index: PropTypes.number
};
function CustomerTableRow({ customer, index }) {
  const dispatch = useDispatch();
  if (customer.id === undefined) return null;
  return (
    <RootStyle sx={{ background: index % 2 === 0 ? '#fff' : 'lightgrey' }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Avatar src={customer.anhDaiDien} />
      </TableCell>
      <TableCell>{customer.hoTen}</TableCell>
      <TableCell>{customer.soDienThoai}</TableCell>
      <TableCell>{customer.gioiTinh}</TableCell>
      <TableCell>{customer.taiKhoan.trangThai}</TableCell>
      <TableCell>
        <IconButton
          onClick={() =>
            dispatch(
              actionCustomerModalEditCustomer({
                status: true,
                customer
              })
            )
          }
        >
          <IconSeeInfo icon="el:eye-open" />
        </IconButton>
      </TableCell>
    </RootStyle>
  );
}

export default CustomerTableRow;
