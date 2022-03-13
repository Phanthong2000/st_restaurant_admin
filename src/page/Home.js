import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import TotalNewUserWeek from '../components/home/TotalNewUserWeek';
import TotalMoneyDay from '../components/home/TotalMoneyDay';
import TotalOrderDay from '../components/home/TotalOrderDay';
import TotalBookDay from '../components/home/TotalBookDay';
import LineTotalNewCustomerInWeek from '../components/home/LineTotalNewCustomerInWeek';
import PolarAreaGenderCustomer from '../components/home/PolarAreaGenderCustomer';
import NewBooks from '../components/home/NewBooks';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex'
}));
const BoxTotal = styled(Grid)(({ theme }) => ({
  width: '100%',
  marginTop: '10px'
}));
function Home() {
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <Box sx={{ width: '100%' }}>
          <BoxTotal container>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={3} lg={3} xl={3}>
              <TotalNewUserWeek />
            </Grid>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={3} lg={3} xl={3}>
              <TotalMoneyDay />
            </Grid>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={3} lg={3} xl={3}>
              <TotalOrderDay />
            </Grid>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={3} lg={3} xl={3}>
              <TotalBookDay />
            </Grid>
          </BoxTotal>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <LineTotalNewCustomerInWeek />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <PolarAreaGenderCustomer />
            </Grid>
          </Grid>
        </Box>
        <NewBooks />
      </Scrollbar>
    </RootStyle>
  );
}

export default Home;
