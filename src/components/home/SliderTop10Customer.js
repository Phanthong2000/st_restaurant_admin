import React, { useEffect, useState } from 'react';
import { Box, Card, Grid, IconButton, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const anim = keyframes`
from  { 
    transform: scale(0)
}
to   { 
    transform: scale(1)
}`;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px',
  minHeight: '100%'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '15px',
  fontFamily: theme.typography.fontFamily.primary
}));
const ArrowPrev = styled(Card)(({ theme }) => ({
  width: '70px',
  height: '70px',
  zIndex: 990,
  position: 'absolute',
  borderRadius: '10px',
  left: -20,
  top: '40%',
  background: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.main,
  cursor: 'pointer'
}));
const ArrowNext = styled(Card)(({ theme }) => ({
  width: '70px',
  height: '70px',
  zIndex: 990,
  position: 'absolute',
  borderRadius: '10px',
  right: -20,
  top: '40%',
  background: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.main,
  cursor: 'pointer'
}));
function Customer({ customer, count, page, index }) {
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100%',
    border: `1px solid ${theme.palette.main}`,
    borderRadius: '5px'
  }));
  const Top = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.palette.main
  }));
  const AvatarCustomer = styled('img')(({ theme }) => ({
    width: '50%',
    height: '150px',
    marginTop: '10px',
    borderRadius: '10px'
  }));
  const Book = styled(Typography)(({ theme }) => ({
    padding: '2px 10px',
    color: theme.palette.white,
    background: theme.palette.main,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: 'bold',
    borderRadius: '20px',
    fontSize: '14px',
    marginTop: '-10px',
    border: '1px solid #fff'
  }));
  const Username = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '20px',
    fontFamily: theme.typography.fontFamily.primary,
    marginTop: '10px',
    textTransform: 'capitalize',
    color: '#000'
  }));
  const navigate = useNavigate();
  const goToCustomerDetail = () => {
    navigate(`/home/customer-detail/${customer.id}`);
  };
  return (
    <Grid
      item
      sx={{ width: '100%', padding: '10px', minHeight: '100%', animation: `${anim} 2s` }}
      xs={6}
      sm={6}
      md={6}
      lg={6}
      xl={6}
    >
      <Wrapper>
        <Top>Hạng {page * 2 + index + 1}</Top>
        <AvatarCustomer src={customer.anhDaiDien} />
        <Book>{count} đơn</Book>
        <Username>{customer.hoTen}</Username>
        <Username sx={{ fontSize: '14px', color: 'gray', marginTop: '5px' }}>
          SĐT: {customer.soDienThoai}
        </Username>
        <Book onClick={goToCustomerDetail} sx={{ margin: '10px 0px', cursor: 'pointer' }}>
          Xem thông tin
        </Book>
      </Wrapper>
    </Grid>
  );
}
function SliderTop10Customer() {
  const top10Customer = useSelector((state) => state.analytic.top10Customer);
  const [page, setPage] = useState(0);
  const [customers, setCustomers] = useState([]);
  const getCustomersByPage = (page) => {
    const data = [];
    for (let i = 0; i < top10Customer.customers.length; i += 1) {
      if (i === page * 2 || i - 1 === page * 2) {
        data.push(top10Customer.customers.at(i));
      }
    }
    setCustomers(data);
  };
  useEffect(() => {
    getCustomersByPage(0);
    return function () {
      return null;
    };
  }, [top10Customer]);
  const handlePrev = () => {
    if (page === 0) {
      getCustomersByPage(4);
      setPage(4);
    } else {
      getCustomersByPage(page - 1);
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page === 4) {
      getCustomersByPage(0);
      setPage(0);
    } else {
      getCustomersByPage(page + 1);
      setPage(page + 1);
    }
  };
  return (
    <RootStyle>
      <Title>Top khách hàng</Title>
      <IconButton
        sx={{ width: '100%', cursor: 'default', minHeight: '100%' }}
        disableFocusRipple
        disableRipple
        disableTouchRipple
      >
        <ArrowPrev onClick={handlePrev} elevation={10}>
          <Icon icon="ant-design:caret-left-outlined" />
        </ArrowPrev>
        <Grid sx={{ width: '100%', minHeight: '100%' }} container>
          {customers.map((item, index) => (
            <Customer
              page={page}
              index={index}
              key={index}
              customer={item.khachHang}
              count={item.count}
            />
          ))}
          <ArrowNext onClick={handleNext} elevation={10}>
            <Icon icon="ant-design:caret-right-outlined" />
          </ArrowNext>
        </Grid>
      </IconButton>
    </RootStyle>
  );
}

export default SliderTop10Customer;
