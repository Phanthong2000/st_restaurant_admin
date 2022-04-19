import React, { useEffect, useRef, useState } from 'react';
import { Box, IconButton, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import BoxMessage from '../components/chat/BoxMessage';
import BoxSendMessage from '../components/chat/BoxSendMessage';
import BoxInfoChat from '../components/chat/BoxInfoChat';
import BoxGhim from '../components/chat/BoxGhim';

const RootStyle = styled(IconButton)(({ theme }) => ({
  width: '100%',
  background: '#fff',
  cursor: 'default',
  minHeight: '100%'
}));
function Chat() {
  const [showGhim, setShowGhim] = useState(false);
  const handleShowGhim = (show) => {
    setShowGhim(show);
  };
  return (
    <RootStyle disableFocusRipple disableRipple disableTouchRipple>
      <BoxInfoChat handleShowGhim={handleShowGhim} />
      {showGhim && <BoxGhim handleShowGhim={handleShowGhim} />}
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
