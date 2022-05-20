import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, styled, Typography, Card } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import moment from 'moment';

const widthScreen = window.innerWidth;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  background: '#f0f5f4'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxContent = styled(Card)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  marginTop: '10px',
  padding: '10px'
}));
const BoxInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: '10px'
}));
const BoxTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  textAlign: 'center'
}));
const ImageNews = styled('img')(({ theme }) => ({
  width: '600px',
  height: '300px',
  marginTop: '10px'
}));
const IconInfo = styled(Icon)(({ theme }) => ({
  width: '30px',
  height: '30px',
  color: theme.palette.main
}));
const Info = styled(Typography)(({ theme }) => ({
  marginLeft: '5px',
  color: theme.palette.main,
  fontWeight: 'bold',
  fontSize: '14px',
  fontFamily: theme.typography.fontFamily.primary
}));
const Content = styled('div')(({ theme }) => ({
  width: '100%'
}));
function NewsDetail() {
  const news = useSelector((state) => state.news.news);
  const navigate = useNavigate();
  useEffect(() => {
    if (news.id === undefined) {
      navigate('/home/news');
    }
    return function () {
      return null;
    };
  });
  if (!news.id) return null;
  return (
    <RootStyle>
      <Scrollbar style={{ padding: '10px' }} alwaysShowTracks>
        <Title>Thông tin tin tức</Title>
        <BoxContent>
          <BoxTitle>
            <Title sx={{ fontSize: '16px' }}>{news.tieuDe}</Title>
            <ImageNews src={news.hinhAnh} />
          </BoxTitle>
          <BoxInfo>
            <IconInfo icon="ant-design:calendar-twotone" />
            <Info>Ngày đăng: {moment(news.createAt).format(`DD/MM/YYYY`)}</Info>
          </BoxInfo>
          <BoxInfo>
            <IconInfo icon="la:user-edit" />
            <Info>Người đăng: {news.nguoiQuanLy.hoTen}</Info>
          </BoxInfo>
          <BoxInfo>
            <IconInfo icon="ant-design:eye-outlined" />
            <Info>{news.luotXem} lượt xem</Info>
          </BoxInfo>
          <Content
            // style={{ width: widthScreen }}
            dangerouslySetInnerHTML={{ __html: news.noiDung }}
          />
        </BoxContent>
      </Scrollbar>
    </RootStyle>
  );
}

export default NewsDetail;
