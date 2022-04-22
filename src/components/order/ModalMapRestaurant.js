import { Icon } from '@iconify/react';
import { Box, Card, Divider, IconButton, Modal, styled, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionOrderModalMapRestaurant } from '../../redux/actions/orderAction';
import map from '../../assets/images/map_restaurant.png';

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
const Map = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%'
}));
function ModalMapRestaurant() {
  const dispatch = useDispatch();
  const modalMapRestaurant = useSelector((state) => state.order.modalMapRestaurant);
  const handleClose = () => {
    dispatch(actionOrderModalMapRestaurant(false));
  };
  return (
    <Modal onClose={handleClose} open={modalMapRestaurant}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Bản đồ nhà hàng</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <Map src={map} />
      </BoxModal>
    </Modal>
  );
}

export default ModalMapRestaurant;
