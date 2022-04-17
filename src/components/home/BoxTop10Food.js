import { Box, Divider, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxFood = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function Food({ food, index }) {
  const Wrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 30px'
  }));
  const BoxIndex = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    color: theme.palette.gray,
    fontFamily: theme.typography.fontFamily.primary,
    width: '50px'
  }));
  const BoxInfo = styled(Box)(({ theme }) => ({
    marginLeft: '20px'
  }));
  const FoodName = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '18px',
    fontFamily: theme.typography.fontFamily.primary
  }));
  const Price = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px',
    fontFamily: theme.typography.fontFamily.priamry,
    color: theme.palette.main
  }));
  const Count = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '16px',
    color: theme.palette.gray,
    marginLeft: '10px'
  }));
  const ImageFood = styled('img')(({ theme }) => ({
    width: '50px',
    height: '50px',
    borderRadius: '10px'
  }));
  return (
    <>
      {index !== 0 && <Divider />}
      <Wrapper>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BoxIndex>#{index + 1}</BoxIndex>
          <BoxInfo>
            <FoodName>{food.monAn.tenMonAn}</FoodName>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Price>{food.monAn.donGia.toLocaleString(`es-US`)} vnđ</Price>
              <Count>x{food.count}</Count>
            </Box>
          </BoxInfo>
        </Box>
        <ImageFood src={food.monAn.hinhAnh.at(0)} />
      </Wrapper>
    </>
  );
}
function BoxTop10Food() {
  const top10Food = useSelector((state) => state.analytic.top10Food);
  return (
    <RootStyle>
      <Title>Món ăn đặt nhiều nhất</Title>
      <BoxFood>
        {top10Food.map((item, index) => (
          <Food key={index} index={index} food={item} />
        ))}
      </BoxFood>
    </RootStyle>
  );
}

export default BoxTop10Food;
