import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, styled, Typography } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';

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
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>{news.id}</Scrollbar>
    </RootStyle>
  );
}

export default NewsDetail;
