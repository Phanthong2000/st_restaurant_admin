import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, styled, Typography, Divider, Card, IconButton } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'simple-peer';
import axios from 'axios';
import { actionSocketAddPeer, actionSocketSetPeers } from '../redux/actions/socketAction';
import { stopMeetingSocket, updateMessageStopMeetingSocket } from '../utils/wssConnection';
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
function Video({ peer, userJoin, handleVideoHost }) {
  const userHost = useSelector((state) => state.chat.userHost);
  const VideoMember = styled('video')(({ theme }) => ({
    width: '100%',
    height: '190px'
  }));
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      console.log('stream');
      ref.current.srcObject = stream;
      if (userHost.id === userJoin.id) {
        handleVideoHost(stream);
      }
    });
    //     peer.on('connect', () => {
    //       console.log('connect');
    //     });
    //     peer.on('close', (close) => {
    //       console.log('close', close);
    //     });
    //     peer.on('data', () => {
    //       console.log('daa');
    //     });
    //     peer.on('end', () => {
    //       console.log('end');
    //     });
    //     peer.on('error', (error) => {
    //       console.log('error', error);
    //       //   const allPeersNew = allPeers.filter((peer) => peer.userJoin !== props.userJoin);
    //       //   console.log('new peers', allPeersNew);
    //       //   dispatch(actionSetPeers(allPeersNew));
    //       //   dispatch(
    //       //     actionOpenSnackbar({
    //       //       status: true,
    //       //       content: `${props.userJoin.username} out room`,
    //       //       type: 'success'
    //       //     })
    //       //   );
    //     });
    //     peer.on('pause', () => {
    //       console.log('pause');
    //     });
    //     peer.on('readable', () => {
    //       console.log('readable');
    //     });
    //     peer.on('resume', () => {
    //       console.log('resume');
    //     });
    //     peer.on('track', () => {
    //       console.log('track');
    //     });
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
      <Typography
        sx={{ fontWeight: 'bold', color: 'gray', fontSize: '12px', fontFamily: 'sans-serif' }}
      >
        {userJoin.hoTen}
      </Typography>
      <VideoMember playsInline autoPlay ref={ref} />
    </Box>
  );
}
function Meeting() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [camera, setCamera] = useState(true);
  const userVideo = useRef();
  const hostVideo = useRef();
  const [mic, setMic] = useState(true);
  const socketRef = useRef();
  const socket = useSelector((state) => state.socket.socket);
  const user = useSelector((state) => state.user.user);
  const allPeers = useSelector((state) => state.socket.allPeers);
  const [localStream, setLocalStream] = useState({});
  const userHost = useSelector((state) => state.chat.userHost);
  const peersRef = useRef([]);
  const allPeersRef = useRef();
  const navigate = useNavigate();
  const messageHost = useSelector((state) => state.chat.messageHost);
  const broadcast = useSelector((state) => state.socket.broadcast);
  useEffect(() => {
    socketRef.current = socket;
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true
      })
      .then((stream) => {
        console.log(userHost, user);
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
          });
          console.log('peers', peers);
          dispatch(actionSocketSetPeers(peers));
          allPeersRef.current = peers;
          console.log('all user  all peer allPeers', allPeers);
          console.log('all user peer ref', peersRef.current);
          console.log('all user me', socketRef.current.id);
        });
        socketRef.current.on('user joined', (payload) => {
          console.log('user joined', payload);
          const peer = addPeer(payload.signal, payload.callerID, stream, payload.userJoin);
          peersRef.current.push({
            peerID: payload.callerID,
            peer
          });
          //   setPeers((users) => [...users, peer]);
          dispatch(actionSocketAddPeer(peer));
          allPeersRef.current.push(peer);
          //   dispatch(actionUserHotToast(`${payload.userJoin.username} join room`));
          console.log('user join  all peer ref', allPeersRef.current);
          console.log('user join peer ref', peersRef.current);
          console.log('user join me', socketRef.current.id);
        });

        socketRef.current.on('receiving returned signal', (payload) => {
          console.log('receiving returned signal');
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          console.log('receiving returned peer ref', peersRef.current);
          console.log('receiving returned payload', payload);
          console.log('receiving returned peer', item.peer);
          item.peer.signal(payload.signal);
        });
        socketRef.current.on('stop-meeting', (data) => {
          navigate('/home/app');
          window.location.reload();
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
  return (
    <RootStyle>
      {/* <Scrollbar alwaysShowTracks> */}
      <Grid container sx={{ width: '100%' }}>
        <Grid item sx={{ padding: '10px' }} xs={12} sm={12} md={12} lg={9} xl={9}>
          <BoxVideoGhim>
            <Username>Trưởng phòng - {userHost.hoTen}</Username>
            {/* {userHost.id === user.id ? (
              <VideoGhim muted={!camera} hidden={!mic} ref={hostVideo} autoPlay playsInline />
            ) : (
              <div>cc</div>
            )} */}
            {hostVideo && (
              <VideoGhim muted={!camera} hidden={!mic} ref={hostVideo} autoPlay playsInline />
            )}
          </BoxVideoGhim>
          <BoxOption>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {camera ? (
                <BoxButtonOption>
                  <IconOption icon="bi:camera-video-fill" />
                  <NameOption>Đang bật</NameOption>
                </BoxButtonOption>
              ) : (
                <BoxButtonOption>
                  <IconOption icon="bi:camera-video-off-fill" />
                  <NameOption>Đang tắt</NameOption>
                </BoxButtonOption>
              )}
              {mic ? (
                <BoxButtonOption>
                  <IconOption icon="eva:mic-fill" />
                  <NameOption>Đang bật</NameOption>
                </BoxButtonOption>
              ) : (
                <BoxButtonOption>
                  <IconOption icon="eva:mic-off-fill" />
                  <NameOption>Đang tắt</NameOption>
                </BoxButtonOption>
              )}
            </Box>
            {userHost.id === user.id ? (
              <BoxButtonOption onClick={handleStopMetting}>
                <IconOption icon="bi:stop-circle-fill" />
                <NameOption>Kết thúc</NameOption>
              </BoxButtonOption>
            ) : (
              <BoxButtonOption>
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
                  <VideoUserSmall playsInline autoPlay ref={userVideo} />
                </Box>
                {allPeers.map((peer, index) => (
                  <Video
                    key={index}
                    index={index}
                    peer={peer.peer}
                    userJoin={peer.userJoin}
                    handleVideoHost={handleVideoHost}
                  />
                ))}
              </Scrollbar>
            </Box>
          </BoxPartition>
        </Grid>
      </Grid>
      {/* <Box> </Box>
      </Scrollbar> */}
    </RootStyle>
  );
}

export default Meeting;
