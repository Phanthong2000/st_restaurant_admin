import React, { useEffect, useState } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';
import { fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '10px'
}));
const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid lightgrey`,
  borderRadius: '5px',
  padding: '10px',
  background: theme.palette.white
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '15px',
  fontFamily: theme.typography.fontFamily.primary
}));
const BoxTotal = styled(Box)(({ theme }) => ({
  display: 'flex',
  color: theme.palette.white,
  background: '#B78103',
  fontWeight: 'bold',
  padding: '5px 10px',
  fontFamily: theme.typography.fontFamily.primary,
  borderRadius: '5px',
  fontSize: '15px'
}));
function AreaChartOrderWeek() {
  const [state, setState] = useState({});
  const orderWeek = useSelector((state) => state.analytic.orderWeek);
  useEffect(() => {
    setState({
      series: [
        {
          name: 'Hoá đơn',
          data: orderWeek.data
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'area'
        },
        markers: {
          size: 5,
          strokeWidth: 2,
          fillOpacity: 0,
          strokeOpacity: 0,
          hover: {
            size: 7
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#B78103'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        xaxis: {
          categories: orderWeek.categories,
          labels: {
            style: {
              fontSize: '10px',
              fontWeight: 'bold'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 'bold'
            },
            formatter: (val) => `${fShortenNumber(val)}`
          }
        },
        tooltip: {
          y: {
            formatter: (val) => `${val.toLocaleString(`es-US`)}`
          }
        }
      }
    });
    return function () {
      return null;
    };
  }, [orderWeek]);
  if (state.series === undefined) return null;
  return (
    <RootStyle>
      <Wrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title>Hoá đơn trong tuần</Title>
          <BoxTotal>Tổng hoá đơn: {orderWeek.total.toLocaleString(`es-US`)} đơn</BoxTotal>
        </Box>
        <Divider sx={{ marginTop: '20px' }} />
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={300}
          width="100%"
        />
      </Wrapper>
    </RootStyle>
  );
}

export default AreaChartOrderWeek;
