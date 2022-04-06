import { Box, styled } from '@mui/material';
import React from 'react';
import BoxFood from './BoxFood';
import ColumnTop10FoodsLove from './ColumnTop10FoodsLove';
import ColumnTypefoodFood from './ColumnTypefoodFood';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function BoxAnalyticFood() {
  return (
    <RootStyle>
      <BoxFood />
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <ColumnTypefoodFood />
        <ColumnTop10FoodsLove />
      </Box>
    </RootStyle>
  );
}

export default BoxAnalyticFood;
