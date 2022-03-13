import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton, styled, TableCell, TableRow } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCustomerModalEditCustomer } from '../../redux/actions/customerAction';
import { actionOrderGetUser } from '../../redux/actions/orderAction';

const RootStyle = styled(TableRow)(({ theme }) => ({
  width: '100%'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
const Cell = styled(TableCell)(() => ({
  fontWeight: 'bold'
}));
CustomerTableRow.prototype = {
  customer: PropTypes.object,
  index: PropTypes.number
};
function CustomerTableRow({ customer, index }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (customer.id === undefined) return null;
  return (
    <RootStyle sx={{ background: index % 2 === 0 ? '#fff' : 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>
        <Avatar src={customer.anhDaiDien} />
      </Cell>
      <Cell>{customer.hoTen}</Cell>
      <Cell>{customer.soDienThoai}</Cell>
      <Cell>{customer.gioiTinh}</Cell>
      <Cell>{customer.taiKhoan.trangThai}</Cell>
      <Cell>
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
      </Cell>
      {customer.taiKhoan.trangThai === 'Hiệu lực' ? (
        <Cell>
          <IconButton
            onClick={() => {
              dispatch(
                actionOrderGetUser({
                  ...customer
                })
              );
              navigate('/home/order');
            }}
          >
            <Icon style={{ color: 'green' }} icon="icon-park-outline:transaction-order" />
          </IconButton>
        </Cell>
      ) : (
        <Cell>
          <IconButton>
            <Icon style={{ color: 'red' }} icon="ep:close-bold" />
          </IconButton>
        </Cell>
      )}
    </RootStyle>
  );
}

export default CustomerTableRow;
