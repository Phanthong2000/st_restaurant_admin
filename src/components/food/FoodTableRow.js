import React from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { actionFoodModalEditFood } from '../../redux/actions/foodAction';

const RootStyle = styled(TableRow)(({ theme }) => ({
  background: theme.palette.white
}));
const Cell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));
const ImageFood = styled('img')(({ theme }) => ({
  width: '100px',
  height: '100px'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
FoodTableRow.prototype = {
  food: PropTypes.object,
  index: PropTypes.number
};
function FoodTableRow({ food, index }) {
  const dispatch = useDispatch();
  return (
    <RootStyle sx={{ background: index % 2 !== 0 && 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>
        <ImageFood src={food.hinhAnh.at(0)} />
      </Cell>
      <Cell>{food.tenMonAn}</Cell>
      <Cell>{`${food.donGia.toLocaleString('es-US')} vnđ`}</Cell>
      <Cell>{food.loaiMonAn.tenLoaiMonAn}</Cell>
      <Cell>{food.trangThai}</Cell>
      <TableCell>
        <IconButton
          onClick={() =>
            dispatch(
              actionFoodModalEditFood({
                status: true,
                food
              })
            )
          }
        >
          <IconSeeInfo icon="el:eye-open" />
        </IconButton>
      </TableCell>
    </RootStyle>
  );
}

export default FoodTableRow;
