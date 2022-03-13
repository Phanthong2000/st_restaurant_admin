import React from 'react';
import { Button, styled } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { actionFoodGetTypeChosen } from '../../redux/actions/foodAction';

const RootStyle = styled(Button)(({ theme }) => ({
  marginLeft: '10px',
  background: theme.palette.lightgrey,
  color: theme.palette.black,
  textTransform: 'none',
  width: '100px',
  fontSize: '12px',
  ':hover': {
    background: theme.palette.mainHover
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '10px'
  }
}));
TypeFoodItem.prototype = {
  type: PropTypes.object
};
function TypeFoodItem({ type }) {
  const dispatch = useDispatch();
  const typeChosen = useSelector((state) => state.food.typeChosen);
  const chooseType = () => {
    dispatch(
      actionFoodGetTypeChosen({
        id: type.id,
        name: type.tenLoaiMonAn
      })
    );
  };
  return (
    <RootStyle
      sx={typeChosen.name === type.tenLoaiMonAn && { background: '#3C58C9', color: '#fff' }}
      onClick={chooseType}
    >
      {type.tenLoaiMonAn}
    </RootStyle>
  );
}

export default TypeFoodItem;
