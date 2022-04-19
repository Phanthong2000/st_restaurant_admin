import React, { useState } from 'react';
import { Box, IconButton, styled, Tooltip, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../assets/api/api';
import {
  actionChatAddMessage,
  actionChatMessageHost,
  actionChatUserHost
} from '../../redux/actions/chatAction';
import { sendMessageSocket } from '../../utils/wssConnection';

const fadeDown = keyframes`
from {
  opacity: 0;
  transform: translateY(-20px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;
const RootStyle = styled(Box)(({ theme }) => ({
  height: '80px',
  background: theme.palette.white,
  display: 'flex',
  position: 'absolute',
  width: '60%',
  left: '20%',
  top: 20,
  zIndex: 10,
  alignItems: 'center',
  animation: `${fadeDown} 1s ease`,
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '80%',
    left: '10%'
  }
}));
const AvatarChat = styled('img')(({ theme }) => ({
  width: '60px',
  height: '60px',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.main}`
}));
const RestaurantName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary,
  color: '#000'
}));
const Restaurant = styled(Typography)(({ theme }) => ({
  padding: '2px 10px',
  color: theme.palette.white,
  background: '#3fcc35',
  fontSize: '12px',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  borderRadius: '20px'
}));
const BoxButton = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  borderRadius: '35px',
  color: theme.palette.main,
  background: '#eff1f2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  ':hover': {
    background: '#eff7fe'
  },
  marginRight: '10px'
}));
const ButtonIcon = styled(Icon)(({ theme }) => ({
  width: '20px',
  height: '20px'
}));
const BoxButtonHidden = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  background: theme.palette.white,
  position: 'absolute',
  zIndex: 10,
  top: 20,
  left: `calc(50% - 25px)`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: theme.palette.main,
  animation: `${fadeDown} 1s ease`
}));
BoxInfoChat.prototype = {
  handleShowGhim: PropTypes.func
};
function BoxInfoChat({ handleShowGhim }) {
  const user = useSelector((state) => state.user.user);
  const broadcast = useSelector((state) => state.socket.broadcast);
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const handleShow = (show) => {
    setShow(show);
  };
  const handleCreateMeeting = () => {
    const socketIds = [];
    broadcast.forEach((br) => {
      if (br.type === 'admin' && br.userId !== user.id) {
        socketIds.push(br.socketId);
      }
    });
    const message = {
      noiDungText: 'Đã tạo phòng họp',
      noiDungFile: '',
      loaiTinNhan: 'meeting',
      listNguoiQuanLyDaDoc: [],
      listNhanVienDaDoc: [],
      ghim: false,
      nguoiQuanLy: {
        ...user
      },
      daXoa: false
    };
    axios
      .post(
        `${api}tinNhan/create`,
        {
          ...message
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        dispatch(actionChatAddMessage(res.data));
        sendMessageSocket({ socketIds, message: res.data });
        dispatch(actionChatUserHost({ ...user }));
        dispatch(actionChatMessageHost(res.data));
        navigate(`/home/chat/meeting/${res.data.id}`);
      })
      .catch((err) => console.log(err));
  };
  if (!show)
    return (
      <BoxButtonHidden onClick={() => handleShow(true)} sx={{ boxShadow: 1 }}>
        <Tooltip title="Mở rộng">
          <Icon icon="ant-design:fullscreen-outlined" />
        </Tooltip>
      </BoxButtonHidden>
    );
  return (
    <RootStyle sx={{ boxShadow: 1 }}>
      <Box sx={{ display: 'flex', alginItems: 'center' }}>
        <IconButton sx={{ cursor: 'default' }} disableFocusRipple disableRipple disableTouchRipple>
          <Icon
            icon="ci:dot-05-xl"
            style={{ position: 'absolute', top: 0, right: 0, color: '#3fcc35' }}
          />
          <AvatarChat src="https://media.istockphoto.com/vectors/restaurant-staff-set-vector-id1184938346?k=20&m=1184938346&s=170667a&w=0&h=gHjJl5zCEhCOW5PNsdO6oHeOQdYhoFNZSOctHI7l2oA=" />
        </IconButton>
        <Box
          sx={{
            marginLeft: '10px',
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column'
          }}
        >
          <RestaurantName>ST Restaurant</RestaurantName>
          <Box sx={{ display: 'flex' }}>
            <Restaurant>Nhà hàng</Restaurant>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <BoxButton>
          <ButtonIcon icon="jam:search" />
        </BoxButton>
        <BoxButton onClick={handleCreateMeeting}>
          <Tooltip title="Tạo phòng họp">
            <ButtonIcon icon="fluent:meet-now-48-filled" />
          </Tooltip>
        </BoxButton>
        <BoxButton
          onClick={() => {
            setShow(false);
            handleShowGhim(true);
          }}
        >
          <Tooltip title="Xem tin nhắn ghim">
            <ButtonIcon icon="entypo:pin" />
          </Tooltip>
        </BoxButton>
        <BoxButton onClick={() => handleShow(false)}>
          <Tooltip title="Thu nhỏ">
            <ButtonIcon icon="ant-design:fullscreen-exit-outlined" />
          </Tooltip>
        </BoxButton>
      </Box>
    </RootStyle>
  );
}

export default BoxInfoChat;
