import { Icon } from '@iconify/react';
import { Box, Card, Divider, IconButton, Modal, styled, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionUserModalFeedback } from '../../redux/actions/userAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  background: '#fff',
  padding: theme.spacing(2, 2, 2),
  display: 'block',
  [theme.breakpoints.down('sm')]: {
    width: '500px'
  }
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxInfo = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  marginTop: '10px'
}));
const Title = styled(Typography)(({ theme }) => ({
  width: '20%'
}));
const Information = styled(Typography)(({ theme }) => ({
  width: '75%',
  fontSize: '16px',
  fontWeight: 'bold'
}));
function ModalFeedback() {
  const dispatch = useDispatch();
  const modalFeedback = useSelector((state) => state.user.modalFeedback);
  const handleClose = () => {
    dispatch(
      actionUserModalFeedback({
        status: false,
        feedback: {}
      })
    );
  };
  return (
    <Modal open={modalFeedback.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Nội dung phản hồi</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxInfo>
          <Title>Tiêu đề</Title>
          <Information>{modalFeedback.feedback.tieuDe}</Information>
        </BoxInfo>
        <BoxInfo>
          <Title>Họ và tên</Title>
          <Information>{modalFeedback.feedback.hoTen}</Information>
        </BoxInfo>
        <BoxInfo>
          <Title>Số điện thoại</Title>
          <Information>{modalFeedback.feedback.soDienThoai}</Information>
        </BoxInfo>
        <BoxInfo>
          <Title>Email</Title>
          <Information>{modalFeedback.feedback.email}</Information>
        </BoxInfo>
        <BoxInfo>
          <Title>Nội dung</Title>
          <Information>{modalFeedback.feedback.noiDung}</Information>
        </BoxInfo>
      </BoxModal>
    </Modal>
  );
}

export default ModalFeedback;
