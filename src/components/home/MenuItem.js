import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useLocation, useNavigate } from 'react-router-dom';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginTop: '30px',
  cursor: 'pointer'
}));
const IconMenu = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  color: theme.palette.gray
}));
const NameMenu = styled(Typography)(({ theme }) => ({
  marginLeft: '20px',
  fontWeight: 'bold',
  color: theme.palette.gray
}));
MenuItem.prototype = {
  menu: PropTypes.object
};
function MenuItem({ menu }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const goToPath = () => {
    navigate(`${menu.path}`);
  };
  return (
    <RootStyle onClick={goToPath}>
      <IconMenu sx={{ color: pathname.includes(menu.path) && '#3C58C9' }} icon={menu.icon} />
      <NameMenu sx={{ color: pathname.includes(menu.path) && '#3C58C9' }}>{menu.name}</NameMenu>
    </RootStyle>
  );
}

export default MenuItem;
