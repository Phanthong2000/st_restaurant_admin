import { Box, styled, InputBase, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionChatAddMessageMeeting } from '../../../redux/actions/chatAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '50px',
  background: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0px 20px'
}));
const Input = styled(InputBase)(({ theme }) => ({
  width: '100%'
}));
function BoxSendMessage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [contentText, setContentText] = useState('');
  const socketRef = useRef();
  const socket = useSelector((state) => state.socket.socket);
  const me = useSelector((state) => state.socket.me);
  const handleChangeText = (text) => {
    setContentText(text);
  };
  const handleSendMessage = () => {
    socketRef.current = socket;
    const message = {
      contentText,
      createAt: new Date().getTime(),
      sender: user
    };
    socketRef.current.emit('send-message-meeting', { roomId, message, socketId: me });
    dispatch(actionChatAddMessageMeeting(message));
    setContentText('');
  };
  return (
    <RootStyle>
      <Input
        value={contentText}
        onChange={(e) => handleChangeText(e.target.value)}
        fullWidth
        placeholder="Aa"
      />
      <IconButton onClick={handleSendMessage} disabled={contentText === ''}>
        <Icon icon="bi:send-fill" />
      </IconButton>
    </RootStyle>
  );
}

export default BoxSendMessage;
