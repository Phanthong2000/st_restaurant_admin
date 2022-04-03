import React, { useEffect } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import axios from 'axios';
import Notification from './Notification';
import {
  actionUserModalFeedback,
  actionUserBoxFeedBack,
  actionUserDeleteBadgeFeedback,
  actionUserDeleteFeedback
} from '../../redux/actions/userAction';
import api from '../../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '400px',
  background: theme.palette.lightgrey,
  position: 'absolute',
  borderRadius: '20px',
  top: 40,
  right: 220,
  padding: theme.spacing(2),
  zIndex: 100,
  [theme.breakpoints.down('sm')]: {
    right: 120
  }
}));
const ArrowToNotification = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  borderRadius: '30px',
  position: 'absolute',
  zIndex: 3,
  right: -20,
  top: 15,
  color: theme.palette.lightgrey
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '500px',
  maxHeight: '500px',
  display: 'flex'
}));
function Feedback({ feedback, index }) {
  const dispatch = useDispatch();
  const chooseFeedback = () => {
    dispatch(
      actionUserModalFeedback({
        status: true,
        feedback
      })
    );
    if (feedback.trangThai === 'Chưa đọc') {
      dispatch(actionUserDeleteBadgeFeedback());
      axios
        .put(`${api}phanHoi/edit`, {
          ...feedback,
          trangThai: 'Đã đọc'
        })
        .then((res) => {
          dispatch(actionUserBoxFeedBack(false));
          dispatch(
            actionUserDeleteFeedback({
              index,
              feedback: res.data
            })
          );
        });
    } else {
      dispatch(actionUserBoxFeedBack(false));
    }
  };
  const Subject = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontFamily: theme.typography.fontFamily.primary
  }));
  const Name = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.gray
  }));
  const IconFeedback = styled(Icon)(({ theme }) => ({
    width: '50px',
    height: '50px',
    color: theme.palette.main
  }));
  return (
    <Box
      onClick={chooseFeedback}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: '5px',
        marginTop: '5px',
        background: '#fff',
        '&:hover': { background: 'lightgrey' },
        borderRadius: '5px'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconFeedback icon="emojione-monotone:e-mail" />
        <Box sx={{ marginLeft: '10px' }}>
          <Subject>
            Tiêu đề: <b>{feedback.tieuDe}</b>
          </Subject>
          <Name>
            Họ tên: <b>{feedback.hoTen}</b>
          </Name>
          <Name>
            Số điện thoại: <b>{feedback.soDienThoai}</b>
          </Name>
          <Name>
            Email: <b>{feedback.email}</b>
          </Name>
        </Box>
      </Box>
      {feedback.trangThai === 'Chưa đọc' && (
        <Icon style={{ color: 'green', width: '30px', height: '30px' }} icon="ci:dot-04-l" />
      )}
    </Box>
  );
}
function BoxFeedback() {
  const dispatch = useDispatch();
  const allFeedbacks = useSelector((state) => state.user.allFeedbacks);
  return (
    <RootStyle boxShadow={3}>
      <ArrowToNotification icon="ant-design:caret-right-filled" />
      <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Phản hồi</Typography>
      <BoxContent>
        <Scrollbar alwaysShowTracks>
          {allFeedbacks.map((item, index) => (
            <Feedback key={index} index={index} feedback={item} />
          ))}
        </Scrollbar>
      </BoxContent>
    </RootStyle>
  );
}

export default BoxFeedback;
