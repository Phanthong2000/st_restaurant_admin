import { Icon } from '@iconify/react';
import {
  Box,
  Card,
  styled,
  Modal,
  Typography,
  IconButton,
  Divider,
  Radio,
  Grid,
  Button,
  TextField
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import PropTypes from 'prop-types';
import { actionUserBackdrop, actionUserSnackbar } from '../../redux/actions/userAction';
import api from '../../assets/api/api';
import { actionTableModalAddTable } from '../../redux/actions/tableActions';

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
const BoxArea = styled(Grid)(({ theme }) => ({
  width: '100%',
  background: theme.palette.lightgrey,
  borderRadius: '5px',
  padding: '10px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '600px',
  display: 'flex'
}));
const Input = styled(TextField)(({ theme }) => ({
  marginTop: '10px',
  width: '50%'
}));
const ButtonAdd = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 'bold',
  width: '90%',
  marginLeft: '5%',
  color: theme.palette.white,
  background: theme.palette.main,
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function Area({ area, chosen, handleChoose }) {
  const [quantify, setQuantity] = useState(-1);
  const getQuantityTableInArea = async () => {
    const data = await axios.get(`${api}ban/list/khuVuc/${area.id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    setQuantity(data.data.length);
  };
  useEffect(() => {
    getQuantityTableInArea();
    return function () {
      return null;
    };
  }, []);
  const Wrapper = styled(Button)(({ theme }) => ({
    padding: '5px',
    border: `1px solid lightgrey`,
    width: '100%',
    background: theme.palette.white,
    ':hover': { background: '#fff' }
  }));
  const IconChoose = styled(Icon)(({ theme }) => ({
    width: '20px',
    height: '20px',
    position: 'absolute',
    right: -5,
    top: -5,
    background: '#fff',
    borderRadius: '20px',
    border: `1px solid #fff`
  }));
  const ImageATM = styled('img')(({ theme }) => ({
    width: '100%',
    height: '100px'
  }));
  const AreaName = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    color: theme.palette.gray,
    fontWeight: 'bold',
    fontSize: '14px'
  }));
  return (
    <Grid sx={{ width: '100%', padding: '5px' }} item xs={3} sm={3} md={3} lg={3} xl={3}>
      <Wrapper
        sx={{ border: chosen === area && `1px solid blue` }}
        onClick={(e) => {
          e.preventDefault();
          handleChoose(area, quantify);
        }}
      >
        <Box>
          <ImageATM src={area.hinhAnh} />
          <AreaName>{area.tenKhuVuc}</AreaName>
        </Box>
        {chosen === area && <IconChoose icon="bi:check-circle-fill" />}
      </Wrapper>
    </Grid>
  );
}
ModalAddTable.prototype = {
  add: PropTypes.func
};
function ModalAddTable({ add }) {
  const modalAddTable = useSelector((state) => state.table.modalAddTable);
  const allAreas = useSelector((state) => state.area.allAreas);
  const [name, setName] = useState('');
  const [area, setArea] = useState({});
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(actionTableModalAddTable(false));
  };
  const chooseArea = (area, quantity) => {
    setArea(area);
    setName(area.tenKhuVuc.concat(`${quantity + 1}`));
  };
  const handleChange = (text) => {
    if (text.match(`^[0-9]{0,}$`)) {
      setMax(text);
      if (parseInt(text, 10) > 2) setMin(parseInt(text, 10) - 2);
      else setMin(0);
    }
  };
  const handleAddTable = () => {
    dispatch(
      actionUserBackdrop({
        status: true,
        content: 'Thêm bàn'
      })
    );
    const table = {
      khuVuc: {
        id: area.id
      },
      tenBan: name,
      soNguoiToiThieu: parseInt(min, 10),
      soNguoiToiDa: parseInt(max, 10),
      trangThai: 'Đang sử dụng'
    };
    add(table);
    handleClose();
  };
  return (
    <Modal open={modalAddTable} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Thêm bàn</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>Chọn khu vực</Typography>
            <BoxArea container>
              {allAreas.map((item, index) => (
                <Area key={index} area={item} chosen={area} handleChoose={chooseArea} />
              ))}
            </BoxArea>
            <Box
              sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <Input
                helperText={
                  <Typography sx={{ color: 'red', fontSize: '13px' }}>
                    Tự phát sinh khi chọn khu vực
                  </Typography>
                }
                value={name}
                disabled
                label="Tên bàn"
              />
              <Input
                value={max}
                onChange={(e) => handleChange(e.target.value)}
                label="Số người tối đa"
              />
              <Input
                value={min}
                helperText={
                  <Typography sx={{ color: 'red', fontSize: '13px' }}>
                    Tự phát sinh khi nhập số người tối đa
                  </Typography>
                }
                disabled
                label="Số người tối thiểu"
              />
            </Box>
            <ButtonAdd onClick={handleAddTable} disabled={Boolean(!max || !area)}>
              Thêm bàn
            </ButtonAdd>
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalAddTable;
