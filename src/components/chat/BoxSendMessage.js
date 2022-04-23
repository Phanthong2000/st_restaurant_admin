import React, { useState, useRef, useEffect } from 'react';
import { Box, Card, InputBase, Popper, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { keyframes } from '@emotion/react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../assets/api/api';
import { actionChatAddMessage, actionChatUpdateMessage } from '../../redux/actions/chatAction';
import BoxEmoji from './BoxEmoji';
import { actionUserSnackbar } from '../../redux/actions/userAction';
import { storage } from '../../firebase-config';
import {
  deleteInputtingSocket,
  inputtingSocket,
  readMessageSocket,
  sendMessageSocket
} from '../../utils/wssConnection';

const fadeUp = keyframes`
    from {
        transform: translate3d(0,40px,0)
    }

    to {
        transform: translate3d(0,0,0);
        opacity: 1
    }
`;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80px',
  background: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${fadeUp} 1s ease`
}));
const ButtonOption = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '40px',
  background: 'rgba(28,157,234,0.15)',
  marginLeft: '10px',
  cursor: 'pointer'
}));
const IconOption = styled(Icon)(({ theme }) => ({
  width: '20px',
  height: '20px',
  color: '#1c9dea'
}));
const Input = styled(InputBase)(({ theme }) => ({
  width: '80%',
  padding: '0px 20px',
  color: theme.palette.gray,
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily.primary,
  [theme.breakpoints.down('md')]: {
    width: '60%'
  }
}));
const BoxImageFile = styled(Card)(({ theme }) => ({
  width: '300px',
  height: '300px',
  background: theme.palette.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '20px'
}));
const ImageFile = styled('img')(({ theme }) => ({
  width: '290px',
  height: '290px',
  borderRadius: '10px'
}));
const ButtonDeleteFile = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  borderRadius: '35px',
  background: 'red',
  color: theme.palette.white,
  position: 'absolute',
  zIndex: 2,
  top: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));
BoxSendMessage.prototype = {
  index: PropTypes.number
};
function BoxSendMessage({ index }) {
  const { pathname } = useLocation();
  const imageRef = useRef();
  const fileRef = useRef();
  const [contentText, setContentText] = useState('');
  const user = useSelector((state) => state.user.user);
  const [showImage, setShowImage] = useState(false);
  const dispatch = useDispatch();
  const [file, setFile] = useState();
  const [showFile, setShowFile] = useState(false);
  const [image, setImage] = useState();
  const broadcast = useSelector((state) => state.socket.broadcast);
  const [anchorElEmoji, setAnchorElEmoji] = React.useState(null);
  const handleClickEmoji = (event) => {
    setAnchorElEmoji(anchorElEmoji ? null : event.currentTarget);
  };
  const handleCloseEmoji = () => {
    setAnchorElEmoji(null);
  };
  const open = Boolean(anchorElEmoji);
  const [anchorElImage, setAnchorElImage] = React.useState(null);
  const handleClickImage = (event) => {
    setAnchorElImage(event.currentTarget);
  };
  const handleCloseImage = () => {
    setAnchorElImage(null);
  };
  const openImage = Boolean(anchorElImage);
  const [anchorElFile, setAnchorElFile] = React.useState(null);
  const handleClickFile = (event) => {
    setAnchorElFile(event.currentTarget);
  };
  const handleCloseFile = () => {
    setAnchorElFile(null);
  };
  const openFile = Boolean(anchorElFile);
  const handleSend = () => {
    handleCloseEmoji();
    const socketIds = [];
    broadcast.forEach((br) => {
      if (br.type === 'admin' && br.userId !== user.id) {
        socketIds.push(br.socketId);
      }
    });
    deleteInputtingSocket({ socketIds, userInputting: user });
    if (!image && !file && contentText !== '') {
      const message = {
        noiDungText: contentText,
        noiDungFile: '',
        loaiTinNhan: 'text',
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
          setContentText('');
        })
        .catch((err) => console.log(err));
    } else if (image) {
      const message = {
        noiDungText: contentText,
        noiDungFile: '',
        loaiTinNhan: 'image',
        listNguoiQuanLyDaDoc: [],
        listNhanVienDaDoc: [],
        nguoiQuanLy: {
          ...user
        },
        daXoa: false
      };
      dispatch(
        actionChatAddMessage({
          ...message
        })
      );
      handleCloseImage();
      setShowImage(false);
      setImage();
      setContentText('');
      const storageRef = ref(storage, `message/${new Date().getTime()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .post(
                `${api}tinNhan/create`,
                {
                  ...message,
                  noiDungFile: downloadURL
                },
                {
                  headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                  }
                }
              )
              .then((res) => {
                dispatch(
                  actionChatUpdateMessage({
                    message: res.data
                  })
                );
                sendMessageSocket({ socketIds, message: res.data });
              });
          });
        }
      );
    } else if (file) {
      const message = {
        noiDungText: contentText,
        noiDungFile: '',
        loaiTinNhan: 'file',
        listNguoiQuanLyDaDoc: [],
        listNhanVienDaDoc: [],
        nguoiQuanLy: {
          ...user
        },
        daXoa: false
      };
      dispatch(
        actionChatAddMessage({
          ...message
        })
      );
      handleCloseFile();
      setShowFile(false);
      setFile();
      setContentText('');
      const storageRef = ref(storage, `message/${new Date().getTime()}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {},
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            axios
              .post(
                `${api}tinNhan/create`,
                {
                  ...message,
                  noiDungFile: downloadURL
                },
                {
                  headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                  }
                }
              )
              .then((res) => {
                dispatch(
                  actionChatUpdateMessage({
                    message: res.data
                  })
                );
                sendMessageSocket({ socketIds, message: res.data });
              });
          });
        }
      );
    }
  };
  const handleChooseEmoji = (emoji) => {
    setContentText(contentText.concat(emoji.emoji));
  };
  const onChangeImage = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setImage(files[0]);
        setShowImage(true);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Hình ảnh phải nhỏ hơn 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  const onChangeFile = (files) => {
    if (files && files[0]) {
      if (files[0].size < 2097152) {
        setFile(files[0]);
        setShowFile(true);
      } else {
        dispatch(
          actionUserSnackbar({
            status: true,
            content: 'Tệp phải nhỏ hơn 2MB',
            type: 'error'
          })
        );
      }
    }
  };
  const handleDeleteImage = () => {
    handleCloseImage();
    setShowImage(false);
    setImage();
  };
  const handleDeleteFile = () => {
    handleCloseFile();
    setShowFile(false);
    setFile();
  };
  const handleChangeContentText = (text) => {
    if (text !== '' && text.length === 1 && contentText.length === 0) {
      const socketIds = [];
      broadcast.forEach((br) => {
        if (br.type === 'admin' && br.userId !== user.id) {
          socketIds.push(br.socketId);
        }
      });
      inputtingSocket({ socketIds, userInputting: user });
    } else if (text === '') {
      const socketIds = [];
      broadcast.forEach((br) => {
        if (br.type === 'admin' && br.userId !== user.id) {
          socketIds.push(br.socketId);
        }
      });
      deleteInputtingSocket({ socketIds, userInputting: user });
    }
    setContentText(text);
  };
  return (
    <RootStyle>
      <ButtonOption
        onClick={(e) => {
          if (!file) {
            fileRef.current.click();
            handleClickFile(e);
            setShowImage(false);
            setImage();
          }
        }}
      >
        <IconOption icon="ic:baseline-attach-file" />
      </ButtonOption>
      {showFile && (
        <Popper open={openFile} placement="top-start" anchorEl={anchorElFile}>
          <Card
            sx={{
              marginBottom: '20px',
              borderRadius: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              padding: '10px 20px'
            }}
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                border: `1px solid lightgrey`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '35px'
              }}
            >
              <Icon style={{ width: '30px', height: '30px' }} icon="ic:baseline-attach-file" />
            </Box>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginLeft: '10px'
              }}
            >
              {file.name}
            </Typography>
            <ButtonDeleteFile sx={{ width: '25px', height: '25px' }} onClick={handleDeleteFile}>
              <Icon style={{ width: '20px', height: '20px' }} icon="eva:close-outline" />
            </ButtonDeleteFile>
          </Card>
        </Popper>
      )}
      <ButtonOption
        sx={{ background: image && '#1c9dea' }}
        onClick={(e) => {
          if (!image) {
            imageRef.current.click();
            handleClickImage(e);
            setShowFile(false);
            setFile();
          }
        }}
      >
        <IconOption style={{ color: image && '#fff' }} icon="bxs:file-image" />
      </ButtonOption>
      {showImage && (
        <Popper open={openImage} placement="top-start" anchorEl={anchorElImage}>
          <BoxImageFile>
            <ImageFile src={URL.createObjectURL(image)} />
            <ButtonDeleteFile onClick={handleDeleteImage}>
              <Icon style={{ width: '25px', height: '25px' }} icon="eva:close-outline" />
            </ButtonDeleteFile>
          </BoxImageFile>
        </Popper>
      )}
      <Input
        value={contentText}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        onChange={(e) => handleChangeContentText(e.target.value)}
        placeholder="Aa"
        fullWidth
      />
      <ButtonOption onClick={handleClickEmoji}>
        <IconOption icon="carbon:face-add" />
      </ButtonOption>
      <Popper open={open} placement="top-start" anchorEl={anchorElEmoji}>
        <BoxEmoji handleChooseEmoji={handleChooseEmoji} />
      </Popper>
      <ButtonOption
        onClick={handleSend}
        sx={{ cursor: contentText === '' && !image && !file && 'not-allowed' }}
      >
        <IconOption icon="fluent:send-28-filled" />
      </ButtonOption>
      <input
        onClick={(e) => {
          e.target.value = null;
        }}
        accept=".png, .jpg, .jpeg"
        onChange={(e) => onChangeImage(e.target.files)}
        ref={imageRef}
        style={{ display: 'none' }}
        type="file"
      />
      <input
        onClick={(e) => {
          e.target.value = null;
        }}
        onChange={(e) => onChangeFile(e.target.files)}
        ref={fileRef}
        style={{ display: 'none' }}
        type="file"
      />
    </RootStyle>
  );
}

export default BoxSendMessage;
