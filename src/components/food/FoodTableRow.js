import React from 'react';
import { Box, IconButton, styled, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { actionFoodModalEditFood, actionFoodModalUserLove } from '../../redux/actions/foodAction';

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
      <Cell>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography>
            {!food.listKhachHangThichMonAn || food.listKhachHangThichMonAn.length === 0
              ? `0`
              : food.listKhachHangThichMonAn.length}
          </Typography>
          {food.listKhachHangThichMonAn && food.listKhachHangThichMonAn.length > 0 && (
            <Tooltip title="Danh sách khách hàng yêu thích">
              <IconButton
                onClick={() =>
                  dispatch(
                    actionFoodModalUserLove({
                      status: true,
                      food
                    })
                  )
                }
              >
                <IconSeeInfo icon="el:eye-open" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Cell>
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
