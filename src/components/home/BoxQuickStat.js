import { Icon } from '@iconify/react';
import { Box, Card, styled, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '15px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function QuickStat({ icon, value, label }) {
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: '10px',
    display: 'flex',
    alignItems: 'center'
  }));
  const WrapperIcon = styled(Card)(({ theme }) => ({
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px'
  }));
  const IconQuickStat = styled(Icon)(({ theme }) => ({
    width: '30px',
    height: '30px',
    color: theme.palette.main
  }));
  const Value = styled(Typography)(({ theme }) => ({
    marginLeft: '20px',
    fontFamily: theme.typography.fontFamily.primary
  }));
  return (
    <Wrapper>
      <WrapperIcon>
        <IconQuickStat icon={icon} />
      </WrapperIcon>
      <Value>
        {value.toLocaleString(`es-US`)} {label}
      </Value>
    </Wrapper>
  );
}
function BoxQuickStat() {
  const customers = useSelector((state) => state.customer.customers);
  const foods = useSelector((state) => state.food.foods);
  const data = [
    {
      icon: 'ant-design:user-outlined',
      value: customers.length,
      label: 'Khách hàng'
    },
    {
      icon: 'fluent:food-pizza-24-regular',
      value: foods.length,
      label: 'Món ăn'
    }
  ];
  return (
    <RootStyle>
      <BoxTitle>
        <Title>Thống kê nhanh</Title>
        <BoxContent>
          {data.map((item, index) => (
            <QuickStat key={index} icon={item.icon} value={item.value} label={item.label} />
          ))}
        </BoxContent>
      </BoxTitle>
    </RootStyle>
  );
}

export default BoxQuickStat;
