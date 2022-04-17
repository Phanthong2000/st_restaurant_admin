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
import TableNewUser from '../components/home/TableNewUser';
import BoxCustomerDetail from './BoxCustomerDetail';
import BoxTotalUser from '../components/home/BoxTotalUser';
import BoxStatusUser from '../components/home/BoxStatusUser';
import BoxUserJoin from '../components/home/BoxUserJoin';
import AreaChartRevenueWeek from '../components/home/AreaChartRevenueWeek';
import BoxQuickStat from '../components/home/BoxQuickStat';
import AreaChartBookWeek from '../components/home/AreaChartBookWeek';
import AreaChartOrderWeek from '../components/home/AreaChartOrderWeek';
import SliderTop10Customer from '../components/home/SliderTop10Customer';
import BoxQuickEmail from '../components/home/BoxQuickEmail';
import BoxTop10Food from '../components/home/BoxTop10Food';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
}));
const BoxTotal = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
function Home() {
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <Box sx={{ width: '100%' }}>
          <BoxTotal container>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={2.4} lg={2.4} xl={2.4}>
              <TotalNewUserWeek />
            </Grid>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={2.4} lg={3} xl={2.4}>
              <TotalMoneyDay />
            </Grid>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={2.4} lg={2.4} xl={2.4}>
              <TotalOrderDay />
            </Grid>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={2.4} lg={2.4} xl={2.4}>
              <TotalBookDay />
            </Grid>
            <Grid sx={{ padding: '20px' }} item xs={12} sm={6} md={2.4} lg={2.4} xl={2.4}>
              <BoxUserJoin />
            </Grid>
          </BoxTotal>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid container>
            <Grid sx={{ padding: '0px 10px' }} item xs={12} sm={12} md={12} lg={5} xl={5}>
              <BoxTotalUser />
              <BoxStatusUser />
              <LineTotalNewCustomerInWeek />
            </Grid>
            <Grid sx={{ padding: '0px 20px' }} item xs={12} sm={12} md={12} lg={7} xl={7}>
              {/* <PolarAreaGenderCustomer /> */}
              <BoxCustomerDetail />
            </Grid>
          </Grid>
          <AreaChartRevenueWeek />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid sx={{ width: '100%' }} container>
            <Grid sx={{ padding: '10px' }} item xs={12} sm={12} md={12} lg={6} xl={6}>
              <AreaChartBookWeek />
            </Grid>
            <Grid sx={{ padding: '10px' }} item xs={12} sm={12} md={12} lg={6} xl={6}>
              <AreaChartOrderWeek />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid sx={{ width: '100%' }} container>
            <Grid
              sx={{ padding: '10px 20px', width: '100%' }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={4}
              xl={4}
            >
              <BoxQuickStat />
            </Grid>
            <Grid
              sx={{ padding: '10px 20px', width: '100%' }}
              item
              xs={12}
              sm={12}
              md={12}
              lg={8}
              xl={8}
            >
              <SliderTop10Customer />
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid container sx={{ width: '100%' }}>
            <Grid item sx={{ padding: '10px 20px' }} xs={12} sm={12} md={12} lg={7} xl={7}>
              {/* <BoxQuickEmail /> */}
            </Grid>
            <Grid item sx={{ padding: '10px 20px' }} xs={12} sm={12} md={12} lg={5} xl={5}>
              <BoxTop10Food />
            </Grid>
          </Grid>
        </Box>
      </Scrollbar>
    </RootStyle>
  );
}

export default Home;
