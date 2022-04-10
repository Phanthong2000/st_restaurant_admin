import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  styled,
  Typography,
  TextField
} from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { actionOrderModalPayment } from '../../redux/actions/orderAction';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
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
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%'
}));
const BoxInput = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '20px'
}));
const TitleInput = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  fontFamily: theme.typography.fontFamily.primary
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
const ButtonPay = styled(Button)(({ theme }) => ({
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
ModalPayment.prototype = {
  getTotal: PropTypes.func,
  confirmPayment: PropTypes.func
};

function ModalPayment({ getTotal, confirmPayment }) {
  const modalPayment = useSelector((state) => state.order.modalPayment);
  const [money, setMoney] = useState('');
  const [change, setChange] = useState(0);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      actionOrderModalPayment({
        status: false,
        book: {}
      })
    );
  };
  const handlePayment = () => {
    confirmPayment();
    handleClose();
  };
  const handleChange = (text) => {
    if (text.match(`^[0-9]{0,}$`)) {
      setMoney(text);
      if (parseInt(text, 10) > getTotal() * 0.3) {
        setChange(parseInt(text, 10) - getTotal() * 0.3);
      } else {
        setChange(0);
      }
    }
  };
  return (
    <Modal open={modalPayment.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thanh toán tiền cọc</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <BoxValue>
            <Value>Tổng tiền món ăn</Value>
            <Value>{getTotal().toLocaleString(`es-US`)} vnd</Value>
          </BoxValue>
          <BoxValue>
            <Value>Tiền cọc thanh toán: (30%)</Value>
            <Value>{(getTotal() * 0.3).toLocaleString(`es-US`)} vnd</Value>
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
        </BoxContent>
        <Divider sx={{ margin: '10px 0px' }} />
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <ButtonPay
            disabled={Boolean(parseInt(money, 10) < getTotal() * 0.3 || !money)}
            onClick={handlePayment}
          >
            Thanh toán {(getTotal() * 0.3).toLocaleString(`es-US`)} vnd
          </ButtonPay>
        </Box>
      </BoxModal>
    </Modal>
  );
}

export default ModalPayment;
