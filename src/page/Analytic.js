import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';
import { Box, ListItemButton, styled, Typography } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import BoxAnalyticRevenue from '../components/analytic/BoxAnalyticRevenue';
import BoxAnalyticCustomer from '../components/analytic/BoxAnalyticCustomer';
import BoxAnalyticFood from '../components/analytic/BoxAnalyticFood';

const animRight = keyframes`
    0% {
      left: 200;
      transform: translateX(-100%);,
    }
    100% {
      left: 250;      
      transform: translateX(0);
    }`;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
}));
const BoxIconRight = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  zIndex: 100,
  top: 150,
  right: 50,
  cursor: 'pointer',
  borderRadius: '2px',
  ':hover': {
    background: theme.palette.lightgrey
  }
}));
const IconRight = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  color: theme.palette.main
}));
const BoxMenu = styled(Box)(({ theme }) => ({
  width: '200px',
  position: 'fixed',
  top: 150,
  right: 50,
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '2px 0px 2px 2px',
  padding: '10px',
  zIndex: 10
}));
const BoxIconLeft = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRight: '0px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  zIndex: 100,
  top: 150,
  right: 249,
  cursor: 'pointer',
  borderRadius: '0px 2px 2px 2px',
  ':hover': {
    background: theme.palette.lightgrey
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
function BoxType({ type, chosen, choose }) {
  const Type = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px'
  }));
  return (
    <ListItemButton
      onClick={() => choose(type)}
      sx={
        chosen === type && {
          background: '#3C58C9',
          color: '#fff',
          '&:hover': { background: '#4d91f7' }
        }
      }
    >
      <Type>{type}</Type>
    </ListItemButton>
  );
}
function Analytic() {
  const [menu, setMenu] = useState(false);
  const [choose, setChoose] = useState('Khách hàng');
  const data = ['Doanh thu', 'Khách hàng', 'Món ăn'];
  const handleChoose = (type) => {
    setChoose(type);
    setMenu(false);
  };
  const handleMenu = (status) => {
    setMenu(status);
  };
  return (
    <RootStyle>
      {menu ? (
        <BoxMenu>
          <Title>Chọn mục thống kê</Title>
          {data.map((item, index) => (
            <BoxType choose={handleChoose} chosen={choose} key={index} type={item} />
          ))}
        </BoxMenu>
      ) : (
        <BoxIconRight onClick={() => handleMenu(true)}>
          <IconRight icon="ci:chevron-duo-left" />
        </BoxIconRight>
      )}
      {menu && (
        <BoxIconLeft onClick={() => handleMenu(false)}>
          <IconRight icon="ci:chevron-duo-right" />
        </BoxIconLeft>
      )}
      <Scrollbar alwaysShowTracks>
        {choose === 'Doanh thu' && <BoxAnalyticRevenue />}
        {choose === 'Khách hàng' && <BoxAnalyticCustomer />}
        {choose === 'Món ăn' && <BoxAnalyticFood />}
        <Box> </Box>
      </Scrollbar>
    </RootStyle>
  );
}

export default Analytic;
