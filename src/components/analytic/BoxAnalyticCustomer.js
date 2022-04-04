import { Box, Grid, styled } from '@mui/material';
import React from 'react';
import BoxCustomer from './BoxCustomer';
import ColumnCustomer from './ColumnCustomer';
import PolarWayPay from './PolarWayPay';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function BoxAnalyticCustomer() {
  return (
    <RootStyle>
      <BoxCustomer />
      <Grid container>
        <Grid item sx={{ width: '100%', padding: '10px' }} xs={12} sm={12} md={12} lg={8} xl={8}>
          <ColumnCustomer />
        </Grid>
        <Grid item sx={{ width: '100%', padding: '10px' }} xs={12} sm={12} md={12} lg={4} xl={4}>
          <Box
            sx={{
              width: '100%',
              background: '#fff',
              borderRadius: '2px',
              border: `1px solid lightgrey`,
              padding: '5px'
            }}
          >
            <PolarWayPay />
          </Box>
        </Grid>
      </Grid>
    </RootStyle>
  );
}

export default BoxAnalyticCustomer;
