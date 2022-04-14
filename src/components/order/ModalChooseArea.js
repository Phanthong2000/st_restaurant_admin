import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  Input,
  Modal,
  styled,
  TextField,
  Typography
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbar } from 'smooth-scrollbar-react';
import PropTypes from 'prop-types';
import { actionOrderModalChooseArea } from '../../redux/actions/orderAction';

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
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%',
  maxHeight: '600px',
  display: 'flex'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  color: theme.palette.gray
}));
const ButtonChoose = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  color: theme.palette.white,
  fontWeight: 'bold',
  marginTop: '10px',
  width: '100%',
  background: theme.palette.main,
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxCheckin = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '5px',
  padding: '2px 5px',
  borderRadius: '5px',
  background: theme.palette.main
}));
const BoxArea = styled(Grid)(({ theme }) => ({
  width: '100%',
  borderRadius: '5px',
  border: `1px solid lightgrey`
}));
function Area({ area, handleChooseArea, chosen, tablesChosen }) {
  const BoxArea = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: '5px'
  }));
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    borderRadius: '5px',
    backgroundImage: `url(${area.hinhAnh})`,
    backgroundSize: `100% 100%`,
    backgroundRepeat: 'no-repeat',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  }));
  const AreaName = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px',
    background: theme.palette.main,
    padding: '1px 10px',
    color: theme.palette.white,
    borderRadius: '5px',
    border: `1px solid #fff`
  }));
  const IconCheck = styled(Icon)(({ theme }) => ({
    width: '30px',
    height: '30px',
    color: 'yellowgreen',
    border: `1px solid #fff`,
    background: '#fff',
    borderRadius: '30px'
  }));
  return (
    <BoxArea item xs={3} sm={3} md={3} lg={3} xl={3}>
      <Wrapper
        sx={{
          border:
            tablesChosen.filter((item) => item.khuVuc.id === area.id).length > 0 && `1px solid blue`
        }}
        onClick={() => handleChooseArea(area)}
      >
        {tablesChosen.filter((item) => item.khuVuc.id === area.id).length > 0 ? (
          <IconCheck icon="bi:check-circle-fill" />
        ) : (
          <AreaName>{area.tenKhuVuc}</AreaName>
        )}
      </Wrapper>
    </BoxArea>
  );
}
const BoxTable = styled(Grid)(({ theme }) => ({
  width: '100%',
  borderRadius: '5px',
  border: `1px solid lightgrey`
}));
function Table({ table, tablesChosen, handleChoseTable, quantityRest }) {
  const areaForOrder = useSelector((state) => state.order.areaForOrder);
  const BoxTable = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: '5px'
  }));
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid lightgrey`,
    borderRadius: '5px'
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px'
  }));
  const IconTable = styled(Icon)(({ theme }) => ({
    width: '40px',
    height: '40px',
    color: theme.palette.gray
  }));
  const IconCheck = styled(Icon)(({ theme }) => ({
    width: '30px',
    height: '30px',
    color: 'yellowgreen',
    border: `1px solid #fff`,
    background: '#fff',
    borderRadius: '30px',
    position: 'absolute',
    right: 0,
    top: 0
  }));
  const handleChose = () => {
    handleChoseTable(table);
  };
  const [status, setStatus] = useState();
  useEffect(() => {
    if (areaForOrder.using.filter((item) => item.id === table.id).length > 0) setStatus('1');
    else if (areaForOrder.dontUse.filter((item) => item.id === table.id).length > 0) setStatus('0');
    return function () {
      return null;
    };
  }, []);
  return (
    <BoxTable xs={3} sm={3} md={3} lg={3} xl={3}>
      <IconButton
        disabled={
          (quantityRest === 0 &&
            tablesChosen.filter((item) => item.id === table.id).length === 0) ||
          status
        }
        onClick={handleChose}
        sx={{ width: '100%' }}
        disableFocusRipple
        disableRipple
        disableTouchRipple
      >
        <Wrapper
          sx={
            (status === '0' && { color: 'orange', border: `1px solid orange` }) ||
            (status === '1' && { color: 'red', border: `1px solid red` })
          }
        >
          <Title>{table.tenBan}</Title>
          {status === '0' && <Title sx={{ fontSize: '12px' }}>Đã đặt</Title>}
          {status === '1' && <Title sx={{ fontSize: '12px' }}>Đang sử dụng</Title>}
          {!status && status !== '0' && status !== '1' && (
            <Title sx={{ fontSize: '12px' }}>Trống</Title>
          )}
          <IconTable
            style={(status === '1' && { color: 'red' }) || (status === '0' && { color: 'orange' })}
            icon="ic:round-table-restaurant"
          />
          <Title sx={{ fontSize: '12px' }}>Số người: {table.soNguoiToiDa}</Title>
        </Wrapper>
        {tablesChosen.filter((item) => item.id === table.id).length > 0 && (
          <IconCheck icon="bi:check-circle-fill" />
        )}
      </IconButton>
    </BoxTable>
  );
}
ModalChooseArea.prototype = {
  chooseArea: PropTypes.func,
  use: PropTypes.object,
  checkin: PropTypes.number,
  quantityCustomer: PropTypes.number,
  hour: PropTypes.object
};
function ModalChooseArea({ chooseArea, use, checkin, quantityCustomer, hour }) {
  const modalChooseArea = useSelector((state) => state.order.modalChooseArea);
  const allAreas = useSelector((state) => state.area.allAreas);
  const allTables = useSelector((state) => state.table.allTables);
  const [area, setArea] = useState({});
  const [tablesByArea, setTablesByArea] = useState([]);
  const [tablesChosen, setTableChosen] = useState([]);
  const [quantityRest, setQuantityRest] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    setQuantityRest(quantityCustomer);
    return function () {
      return null;
    };
  }, []);
  const handleClose = () => {
    dispatch(
      actionOrderModalChooseArea({
        status: false,
        area: {}
      })
    );
  };
  const handleChoseTable = (table) => {
    if (tablesChosen.filter((item) => item.id === table.id).length > 0) {
      setTableChosen(tablesChosen.filter((item) => item.id !== table.id));
      const newTables = tablesChosen.filter((item) => item.id !== table.id);
      if (newTables.length === 0) {
        setQuantityRest(quantityCustomer);
      } else if (quantityRest === 0) {
        let quantity = 0;
        newTables.forEach((table) => {
          quantity += table.soNguoiToiDa;
        });
        console.log(quantity, table.soNguoiToiDa, quantityCustomer);
        if (quantity + table.soNguoiToiDa === quantityCustomer) {
          setQuantityRest(table.soNguoiToiDa);
        } else {
          const data = table.soNguoiToiDa > quantityCustomer ? quantityCustomer - quantity : 0;
          setQuantityRest(data);
        }
      } else {
        setQuantityRest(quantityRest + table.soNguoiToiDa);
      }
    } else {
      const data = quantityRest - table.soNguoiToiDa <= 0 ? 0 : quantityRest - table.soNguoiToiDa;
      setQuantityRest(data);
      setTableChosen([...tablesChosen, table]);
    }
  };
  const handleChooseArea = (area) => {
    console.log('first', area, allTables);
    setTablesByArea(allTables.filter((table) => table.khuVuc.id === area.id));
    setArea(area);
  };
  const handleConfirm = () => {
    chooseArea(area, tablesChosen);
    handleClose();
  };
  return (
    <Modal open={modalChooseArea.status} onClose={handleClose}>
      <BoxModal>
        <BoxTitle>
          <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Chọn khu vực</Typography>
          <IconButton onClick={handleClose}>
            <Icon icon="ep:close-bold" />
          </IconButton>
        </BoxTitle>
        <Divider sx={{ margin: '10px 0px' }} />
        <BoxContent>
          <Scrollbar style={{ paddingRight: '10px' }} alwaysShowTracks>
            <Box sx={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
              <Title sx={{ width: '40%' }}>Thời gian nhận bàn: </Title>
              <BoxCheckin>
                <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>
                  {hour.name} {moment(checkin).format(`DD/MM/YYYY`)}
                </Typography>
              </BoxCheckin>
            </Box>
            <Box sx={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
              <Title sx={{ width: '40%' }}>Thời gian sử dụng dự kiến: </Title>
              <BoxCheckin>
                <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>
                  {use.name}
                </Typography>
              </BoxCheckin>
            </Box>
            <Box sx={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
              <Title sx={{ width: '40%' }}>Số lượng khách: </Title>
              <BoxCheckin>
                <Typography sx={{ fontWeight: 'bold', fontSize: '14px', color: '#fff' }}>
                  {`${quantityCustomer} người`}
                </Typography>
              </BoxCheckin>
            </Box>
            <Title>Danh sách khu vực</Title>
            <BoxArea container>
              {allAreas.map((item, index) => (
                <Area
                  tablesChosen={tablesChosen}
                  chosen={area}
                  handleChooseArea={handleChooseArea}
                  key={index}
                  area={item}
                />
              ))}
            </BoxArea>
            <Title sx={{ width: '100%', color: 'green', marginTop: '5px', textAlign: 'center' }}>
              Số người còn lại: {quantityRest}
            </Title>
            <Title sx={{ marginTop: '10px' }}>Danh sách bàn của khu vực {area.tenKhuVuc}</Title>
            <BoxTable
              sx={
                tablesByArea.length === 0 && {
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
              container
            >
              {tablesByArea.length === 0 ? (
                <Title sx={{ color: 'red' }}>Vui lòng khu vực muốn đặt</Title>
              ) : (
                <>
                  {tablesByArea.map((item, index) => (
                    <Table
                      quantityRest={quantityRest}
                      handleChoseTable={handleChoseTable}
                      tablesChosen={tablesChosen}
                      key={item.id}
                      table={item}
                    />
                  ))}
                </>
              )}
            </BoxTable>
            <Divider sx={{ margin: '10px 0px' }} />
            <ButtonChoose disabled={quantityRest !== 0} onClick={handleConfirm}>
              Đồng ý
            </ButtonChoose>
          </Scrollbar>
        </BoxContent>
      </BoxModal>
    </Modal>
  );
}

export default ModalChooseArea;
