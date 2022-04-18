import React, { useEffect, useRef } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import BoxMessage from '../components/chat/BoxMessage';
import BoxSendMessage from '../components/chat/BoxSendMessage';
import BoxInfoChat from '../components/chat/BoxInfoChat';

const RootStyle = styled(IconButton)(({ theme }) => ({
  width: '100%',
  background: '#fff',
  cursor: 'default',
  minHeight: '100%'
}));
function Chat() {
  return (
    <RootStyle disableFocusRipple disableRipple disableTouchRipple>
      <BoxInfoChat />
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <BoxMessage />
        <BoxSendMessage />
      </Box>
    </RootStyle>
  );
}

export default Chat;
