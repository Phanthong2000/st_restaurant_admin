import React, { useState } from 'react';
import { Box, Card, Divider, styled, Tab, Tabs, Typography } from '@mui/material';
import TableNewUser from '../components/home/TableNewUser';
import TableNewUserOrder from '../components/home/TableNewUserOrder';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: theme.spacing(1, 2),
  border: `1px solid lightgrey`,
  borderRadius: theme.spacing(1)
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
function BoxCustomerDetail() {
  const [tab, setTab] = useState('new user');
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <RootStyle>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Title>Chi tiết khách hàng</Title>
        <Tabs value={tab} onChange={handleChange}>
          <Tab label="Khách hàng mới" value="new user" />
          <Tab label="Đặt bàn mới" value="new book" />
        </Tabs>
      </Box>
      <Divider />
      <Box>{tab === 'new user' ? <TableNewUser /> : <TableNewUserOrder />}</Box>
    </RootStyle>
  );
}

export default BoxCustomerDetail;
