import React, { useEffect, useState } from 'react';
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
  top: 60,
  right: 370,
  padding: theme.spacing(2),
  zIndex: 100,
  [theme.breakpoints.down('md')]: {
    right: 300,
    top: 50
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
        .put(
          `${api}phanHoi/edit`,
          {
            ...feedback,
            trangThai: 'Đã đọc'
          },
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }
        )
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
function ButtonSort({ sort, value, label, handleSort }) {
  const ChipSort = styled(Typography)(({ theme }) => ({
    background: sort === value ? theme.palette.main : theme.palette.white,
    color: sort !== value ? theme.palette.main : theme.palette.white,
    padding: '2px 5px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '12px'
  }));
  return <ChipSort onClick={() => handleSort(value)}>{label}</ChipSort>;
}
function BoxFeedback() {
  const dispatch = useDispatch();
  const allFeedbacks = useSelector((state) => state.user.allFeedbacks);
  const [feedbacks, setFeedbacks] = useState([]);
  const [sort, setSort] = useState('all');
  const sortFeedbacks = (sort) => {
    if (sort === 'all') {
      setFeedbacks(allFeedbacks);
    } else if (sort === 'read') {
      setFeedbacks(allFeedbacks.filter((feedback) => feedback.trangThai === 'Đã đọc'));
    } else {
      setFeedbacks(allFeedbacks.filter((feedback) => feedback.trangThai === 'Chưa đọc'));
    }
  };
  useEffect(() => {
    sortFeedbacks('all');
    return function () {
      return null;
    };
  }, []);
  const handleSort = (value) => {
    sortFeedbacks(value);
    setSort(value);
  };
  return (
    <RootStyle boxShadow={3}>
      <ArrowToNotification icon="ant-design:caret-right-filled" />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Thông báo</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ButtonSort handleSort={handleSort} label="Tất cả" value="all" sort={sort} />
          <ButtonSort handleSort={handleSort} label="Đã đọc" value="read" sort={sort} />
          <ButtonSort handleSort={handleSort} label="Chưa đọc" value="unread" sort={sort} />
        </Box>
      </Box>
      <BoxContent>
        <Scrollbar alwaysShowTracks>
          {feedbacks.map((item, index) => (
            <Feedback key={index} index={index} feedback={item} />
          ))}
        </Scrollbar>
      </BoxContent>
    </RootStyle>
  );
}

export default BoxFeedback;
