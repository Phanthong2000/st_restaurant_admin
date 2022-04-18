import React, { useEffect, useRef } from 'react';
import { Box, Button, Icon, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import Message from './Message';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  //   minHeight: 'calc(100% - 80px)',
  height: 'calc(100% - 80px)',
  background: '#eff7fe',
  display: 'flex',
  flexDirection: 'column-reverse',
  overflow: 'auto'
}));
function BoxMessage() {
  const viewRef = useRef();
  const allMessages = useSelector((state) => state.chat.allMessages);
  useEffect(() => {
    if (viewRef.current.scrollTop >= -130) {
      viewRef.current.scrollTo({ top: 0 });
    }
    return function () {
      return null;
    };
  }, [allMessages]);
  return (
    <RootStyle ref={viewRef}>
      {allMessages.map((item, index) => (
        <Message key={index} index={index} message={item} />
      ))}
    </RootStyle>
  );
}

export default BoxMessage;
