import { Box, styled } from '@mui/material';
import React from 'react';
import BoxFood from './BoxFood';
import ColumnTypefoodFood from './ColumnTypefoodFood';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function BoxAnalyticFood() {
  return (
    <RootStyle>
      <BoxFood />
      <ColumnTypefoodFood />
    </RootStyle>
  );
}

export default BoxAnalyticFood;
