import { Icon } from '@iconify/react';
import { Box, Grid, styled, Typography } from '@mui/material';
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
  padding: '5px 20px'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '2px',
  border: `1px solid lightgrey`,
  background: theme.palette.white,
  padding: '25px'
}));
const IconBook = styled(Icon)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: theme.palette.main
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: 'bold'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary
}));
const TextInBox = styled(Typography)(({ theme }) => ({
  padding: '2px 5px',
  background: theme.palette.main,
  color: theme.palette.white,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.second,
  borderRadius: '5px',
  fontSize: '14px'
}));
const Time = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  color: theme.palette.gray,
  marginLeft: '5px'
}));
const DATENOW = 129;
const DATELAST = 207;
const MONTHNOW = 2214;
const MONTHLAST = 1321;
const YEARNOW = 10132;
const YEARLAST = 9932;
function BoxOrder() {
  const orderDateNow = useSelector((state) => state.analytic.orderDateNow);
  const orderDateLast = useSelector((state) => state.analytic.orderDateLast);
  const orderMonthNow = useSelector((state) => state.analytic.orderMonthNow);
  const orderMonthLast = useSelector((state) => state.analytic.orderMonthLast);
  const orderYearNow = useSelector((state) => state.analytic.orderYearNow);
  const orderYearLast = useSelector((state) => state.analytic.orderYearLast);
  return (
    <RootStyle container>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconBook style={{ color: colordate }} icon="fluent:payment-16-filled" />
              <Box sx={{ marginLeft: '20px' }}>
                <Title>Hoá đơn hôm nay</Title>
                <Value>{fShortenNumber(orderDateNow)}</Value>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextInBox sx={{ background: colordate }}>
                    {fShortenNumber(orderDateLast)}
                  </TextInBox>
                  <Time>hôm qua</Time>
                </Box>
              </Box>
            </Box>
            {orderDateNow >= orderDateLast ? (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook style={{ color: '#62d493' }} icon="akar-icons:arrow-up" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(orderDateNow - orderDateLast)}
                </Title>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook style={{ color: '#FF4961' }} icon="akar-icons:arrow-down" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(orderDateLast - orderDateNow)}
                </Title>
              </Box>
            )}
          </Box>
        </Wrapper>
      </GridItem>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconBook icon="fluent:payment-16-filled" />
              <Box sx={{ marginLeft: '20px' }}>
                <Title>Hoá đơn bàn tháng này</Title>
                <Value>{fShortenNumber(orderMonthNow)}</Value>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextInBox>{fShortenNumber(orderMonthLast)}</TextInBox>
                  <Time>tháng trước</Time>
                </Box>
              </Box>
            </Box>
            {orderMonthNow >= orderMonthLast ? (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook style={{ color: '#62d493' }} icon="akar-icons:arrow-up" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(orderMonthNow - orderMonthLast)}
                </Title>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook style={{ color: '#FF4961' }} icon="akar-icons:arrow-down" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(orderMonthLast - orderMonthNow)}
                </Title>
              </Box>
            )}
          </Box>
        </Wrapper>
      </GridItem>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconBook style={{ color: coloryear }} icon="fluent:payment-16-filled" />
              <Box sx={{ marginLeft: '20px' }}>
                <Title>Hoá đơn bàn năm nay</Title>
                <Value>{fShortenNumber(orderYearNow)}</Value>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextInBox sx={{ background: coloryear }}>
                    {fShortenNumber(orderYearLast)}
                  </TextInBox>
                  <Time>năm trước</Time>
                </Box>
              </Box>
            </Box>
            {orderYearNow >= orderYearLast ? (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook style={{ color: '#62d493' }} icon="akar-icons:arrow-up" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(orderYearNow - orderYearLast)}
                </Title>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook style={{ color: '#FF4961' }} icon="akar-icons:arrow-down" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(orderYearLast - orderYearNow)}
                </Title>
              </Box>
            )}
          </Box>
        </Wrapper>
      </GridItem>
    </RootStyle>
  );
}

export default BoxOrder;
