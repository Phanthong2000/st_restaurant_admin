import { Icon } from '@iconify/react';
import { Box, Card, Grid, IconButton, styled, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const colorArea = '#ff4a00';
const colorTable = '#f4ab55';
const RootStyle = styled(Grid)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  borderRadius: '2px'
}));
const BoxHead = styled(Box)(({ theme }) => ({
  width: '100%',
  background: colorArea,
  color: '#fff',
  borderRadius: '2px 2px 0px 0px',
  padding: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));
const BoxFoot = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid lightgrey`,
  borderRadius: '0px 0px 2px 2px',
  height: '50px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.white,
  fontWeight: 'bold'
}));
const IconFood = styled(Icon)(({ theme }) => ({
  width: '50px',
  height: '50px',
  color: theme.palette.white
}));
const BoxBody = styled(Card)(({ theme }) => ({
  width: '60%',
  background: theme.palette.white,
  position: 'absolute',
  padding: '10px',
  bottom: 25,
  left: '20%'
}));
const Value = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '25px',
  fontFamily: theme.typography.fontFamily.primary,
  color: colorArea
}));
function BoxArea() {
  const allAreas = useSelector((state) => state.area.allAreas);
  const allTables = useSelector((state) => state.table.allTables);
  return (
    <RootStyle container>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ width: '100%', padding: '10px' }}>
        <IconButton
          sx={{ width: '100%' }}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          disabled
        >
          <Wrapper>
            <BoxHead>
              <Title>Số lượng khu vực</Title>
              <IconFood icon="tabler:chart-area-line" />
            </BoxHead>
            <BoxBody elevation={3}>
              <Value>{allAreas.length}</Value>
            </BoxBody>
            <BoxFoot> </BoxFoot>
          </Wrapper>
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{ width: '100%', padding: '10px' }}>
        <IconButton
          sx={{ width: '100%' }}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          disabled
        >
          <Wrapper>
            <BoxHead sx={{ background: colorTable }}>
              <Title>Số lượng bàn</Title>
              <IconFood icon="ic:outline-table-bar" />
            </BoxHead>
            <BoxBody elevation={3}>
              <Value sx={{ color: colorTable }}>{allTables.length}</Value>
            </BoxBody>
            <BoxFoot> </BoxFoot>
          </Wrapper>
        </IconButton>
      </Grid>
    </RootStyle>
  );
}

export default BoxArea;
