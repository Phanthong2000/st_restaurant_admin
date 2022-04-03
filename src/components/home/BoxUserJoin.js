import { Icon } from '@iconify/react';
import { Box, styled, Typography } from '@mui/material';
import React from 'react';
import AnimatedNumber from 'react-animated-number/build/AnimatedNumber';
import { useSelector } from 'react-redux';
import { fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 0),
  color: '#452730',
  background: '#eac5fa',
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
  color: '#452730',
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
function BoxUserJoin() {
  const usersJoin = useSelector((state) => state.socket.usersJoin);
  return (
    <RootStyle>
      <WrapperIcon>
        <Icon style={{ width: '30px', height: '30px', color: '' }} icon="ri:user-shared-fill" />
      </WrapperIcon>
      <Total>
        <AnimatedNumber
          component="text"
          frameStyle={(perc) => (perc === 100 ? {} : { backgroundColor: '#eac5fa' })}
          value={usersJoin.length}
          stepPrecision={0}
          style={{
            transition: '0.8s ease-out',
            background: '#fff'
          }}
          duration={500}
          formatValue={(n) => fShortenNumber(n)}
        />
      </Total>
      <Title>Đang truy cập vào website</Title>
    </RootStyle>
  );
}

export default BoxUserJoin;
