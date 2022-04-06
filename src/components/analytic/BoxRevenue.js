import { Icon } from '@iconify/react';
import { Box, Grid, styled, Typography } from '@mui/material';
import { color } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { fShortenNumber } from '../../utils/formatNumber';

const colordate = '#ff4a00';
const coloryear = '#f4ab55';
const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const GridItem = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '5px 10px'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '2px',
  border: `1px solid lightgrey`,
  background: '#fff',
  padding: '25px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  fontSiz: '14px'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '25px'
}));
const IconRevenue = styled(Icon)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: theme.palette.main
}));
const TextInBox = styled(Typography)(({ theme }) => ({
  padding: '2px 5px',
  color: theme.palette.white,
  borderRadius: '5px',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.second,
  fontWeight: 'bold',
  background: theme.palette.main
}));
const Time = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.gray,
  fontSize: '14px',
  marginLeft: '5px'
}));
function BoxRevenue() {
  const revenueDateNow = useSelector((state) => state.analytic.revenueDateNow);
  const revenueDateLast = useSelector((state) => state.analytic.revenueDateLast);
  const revenueMonthNow = useSelector((state) => state.analytic.revenueMonthNow);
  const revenueMonthLast = useSelector((state) => state.analytic.revenueMonthLast);
  const revenueYearNow = useSelector((state) => state.analytic.revenueYearNow);
  const revenueYearLast = useSelector((state) => state.analytic.revenueYearLast);
  return (
    <RootStyle container>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper>
          <Box>
            <Title>Doanh thu hôm nay</Title>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginTop: '15px',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Value>{fShortenNumber(revenueDateNow)}</Value>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextInBox sx={{ background: colordate }}>
                  {fShortenNumber(revenueDateLast)}
                </TextInBox>
                <Time>Hôm qua</Time>
              </Box>
            </Box>
            {revenueDateNow >= revenueDateLast ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconRevenue style={{ color: '#62d493' }} icon="akar-icons:arrow-up" />
                <Value sx={{ fontSize: '16px' }}>
                  {fShortenNumber(revenueDateNow - revenueDateLast)}
                </Value>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconRevenue style={{ color: '#FF4961' }} icon="akar-icons:arrow-down" />
                <Value sx={{ fontSize: '16px' }}>
                  {fShortenNumber(revenueDateLast - revenueDateNow)}
                </Value>
              </Box>
            )}

            <IconRevenue style={{ color: colordate }} icon="la:leaf" />
          </Box>
        </Wrapper>
      </GridItem>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper>
          <Box>
            <Title>Doanh thu tháng này</Title>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginTop: '15px',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Value>{fShortenNumber(revenueMonthNow)}</Value>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextInBox>{fShortenNumber(revenueMonthLast)}</TextInBox>
                <Time>tháng trước</Time>
              </Box>
            </Box>
            {revenueMonthNow >= revenueMonthLast ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconRevenue style={{ color: '#62d493' }} icon="akar-icons:arrow-up" />
                <Value sx={{ fontSize: '16px' }}>
                  {fShortenNumber(revenueMonthNow - revenueMonthLast)}
                </Value>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconRevenue style={{ color: '#FF4961' }} icon="akar-icons:arrow-down" />
                <Value sx={{ fontSize: '16px' }}>
                  {fShortenNumber(revenueMonthLast - revenueMonthNow)}
                </Value>
              </Box>
            )}

            <IconRevenue icon="la:leaf" />
          </Box>
        </Wrapper>
      </GridItem>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper>
          <Box>
            <Title>Doanh thu năm nay</Title>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginTop: '15px',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Value>{fShortenNumber(revenueYearNow)}</Value>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextInBox sx={{ background: coloryear }}>
                  {fShortenNumber(revenueYearLast)}
                </TextInBox>
                <Time>năm trước</Time>
              </Box>
            </Box>
            {revenueYearNow >= revenueYearLast ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconRevenue style={{ color: '#62d493' }} icon="akar-icons:arrow-up" />
                <Value sx={{ fontSize: '16px' }}>
                  {fShortenNumber(revenueYearNow - revenueYearLast)}
                </Value>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconRevenue style={{ color: '#FF4961' }} icon="akar-icons:arrow-down" />
                <Value sx={{ fontSize: '16px' }}>
                  {fShortenNumber(revenueYearLast - revenueYearNow)}
                </Value>
              </Box>
            )}

            <IconRevenue style={{ color: coloryear }} icon="la:leaf" />
          </Box>
        </Wrapper>
      </GridItem>
    </RootStyle>
  );
}

export default BoxRevenue;
