import { Box, Grid, styled } from '@mui/material';
import React from 'react';
import BoxArea from './BoxArea';
import ColumnAreaTable from './ColumnAreaTable';
import ColumnTop10Table from './ColumnTop10Table';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function BoxAnalyticArea() {
  return (
    <RootStyle>
      <BoxArea />
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <ColumnAreaTable />
        <ColumnTop10Table />
      </Box>
    </RootStyle>
  );
}

export default BoxAnalyticArea;
