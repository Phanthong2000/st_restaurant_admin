import React from 'react';
import { styled, Box, Grid, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fShortenNumber } from '../../utils/formatNumber';
import PolarStatusCustomer from './PolarStatusCustomer';
import { actionCustomerModalCustomersOnline } from '../../redux/actions/customerAction';

const colortotal = '#ff4a00';
const coloruser = '#f4ab55';
const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '2px',
  border: `1px solid lightgrey`,
  background: '#fff',
  padding: '25px 0px',
  textAlign: 'center',
  height: '200px',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundBlendMode: 'darken',
  backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr1IAuunRGkSEKve4EsGV1O6jJOoN3WDEQ9g&usqp=CAU`
}));
const WrapperIcon = styled(Box)(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '50px',
  color: theme.palette.white,
  background: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const IconCustomer = styled(Icon)(({ theme }) => ({
  width: '40px',
  height: '40px'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.main
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1vw',
  fontFamily: theme.typography.fontFamily.primary,
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '2vw'
  }
}));
const BoxButton = styled(Box)(({ theme }) => ({
  padding: '2px 10px',
  borderRadius: '5px',
  background: theme.palette.main,
  color: theme.palette.white,
  fontSize: '13px',
  fontFamily: theme.typography.fontFamily.second,
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer'
}));
function BoxCustomer() {
  const customers = useSelector((state) => state.customer.customers);
  const broadcast = useSelector((state) => state.socket.broadcast);
  const user = useSelector((state) => state.user.user);
  const usersJoin = useSelector((state) => state.socket.usersJoin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToCustomer = () => {
    navigate(`/home/customer`);
  };
  const seeAllCustomersOnline = () => {
    const customers = [];
    broadcast.forEach((br) => {
      if (br.type === 'user') {
        customers.push(br.userId);
      }
    });
    dispatch(
      actionCustomerModalCustomersOnline({
        status: true,
        customers
      })
    );
  };
  return (
    <RootStyle container>
      <Grid item sx={{ padding: '10px', width: '100%' }} xs={6} sm={6} md={6} lg={3} xl={3}>
        <Wrapper>
          <Box
            sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
          >
            <WrapperIcon sx={{ background: colortotal }}>
              <IconCustomer icon="ph:users-three" />
            </WrapperIcon>
          </Box>
          <Value sx={{ color: colortotal }}>{fShortenNumber(customers.length)}</Value>
          <Title>Tổng khách hàng</Title>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <BoxButton sx={{ background: colortotal }} onClick={goToCustomer}>
              Xem tất cả
            </BoxButton>
          </Box>
        </Wrapper>
      </Grid>
      <Grid item sx={{ padding: '10px', width: '100%' }} xs={6} sm={6} md={6} lg={3} xl={3}>
        <Wrapper>
          <Box
            sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
          >
            <WrapperIcon>
              <IconCustomer icon="icons8:gender-neutral-user" />
            </WrapperIcon>
          </Box>
          <Value>
            {fShortenNumber(
              broadcast.filter((br) => br.userId !== user.id && br.type === 'user').length
            )}
          </Value>
          <Title>Khách hàng đang hoạt động</Title>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <BoxButton onClick={seeAllCustomersOnline}>Xem tất cả</BoxButton>
          </Box>
        </Wrapper>
      </Grid>
      <Grid item sx={{ padding: '10px', width: '100%' }} xs={6} sm={6} md={6} lg={3} xl={3}>
        <Wrapper>
          <Box
            sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
          >
            <WrapperIcon sx={{ background: coloruser }}>
              <IconCustomer icon="ri:user-shared-line" />
            </WrapperIcon>
          </Box>
          <Value sx={{ color: coloruser }}>{fShortenNumber(usersJoin.length)}</Value>
          <Title sx={{ marginTop: '10px' }}>Người dùng đang truy cập vào website</Title>
        </Wrapper>
      </Grid>
      <Grid item sx={{ padding: '10px', width: '100%' }} xs={6} sm={6} md={6} lg={3} xl={3}>
        <PolarStatusCustomer />
      </Grid>
    </RootStyle>
  );
}

export default BoxCustomer;
