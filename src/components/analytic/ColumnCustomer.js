import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  borderRadius: '2px',
  border: `1px solid lightgrey`
}));
function ColumnCustomer() {
  const [state, setState] = useState({
    series: [
      {
        name: 'Nam',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 12, 31, 32]
      },
      {
        name: 'Tổng khách hàng',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 42, 32, 32]
      },
      {
        name: 'Nữ',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 32, 34, 31]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        text: `Khách hàng trong năm ${new Date().getFullYear()}`,
        align: 'center'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          borderRadius: 10
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
        categories: [
          'Tháng 1',
          'Tháng 2',
          'Tháng 3',
          'Tháng 4',
          'Tháng 5',
          'Tháng 6',
          'Tháng 7',
          'Tháng 8',
          'Tháng 9',
          'Tháng 10',
          'Tháng 11',
          'Tháng 12'
        ],
        labels: {
          style: {
            fontSize: '8px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            cssClass: 'apexcharts-xaxis-label'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Khách hàng (người)',
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
            return `${val} người`;
          }
        }
      }
    }
  });
  return (
    <RootStyle>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </RootStyle>
  );
}

export default ColumnCustomer;
