import { Box, Divider, Grid, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import foods from '../../assets/data/foods';
import FoodItemOrder from './FoodItemOrder';
import TypeFoodItem from '../food/TypeFoodItem';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  padding: '10px'
}));
const Separate = styled(Divider)(({ theme }) => ({
  width: '50%',
  marginLeft: '25%',
  color: theme.palette.black,
  marginTop: '20px',
  fontSize: '20px',
  fontWeight: 'bold'
}));
const GridFood = styled(Grid)(() => ({
  width: '100%'
}));
BoxTypeFoodOrder.prototype = {
  type: PropTypes.object
};
function BoxTypeFoodOrder({ type }) {
  const [allFoods, setAllFoods] = useState([]);
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const foodsByName = useSelector((state) => state.food.foodsByName);
  const getAllFoodsByType = () => {
    const data = [];
    foodsByName.forEach((food) => {
      if (food.loaiMonAn.id === type.id && food.trangThai === 'Đang bán') data.push(food);
    });
    setAllFoods(data);
  };
  useEffect(() => {
    getAllFoodsByType();
    return function () {
      return null;
    };
  }, [typeChosen, foodsByName]);
  return (
    <RootStyle>
      <Separate>{typeChosen.name === 'all' ? type.tenLoaiMonAn : type.name}</Separate>
      <GridFood container>
        {allFoods.map((item, index) => (
          <FoodItemOrder key={index} food={item} />
        ))}
      </GridFood>
    </RootStyle>
  );
}

export default BoxTypeFoodOrder;
