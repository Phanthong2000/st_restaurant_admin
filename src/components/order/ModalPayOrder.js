import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { actionOrderModalPayOrder } from '../../redux/actions/orderAction';

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
const ButtonConfirm = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.5, 2),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  marginTop: '10px',
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const Input = styled(TextField)(({ theme }) => ({
  marginTop: '5px'
}));
const BoxValue = styled(Box)(({ theme }) => ({
  wdith: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '10px'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '20px'
}));
function ModalPayOrder({ confirm, getTotal }) {
  const [money, setMoney] = useState('');
  const [change, setChange] = useState(0);
  const modalPayOrder = useSelector((state) => state.order.modalPayOrder);
  const dispatch = useDispatch();
  const handleChange = (text) => {
    if (text.match(`^[0-9]{0,}$`)) {
      setMoney(text);
      if (parseInt(text, 10) > getTotal) {
        setChange(parseInt(text, 10) - getTotal);
      } else {
        setChange(0);
      }
    }
  };
  const handleClose = () => {
    dispatch(actionOrderModalPayOrder(false));
  };
  const handleConfirm = () => {
    confirm();
    handleClose();
  };
  return (
    <Modal open={modalPayOrder} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Xác nhận thanh toán</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center', margin: '20px 0px' }}>
          <BoxValue>
            <Value>Tổng tiền phải thanh toán</Value>
            <Value>{getTotal.toLocaleString(`es-US`)} vnđ</Value>
          </BoxValue>
          <BoxInput>
            <Input
              value={money}
              onChange={(e) => handleChange(e.target.value)}
              fullWidth
              label="Tiền khách hàng trả"
              placeholder="Nhập tiền khách hàng trả"
            />
          </BoxInput>
          <BoxValue>
            <Value>Tiền thối: </Value>
            <Value>{change.toLocaleString(`es-US`)} vnd</Value>
          </BoxValue>
        </Box>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <ButtonConfirm
            disabled={!money || parseInt(money, 10) < getTotal}
            onClick={handleConfirm}
          >
            Xác nhận
          </ButtonConfirm>
        </Box>
      </BoxModal>
    </Modal>
  );
}

export default ModalPayOrder;
