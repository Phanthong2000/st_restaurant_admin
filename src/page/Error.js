import React from 'react';
import { Box, Button, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const heightScreen = window.innerHeight - 1;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: `${heightScreen}px`,
  background: theme.palette.lightgrey,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
const OOPS = styled(Typography)(({ theme }) => ({
  fontSize: '200px',
  fontFamily: 'cursive',
  [theme.breakpoints.down('sm')]: {
    fontSize: '100px'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  color: 'gray',
  fontFamily: theme.typography.fontFamily.primary,
  padding: theme.spacing(1)
}));
const ButtonGoToHome = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  fontSize: '20px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const Title404 = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '100px',
  color: theme.palette.gray
}));
function Error() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/home/app');
  };
  return (
    <RootStyle>
      <Box sx={{ textAlign: 'center' }}>
        <OOPS>OOPS!</OOPS>
        <Box
          sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}
        >
          <Title404>4</Title404>
          <Icon style={{ width: '80px', height: '80px' }} icon="twemoji:sad-but-relieved-face" />
          <Title404>4</Title404>
        </Box>
        <Title>Không tìm thấy trang</Title>
        <ButtonGoToHome onClick={goToHome}>Về trang chủ</ButtonGoToHome>
      </Box>
    </RootStyle>
  );
}

export default Error;
