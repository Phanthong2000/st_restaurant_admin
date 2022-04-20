import { Box, styled } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const RootStyle = styled(Box)(({ themm }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  width: '100%',
  overflow: 'auto',
  height: 'calc(100% - 50px)',
  padding: '10px'
}));
function BoxMessage() {
  const allMessagesMeeting = useSelector((state) => state.chat.allMessagesMeeting);
  return (
    <RootStyle>
      {allMessagesMeeting.map((item, index) => (
        <Message key={index} message={item} />
      ))}
    </RootStyle>
  );
}

export default BoxMessage;
