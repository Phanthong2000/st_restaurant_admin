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
  width: '48%',
  height: '120px',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  background: '#fff'
}));
const IconUser = styled(Icon)(({ theme }) => ({
  width: '50px',
  height: '50px',
  color: theme.palette.mainHover
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
function BoxTotal() {
  const customersKeyword = useSelector((state) => state.customer.customersKeyword);
  const customers = useSelector((state) => state.customer.customers);
  return (
    <Wrapper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <IconUser icon="ph:users-three" />
        <Box sx={{ marginLeft: '10px' }}>
          <Title>Tổng khách hàng</Title>
          <Value>{fShortenNumber(customers.length)}</Value>
        </Box>
      </Box>
    </Wrapper>
  );
}
function BoxOnline() {
  const broadcast = useSelector((state) => state.socket.broadcast);
  const customers = useSelector((state) => state.customer.customers);
  const user = useSelector((state) => state.user.user);
  return (
    <Wrapper>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <IconUser style={{ color: '#007B55' }} icon="icons8:gender-neutral-user" />
        <Box sx={{ marginLeft: '10px' }}>
          <Title>Đang hoạt động</Title>
          <Value>
            {fShortenNumber(
              broadcast.filter((br) => br.userId !== user.id && br.type === 'user').length
            )}
          </Value>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Title
              sx={{
                fontSize: '12px',
                background: '#007B55',
                padding: '1px 5px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '5px'
              }}
            >
              {fPercent(
                (broadcast.filter((br) => br.userId !== user.id && br.type === 'user').length /
                  customers.length) *
                  100
              )}
            </Title>
            <Title sx={{ fontSize: '12px', marginLeft: '5px' }}> khách hàng</Title>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
}
function BoxTotalUser() {
  return (
    <RootStyle>
      <BoxTotal />
      <BoxOnline />
    </RootStyle>
  );
}

export default BoxTotalUser;
