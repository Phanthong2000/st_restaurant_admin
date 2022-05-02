import React, { useEffect, useState } from 'react';
import { styled, Box, InputBase, Typography, Button, Grid } from '@mui/material';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NewsItem from '../components/news/NewsItem';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: '#f0f5f4',
  display: 'flex'
}));
const BoxSearch = styled(Box)(({ theme }) => ({
  width: '50%',
  marginLeft: '25%',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${theme.palette.black}`,
  borderRadius: '20px',
  marginTop: '20px',
  paddingLeft: '15px'
}));
const BoxButtonSearch = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.main,
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  marginRight: '1.5px',
  width: '50px',
  cursor: 'pointer',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxListEmployee = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2)
}));
const ButtonAddEmployee = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  color: theme.palette.white,
  background: theme.palette.main,
  fontWeight: 'bold',
  ':hover': {
    background: theme.palette.mainHover
  }
}));
const BoxContent = styled(Grid)(({ theme }) => ({
  width: '100%'
}));
const BoxPage = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'end',
  padding: '10px'
}));
const ButtonChangePage = styled(Box)(({ theme }) => ({
  width: '35px',
  height: '35px',
  color: theme.palette.white,
  background: theme.palette.main,
  borderRadius: '35px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer'
}));
const QuantityPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '16px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '50px',
  textAlign: 'center'
}));
const CountPage = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '13px',
  color: theme.palette.main,
  fontFamily: theme.typography.fontFamily.primary,
  width: '30px',
  textAlign: 'center'
}));
function News() {
  const navigate = useNavigate();
  const allNews = useSelector((state) => state.news.allNews);
  const [page, setPage] = useState(0);
  const [news, setNews] = useState([]);
  const getAreasByPage = (page) => {
    const start = page * 3;
    const end = start + 3;
    const data = [];
    for (let i = 0; i < allNews.length; i += 1) {
      if (i >= start && i < end) {
        data.push(allNews.at(i));
      }
    }
    setNews(data.sort((a, b) => Date.parse(b.createAt) - Date.parse(a.createAt)));
  };
  useEffect(() => {
    getAreasByPage(0);
    setPage(0);
    return function () {
      return null;
    };
  }, [allNews]);
  const goToStartTable = () => {
    setPage(0);
    getAreasByPage(0);
  };
  const goToEndTable = () => {
    const page = ((allNews.length - 1) / 3)
      .toString()
      .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.'));
    setPage(parseInt(page, 10));
    getAreasByPage(parseInt(page, 10));
  };
  const handleNext = () => {
    if (
      ((allNews.length - 1) / 3)
        .toString()
        .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.')) !== `${page}`
    ) {
      getAreasByPage(page + 1);
      setPage(page + 1);
    }
  };
  const handlePrev = () => {
    if (page > 0) {
      getAreasByPage(page - 1);
      setPage(page - 1);
    }
  };
  return (
    <RootStyle>
      <Scrollbar alwaysShowTracks>
        <BoxSearch>
          <InputBase
            // onChange={(e) => searchEmployees(e.target.value)}
            fullWidth
            placeholder="Tìm kiếm tin tức (tên tin tức)..."
          />
          <BoxButtonSearch>
            <Icon
              style={{ width: '30px', height: '30px', color: '#fff' }}
              icon="system-uicons:search"
            />
          </BoxButtonSearch>
        </BoxSearch>
        <Box>
          <BoxListEmployee>
            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>Danh sách tin tức</Typography>
            <ButtonAddEmployee onClick={() => navigate('/home/news-create')}>
              Thêm tin tức
            </ButtonAddEmployee>
          </BoxListEmployee>
          <BoxContent container>
            {news.map((item, index) => (
              <NewsItem key={index} news={item} />
            ))}
          </BoxContent>
          <BoxPage>
            <CountPage>{page * 3 + 1}</CountPage>
            <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>-</Typography>
            <CountPage>{page * 3 + 3 >= allNews.length ? allNews.length : page * 3 + 3}</CountPage>
            <Typography sx={{ fontWeight: 'bold', fontSize: '13px' }}>/</Typography>
            <CountPage>{allNews.length}</CountPage>
            <ButtonChangePage
              sx={{ background: page === 0 && 'red', marginRight: '10px' }}
              onClick={goToStartTable}
            >
              {page === 0 ? (
                <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
              ) : (
                <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-to-left" />
              )}
            </ButtonChangePage>
            <ButtonChangePage sx={{ background: page === 0 && 'red' }} onClick={handlePrev}>
              {page === 0 ? (
                <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
              ) : (
                <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-left" />
              )}
            </ButtonChangePage>
            <QuantityPage>{page + 1}</QuantityPage>
            <ButtonChangePage
              sx={{
                background:
                  ((allNews.length - 1) / 3)
                    .toString()
                    .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.')) ===
                    `${page}` && 'red'
              }}
              onClick={handleNext}
            >
              {((allNews.length - 1) / 3)
                .toString()
                .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.')) ===
              `${page}` ? (
                <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
              ) : (
                <Icon style={{ width: '25px', height: '25px' }} icon="bx:chevron-right" />
              )}
            </ButtonChangePage>
            <ButtonChangePage
              sx={{
                background:
                  ((allNews.length - 1) / 3)
                    .toString()
                    .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.')) ===
                    `${page}` && 'red',
                marginLeft: '10px'
              }}
              onClick={goToEndTable}
            >
              {((allNews.length - 1) / 3)
                .toString()
                .substring(0, ((allNews.length - 1) / 3).toFixed(1).toString().indexOf('.')) ===
              `${page}` ? (
                <Icon style={{ width: '25px', height: '25px', color: '#fff' }} icon="bx:x" />
              ) : (
                <Icon style={{ width: '25px', height: '25px' }} icon="bx:arrow-from-left" />
              )}
            </ButtonChangePage>
          </BoxPage>
        </Box>
      </Scrollbar>
    </RootStyle>
  );
}

export default News;
