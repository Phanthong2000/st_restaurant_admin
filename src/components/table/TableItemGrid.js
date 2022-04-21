import React from 'react';
import { Avatar, Box, Card, Grid, IconButton, styled, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import {
  actionTableModalChangeArea,
  actionTableModalEditTable
} from '../../redux/actions/tableActions';

const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '50px'
}));
const IconWrapper = styled(IconButton)(({ theme }) => ({
  width: '100%',
  cursor: 'default'
}));
const AvatarFood = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  position: 'absolute',
  zIndex: 2,
  top: -40,
  background: theme.palette.white,
  borderRadius: '120px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const WrapperInfo = styled(Card)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  background: theme.palette.white,
  minHeight: '250px'
}));
const FoodName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
}));
const Price = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.main
}));
const BoxLove = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
const Status = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.gray,
  fontSize: '14px'
}));
const BoxButton = styled(Box)(({ theme }) => ({
  width: '30px',
  height: '30px',
  background: '#dcecf7',
  color: theme.palette.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  cursor: 'pointer'
}));
TableItemGrid.prototype = {
  food: PropTypes.object
};
function TableItemGrid({ table, index }) {
  const dispatch = useDispatch();
  return (
    <RootStyle item xs={6} sm={6} md={4} lg={3} xl={2.4}>
      <IconWrapper disableFocusRipple disableRipple disableTouchRipple>
        <AvatarFood sx={{ boxShadow: 10 }}>
          <Icon style={{ width: '100px', height: '100px' }} icon="ic:outline-table-bar" />
        </AvatarFood>
        <WrapperInfo>
          <Box> </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <FoodName>
              {index + 1}. {table.tenBan}
            </FoodName>
            <Price>{table.loaiBan}</Price>
            <Price>Số người tối đa: {table.soNguoiToiDa}</Price>
            <Status>Khu vực {table.khuVuc.tenKhuVuc}</Status>
            <Box sx={{ marginTop: '5px', display: 'flex', alignItems: 'center' }}>
              <BoxButton
                onClick={() =>
                  dispatch(
                    actionTableModalEditTable({
                      status: true,
                      table
                    })
                  )
                }
              >
                <Tooltip title="Xem thông tin">
                  <Icon icon="clarity:eye-line" />
                </Tooltip>
              </BoxButton>
              <BoxButton
                onClick={() =>
                  dispatch(
                    actionTableModalChangeArea({
                      status: true,
                      table
                    })
                  )
                }
                sx={{ marginLeft: '10px', background: '#dcfadc', color: '#05b505' }}
              >
                <Tooltip title="Cập nhật khu vực">
                  <Icon icon="la:edit" />
                </Tooltip>
              </BoxButton>
            </Box>
          </Box>
        </WrapperInfo>
      </IconWrapper>
    </RootStyle>
  );
}

export default TableItemGrid;
