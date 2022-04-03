import React from 'react';
import { Box, Card, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import AnimatedNumber from 'react-animated-number/build/AnimatedNumber';
import { fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
  color: '#04297A',
  background: '#D0F2FF',
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
  color: '#0C53B7',
  backgroundImage: `linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)`
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
function TotalMoneyDay() {
  const totalNow = useSelector((state) => state.order.totalNow);
  return (
    <RootStyle>
      <WrapperIcon>
        <Icon style={{ width: '30px', height: '30px', color: '' }} icon="healthicons:money-bag" />
      </WrapperIcon>
      <Total>
        <AnimatedNumber
          component="text"
          frameStyle={(perc) => (perc === 100 ? {} : { backgroundColor: '#D0F2FF' })}
          value={totalNow}
          stepPrecision={0}
          style={{
            transition: '0.8s ease-out',
            background: '#fff'
          }}
          duration={500}
          formatValue={(n) => fShortenNumber(n)}
        />
      </Total>
      <Title>Doanh thu trong ngày</Title>
    </RootStyle>
  );
}

export default TotalMoneyDay;
