/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Peer from 'simple-peer';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Popper,
  styled,
  Typography
} from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import { Scrollbar } from 'smooth-scrollbar-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionSocketAddPeer,
  actionSocketSetPeers,
  actionSocketTurnOffAudioRoom,
  actionSocketTurnOffVideoRoom,
  actionSocketTurnOnAudioRoom,
  actionSocketTurnOnVideoRoom
} from '../redux/actions/socketAction';
import { stopMeetingSocket, updateMessageStopMeetingSocket } from '../utils/wssConnection';
import { actionChatAddMessageMeeting, actionChatBoxChatMeeting } from '../redux/actions/chatAction';
import BoxChat from '../components/chat/meeting/BoxChat';
import { actionUserSnackbar } from '../redux/actions/userAction';
import api from '../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f5f4',
  minHeight: '100%'
}));
const BoxVideoGhim = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  height: 'calc(100% - 100px)',
  display: 'flex',
  flexDirection: 'column'
}));
const BoxOption = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  display: 'flex',
  height: '80px',
  marginTop: '20px',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const Username = styled(Typography)(({ theme }) => ({
  padding: '3px 5px',
  fontWeight: 'bold',
  fontSize: '12px',
  fontFamily: theme.typography.fontFamily.primary
}));
const VideoGhim = styled('video')(({ theme }) => ({
  width: '100%',
  height: '450px',
  background: '#000'
}));
const BoxPartition = styled(Box)(({ theme }) => ({
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  maxHeight: '100%',
  minHeight: '100%',
  padding: '10px 5px'
}));
const BoxButtonOption = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '5px',
  border: `1px solid lightgrey`,
  padding: '5px',
  marginLeft: '10px',
  cursor: 'pointer'
}));
const IconOption = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  color: theme.palette.black
}));
const NameOption = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  color: theme.palette.black,
  fontFamily: theme.typography.fontFamily.primary
}));
const VideoUserSmall = styled('video')(() => ({
  width: '100%',
  height: '190px'
}));
function Video(props) {
  const turnOffVideoRoom = useSelector((state) => state.socket.turnOffVideoRoom);
  const turnOffAudioRoom = useSelector((state) => state.socket.turnOffAudioRoom);
  const ref = useRef();

  useEffect(() => {
    props.peer.on('stream', (stream) => {
      console.log('stream');
      ref.current.srcObject = stream;
      if (props.userHost.id === props.userJoin.id) {
        props.handleVideoHost(stream);
      }
    });
    props.peer.on('connect', () => {
      console.log('connect');
    });
    props.peer.on('close', () => {
      console.log('close');
    });
    // props.peer.on('data', () => {
    //   console.log('daa');
    // });
    props.peer.on('end', () => {
      console.log('end');
    });
    props.peer.on('error', (error) => {
      console.log('error', error);
      //   const allPeersNew = allPeers.filter((peer) => peer.userJoin !== props.userJoin);
      //   console.log('new peers', allPeersNew);
      //   dispatch(actionSetPeers(allPeersNew));
      //   dispatch(
      //     actionOpenSnackbar({
      //       status: true,
      //       content: `${props.userJoin.username} out room`,
      //       type: 'success'
      //     })
      //   );
    });
    props.peer.on('pause', () => {
      console.log('pause');
    });
    // props.peer.on('readable', () => {
    //   console.log('readable');
    // });
    props.peer.on('resume', () => {
      console.log('resume');
    });
    props.peer.on('track', () => {
      console.log('track');
    });
    props.peer.on('signal', (signal) => {
      console.log('signal', signal, props.index);
    });
    return function () {
      return null;
    };
  }, []);
  return (
    <Box
      sx={{
        width: '100%',
        border: `1px solid lightgrey`,
        borderRadius: '5px',
        padding: '5px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          display: 'flex'
        }}
      >
        <Typography
          sx={{ fontWeight: 'bold', color: 'gray', fontSize: '12px', fontFamily: 'sans-serif' }}
        >
          {props.userJoin.hoTen}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {turnOffVideoRoom.includes(props.userJoin.id) ? (
            <Icon icon="bi:camera-video-off-fill" />
          ) : (
            <Icon icon="bi:camera-video-fill" />
          )}
          {turnOffAudioRoom.includes(props.userJoin.id) ? (
            <Icon icon="eva:mic-off-fill" />
          ) : (
            <Icon icon="eva:mic-fill" />
          )}
        </Box>
      </Box>

      <video
        hidden={turnOffVideoRoom.includes(props.userJoin.id)}
        muted={turnOffAudioRoom.includes(props.userJoin.id)}
        style={{ width: '100%', height: '190px' }}
        playsInline
        autoPlay
        ref={ref}
      />
    </Box>
  );
}
function Meeting2() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const socket = useSelector((state) => state.socket.socket);
  const { roomId } = useParams();
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const dispatch = useDispatch();
  const allPeers = useSelector((state) => state.socket.allPeers);
  const socketRef = useRef();
  const allPeersRef = useRef();
  const [camera, setCamera] = useState(true);
  const hostVideo = useRef();
  const [mic, setMic] = useState(true);
  const messageHost = useSelector((state) => state.chat.messageHost);
  const userHost = useSelector((state) => state.chat.userHost);
  const broadcast = useSelector((state) => state.socket.broadcast);
  const me = useSelector((state) => state.socket.me);
  const turnOffVideoRoom = useSelector((state) => state.socket.turnOffVideoRoom);
  const turnOffAudioRoom = useSelector((state) => state.socket.turnOffAudioRoom);
  const [localStream, setLocalStream] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const broadcastRoomRef = useRef([]);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  useEffect(() => {
    socketRef.current = socket;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true
      })
      .then((stream) => {
        setLocalStream(stream);
        userVideo.current.srcObject = stream;
        if (userHost.id === user.id) hostVideo.current.srcObject = stream;
        socketRef.current.emit('join room', { roomId, userJoin: user });
        socketRef.current.on('all users', (data) => {
          console.log('all user', data);
          const peers = [];
          data.users.forEach((userID) => {
            const peer = createPeer(userID.socketId, socketRef.current.id, stream, data.userJoin);
            peersRef.current.push({
              peerID: userID.socketId,
              peer
            });
            peers.push({
              peer,
              userJoin: userID.userJoin
            });
            broadcastRoomRef.current.push({
              socketId: userID.socketId,
              userJoin: userID.userJoin
            });
          });
          setPeers(peers);
          dispatch(actionSocketSetPeers(peers));
          allPeersRef.current = peers;
          console.log('all user  all peer ref', allPeersRef.current);
          console.log('all user peer ref', peersRef.current);
          console.log('all user me', socketRef.current.id);
        });
        socketRef.current.on('user joined', (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream, payload.userJoin);
          peersRef.current.push({
            peerID: payload.callerID,
            peer
          });
          broadcastRoomRef.current.push({
            socketId: payload.callerID,
            userJoin: payload.userJoin
          });
          setPeers((users) => [...users, peer]);
          dispatch(actionSocketAddPeer(peer));
          allPeersRef.current.push(peer);
          console.log('user join  all peer ref', allPeersRef.current);
          console.log('user join peer ref', peersRef.current);
          console.log('user join me', socketRef.current.id);
        });

        socketRef.current.on('receiving returned signal', (payload) => {
          // const item = peersRef.current.find((p) => p.peerID === payload.id);
          const item = peersRef.current
            .filter((p) => p.peerID === payload.id)
            .at(peersRef.current.filter((p) => p.peerID === payload.id).length - 1);
          console.log('receiving returned peer ref', peersRef.current);
          console.log('receiving returned payload', payload);
          console.log('receiving returned peer', item.peer);
          item.peer.signal(payload.signal);
        });
        socketRef.current.on('out-room-other', (data) => {
          const allPeersNew = allPeersRef.current.filter(
            (peer) => peer.userJoin.id !== data.userJoin.id
          );
          allPeersRef.current = allPeersNew;
          dispatch(actionSocketSetPeers(allPeersNew));
          const peersRefNew = peersRef.current.filter((peer) => peer.peerID !== data.socketId);
          peersRef.current = peersRefNew;
          dispatch(
            actionUserSnackbar({
              status: true,
              content: `${data.userJoin.hoTen} out room`,
              type: 'success'
            })
          );
        });
        socketRef.current.on('stop-meeting', (data) => {
          navigate('/home/app');
          window.location.reload();
        });
        socketRef.current.on('send-message-meeting', (data) => {
          dispatch(actionChatAddMessageMeeting(data.message));
        });
        socketRef.current.on('turn off video room', (data) => {
          dispatch(actionSocketTurnOffVideoRoom(data));
        });
        socketRef.current.on('turn on video room', (data) => {
          dispatch(actionSocketTurnOnVideoRoom(data));
        });
        socketRef.current.on('turn off audio room', (data) => {
          dispatch(actionSocketTurnOffAudioRoom(data));
        });
        socketRef.current.on('turn on audio room', (data) => {
          dispatch(actionSocketTurnOnAudioRoom(data));
        });
        socketRef.current.on('share-screen', (data) => {
          console.log('share-screen', peersRef.current, data);
          const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: userVideo.current.srcObject
          });
          // peersRef.current.push({
          //   peerID: data.socketId,
          //   peer
          // });
          // dispatch(actionSocketAddPeer({ peer, userJoin: data.userJoin }));
          allPeersRef.current.push(peer);
          peer.on('signal', (signal) => {
            socketRef.current.emit('returning share-screen', { signal, callerID: data.socketId });
          });

          peer.signal(data.signal);
        });
        socketRef.current.on('receiving returned share-screen', (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          console.log('receiving returned share-screen peer ref', peersRef.current);
          console.log('receiving returned share-screen payload', payload);
          console.log('receiving returned share-screen peer', item.peer.peer);
          item.peer.peer.signal(payload.signal);
        });
      });
    return function () {
      if (userHost.id === user.id) {
        const socketIds = [];
        broadcast.forEach((br) => {
          if (br.type === 'admin' && br.userId !== user.id) {
            socketIds.push(br.socketId);
          }
        });
        updateMessageStopMeetingSocket({ socketIds, message: { ...messageHost, daXoa: true } });
        axios
          .put(
            `${api}tinNhan/edit`,
            {
              ...messageHost,
              daXoa: true
            },
            {
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
              }
            }
          )
          .then((res) => {
            handleStopMetting();
            window.location.reload();
          });
      }
    };
  }, []);
  function createPeer(userToSignal, callerID, stream, userJoin) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('sending signal', {
        userToSignal,
        callerID,
        signal,
        userJoin
      });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream, userJoin) {
    console.log('add peers', userVideo.current.srcObject);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: userVideo.current.srcObject
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return {
      peer,
      userJoin
    };
  }
  const handleVideoHost = (stream) => {
    hostVideo.current.srcObject = stream;
  };
  const handleStopMetting = () => {
    stopMeetingSocket(roomId);
  };
  const handleOutRoom = () => {
    socketRef.current.emit('expel-member', { roomId, socketId: me, userJoin: user });
    navigate('/home/app');
    window.location.reload();
  };
  const turnOnAudio = () => {
    socketRef.current.emit('turn on audio room', { roomId, userTurnOn: user.id });
    setMic(true);
  };
  const turnOffAudio = () => {
    socketRef.current.emit('turn off audio room', { roomId, userTurnOff: user.id });
    setMic(false);
  };
  const turnOnVideo = () => {
    socketRef.current.emit('turn on video room', { roomId, userTurnOn: user.id });
    setCamera(true);
  };
  const turnOffVideo = () => {
    socketRef.current.emit('turn off video room', { roomId, userTurnOff: user.id });
    setCamera(false);
  };
  const handleShareScreen = () => {
    console.log(peersRef.current.at(0).peer.peer);
    navigator.mediaDevices
      .getDisplayMedia({
        video: 'true',
        audio: true
      })
      .then((stream) => {
        console.log('new', stream);
        // localStream.removeTrack(localStream.getVideoTracks().at(0));
        // localStream.addTrack(stream.getVideoTracks().at(0));
        localStream.getTracks().forEach((track) => {
          track.stop();
        });
        userVideo.current.srcObject = stream;
        hostVideo.current.srcObject = stream;
        const peers = [];
        broadcastRoomRef.current.forEach((br) => {
          const peer = createPeer(br.socketId, me, stream, user);
          peers.push({
            peer,
            userJoin: br.userJoin
          });
        });
        allPeersRef.current = peers;
        dispatch(actionSocketSetPeers(peers));
        // const peer = new Peer({
        //   initiator: true,
        //   trickle: false,
        //   stream: localStream
        // });
        // peer.on('signal', (signal) => {
        //   socketRef.current.emit('share-screen', {
        //     roomId,
        //     socketId: me,
        //     signal,
        //     userJoin: user
        //   });
        // });

        // peersRef.current.at(0).peer.peer;
      });
  };
  return (
    <RootStyle>
      <Grid container sx={{ width: '100%' }}>
        <Grid item sx={{ padding: '10px' }} xs={12} sm={12} md={12} lg={9} xl={9}>
          <BoxVideoGhim>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Username>Trưởng phòng - {userHost.hoTen}</Username>
            </Box>
            {hostVideo && (
              <VideoGhim
                hidden={turnOffVideoRoom.includes(userHost.id)}
                muted={turnOffAudioRoom.includes(userHost.id)}
                ref={hostVideo}
                autoPlay
                playsInline
              />
            )}
          </BoxVideoGhim>
          <BoxOption>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {camera ? (
                <BoxButtonOption onClick={turnOffVideo}>
                  <IconOption icon="bi:camera-video-fill" />
                  <NameOption>Đang bật</NameOption>
                </BoxButtonOption>
              ) : (
                <BoxButtonOption onClick={turnOnVideo}>
                  <IconOption icon="bi:camera-video-off-fill" />
                  <NameOption>Đang tắt</NameOption>
                </BoxButtonOption>
              )}
              {mic ? (
                <BoxButtonOption onClick={turnOffAudio}>
                  <IconOption icon="eva:mic-fill" />
                  <NameOption>Đang bật</NameOption>
                </BoxButtonOption>
              ) : (
                <BoxButtonOption onClick={turnOnAudio}>
                  <IconOption icon="eva:mic-off-fill" />
                  <NameOption>Đang tắt</NameOption>
                </BoxButtonOption>
              )}
              <BoxButtonOption onClick={handleClick}>
                <IconOption icon="bi:chat-left-fill" />
                <NameOption>Nhắn tin</NameOption>
              </BoxButtonOption>
              <Popper placement="top-start" open={open} anchorEl={anchorEl}>
                <BoxChat />
              </Popper>
              {userHost.id === user.id && (
                <BoxButtonOption onClick={handleShareScreen}>
                  <IconOption icon="fluent:projection-screen-28-filled" />
                  <NameOption>Màn hình</NameOption>
                </BoxButtonOption>
              )}
            </Box>
            {userHost.id === user.id ? (
              <BoxButtonOption onClick={handleStopMetting}>
                <IconOption icon="bi:stop-circle-fill" />
                <NameOption>Kết thúc</NameOption>
              </BoxButtonOption>
            ) : (
              <BoxButtonOption onClick={handleOutRoom}>
                <IconOption icon="icomoon-free:exit" />
                <NameOption>Rời phòng</NameOption>
              </BoxButtonOption>
            )}
          </BoxOption>
        </Grid>
        <Grid item sx={{ padding: '10px' }} xs={12} sm={12} md={12} lg={3} xl={3}>
          <BoxPartition>
            <Typography
              sx={{
                padding: '3px 5px',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'sans-serif'
              }}
            >
              Người tham gia
            </Typography>
            <Divider sx={{ marginTop: '5px' }} />
            <Box sx={{ display: 'flex', maxHeight: '540px' }}>
              <Scrollbar alwaysShowTracks>
                <Box
                  sx={{
                    width: '100%',
                    border: `1px solid lightgrey`,
                    borderRadius: '5px',
                    padding: '5px'
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      color: 'gray',
                      fontSize: '12px',
                      fontFamily: 'sans-serif'
                    }}
                  >
                    {user.hoTen}
                  </Typography>
                  <VideoUserSmall
                    muted={!mic}
                    hidden={!camera}
                    playsInline
                    autoPlay
                    ref={userVideo}
                  />
                </Box>
                {allPeers.map((peer, index) => (
                  <Video
                    key={index}
                    index={index}
                    peer={peer.peer}
                    userJoin={peer.userJoin}
                    userHost={userHost}
                    handleVideoHost={handleVideoHost}
                  />
                ))}
              </Scrollbar>
            </Box>
          </BoxPartition>
        </Grid>
      </Grid>
    </RootStyle>
  );
}

export default Meeting2;
