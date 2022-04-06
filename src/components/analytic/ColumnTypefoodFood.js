import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid lightgrey`,
  borderRadius: '2px',
  background: theme.palette.white
}));
function ColumnTypefoodFood() {
  const columnTypefoodFood = useSelector((state) => state.analytic.columnTypefoodFood);
  const [state, setState] = useState({
    series: [
      {
        name: 'Món ăn',
        data: columnTypefoodFood.data
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: 'Số lượng món ăn theo từng loại',
        align: 'center',
        style: {
          fontFamily: 'san-serif',
          fontWeight: 'bold',
          fontSize: '16px'
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: 20,
          endingShape: 'rounded',
          borderRadius: 20
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: columnTypefoodFood.name,
        labels: {
          style: {
            fontWeight: 'bold',
            fontFamily: 'san-serif',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Số lượng món ăn',
          style: {
            fontFamily: 'san-serif',
            fontWeight: 'bold',
            fontSize: '14px'
          }
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            return `${+val} món ăn`;
          }
        }
      }
    }
  });
  return (
    <Box sx={{ width: '50%', padding: '10px' }}>
      <RootStyle>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </RootStyle>
    </Box>
  );
}

export default ColumnTypefoodFood;
