import React, { useEffect, useState } from 'react';
import { Card, Grid, styled, Typography, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionNewsWatchNews } from '../../redux/actions/newsAction';

const RootStyle = styled(Grid)(({ theme }) => ({
  padding: '10px'
}));
const BoxContent = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '5px',
  background: theme.palette.white
}));
const ImageNews = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: '10px',
  height: '280px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxDate = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '5px',
  color: theme.palette.main
}));
const IconDate = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px'
}));
const Date = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary,
  marginLeft: '10px'
}));
const BoxView = styled(Box)(({ theme }) => ({
  padding: '5px',
  background: theme.palette.main,
  borderRadius: `20px`,
  border: `1px solid #fff`,
  display: 'flex',
  alignItems: 'center',
  marginTop: '-20px',
  zIndex: '2'
}));
const QuantityView = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '12px',
  color: theme.palette.white,
  marginLeft: '5px'
}));
const ButtonWatch = styled(Button)(({ theme }) => ({
  width: '100%',
  textTransform: 'none',
  background: theme.palette.main,
  color: theme.palette.white,
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily.primary,
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
NewsItem.prototype = {
  news: PropTypes.object
};
function NewsItem({ news }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleWatch = () => {
    dispatch(actionNewsWatchNews(news));
    navigate(`/home/news-detail/${news.id}`);
  };
  return (
    <RootStyle item xs={4} sm={4} md={4} lg={4} xl={4}>
      <BoxContent>
        <ImageNews src={news.hinhAnh} />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <BoxView>
            <Icon style={{ color: '#fff' }} icon="bi:eye-fill" />
            <QuantityView>{news.luotXem} lượt xem</QuantityView>
          </BoxView>
        </Box>
        <Title>{news.tieuDe}</Title>
        <BoxDate>
          <IconDate icon="ant-design:calendar-twotone" />
          <Date>Ngày đăng: {moment(news.createAt).format(`DD/MM/YYYY`)}</Date>
        </BoxDate>
        <ButtonWatch onClick={handleWatch}>Xem chi tiết</ButtonWatch>
      </BoxContent>
    </RootStyle>
  );
}

export default NewsItem;
