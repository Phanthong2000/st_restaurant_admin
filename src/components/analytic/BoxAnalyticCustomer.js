import { Box, Grid, styled } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionColumnCustomersYear } from '../../redux/actions/analyticAction';
import ModalCustomersOnline from '../customer/ModalCustomersOnline';
import BoxCustomer from './BoxCustomer';
import ColumnCustomer from './ColumnCustomer';
import PolarWayPay from './PolarWayPay';
import TableCustomer from './TableCustomer';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function BoxAnalyticCustomer() {
  const modalCustomersOnline = useSelector((state) => state.customer.modalCustomersOnline);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('');
    return function () {
      return dispatch(
        actionColumnCustomersYear('year', new Date().getMonth(), new Date().getFullYear())
      );
    };
  }, []);
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
      <TableCustomer />
      {modalCustomersOnline.status && <ModalCustomersOnline />}
    </RootStyle>
  );
}

export default BoxAnalyticCustomer;
