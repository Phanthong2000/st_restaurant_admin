import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  ListItemButton,
  Popper,
  styled,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { ref } from 'firebase/storage';
import {
  actionChatAddGhimMessage,
  actionChatDeleteMessage,
  actionChatUserHost
} from '../../redux/actions/chatAction';
import api from '../../assets/api/api';
import BoxUserRead from './BoxUserRead';
import { deleteMessageSocket, updateMessageStopMeetingSocket } from '../../utils/wssConnection';
import { actionEmployeeChooseEmployee } from '../../redux/actions/employeeAction';
import { actionUserSnackbar } from '../../redux/actions/userAction';
import { storage } from '../../firebase-config';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px 20px'
}));
const BoxMessageUser = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'end',
  flexDirection: 'row-reverse'
}));
const BoxMessageOther = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'start',
  flexDirection: 'row'
}));
const AvatarSender = styled('img')(({ theme }) => ({
  width: '50px',
  height: '50px',
  borderRadius: '20px'
}));
const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '15x',
  fontFamily: theme.typography.fontFamily.primary,
  color: '#000'
}));
const Time = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontFamily: theme.typography.fontFamily.primary
}));
const MessageUser = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '30px 0px 25px 30px',
  background: '#e5edf5',
  padding: '16px 20px',
  marginTop: '5px'
}));
const MessageOther = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '0px 30px 30px 25px',
  background: '#1c9dea',
  padding: '16px 20px',
  marginTop: '5px'
}));
const ContentText = styled(Typography)(({ theme }) => ({
  color: '#223645',
  fontSize: '14px',
  fontWeight: 'bold'
}));
const BoxInfoMessage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
const MessageImage = styled('img')(({ theme }) => ({
  width: '300px',
  height: '200px',
  borderRadius: '25px'
}));
const ButtonJoin = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  display: 'flex',
  marginTop: '10px',
  alignItems: 'center',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const MessageFile = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));
Message.prototype = {
  message: PropTypes.object,
  index: PropTypes.number
};
function Message({ message, index }) {
  const allGhimMessage = useSelector((state) => state.chat.allGhimMessage);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const broadcast = useSelector((state) => state.socket.broadcast);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleDeleteMessage = () => {
    const socketIds = [];
    broadcast.forEach((br) => {
      if ((br.type === 'admin' || br.type === 'employee') && br.userId !== user.id) {
        socketIds.push(br.socketId);
      }
    });
    axios
      .put(
        `${api}tinNhan/edit`,
        {
          ...message,
          daXoa: true,
          ghim: false
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        }
      )
      .then((res) => {
        dispatch(
          actionChatDeleteMessage({
            index,
            message: res.data
          })
        );
        deleteMessageSocket({ socketIds, message: res.data, index });
      });

    handleClick();
  };
  const goToEmployeeDetail = () => {
    dispatch(actionEmployeeChooseEmployee(message.nhanVien));
    navigate('/home/employee');
  };
  const handleGhimMessage = () => {
    if (allGhimMessage.length === 3) {
      dispatch(
        actionUserSnackbar({
          status: true,
          content: 'Đã có 3 tin nhắn đươc ghim',
          type: 'error'
        })
      );
    } else {
      axios
        .put(
          `${api}tinNhan/edit`,
          {
            ...message,
            ghim: true
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
        .then((res) => {
          dispatch(actionChatAddGhimMessage(res.data));
        });
    }
    handleClick();
  };
  const joinMeeting = () => {
    dispatch(
      actionChatUserHost({
        ...message.nguoiQuanLy
      })
    );
    navigate(`/home/chat/meeting/${message.id}`);
  };
  if (message.loaiTinNhan === 'meeting')
    return (
      <RootStyle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: 3,
              background: '#fff',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Avatar src={message.nguoiQuanLy.anhDaiDien} />
              <Box sx={{ marginLeft: '10px' }}>
                <Username>{message.nguoiQuanLy.hoTen}</Username>
                <ContentText sx={{ color: 'gray' }}>{message.noiDungText}</ContentText>
                {message.daXoa ? (
                  <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: 'red' }}>
                    Đã kết thúc
                  </Typography>
                ) : (
                  <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: '#3fcc35' }}>
                    Đang diễn ra
                  </Typography>
                )}
                <Time>Bắt đầu lúc: {moment(message.createAt).format(`hh:mm A DD/MM/YYYY`)}</Time>
                {!message.daXoa && <ButtonJoin onClick={joinMeeting}>Tham gia</ButtonJoin>}
              </Box>
            </Box>
            <Icon
              style={{ marginLeft: '10px', width: '50px', height: '50px', color: '#000' }}
              icon="uil:meeting-board"
            />
          </Box>
        </Box>
      </RootStyle>
    );
  if (message.nguoiQuanLy && message.nguoiQuanLy.id === user.id)
    return (
      <RootStyle>
        <BoxMessageUser>
          <AvatarSender src={message.nguoiQuanLy.anhDaiDien} />
          <Box sx={{ marginRight: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
              {!message.daXoa && (
                <IconButton onClick={handleClick} sx={{ marginRight: '10px' }}>
                  <Icon
                    style={{ height: '20px', width: '20px' }}
                    icon="entypo:dots-three-horizontal"
                  />
                </IconButton>
              )}
              <Popper open={open} placement="top-end" anchorEl={anchorEl}>
                <Box sx={{ background: '#fff', width: '200px' }}>
                  {allGhimMessage.filter((ghim) => ghim.id === message.id).length > 0 ? (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        padding: '10px 0px',
                        cursor: 'not-allowed'
                      }}
                    >
                      <Icon style={{ color: '#3fcc35' }} icon="bi:pin-angle" />
                      <Typography
                        sx={{
                          marginLeft: '10px',
                          color: '#3fcc35',
                          fontFamily: 'sans-serif',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        Đã Ghim tin nhắn
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      onClick={handleGhimMessage}
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        padding: '10px 0px',
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'lightgrey'
                        }
                      }}
                    >
                      <Icon style={{ color: '#3fcc35' }} icon="bi:pin-angle" />
                      <Typography
                        sx={{
                          marginLeft: '10px',
                          color: '#3fcc35',
                          fontFamily: 'sans-serif',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        Ghim tin nhắn
                      </Typography>
                    </Box>
                  )}
                  <Box
                    onClick={handleDeleteMessage}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      padding: '10px 0px',
                      cursor: 'pointer',
                      '&:hover': {
                        background: 'lightgrey'
                      }
                    }}
                  >
                    <Icon style={{ color: 'red' }} icon="ion:trash-outline" />
                    <Typography
                      sx={{
                        marginLeft: '10px',
                        color: 'red',
                        fontFamily: 'sans-serif',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      Thu hồi tin nhắn
                    </Typography>
                  </Box>
                  <Icon
                    style={{ position: 'absolute', bottom: -10, right: 10, color: '#fff' }}
                    icon="ant-design:caret-down-outlined"
                  />
                </Box>
              </Popper>
              <Username>{message.nguoiQuanLy.hoTen}</Username>
            </Box>
            {message.daXoa ? (
              <MessageUser>
                <ContentText sx={{ color: 'red' }}>Tin nhắn đã thu hồi</ContentText>
              </MessageUser>
            ) : (
              <MessageUser>
                {message.loaiTinNhan === 'image' && message.noiDungFile === '' ? (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <ContentText>{message.noiDungText}</ContentText>
                    </Box>
                    <Icon icon="eos-icons:loading" />
                  </>
                ) : (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <ContentText>{message.noiDungText}</ContentText>
                    </Box>
                    {message.noiDungFile !== '' && message.loaiTinNhan === 'image' && (
                      <MessageImage src={message.noiDungFile} />
                    )}
                    {message.noiDungFile !== '' && message.loaiTinNhan === 'file' && (
                      <MessageFile>
                        <Box
                          sx={{
                            width: '35px',
                            height: '35px',
                            border: `1px solid #000`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '35px'
                          }}
                        >
                          <Icon
                            style={{ width: '30px', height: '30px' }}
                            icon="ic:baseline-attach-file"
                          />
                        </Box>
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '12px',
                            fontFamily: 'sans-serif',
                            marginLeft: '5px'
                          }}
                        >
                          {ref(storage, message.noiDungFile).name.substring(
                            13,
                            ref(storage, message.noiDungFile).name.length
                          )}
                        </Typography>
                      </MessageFile>
                    )}
                  </>
                )}
              </MessageUser>
            )}
            <BoxInfoMessage sx={{ justifyContent: 'end' }}>
              {index === 0 && <BoxUserRead message={message} />}
              <Time>{moment(message.createAt).format(`hh:mm A DD/MM/YYYY`)}</Time>
              <Icon icon="ci:dot-02-s" />
              <Time>QUẢN LÝ</Time>
            </BoxInfoMessage>
          </Box>
        </BoxMessageUser>
      </RootStyle>
    );
  return (
    <RootStyle>
      <BoxMessageOther>
        {message.nguoiQuanLy ? (
          <>
            <IconButton
              sx={{
                cursor: 'default',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start'
              }}
              disableFocusRipple
              disableRipple
              disableTouchRipple
            >
              <AvatarSender src={message.nguoiQuanLy.anhDaiDien} />
              <Icon
                icon="ci:dot-05-xl"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color:
                    broadcast.filter((br) => br.userId === message.nguoiQuanLy.id).length > 0
                      ? '#3fcc35'
                      : 'gray'
                }}
              />
            </IconButton>
            <Box sx={{ marginLeft: '20px' }}>
              <Box sx={{ display: 'flex' }}>
                <Username>{message.nguoiQuanLy.hoTen}</Username>
              </Box>
              {message.daXoa ? (
                <MessageOther sx={{ background: 'lightgrey' }}>
                  <Box sx={{ display: 'flex' }}>
                    <ContentText sx={{ color: 'red' }}>Tin nhắn đã thu hồi</ContentText>
                  </Box>
                </MessageOther>
              ) : (
                <MessageOther>
                  <Box sx={{ display: 'flex' }}>
                    <ContentText sx={{ color: '#fff' }}>{message.noiDungText}</ContentText>
                  </Box>
                  {message.noiDungFile !== '' && message.loaiTinNhan === 'image' && (
                    <MessageImage src={message.noiDungFile} />
                  )}
                  {message.noiDungFile !== '' && message.loaiTinNhan === 'file' && (
                    <MessageFile>
                      <Box
                        sx={{
                          width: '35px',
                          height: '35px',
                          border: `1px solid #fff`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '35px',
                          color: '#fff'
                        }}
                      >
                        <Icon
                          style={{ width: '30px', height: '30px' }}
                          icon="ic:baseline-attach-file"
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '12px',
                          fontFamily: 'sans-serif',
                          marginLeft: '5px',
                          color: '#fff'
                        }}
                      >
                        {ref(storage, message.noiDungFile).name.substring(
                          13,
                          ref(storage, message.noiDungFile).name.length
                        )}
                      </Typography>
                    </MessageFile>
                  )}
                </MessageOther>
              )}
              <BoxInfoMessage>
                <Time>QUẢN LÝ</Time>
                <Icon icon="ci:dot-02-s" />
                <Time>{moment(message.createAt).format(`hh:mm A DD/MM/YYYY`)}</Time>
                {index === 0 && <BoxUserRead message={message} />}
              </BoxInfoMessage>
            </Box>
          </>
        ) : (
          <>
            <IconButton
              onClick={goToEmployeeDetail}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start'
              }}
              disableFocusRipple
              disableRipple
              disableTouchRipple
            >
              <AvatarSender src={message.nhanVien.anhDaiDien} />
              <Icon
                icon="ci:dot-05-xl"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  color:
                    broadcast.filter((br) => br.userId === message.nhanVien.id).length > 0
                      ? '#3fcc35'
                      : 'gray'
                }}
              />
            </IconButton>
            <Box sx={{ marginLeft: '20px' }}>
              <Box sx={{ display: 'flex' }}>
                <Username>{message.nhanVien.hoTen}</Username>
              </Box>
              {message.daXoa ? (
                <MessageOther sx={{ background: 'lightgrey' }}>
                  <Box sx={{ display: 'flex' }}>
                    <ContentText sx={{ color: 'red' }}>Tin nhắn đã thu hồi</ContentText>
                  </Box>
                </MessageOther>
              ) : (
                <MessageOther>
                  <Box sx={{ display: 'flex' }}>
                    <ContentText sx={{ color: '#fff' }}>{message.noiDungText}</ContentText>
                  </Box>
                  {message.noiDungFile !== '' && message.loaiTinNhan === 'image' && (
                    <MessageImage src={message.noiDungFile} />
                  )}
                  {message.noiDungFile !== '' && message.loaiTinNhan === 'file' && (
                    <MessageFile>
                      <Box
                        sx={{
                          width: '35px',
                          height: '35px',
                          border: `1px solid #fff`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '35px',
                          color: '#fff'
                        }}
                      >
                        <Icon
                          style={{ width: '30px', height: '30px' }}
                          icon="ic:baseline-attach-file"
                        />
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '12px',
                          fontFamily: 'sans-serif',
                          marginLeft: '5px',
                          color: '#fff'
                        }}
                      >
                        {ref(storage, message.noiDungFile).name.substring(
                          13,
                          ref(storage, message.noiDungFile).name.length
                        )}
                      </Typography>
                    </MessageFile>
                  )}
                </MessageOther>
              )}
              <BoxInfoMessage>
                <Time>NHÂN VIÊN</Time>
                <Icon icon="ci:dot-02-s" />
                <Time>{moment(message.createAt).format(`hh:mm A DD/MM/YYYY`)}</Time>
                {index === 0 && <BoxUserRead message={message} />}
              </BoxInfoMessage>
            </Box>
          </>
        )}
      </BoxMessageOther>
    </RootStyle>
  );
}

export default Message;
