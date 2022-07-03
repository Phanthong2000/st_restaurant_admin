import React, { useEffect, useState } from 'react';
import { Box, Card, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
  color: '#212B36',
  background: '#C8FACD',
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
  color: '#007B55',
  backgroundImage: `linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)`
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
function TotalNewUserWeek() {
  const newCustomer = useSelector((state) => state.customer.newCustomer);
  const [total, setTotal] = useState(-1);
  useEffect(() => {
    let sum = 0;
    newCustomer.data.forEach((value) => (sum += value));
    setTotal(sum);
    return function () {
      return null;
    };
  }, [newCustomer]);
  return (
    <RootStyle>
      <WrapperIcon>
        <Icon style={{ width: '30px', height: '30px', color: '' }} icon="gridicons:user" />
      </WrapperIcon>
      <Total>
        <Typography style={{ fontSize: '25px', fontFamily: 'sans-serif', fontWeight: 'bold' }}>
          {fShortenNumber(total)}
        </Typography>
      </Total>
      <Title>Người dùng mới trong tuần</Title>
    </RootStyle>
  );
}

export default TotalNewUserWeek;
