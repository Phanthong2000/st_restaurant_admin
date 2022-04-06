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
  padding: '5px 10px'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '2px',
  border: `1px solid lightgrey`,
  background: theme.palette.main,
  padding: '25px'
}));
const IconBook = styled(Icon)(({ theme }) => ({
  width: '40px',
  height: '40px',
  color: theme.palette.white
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontFamily: theme.typography.fontFamily.primary,
  color: '#fff',
  fontWeight: 'bold'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.white
}));
const TextInBox = styled(Typography)(({ theme }) => ({
  padding: '2px 5px',
  background: theme.palette.white,
  color: theme.palette.main,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  borderRadius: '5px',
  fontSize: '14px'
}));
const Time = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  color: theme.palette.white,
  marginLeft: '5px'
}));

function BoxBook() {
  const bookDateNow = useSelector((state) => state.analytic.bookDateNow);
  const bookDateLast = useSelector((state) => state.analytic.bookDateLast);
  const bookMonthNow = useSelector((state) => state.analytic.bookMonthNow);
  const bookMonthLast = useSelector((state) => state.analytic.bookMonthLast);
  const bookYearNow = useSelector((state) => state.analytic.bookYearNow);
  const bookYearLast = useSelector((state) => state.analytic.bookYearLast);
  return (
    <RootStyle container>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper sx={{ background: colordate }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconBook icon="ant-design:book-filled" />
              <Box sx={{ marginLeft: '20px' }}>
                <Title>Đơn đặt bàn hôm nay</Title>
                <Value>{fShortenNumber(bookDateNow)}</Value>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextInBox sx={{ color: colordate }}>{fShortenNumber(bookDateLast)}</TextInBox>
                  <Time>hôm qua</Time>
                </Box>
              </Box>
            </Box>
            {bookDateNow >= bookDateLast ? (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook icon="akar-icons:arrow-up" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(bookDateNow - bookDateLast)}
                </Title>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook icon="akar-icons:arrow-down" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(bookDateLast - bookDateNow)}
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
              <IconBook icon="ant-design:book-filled" />
              <Box sx={{ marginLeft: '20px' }}>
                <Title>Đơn đặt bàn tháng này</Title>
                <Value>{fShortenNumber(bookMonthNow)}</Value>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextInBox>{fShortenNumber(bookMonthLast)}</TextInBox>
                  <Time>tháng trước</Time>
                </Box>
              </Box>
            </Box>
            {bookMonthNow >= bookMonthLast ? (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook icon="akar-icons:arrow-up" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(bookMonthNow - bookMonthLast)}
                </Title>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook icon="akar-icons:arrow-down" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(bookMonthLast - bookMonthNow)}
                </Title>
              </Box>
            )}
          </Box>
        </Wrapper>
      </GridItem>
      <GridItem item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Wrapper sx={{ background: coloryear }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconBook icon="ant-design:book-filled" />
              <Box sx={{ marginLeft: '20px' }}>
                <Title>Đơn đặt bàn năm nay</Title>
                <Value>{fShortenNumber(bookYearNow)}</Value>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TextInBox sx={{ color: coloryear }}>{fShortenNumber(bookYearLast)}</TextInBox>
                  <Time>năm trước</Time>
                </Box>
              </Box>
            </Box>
            {bookYearNow >= bookYearLast ? (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook icon="akar-icons:arrow-up" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(bookYearNow - bookYearLast)}
                </Title>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center' }}>
                <IconBook icon="akar-icons:arrow-down" />
                <Title sx={{ fontSize: '14px' }}>
                  {fShortenNumber(bookYearLast - bookYearNow)}
                </Title>
              </Box>
            )}
          </Box>
        </Wrapper>
      </GridItem>
    </RootStyle>
  );
}

export default BoxBook;
