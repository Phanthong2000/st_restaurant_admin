import React from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';

const fadeDown = keyframes`
from {
  opacity: 0;
  transform: translateY(-20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;
const RootStyle = styled(Box)(({ theme }) => ({
  height: '80px',
  background: theme.palette.white,
  display: 'flex',
  position: 'absolute',
  width: '60%',
  left: '20%',
  top: 20,
  zIndex: 10,
  alignItems: 'center',
  animation: `${fadeDown} 1s ease`,
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    left: '10%'
  }
}));
const AvatarChat = styled('img')(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.main}`
}));
const RestaurantName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary,
  color: '#000'
}));
const Restaurant = styled(Typography)(({ theme }) => ({
  padding: '2px 10px',
  color: theme.palette.white,
  background: '#3fcc35',
  fontSize: '12px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  borderRadius: '20px'
}));
const BoxButton = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  borderRadius: '35px',
  color: theme.palette.main,
  background: '#eff1f2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  ':hover': {
    background: '#eff7fe'
  },
  marginRight: '10px'
}));
function BoxInfoChat() {
  return (
    <RootStyle sx={{ boxShadow: 1 }}>
      <Box sx={{ display: 'flex', alginItems: 'center' }}>
        <IconButton sx={{ cursor: 'default' }} disableFocusRipple disableRipple disableTouchRipple>
          <Icon
            icon="ci:dot-05-xl"
            style={{ position: 'absolute', top: 0, right: 0, color: '#3fcc35' }}
          />
          <AvatarChat src="https://media.istockphoto.com/vectors/restaurant-staff-set-vector-id1184938346?k=20&m=1184938346&s=170667a&w=0&h=gHjJl5zCEhCOW5PNsdO6oHeOQdYhoFNZSOctHI7l2oA=" />
        </IconButton>
        <Box
          sx={{
            marginLeft: '10px',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column'
          }}
        >
          <RestaurantName>ST Restaurant</RestaurantName>
          <Box sx={{ display: 'flex' }}>
            <Restaurant>Nhà hàng</Restaurant>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <BoxButton>
          <Icon style={{ width: '20px', height: '20px' }} icon="jam:search" />
        </BoxButton>
        <BoxButton>
          <Icon style={{ width: '20px', height: '20px' }} icon="fluent:meet-now-48-filled" />
        </BoxButton>
        <BoxButton>
          <Icon style={{ width: '20px', height: '20px' }} icon="clarity:help-info-solid" />
        </BoxButton>
      </Box>
    </RootStyle>
  );
}

export default BoxInfoChat;
