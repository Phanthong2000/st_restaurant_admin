import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import api from '../assets/api/api';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#f0f5f4',
  padding: '10px'
}));
const BoxDetail = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2, 10),
  display: 'flex',
  justifyContent: 'space-between',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  background: theme.palette.white,
  [theme.breakpoints.down('md')]: {
    display: 'block',
    padding: theme.spacing(1, 5)
  }
}));
const BoxLeft = styled(Box)(({ theme }) => ({
  width: '50%',
  background: theme.palette.white,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const BoxRight = styled(Stack)(({ theme }) => ({
  width: '45%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));
const AvatarFood = styled('img')(({ theme }) => ({
  width: '100%',
  height: '450px',
  borderRadius: '20px',
  [theme.breakpoints.down('sm')]: {
    height: '300px'
  }
}));
const BoxImages = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center'
}));
const ImageSmall = styled('img')(({ theme }) => ({
  width: '70px',
  height: '70px',
  marginRight: '10px',
  cursor: 'pointer',
  borderRadius: '10px'
}));
const NameFood = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '30px',
  fontFamily: theme.typography.fontFamily.primary
}));
const PriceFood = styled(Typography)(({ theme }) => ({
  fontSize: '30px',
  fontWeight: 'bold',
  color: theme.palette.main,
  marginTop: '20px'
}));
const BoxDescription = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  marginTop: '20px'
}));
const ButtonOrder = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  fontSize: '16px',
  fontWeight: 'bold',
  width: '50%',
  marginLeft: '25%',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
function FoodDetail() {
  const [food, setFood] = useState({});
  const { id } = useParams();
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();
  const getFoodById = () => {
    axios
      .get(`${api}monAn/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      .then((res) => {
        setFood(res.data);
        setAvatar(res.data.hinhAnh.at(0));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getFoodById();
    return function () {
      return null;
    };
  }, []);
  const goToHome = () => {
    navigate('/home/app');
  };
  const goToFood = () => {
    navigate('/home/food');
  };
  const goToOrder = () => {
    navigate('/home/order');
  };
  if (food.id === undefined) return null;
  return (
    <RootStyle>
      <BoxDetail>
        <BoxLeft>
          <AvatarFood src={avatar} />
          <BoxImages>
            {food.hinhAnh.map((item, index) => (
              <ImageSmall
                onMouseEnter={() => setAvatar(item)}
                sx={{ outline: item === avatar && `5px solid #3C58C9` }}
                key={index}
                src={item}
              />
            ))}
          </BoxImages>
        </BoxLeft>
        <BoxRight>
          <Box>
            <NameFood>{food.tenMonAn}</NameFood>
            <PriceFood>{`${food.donGia.toLocaleString('es-US')} vnđ`}</PriceFood>
            <Box sx={{ width: '100', display: 'flex', alignItems: 'center' }}>
              <Icon
                style={{ color: 'red', width: '30px', height: '30px' }}
                icon="ant-design:heart-twotone"
              />
              {!food.listKhachHangThichMonAn ? (
                <Typography sx={{ color: 'gray', fontWeight: 'bold', marginLeft: '5px' }}>
                  0 yêu thích
                </Typography>
              ) : (
                <Typography sx={{ color: 'gray', fontWeight: 'bold', marginLeft: '5px' }}>
                  {`${food.listKhachHangThichMonAn.length} yêu thích`}
                </Typography>
              )}
            </Box>
            <BoxDescription>
              <Typography
                sx={{ color: 'gray', fontSize: '16px', width: '20%', fontWeight: 'bold' }}
              >
                Mô tả
              </Typography>
              <Typography sx={{ fontSize: '14px', fontFamily: 'sans-serif', width: '80%' }}>
                {food.moTa}
              </Typography>
            </BoxDescription>
          </Box>
          <ButtonOrder onClick={goToFood}>Quay lại</ButtonOrder>
        </BoxRight>
      </BoxDetail>
    </RootStyle>
  );
}

export default FoodDetail;
