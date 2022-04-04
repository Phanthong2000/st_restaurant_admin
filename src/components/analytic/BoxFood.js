import React from 'react';
import { Box, Card, Grid, IconButton, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import PolarStatusFood from './PolarStatusFood';

const colorType = '#ff4a00';
const colorFood = '#f4ab55';
const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  borderRadius: '2px'
}));
const BoxHead = styled(Box)(({ theme }) => ({
  width: '100%',
  background: colorType,
  color: '#fff',
  borderRadius: '2px 2px 0px 0px',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxFoot = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid lightgrey`,
  borderRadius: '0px 0px 2px 2px',
  height: '50px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.white,
  fontWeight: 'bold'
}));
const IconFood = styled(Icon)(({ theme }) => ({
  width: '50px',
  height: '50px',
  color: theme.palette.white
}));
const BoxBody = styled(Card)(({ theme }) => ({
  width: '60%',
  background: theme.palette.white,
  position: 'absolute',
  padding: '10px',
  bottom: 25,
  left: '20%'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary,
  color: colorType
}));
function BoxFood() {
  const typefoods = useSelector((state) => state.food.typefoods);
  const foods = useSelector((state) => state.food.foods);
  return (
    <RootStyle container>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ width: '100%', padding: '10px' }}>
        <IconButton
          sx={{ width: '100%' }}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          disabled
        >
          <Wrapper>
            <BoxHead>
              <Title>Số lượng loại món ăn</Title>
              <IconFood icon="healthicons:unhealthy-food-outline" />
            </BoxHead>
            <BoxBody elevation={3}>
              <Value>{typefoods.length}</Value>
            </BoxBody>
            <BoxFoot> </BoxFoot>
          </Wrapper>
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ width: '100%', padding: '10px' }}>
        <IconButton
          sx={{ width: '100%' }}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          disabled
        >
          <Wrapper>
            <BoxHead sx={{ background: colorFood }}>
              <Title>Số lượng món ăn</Title>
              <IconFood icon="fluent:food-pizza-20-regular" />
            </BoxHead>
            <BoxBody elevation={3}>
              <Value sx={{ color: colorFood }}>{foods.length}</Value>
            </BoxBody>
            <BoxFoot> </BoxFoot>
          </Wrapper>
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ width: '100%', padding: '10px' }}>
        <PolarStatusFood />
      </Grid>
    </RootStyle>
  );
}

export default BoxFood;
