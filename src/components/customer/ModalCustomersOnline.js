import React, { useEffect, useState } from 'react';
import { styled, Card, Box, Modal, Typography, IconButton, Divider, Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from '@iconify/react';
import { Scrollbar } from 'smooth-scrollbar-react';
import axios from 'axios';
import api from '../../assets/api/api';
import { actionCustomerModalCustomersOnline } from '../../redux/actions/customerAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  background: theme.palette.lightgrey,
  padding: theme.spacing(2, 2, 2),
  display: 'block'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '400px',
  maxHeight: '400px',
  display: 'flex'
}));
function Customer({ customerId }) {
  const [customer, setCustomer] = useState({});
  const BoxCustomer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid lightgrey`,
    borderRadius: '5px',
    background: theme.palette.white,
    marginBottom: '5px'
  }));
  const AvatarCustomer = styled(Avatar)(({ theme }) => ({
    width: '50px',
    height: '50px',
    outline: `1px solid #fff`
  }));
  const IsOnline = styled(Icon)(({ theme }) => ({
    width: '30px',
    height: '30px',
    color: 'green',
    position: 'absolute',
    right: 0,
    bottom: 0
  }));
  const Username = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily.primary
  }));
  const Phone = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '12px',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary
  }));
  const getCustomer = async () => {
    const data = await axios.get(`${api}khachHang/detail/${customerId}`);
    setCustomer(data.data);
  };
  useEffect(() => {
    if (customerId) getCustomer();
    return function () {
      return null;
    };
  }, []);
  return (
    <BoxCustomer>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton disabled>
          <AvatarCustomer src={customer.anhDaiDien} />
          <IsOnline icon="ci:dot-04-l" />
        </IconButton>
        <Box sx={{ marginLeft: '10px' }}>
          <Username>{customer.hoTen}</Username>
          <Phone> SĐT: {customer.soDienThoai}</Phone>
        </Box>
      </Box>
    </BoxCustomer>
  );
}
function ModalCustomersOnline() {
  const modalCustomersOnline = useSelector((state) => state.customer.modalCustomersOnline);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      actionCustomerModalCustomersOnline({
        status: false,
        customers: []
      })
    );
  };
  return (
    <Modal open={modalCustomersOnline.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Danh sách khách hàng đang hoạt động ({modalCustomersOnline.customers.length})
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar alwaysShowTracks>
            {modalCustomersOnline.customers.map((item, index) => (
              <Customer key={index} customerId={item} />
            ))}
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalCustomersOnline;
