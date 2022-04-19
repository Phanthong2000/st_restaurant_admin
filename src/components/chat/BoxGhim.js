import { Avatar, Box, Card, IconButton, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { keyframes } from '@emotion/react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { actionChatDeleteGhimMessage } from '../../redux/actions/chatAction';
import api from '../../assets/api/api';

const fadeLeft = keyframes`
from {
  opacity: 0;
  transform: translateX(40px);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;
const fadeRightHidden = keyframes`
from {
  transform: scale(1);
}
to {
  transform: scale(0);
}
`;
const RootStyle = styled(Card)(({ theme }) => ({
  width: '30%',
  top: 110,
  right: 30,
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  zIndex: 10,
  background: theme.palette.white,
  animation: `${fadeLeft} 1s ease`,
  padding: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '50%',
    right: 10
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily
}));
function Ghim({ ghim, index }) {
  const dispatch = useDispatch();
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    justifyContent: 'space-between'
  }));
  const Username = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '14px',
    fontFamily: theme.palette.primary,
    display: 'flex'
  }));
  const ContentText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily.primary,
    display: 'flex'
  }));
  const Time = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    color: theme.palette.gray,
    textTransform: 'uppercase',
    fontFamily: theme.typography.fontFamily.primary
  }));
  const checkContentText = () => {
    if (ghim.noiDungText.length > 20) return `${ghim.noiDungText.substring(0, 20)} ...`;
    return `${ghim.noiDungText}`;
  };
  const handleDeleteGhim = () => {
    axios
      .put(
        `${api}tinNhan/edit`,
        {
          ...ghim,
          ghim: false
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(
          actionChatDeleteGhimMessage({
            index
          })
        );
      });
  };
  return (
    <Wrapper>
      <Box sx={{ display: 'flex' }}>
        <Avatar src={ghim.nguoiQuanLy.anhDaiDien} />
        <Box
          sx={{
            marginLeft: '10px'
          }}
        >
          <Username>{ghim.nguoiQuanLy.hoTen}</Username>
          <ContentText>{checkContentText()}</ContentText>
          {ghim.noiDungFile !== '' && <ContentText>[Hình ảnh]</ContentText>}
          <Time>{moment(ghim.createAt).format(`hh:mm a DD/MM/YYYY`)}</Time>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={handleDeleteGhim}>
          <Icon style={{ color: 'red' }} icon="fluent:pin-off-16-filled" />
        </IconButton>
      </Box>
    </Wrapper>
  );
}
BoxGhim.prototype = {
  handleShowGhim: PropTypes.func
};
function BoxGhim({ handleShowGhim }) {
  const allGhimMessage = useSelector((state) => state.chat.allGhimMessage);
  const [hidden, setHidden] = useState(false);
  return (
    <RootStyle sx={{ animation: hidden && `${fadeRightHidden} 2s ease` }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title>Tin nhắn ghim</Title>
        <IconButton
          onClick={() => {
            setHidden(true);
            setTimeout(() => {
              handleShowGhim(false);
            }, 2000);
          }}
        >
          <Icon style={{ color: 'red' }} icon="ant-design:close-square-filled" />
        </IconButton>
      </Box>
      {allGhimMessage.length === 0 ? (
        <Typography sx={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
          Không có tin nhắn đc ghim
        </Typography>
      ) : (
        <Box>
          {allGhimMessage.map((item, index) => (
            <Ghim key={index} index={index} ghim={item} />
          ))}
        </Box>
      )}
    </RootStyle>
  );
}

export default BoxGhim;
