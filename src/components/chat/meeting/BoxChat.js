import React from 'react';
import { Box, Card, styled } from '@mui/material';
import { Icon } from '@iconify/react';
import BoxMessage from './BoxMessage';
import BoxSendMessage from './BoxSendMessage';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '350px',
  height: '300px',
  background: '#eff7fe',
  zIndex: 2,
  marginBottom: '20px',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));
function BoxChat() {
  return (
    <RootStyle>
      <BoxMessage />
      <BoxSendMessage />
    </RootStyle>
  );
}

export default BoxChat;
