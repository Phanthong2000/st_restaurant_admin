import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function PolarWayPay() {
  const user = useSelector((state) => state.user.user);
  const [state, setState] = useState({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
        type: 'column',
        name: 'Đơn đặt bàn'
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      title: {
        align: 'left',
        text: `Top 10 khách hàng đặt bàn nhiều nhất`,
        style: {
          fontSize: '12px',
          fontFamily: 'san-serif'
        }
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
          barHeight: '20%',
          colors: {
            ranges: [
              {
                from: 1380,
                to: 1380,
                color: '#6df792'
              }
            ]
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          'Khách hàng 01',
          'Khách hàng 02',
          'Khách hàng 03',
          'Khách hàng 04',
          'Khách hàng 05',
          'Khách hàng 06',
          'Khách hàng 07',
          'Khách hàng 08',
          'Khách hàng 09',
          'Khách hàng 10'
        ],
        title: {
          text: 'Số lượng đơn đặt bàn',
          style: {
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'san-serif'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '8px',
            fontWeight: 'bold'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      tooltip: {
        // eslint-disable-next-line react/no-unstable-nested-components
        custom: ({ series, seriesIndex, dataPointIndex, w }) => `<img src={${user.anhDaiDien}} />`
      }
    }
  });
  return (
    <RootStyle>
      <ReactApexChart
        options={state.options}
        height={350}
        series={state.series}
        type="bar"
        width={300}
      />
    </RootStyle>
  );
}

export default PolarWayPay;
