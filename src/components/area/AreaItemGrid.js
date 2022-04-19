import React, { useEffect, useState } from 'react';
import { Avatar, Box, Card, Grid, IconButton, styled, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import api from '../../assets/api/api';
import { actionAreaModalEditArea } from '../../redux/actions/areaAction';

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
const AvatarFood = styled(Avatar)(({ theme }) => ({
  width: '120px',
  height: '120px',
  position: 'absolute',
  zIndex: 2,
  top: -40
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
AreaItemGrid.prototype = {
  food: PropTypes.object
};
function AreaItemGrid({ area, index }) {
  const [quantity, setQuantity] = useState(-1);
  const dispatch = useDispatch();
  const getQuantityTableInArea = async () => {
    const res = await axios.get(`${api}ban/list/khuVuc/${area.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    setQuantity(res.data);
  };
  useEffect(() => {
    getQuantityTableInArea();
    return function () {
      return null;
    };
  }, []);
  const chooseArea = () => {
    dispatch(
      actionAreaModalEditArea({
        status: true,
        area
      })
    );
  };
  if (quantity === -1) return null;
  return (
    <RootStyle item xs={6} sm={6} md={4} lg={3} xl={2.4}>
      <IconWrapper disableFocusRipple disableRipple disableTouchRipple>
        <AvatarFood sx={{ boxShadow: 10 }} src={area.hinhAnh} />
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
              {index + 1}. {area.tenKhuVuc}
            </FoodName>
            <Price sx={{ fontWeight: 'normal', fontSize: '14px' }}>
              Số lượng bàn: {quantity.length}
            </Price>
            <Box sx={{ marginTop: '5px' }}>
              <BoxButton onClick={chooseArea}>
                <Tooltip title="Xem thông tin">
                  <Icon icon="clarity:eye-line" />
                </Tooltip>
              </BoxButton>
            </Box>
          </Box>
        </WrapperInfo>
      </IconWrapper>
    </RootStyle>
  );
}

export default AreaItemGrid;
