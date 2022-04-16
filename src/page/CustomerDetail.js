import { Icon } from '@iconify/react';
import { Box, Card, Divider, Grid, styled, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Scrollbar } from 'smooth-scrollbar-react';
import moment from 'moment';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator
} from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import api from '../assets/api/api';
import { actionOrderGetUser } from '../redux/actions/orderAction';
import { actionCustomerModalEditCustomer } from '../redux/actions/customerAction';
import ModalEditCustomer from '../components/customer/ModalEditCustomer';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f4f5'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxEdit = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.main}`,
  color: theme.palette.main,
  background: theme.palette.white,
  padding: '10px',
  borderRadius: '20px',
  cursor: 'pointer',
  ':hover': {
    background: 'lightgrey'
  }
}));
const BoxBack = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.white,
  background: 'red',
  padding: '10px',
  borderRadius: '30px',
  cursor: 'pointer',
  marginLeft: '20px'
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%',
  marginTop: '20px'
}));
const BoxLeft = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const WrapperLeft = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px',
  minHeight: '100%',
  display: 'flex'
}));
const BoxChosenTop = styled(Box)(({ theme }) => ({
  minWidth: '100%',
  display: 'flex',
  padding: '10px',
  justifyContent: 'space-between'
}));
const AvatarEmployee = styled('img')(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '10px',
  border: `1px solid ${theme.palette.main}`
}));
const Username = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '18px',
  fontFamily: theme.typography.fontFamily.primary,
  textTransform: 'capitalize'
}));
const Checkin = styled(Typography)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily.primary,
  color: theme.palette.gray,
  margin: '5px 0px'
}));
const BoxGender = styled(Box)(({ theme }) => ({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.mainHover,
  borderRadius: '20px'
}));
const BoxRight = styled(Grid)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const WrapperRight = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px',
  minHeight: '100%',
  display: 'flex'
}));
const BoxLoadingBooks = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  minHeight: '100%',
  justifyContent: 'center',
  color: theme.palette.main
}));
const BoxFood = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  padding: '10px'
}));
const WrapperFood = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  overflow: 'auto',
  padding: '10px'
}));
function Food({ food }) {
  const BoxFood = styled(Box)(({ theme }) => ({
    width: '100%',
    border: `1px solid lightgrey`,
    borderRadius: '5px',
    padding: '10px',
    [theme.breakpoints.down('md')]: {
      padding: '5px'
    }
  }));
  const ImageFood = styled('img')(({ theme }) => ({
    width: '100%',
    height: '200px',
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
      height: '150px'
    }
  }));
  const FoodName = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily.primary,
    fontSize: '14px',
    fontWeight: 'bold',
    color: theme.palette.gray,
    [theme.breakpoints.down('md')]: {
      fontSize: '10px'
    }
  }));
  const Price = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '13px',
    color: theme.palette.main,
    fontFamily: theme.typography.fontFamily.primary,
    [theme.breakpoints.down('md')]: {
      fontSize: '10px'
    }
  }));
  return (
    <Grid sx={{ width: '100%', padding: '10px' }} xs={6} sm={6} md={4} lg={3} xl={3}>
      <BoxFood>
        <ImageFood src={food.hinhAnh.at(0)} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '5px'
          }}
        >
          <FoodName>{food.tenMonAn}</FoodName>
          <Price>{food.donGia.toLocaleString(`es-US`)} vnđ</Price>
        </Box>
      </BoxFood>
    </Grid>
  );
}
function BoxInfo({ icon, value, label }) {
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex'
  }));
  const WrapperIcon = styled(Box)(({ theme }) => ({
    color: theme.palette.main,
    borderRadius: '30px',
    border: `1px solid lightgrey`,
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }));
  const Label = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary
  }));
  const Value = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontFamily: theme.typography.fontFamily.primary
  }));
  return (
    <Grid sx={{ width: '100%', padding: '20px' }} item xs={12} sm={6} md={6} xl={6} lg={6}>
      <Wrapper>
        <WrapperIcon>
          <Icon style={{ width: '25px', height: '25px' }} icon={icon} />
        </WrapperIcon>
        <Box sx={{ marginLeft: '20px' }}>
          <Label>{label}</Label>
          <Value>{value}</Value>
        </Box>
      </Wrapper>
    </Grid>
  );
}
function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();
  const broadcast = useSelector((state) => state.socket.broadcast);
  const [quantityBook, setQuantityBook] = useState(-1);
  const [booksByCustomer, setBooksByCustomer] = useState([]);
  const modalEditCustomer = useSelector((state) => state.customer.modalEditCustomer);
  const [foods, setFoods] = useState([]);
  const dispatch = useDispatch();
  const getFoodsLove = async () => {
    const data = await axios.get(`${api}monAn/list/yeuThich/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    setFoods(data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt)));
  };
  const getBooksById = async () => {
    const data = await axios.get(`${api}donDatBan/list/maKhachHang`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      params: {
        maKhachHang: id
      }
    });
    setQuantityBook(data.data.length);
    setBooksByCustomer(data.data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt)));
  };
  const getCustomer = () => {
    axios
      .get(`${api}khachHang/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => {
        navigate(`/error`);
      });
  };
  useEffect(() => {
    getCustomer();
    getFoodsLove();
    getBooksById();
    return function () {
      return null;
    };
  }, []);
  const back = () => {
    navigate('/home/customer');
  };
  const handleUpdateCustomer = (customer) => {
    setCustomer(customer);
  };
  if (customer === undefined) return null;
  return (
    <RootStyle>
      <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
        <BoxTitle>
          <Title>Thông tin khách hàng</Title>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BoxEdit
              onClick={() => {
                dispatch(
                  actionCustomerModalEditCustomer({
                    status: true,
                    customer
                  })
                );
              }}
            >
              <Icon icon="dashicons:edit-large" />
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'sans-serif',
                  marginLeft: '5px'
                }}
              >
                Sửa thông tin
              </Typography>
            </BoxEdit>
            <BoxBack onClick={back}>
              <Icon style={{ width: '25px', height: '25px' }} icon="typcn:arrow-back" />
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'sans-serif',
                  marginLeft: '5px'
                }}
              >
                Quay lại
              </Typography>
            </BoxBack>
          </Box>
        </BoxTitle>
        <BoxContent container>
          <BoxLeft item xs={12} sm={12} md={12} lg={8} xl={8}>
            <WrapperLeft>
              <Box sx={{ width: '100%' }}>
                <BoxChosenTop>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AvatarEmployee src={customer.anhDaiDien} />
                    <Box sx={{ marginLeft: '10px' }}>
                      <Username>{customer.hoTen}</Username>
                      <Checkin>
                        Ngày tham gia
                        {moment(customer.createAt).format(` DD/MM/YYYY`)}
                      </Checkin>
                      <Box sx={{ display: 'flex' }}>
                        <BoxGender>
                          <Icon
                            style={{ color: '#fff' }}
                            icon={
                              customer.gioiTinh === 'Nam' ? `bi:gender-male` : `bi:gender-female`
                            }
                          />
                          <Typography
                            sx={{
                              color: '#fff',
                              fontWeight: 'bold',
                              fontSize: '14px',
                              marginLeft: '5px',
                              fontFamily: 'sans-serif'
                            }}
                          >
                            {customer.gioiTinh}
                          </Typography>
                        </BoxGender>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Icon
                            style={{
                              width: '30px',
                              height: '30px',
                              color:
                                broadcast.find((br) => br.userId === customer.id) !== undefined
                                  ? 'green'
                                  : 'gray'
                            }}
                            icon="ci:dot-05-xl"
                          />
                          <Typography>
                            {broadcast.find((br) => br.userId === customer.id) !== undefined
                              ? `Online`
                              : 'Offline'}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <BoxGender
                      sx={{ background: customer.taiKhoan.trangThai === 'Đã khoá' && `red` }}
                    >
                      <Icon style={{ color: '#fff' }} icon="ps:work-case" />
                      <Typography
                        sx={{
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          fontFamily: 'sans-serif',
                          marginLeft: '5px'
                        }}
                      >
                        {customer.taiKhoan.trangThai}
                      </Typography>
                    </BoxGender>
                    {customer.taiKhoan.trangThai === 'Hiệu lực' && (
                      <BoxGender
                        onClick={() => {
                          dispatch(
                            actionOrderGetUser({
                              ...customer
                            })
                          );
                          navigate('/home/order');
                        }}
                        sx={{ marginTop: '10px', cursor: 'pointer' }}
                      >
                        <Icon
                          style={{ color: '#fff' }}
                          icon="icon-park-outline:transaction-order"
                        />
                        <Typography
                          sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            fontFamily: 'sans-serif',
                            marginLeft: '5px'
                          }}
                        >
                          Đặt bàn
                        </Typography>
                      </BoxGender>
                    )}
                  </Box>
                </BoxChosenTop>
                <Divider sx={{ margin: '20px 0px' }} />
                <Grid container>
                  <BoxInfo
                    icon="ant-design:user-outlined"
                    value={customer.taiKhoan.tenDangNhap}
                    label="Tên đăng nhập"
                  />
                  <BoxInfo icon="carbon:phone" value={customer.soDienThoai} label="Số điện thoại" />
                  <BoxInfo icon="mi:email" value={customer.email} label="Email" />
                  <BoxInfo
                    icon="heroicons-outline:identification"
                    value={customer.chungMinhThu}
                    label="Chứng minh thư"
                  />
                  <BoxInfo icon="mdi:map-marker-outline" value={customer.diaChi} label="Địa chỉ" />
                </Grid>
              </Box>
            </WrapperLeft>
          </BoxLeft>
          <BoxRight item xs={12} sm={12} md={12} lg={4} xl={4}>
            <WrapperRight>
              {quantityBook === -1 ? (
                <BoxLoadingBooks>
                  <Icon style={{ width: '50px', height: '50px' }} icon="eos-icons:loading" />
                </BoxLoadingBooks>
              ) : (
                <Box sx={{ width: '100%', minHeight: '100%' }}>
                  <Typography
                    sx={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif' }}
                  >
                    Lịch sử đặt bàn
                  </Typography>
                  {quantityBook === 0 ? (
                    <Box
                      sx={{
                        minHeight: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Box sx={{ textAlign: 'center' }}>
                        <Icon
                          style={{ width: '100px', height: '100px', color: 'red' }}
                          icon="ic:round-bookmark-border"
                        />
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '16px',
                            fontFamily: 'sans-serif',
                            color: 'red'
                          }}
                        >
                          Khách hàng chưa đặt bàn
                        </Typography>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Timeline
                        sx={{ width: '100%', maxHeight: '450px', display: 'flex' }}
                        position="alternate"
                      >
                        <Scrollbar alwaysShowTracks>
                          {booksByCustomer.map((item, index) => (
                            <TimelineItem sx={{ width: '100%' }} key={index}>
                              <TimelineSeparator sx={{ height: '100px' }}>
                                <TimelineDot color="primary">
                                  <Icon
                                    style={{ width: '25px', height: '25px' }}
                                    icon="icon-park-outline:transaction-order"
                                  />
                                </TimelineDot>
                                <TimelineConnector />
                              </TimelineSeparator>
                              <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography
                                  sx={{ width: '100%', fontWeight: 'bold', fontSize: '13px' }}
                                >
                                  {moment(item.createAt).format(`hh:mm a DD/MM/YYYY`)}
                                </Typography>
                              </TimelineContent>
                            </TimelineItem>
                          ))}
                        </Scrollbar>
                      </Timeline>
                    </Box>
                  )}
                </Box>
              )}
            </WrapperRight>
          </BoxRight>
        </BoxContent>
        <BoxFood>
          <WrapperFood>
            <Typography sx={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif' }}>
              Món ăn khách hàng thích
            </Typography>
            <Grid sx={{ width: '100%' }} container>
              {foods.map((item, index) => (
                <Food key={item.id} food={item} />
              ))}
            </Grid>
          </WrapperFood>
        </BoxFood>
        {modalEditCustomer.status && (
          <ModalEditCustomer handleUpdateCustomer={handleUpdateCustomer} />
        )}
      </Scrollbar>
    </RootStyle>
  );
}

export default CustomerDetail;
