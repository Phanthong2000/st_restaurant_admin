import React from 'react';
import { Box, styled, Typography, IconButton, Badge, Avatar } from '@mui/material';
import { Icon } from '@iconify/react';
import axios from 'axios';
import Responsive from '../../components/Reponsive';
import api from '../../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100px',
  padding: theme.spacing(5, 1, 0),
  borderBottom: `2px solid ${theme.palette.black}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  color: theme.palette.main
}));
const Admin = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.gray,
  width: '100%',
  textAlign: 'right',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxAvatar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
function NavbarHome() {
  const click = () => {
    axios
      .get(`${api}monAn/list/loaiMonAn`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: {
          id: '6224bf98adedb93db17486b6'
        }
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <RootStyle>
      <Responsive width="mdUp">
        <BoxLogo>
          <Box sx={{ textAlign: 'right' }}>
            <Logo>ST Restaurant</Logo>
            <Admin>Quản lý</Admin>
          </Box>
          <IconButton sx={{ marginLeft: '10px' }}>
            <Icon icon="majesticons:menu" />
          </IconButton>
        </BoxLogo>
      </Responsive>
      <Typography> </Typography>
      <BoxAvatar>
        <IconButton onClick={click} sx={{ marginRight: '20px' }}>
          <Badge color="error" badgeContent={1}>
            <Icon icon="clarity:notification-line" />
          </Badge>
        </IconButton>
        <Avatar src="https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg" />
      </BoxAvatar>
    </RootStyle>
  );
}

export default NavbarHome;
