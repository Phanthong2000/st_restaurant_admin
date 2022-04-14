import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Stack, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import SidebarHome from './SidebarHome';
import NavbarHome from './NavbarHome';
import Responsive from '../../components/Reponsive';
import Snack from '../../components/Snack';
import BackdropUser from '../../components/Backdrop';
import ModalFeedback from '../../components/home/ModalFeedback';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Stack)(({ theme }) => ({
  width: '100%',
  minHeight: `${heightScreen}px`,
  maxHeight: `${heightScreen}px`,
  background: theme.palette.main,
  padding: '10px 10px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '0px'
  }
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#fff',
  borderRadius: '10px',
  padding: '10px',
  [theme.breakpoints.down('md')]: {
    borderRadius: '0px'
  }
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '0px 50px',
  [theme.breakpoints.down('md')]: {
    margin: '0px 10px'
  }
}));
const MainStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  maxHeight: `${heightScreen - 150}px`,
  minHeight: `${heightScreen - 140}px`
}));
function HomeLayout() {
  const modalFeedback = useSelector((state) => state.user.modalFeedback);
  return (
    <RootStyle direction="row">
      <Wrapper>
        <Responsive width="lgDown">
          <SidebarHome />
        </Responsive>
        <BoxContent>
          <NavbarHome />
          <MainStyle>
            <Outlet />
          </MainStyle>
        </BoxContent>
      </Wrapper>
      {modalFeedback.status && <ModalFeedback />}
      <BackdropUser />
      <Snack />
    </RootStyle>
  );
}

export default HomeLayout;
