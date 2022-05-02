import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Icon, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import Message from './Message';
import BoxUsersInputting from './BoxUsersInputting';

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
  const usersInputting = useSelector((state) => state.chat.usersInputting);
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (viewRef.current.scrollTop >= -130) {
      viewRef.current.scrollTo({ top: 0 });
    }
    setMessages(allMessages.slice(0, page * 10));
    return function () {
      return null;
    };
  }, [allMessages]);
  const handleScroll = (e) => {
    if (e.target.scrollTop * -1 + e.target.clientHeight + 1 >= e.target.scrollHeight) {
      setMessages(allMessages.slice(0, (page + 1) * 10));
      setPage(page + 1);
    }
  };
  return (
    <RootStyle onScroll={handleScroll} ref={viewRef}>
      {usersInputting.length > 0 && <BoxUsersInputting />}
      {messages.map((item, index) => (
        <Message key={index} index={index} message={item} />
      ))}
    </RootStyle>
  );
}

export default BoxMessage;
