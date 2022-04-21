import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  Radio,
  styled,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { actionTableModalEditTable } from '../../redux/actions/tableActions';
import api from '../../assets/api/api';

const BoxModal = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  background: '#fff',
  padding: theme.spacing(2, 2, 2),
  display: 'block',
  textAlign: 'center',
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
const ImageTable = styled('img')(({ theme }) => ({
  width: '300px',
  height: '200px'
}));
const Input = styled(TextField)(({ theme }) => ({
  marginTop: '10px'
}));
const ButtonAdd = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  width: '100%',
  marginTop: '20px',
  color: theme.palette.white,
  background: theme.palette.main,
  ':hover': {
    background: theme.palette.mainHover
  }
}));
ModalEditTable.prototype = {
  edit: PropTypes.func
};
function ModalEditTable({ edit }) {
  const modalEditTable = useSelector((state) => state.table.modalEditTable);
  const dispatch = useDispatch();
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [quantity, setQuantity] = useState(-1);
  const [type, setType] = useState('');
  const getQuantityTableInArea = async () => {
    const res = await axios.get(`${api}ban/list/khuVuc/${modalEditTable.table.khuVuc.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    setQuantity(res.data.length);
  };
  useEffect(() => {
    setMax(modalEditTable.table.soNguoiToiDa);
    setMin(modalEditTable.table.soNguoiToiThieu);
    setType(modalEditTable.table.loaiBan);
    getQuantityTableInArea();
    return function () {
      return null;
    };
  }, []);
  const handleChange = (text) => {
    if (text.match(`^[0-9]{0,}$`)) {
      setMax(text);
      if (parseInt(text, 10) > 2) setMin(parseInt(text, 10) - 2);
      else setMin(0);
    }
  };
  const handleClose = () => {
    dispatch(
      actionTableModalEditTable({
        status: false,
        table: {}
      })
    );
  };
  const handleEdit = () => {
    console.log(max);
    edit(parseInt(max, 10), parseInt(min, 10), type);
    handleClose();
  };
  const handleChooseType = (type) => {
    setType(type);
  };
  return (
    <Modal open={modalEditTable.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thông tin bàn</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Khu vực</Typography>
        <ImageTable src={modalEditTable.table.khuVuc.hinhAnh} />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <Typography sx={{ fontSize: '18px' }}>
            Tên khu vực: <b>{modalEditTable.table.khuVuc.tenKhuVuc}</b>
          </Typography>
          <Typography sx={{ fontSize: '18px' }}>
            Số lượng bàn hiện tại của khu vực: <b>{quantity}</b> bàn
          </Typography>
        </Box>
        <Input fullWidth disabled value={modalEditTable.table.tenBan} label="Tên bàn" />
        <Input
          fullWidth
          value={max}
          onChange={(e) => handleChange(e.target.value)}
          label="Số người tối đa"
        />
        <Typography sx={{ width: '100%', textAlign: 'left', margin: '10px 0px 0px 10px' }}>
          Loại bạn
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Radio onChange={() => handleChooseType('Thường')} checked={type === 'Thường'} />
            <Typography>Thường</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Radio onChange={() => handleChooseType('Vip')} checked={type === 'Vip'} />
            <Typography>Vip</Typography>
          </Box>
        </Box>

        {/* <Input fullWidth disabled value={min} label="Số người tối thiểu" /> */}
        <ButtonAdd
          onClick={handleEdit}
          disabled={
            Boolean(parseInt(modalEditTable.table.soNguoiToiDa, 10) === parseInt(max, 10)) &&
            type === modalEditTable.table.loaiBan
          }
        >
          Sửa thông tin bàn
        </ButtonAdd>
      </BoxModal>
    </Modal>
  );
}

export default ModalEditTable;
