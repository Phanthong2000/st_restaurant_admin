import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '2px'
}));
function ColumnRevenueYear() {
  //   const [state, setState] = useState({
  //     series: [
  //       {
  //         name: 'Doanh thu',
  //         type: 'column',
  //         data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 100, 28, 1]
  //       }
  //     ],
  //     options: {
  //       chart: {
  //         type: 'bar',
  //         height: 350
  //       },
  //       plotOptions: {
  //         bar: {
  //           horizontal: false,
  //           columnWidth: '20%',
  //           endingShape: 'rounded'
  //         }
  //       },
  //       dataLabels: {
  //         enabled: false
  //       },
  //       stroke: {
  //         show: true,
  //         width: 1,
  //         colors: ['transparent']
  //       },
  //       xaxis: {
  //         categories: [
  //           'Tháng 1',
  //           'Tháng 2',
  //           'Tháng 3',
  //           'Tháng 4',
  //           'Tháng 5',
  //           'Tháng 6',
  //           'Tháng 7',
  //           'Tháng 8',
  //           'Tháng 9',
  //           'Tháng 10',
  //           'Tháng 11',
  //           'Tháng 12'
  //         ],
  //         labels: {
  //           style: {
  //             fontSize: '8px',
  //             fontFamily: 'Helvetica, Arial, sans-serif',
  //             fontWeight: 'bold',
  //             cssClass: 'apexcharts-xaxis-label'
  //           }
  //         }
  //       },
  //       yaxis: {
  //         title: {
  //           text: 'Doanh thu (vnđ)'
  //         }
  //       },
  //       fill: {
  //         opacity: 1
  //       },
  //       tooltip: {
  //         y: {
  //           formatter(val) {
  //             return `${val} vnđ`;
  //           }
  //         }
  //       }
  //     }
  //   });

  const [state, setState] = useState({
    series: [
      {
        name: 'Đơn đặt bàn',
        type: 'column',
        data: [3, 22, 23, 15, 25, 28, 38, 46, 32, 12, 54, 12]
      },
      {
        name: 'Hoá đơn',
        type: 'column',
        data: [11, 3, 31, 4, 41, 49, 65, 85, 32, 12, 32, 42]
      },
      {
        name: 'Doanh thu',
        type: 'line',
        data: [
          2032120321, 2213920321, 3213720321, 3543620321, 4432420321, 4532520321, 5522020321,
          5432820321, 4213220321, 1132220321, 3214320321, 3213213212
        ]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      markers: {
        size: 6,
        strokeWidth: 3,
        fillOpacity: 0,
        strokeOpacity: 0,
        hover: {
          size: 8
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
          endingShape: 'rounded',
          borderRadius: 10
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: `Thông kê doanh thu - đơn đặt bàn - hoá đơn trong năm ${new Date().getFullYear()}`,
        align: 'left',
        style: {
          fontFamily: 'san-serif',
          fontWeight: 'bold',
          fontSize: '16px'
        }
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
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#008FFB'
          },
          labels: {
            style: {
              colors: '#008FFB'
            }
          },
          title: {
            text: 'Đơn đặt bàn',
            style: {
              color: '#008FFB',
              fontFamily: 'san-serif',
              fontWeight: 'bold',
              fontSize: '16px'
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: 'Income',
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#00E396'
          },
          labels: {
            style: {
              colors: '#00E396'
            }
          },
          title: {
            text: 'Hoá đơn',
            style: {
              color: '#00E396',
              fontFamily: 'san-serif',
              fontWeight: 'bold',
              fontSize: '16px'
            }
          }
        },
        {
          seriesName: 'Doanh thu',
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: '#FEB019'
          },
          labels: {
            style: {
              colors: '#FEB019'
            }
          },
          title: {
            text: 'Doanh thu (vnđ)',
            style: {
              color: '#FEB019',
              fontFamily: 'san-serif',
              fontWeight: 'bold',
              fontSize: '16px'
            }
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40
      }
    }
  });
  return (
    <Box sx={{ width: '100%', padding: '10px' }}>
      <RootStyle>
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </RootStyle>
    </Box>
  );
}

export default ColumnRevenueYear;
