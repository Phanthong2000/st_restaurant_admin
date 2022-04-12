import React from 'react';
import { Avatar, Box, Card, Divider, IconButton, Modal, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { Scrollbar } from 'smooth-scrollbar-react';
import { actionFoodModalUserLove } from '../../redux/actions/foodAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  background: theme.palette.lightgrey,
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
const FoodName = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxContent = styled(Box)(({ theme }) => ({
  maxHeight: '500px',
  width: '100%',
  display: 'flex'
}));
function UserLove({ user }) {
  const BoxUserLove = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.white,
    borderRadius: '5px',
    marginTop: '5px'
  }));
  const AvatarUser = styled(Avatar)(() => ({
    width: '50px',
    height: '50px'
  }));
  const Username = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily.primary
  }));
  const Phone = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '14px',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary
  }));
  return (
    <BoxUserLove>
      <AvatarUser src={user.anhDaiDien} />
      <Box sx={{ marginLeft: '10px' }}>
        <Username>{user.hoTen}</Username>
        <Phone>SĐT: {user.soDienThoai}</Phone>
      </Box>
    </BoxUserLove>
  );
}
function ModalUserLove() {
  const modalUserLove = useSelector((state) => state.food.modalUserLove);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      actionFoodModalUserLove({
        status: false,
        food: {}
      })
    );
  };
  return (
    <Modal open={modalUserLove.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Danh sách khách hàng yêu thích món ăn
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <FoodName>Tên món ăn: {modalUserLove.food.tenMonAn}</FoodName>
        <BoxContent>
          <Scrollbar alwaysShowTracks>
            {modalUserLove.food.listKhachHangThichMonAn.map((item, index) => (
              <UserLove key={index} user={item} />
            ))}
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalUserLove;
