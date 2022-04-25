import { styled, Box, Typography, Avatar } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { actionChatBoxChatMeeting } from '../../../redux/actions/chatAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px'
}));
const BoxMessageUser = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'end'
}));
const BoxMessageOther = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center'
}));
const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  fontFamily: theme.typography.fontFamily.primary
}));
const MessageUser = styled(Typography)(({ theme }) => ({
  padding: '5px 10px',
  borderRadius: '20px',
  background: '#e5edf5',
  display: 'flex',
  justifyContent: 'end'
}));
const MessageOther = styled(Typography)(({ theme }) => ({
  padding: '5px 10px',
  borderRadius: '20px',
  background: '#1c9dea',
  color: theme.palette.white
}));
const Time = styled(Typography)(({ theme }) => ({
  color: theme.palette.gray,
  fontSize: '12px'
}));
Message.prototype = {
  message: PropTypes.object
};
function Message({ message }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  if (message.sender.id === user.id)
    return (
      <RootStyle>
        <BoxMessageUser>
          <Box>
            <Username sx={{ width: '100%', textAlign: 'right' }}>{message.sender.hoTen}</Username>
            <MessageUser>{message.contentText}</MessageUser>
            <Time>{moment(message.createAt).format(`hh:mm A DD/MM/YYYY`)}</Time>
          </Box>
        </BoxMessageUser>
      </RootStyle>
    );
  return (
    <RootStyle>
      <BoxMessageOther>
        <Avatar sx={{ width: '30px', height: '30px' }} src={message.sender.anhDaiDien} />
        <Box sx={{ marginLeft: '10px' }}>
          <Username>{message.sender.hoTen}</Username>
          <MessageOther>{message.contentText}</MessageOther>
          <Time>{moment(message.createAt).format(`hh:mm A DD/MM/YYYY`)}</Time>
        </Box>
      </BoxMessageOther>
    </RootStyle>
  );
}

export default Message;
