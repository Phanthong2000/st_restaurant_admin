import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionOrderAddFoods, actionOrderModalInformation } from '../../redux/actions/orderAction';

const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2)
}));
const BoxFood = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.lightgrey,
  padding: theme.spacing(1)
}));
const AvatarFood = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: '20px',
  height: '300px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    height: '200px'
  }
}));
const BoxNamePrice = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const NameFood = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  margin: '10px'
}));
const PriceFood = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.main,
  fontWeight: 'bold',
  marginRight: '20px'
}));
const ButtonChooseFood = styled(Button)(({ theme }) => ({
  width: '45%',
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.second,
  marginTop: '20px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const ButtonSeeInformation = styled(Button)(({ theme }) => ({
  width: '45%',
  textTransform: 'none',
  color: theme.palette.main,
  background: theme.palette.white,
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.second,
  marginTop: '20px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.gray,
    color: theme.palette.white
  }
}));
FoodItemOrder.prototype = {
  food: PropTypes.object
};
function FoodItemOrder({ food }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.order.foods);
  const [isChosen, setIsChosen] = useState(false);
  const checkFoodChosenOrder = () => {
    let flag = false;
    foods.forEach((item) => {
      if (item.food.id === food.id) {
        flag = true;
      }
    });
    setIsChosen(flag);
  };
  const checkDescriptionLength = () => {
    if (food.moTa.length < 200) return `${food.moTa}`;
    return `${food.moTa.substring(0, 200)}...`;
  };
  const chooseFood = () => {
    dispatch(
      actionOrderAddFoods({
        food,
        quantity: 1
      })
    );
    window.scrollTo({ left: 0, top: 450, behavior: 'smooth' });
  };
  useEffect(() => {
    checkFoodChosenOrder();
    return function () {
      return null;
    };
  }, [foods]);
  const seeInformation = () => {
    dispatch(
      actionOrderModalInformation({
        status: true,
        food
      })
    );
  };
  if (isChosen) return null;
  return (
    <RootStyle item xs={12} sm={6} md={6} lg={4} xl={4}>
      <BoxFood sx={{ '&:hover': { boxShadow: 20 } }}>
        <AvatarFood src={food.hinhAnh.at(0)} />
        <BoxNamePrice>
          <NameFood>{food.tenMonAn}</NameFood>
          <PriceFood>
            <b style={{ fontSize: '20px', color: '#000' }}>Giá: </b>
            {`${food.donGia.toLocaleString('es-US')} vnđ`}
          </PriceFood>
        </BoxNamePrice>
        <Typography maxHeight="120px">{checkDescriptionLength()}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <ButtonSeeInformation onClick={seeInformation}>Xem thông tin</ButtonSeeInformation>
          <ButtonChooseFood onClick={chooseFood}>Chọn món</ButtonChooseFood>
        </Box>
      </BoxFood>
    </RootStyle>
  );
}

export default FoodItemOrder;
