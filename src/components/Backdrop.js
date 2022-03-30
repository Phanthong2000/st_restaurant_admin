import React from 'react';
import { Backdrop, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Icon } from '@iconify/react';

function BackdropUser() {
  const backdrop = useSelector((state) => state.user.backdrop);
  return (
    <Backdrop sx={{ zIndex: 999 }} open={backdrop.status}>
      <Box sx={{ width: '100%', textAlign: 'center' }}>
        <Icon style={{ width: '50px', height: '50px', color: '#fff' }} icon="eos-icons:loading" />
        <Typography sx={{ fontWeight: 'bold', fontSize: '25px', color: '#fff' }}>
          {backdrop.content}
        </Typography>
      </Box>
    </Backdrop>
  );
}

export default BackdropUser;
