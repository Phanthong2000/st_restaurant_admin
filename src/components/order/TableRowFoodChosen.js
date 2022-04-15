import React from 'react';
import { Box, styled, TableCell, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { actionOrderDeleteFoods, actionOrderEditFoods } from '../../redux/actions/orderAction';

const RootStyle = styled(TableRow)(({ theme }) => ({
  width: '100%'
}));
const Cell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  height: '100px'
}));
const IconQuantity = styled(Icon)(({ theme }) => ({
  width: '25px',
  height: '25px',
  color: 'red',
  cursor: 'pointer'
}));
TableRowFoodChosen.prototype = {
  cell: PropTypes.object,
  index: PropTypes.number
};
function TableRowFoodChosen({ cell, index }) {
  const getSubTotal = () => cell.quantity * cell.food.donGia;
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.order.foods);
  const deleteFoodChosen = () => {
    dispatch(actionOrderDeleteFoods(index));
  };
  const minusQuantity = () => {
    if (cell.quantity === 1) {
      dispatch(actionOrderDeleteFoods(index));
    } else {
      dispatch(
        actionOrderEditFoods({
          index,
          food: {
            food: {
              ...cell.food
            },
            quantity: cell.quantity - 1
          }
        })
      );
    }
  };
  const plusQuantity = () => {
    dispatch(
      actionOrderEditFoods({
        index,
        food: {
          food: {
            ...cell.food
          },
          quantity: cell.quantity + 1
        }
      })
    );
  };
  return (
    <RootStyle sx={{ background: index % 2 === 0 ? '#fff' : '#f0fafc' }}>
      <Cell>{index + 1}</Cell>
      <Cell>{cell.food.tenMonAn}</Cell>
      <Cell>{cell.food.donGia.toLocaleString('es-US')}</Cell>
      <Cell sx={{ display: 'flex', alignItems: 'center' }}>
        <IconQuantity onClick={minusQuantity} icon="akar-icons:circle-minus-fill" />
        <Typography sx={{ width: '30px', textAlign: 'center' }}>{cell.quantity}</Typography>
        <IconQuantity
          onClick={plusQuantity}
          style={{ color: 'lightgreen' }}
          icon="akar-icons:circle-plus-fill"
        />
      </Cell>
      <Cell>{getSubTotal().toLocaleString('es-US')}</Cell>
      <Cell sx={{ textAlign: 'right' }}>
        <Icon
          onClick={deleteFoodChosen}
          style={{ color: 'red', width: '30px', height: '30px', cursor: 'pointer' }}
          icon="ci:off-close"
        />
      </Cell>
    </RootStyle>
  );
}

export default TableRowFoodChosen;
