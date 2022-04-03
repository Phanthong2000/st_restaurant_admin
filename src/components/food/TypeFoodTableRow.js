import React from 'react';
import { IconButton, styled, TableCell, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { actionFoodModalEditTypeFood } from '../../redux/actions/foodAction';

const RootStyle = styled(TableRow)(({ theme }) => ({
  background: theme.palette.white
}));
const Cell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold'
}));
const IconSeeInfo = styled(Icon)(({ theme }) => ({
  color: theme.palette.main
}));
const ImageTypeFood = styled('img')(({ theme }) => ({
  width: '100px',
  height: '100px',
  borderRadius: '10xp'
}));
TypeFoodTableRow.prototype = {
  type: PropTypes.object,
  index: PropTypes.number
};
function TypeFoodTableRow({ type, index }) {
  const dispatch = useDispatch();
  return (
    <RootStyle sx={{ background: index % 2 !== 0 && 'lightgrey' }}>
      <Cell>{index + 1}</Cell>
      <Cell>
        <ImageTypeFood src={type.hinhAnh} />
      </Cell>
      <Cell>{type.tenLoaiMonAn}</Cell>
      <TableCell>
        <IconButton
          onClick={() =>
            dispatch(
              actionFoodModalEditTypeFood({
                status: true,
                typefood: type
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

export default TypeFoodTableRow;
