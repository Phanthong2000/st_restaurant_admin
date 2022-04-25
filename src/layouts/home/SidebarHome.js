import React, { useEffect } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import sidebarHomeConfig from './SidebarHomeConfig';
import MenuItem from '../../components/home/MenuItem';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '350px',
  minHeight: `${heightScreen - 40}px`,
  background: theme.palette.white,
  padding: theme.spacing(5)
}));
const BoxLogo = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '60px',
  borderBottom: `2px solid ${theme.palette.black}`
}));
const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.main,
  fontSize: '20px'
}));
const Admin = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.gray,
  width: '100%',
  textAlign: 'right',
  fontFamily: theme.typography.fontFamily.primary
}));
function SidebarHome() {
  return (
    <RootStyle>
      <BoxLogo>
        <Logo>ST Restaurant</Logo>
        <Admin>Quản lý</Admin>
      </BoxLogo>
      {sidebarHomeConfig.map((item, index) => (
        <MenuItem key={index} menu={item} />
      ))}
    </RootStyle>
  );
}

export default SidebarHome;
