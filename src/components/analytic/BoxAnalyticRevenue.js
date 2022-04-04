import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import BoxRevenue from './BoxRevenue';
import BoxBook from './BoxBook';
import BoxOrder from './BoxOrder';
import ColumnRevenueYear from './ColumnRevenueYear';
import PolarWayPay from './PolarWayPay';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function BoxAnalyticRevenue() {
  return (
    <RootStyle>
      <BoxRevenue />
      <BoxBook />
      <BoxOrder />
      <ColumnRevenueYear />
    </RootStyle>
  );
}

export default BoxAnalyticRevenue;
