import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Stack, styled } from '@mui/material';
import SidebarHome from './SidebarHome';
import NavbarHome from './NavbarHome';
import Responsive from '../../components/Reponsive';
import Snack from '../../components/Snack';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  minHeight: `${heightScreen}px`,
  maxHeight: `${heightScreen}px`
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '0px 50px'
  // [theme.breakpoints.down('md')]: {
  //   margin: '0px 10px'
  // }
}));
const MainStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  maxHeight: `${heightScreen - 100}px`,
  minHeight: `${heightScreen - 100}px`
}));
function HomeLayout() {
  return (
    <RootStyle direction="row">
      <Responsive width="lgDown">
        <SidebarHome />
      </Responsive>
      <BoxContent>
        <NavbarHome />
        <MainStyle>
          <Outlet />
        </MainStyle>
      </BoxContent>
      <Snack />
    </RootStyle>
  );
}

export default HomeLayout;
