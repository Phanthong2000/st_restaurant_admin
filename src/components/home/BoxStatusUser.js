import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { fPercent, fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '50%',
  height: '150px',
  border: `1px solid lightgrey`
}));
const IconUser = styled(Icon)(({ theme }) => ({
  width: '50px',
  height: '50px',
  color: '#B78103'
}));
const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray,
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '15px'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  fontFamily: theme.typography.fontFamily.primary
}));

function BoxUserEffect() {
  const customerEffect = useSelector((state) => state.customer.customerEffect);
  const customers = useSelector((state) => state.customer.customers);
  return (
    <Wrapper sx={{ borderRadius: '5px 0px 0px 5px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconUser icon="akar-icons:circle-check" />
            <Box sx={{ marginLeft: '10px' }}>
              <Title>Khách hàng hiệu lực</Title>
              <Value>{fShortenNumber(customerEffect.length)}</Value>
            </Box>
          </Box>
          <Box
            sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Title
              sx={{
                fontSize: '12px',
                background: '#B78103',
                padding: '1px 5px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '5px'
              }}
            >
              {fPercent((customerEffect.length / customers.length) * 100)}
            </Title>
            <Title sx={{ fontSize: '12px', marginLeft: '5px' }}> khách hàng</Title>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
}
function BoxUserBlock() {
  const customerBlock = useSelector((state) => state.customer.customerBlock);
  const customers = useSelector((state) => state.customer.customers);
  return (
    <Wrapper sx={{ borderLeft: '0px', borderRadius: `0px 5px 5px 0px` }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%'
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <IconUser style={{ color: '#B72136' }} icon="gg:close-o" />
            <Box sx={{ marginLeft: '10px' }}>
              <Title>Khách hàng đã khoá</Title>
              <Value>{fShortenNumber(customerBlock.length)}</Value>
            </Box>
          </Box>
          <Box
            sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Title
              sx={{
                fontSize: '12px',
                background: '#B72136',
                padding: '1px 5px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '5px'
              }}
            >
              {fPercent((customerBlock.length / customers.length) * 100)}
            </Title>
            <Title sx={{ fontSize: '12px', marginLeft: '5px' }}> khách hàng</Title>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
}
function BoxStatusUser() {
  return (
    <RootStyle>
      <BoxUserEffect />
      <BoxUserBlock />
    </RootStyle>
  );
}

export default BoxStatusUser;
