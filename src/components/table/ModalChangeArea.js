import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography,
  Grid
} from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Scrollbar } from 'smooth-scrollbar-react';
import api from '../../assets/api/api';
import { actionGetAllTables, actionTableModalChangeArea } from '../../redux/actions/tableActions';
import { actionUserBackdrop, actionUserSnackbar } from '../../redux/actions/userAction';

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
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px'
}));
const BoxTable = styled(Grid)(({ theme }) => ({
  padding: '5px',
  display: 'flex'
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
function Table({ table }) {
  const BoxTable = styled(Grid)(({ theme }) => ({
    width: '100%',
    height: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${theme.palette.main}`
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.gray,
    fontWeight: 'bold'
  }));
  const IconTable = styled(Icon)(({ theme }) => ({
    width: '40px',
    height: '40px',
    color: theme.palette.gray
  }));
  return (
    <Grid sx={{ padding: '5px', width: '100%' }} item xs={4} sm={4} md={4} lg={3} xl={3}>
      <BoxTable>
        <Title>{table.tenBan}</Title>
        <IconTable icon="ic:round-table-restaurant" />
        <Title>Số người: {table.soNguoiToiDa}</Title>
      </BoxTable>
    </Grid>
  );
}
ModalChangeArea.prototype = {
  change: PropTypes.object
};
function ModalChangeArea({ change }) {
  const modalChangeArea = useSelector((state) => state.table.modalChangeArea);
  const [area, setArea] = useState({});
  const [name, setName] = useState('');
  const allAreas = useSelector((state) => state.area.allAreas);
  const [tables, setTables] = useState([]);
  const dispatch = useDispatch();
  const allTables = useSelector((state) => state.table.allTables);
  const getTablesByArea = (area) => {
    setTables(allTables.filter((table) => table.khuVuc.id === area.id));
  };
  const chooseArea = (area, quantity) => {
    setArea(area);
    setName(area.tenKhuVuc.concat(`${quantity + 1}`));
    getTablesByArea(area);
  };
  const handleClose = () => {
    dispatch(
      actionTableModalChangeArea({
        status: false,
        table: {}
      })
    );
  };
  const handleChange = () => {
    change({ ...modalChangeArea.table, tenBan: name, khuVuc: area });
    handleClose();
  };
  return (
    <Modal open={modalChangeArea.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
            Cập nhật khu vực cho bàn
          </Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
            <Title>Khu vực hiện tại</Title>
            <ImageTable src={modalChangeArea.table.khuVuc.hinhAnh} />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
              <Typography>
                Tên khu vực <b>{modalChangeArea.table.khuVuc.tenKhuVuc}</b>
              </Typography>
              <Typography sx={{ fontSize: '18px' }}>
                Tên bàn hiện tại: <b>{modalChangeArea.table.tenBan}</b>
              </Typography>
            </Box>
            <BoxArea container>
              {allAreas.map((item, index) => {
                if (item.id === modalChangeArea.table.khuVuc.id) return null;
                return <Area key={index} area={item} chosen={area} handleChoose={chooseArea} />;
              })}
            </BoxArea>
            <Typography
              sx={{ fontWeight: 'bold', fontSize: '14px', width: '100%', marginTop: '10px' }}
            >
              Danh sách bàn hiện tại khu vực {area.tenKhuVuc}
            </Typography>
            <Box
              sx={{
                width: '100%',
                border: `1px solid lightgrey`,
                borderRadius: '5px',
                marginTop: '10px',
                padding: '0px 10px'
              }}
            >
              {area.id !== undefined ? (
                <BoxTable container>
                  {tables.map((item, index) => (
                    <Table key={item.id} table={item} />
                  ))}
                </BoxTable>
              ) : (
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: 'red',
                    fontSize: '14px',
                    width: '100%',
                    textAlign: 'center',
                    margin: '10px 0px'
                  }}
                >
                  Vui lòng chọn khu vực
                </Typography>
              )}
            </Box>
            <Input
              fullWidth
              disabled
              label="Tên bàn mới"
              placeholder="Phát sinh khi chọn khu vực mới"
              value={name}
            />
            <ButtonAdd onClick={handleChange} disabled={Boolean(name === '')}>
              Thay đổi khu vực
            </ButtonAdd>
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalChangeArea;
