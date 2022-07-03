import React from 'react';
import { Box, Card, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
  color: '#7A0C2E',
  background: '#FFE7D9',
  textAlign: 'center',
  borderRadius: '20px'
}));
const WrapperIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(1),
  color: '#B72136',
  backgroundImage: `linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)`
}));
const Total = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  fontFamily: theme.typography.fontFamily.primary
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  fontFamily: 'inherit'
}));
function TotalBookDay() {
  const booksNow = useSelector((state) => state.order.booksNow);
  return (
    <RootStyle>
      <WrapperIcon>
        <Icon style={{ width: '30px', height: '30px', color: '' }} icon="icon-park-outline:order" />
      </WrapperIcon>
      <Total>
        <Typography style={{ fontSize: '25px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
          {fShortenNumber(booksNow.length)}
        </Typography>
      </Total>
      <Title>Đơn đặt bàn trong ngày</Title>
    </RootStyle>
  );
}

export default TotalBookDay;
