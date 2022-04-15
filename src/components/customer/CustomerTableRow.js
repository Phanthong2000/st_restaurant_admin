import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, IconButton, styled, TableCell, TableRow, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
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
  const broadcast = useSelector((state) => state.socket.broadcast);
  const goToCustomerDetail = () => {
    navigate(`/home/customer-detail/${customer.id}`);
  };
  if (customer.id === undefined) return null;
  return (
    <RootStyle
      sx={{
        background: index % 2 === 0 ? '#fff' : '#f0fafc'
      }}
    >
      <Cell>{index + 1}</Cell>
      <Cell>
        <Avatar src={customer.anhDaiDien} />
      </Cell>
      <Cell>{customer.hoTen}</Cell>
      <Cell>{customer.soDienThoai}</Cell>
      {/* <Cell>{customer.gioiTinh}</Cell> */}
      <Cell>{customer.taiKhoan.trangThai}</Cell>
      <Cell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            style={{
              width: '30px',
              height: '30px',
              color:
                broadcast.find((br) => br.userId === customer.id) !== undefined ? 'green' : 'gray'
            }}
            icon="ci:dot-05-xl"
          />
          <Typography>
            {broadcast.find((br) => br.userId === customer.id) !== undefined ? `Online` : 'Offline'}
          </Typography>
        </Box>
      </Cell>
      <Cell>
        <IconButton
          onClick={
            goToCustomerDetail
            // dispatch(
            //   actionCustomerModalEditCustomer({
            //     status: true,
            //     customer
            //   })
            // )
          }
        >
          <IconSeeInfo icon="el:eye-open" />
        </IconButton>
      </Cell>
      {/* {customer.taiKhoan.trangThai === 'Hiệu lực' ? (
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
      )} */}
    </RootStyle>
  );
}

export default CustomerTableRow;
