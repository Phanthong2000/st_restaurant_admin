import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { fShortenNumber } from '../../utils/formatNumber';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  border: `1px solid lightgrey`,
  borderRadius: '2px'
}));
function ColumnRevenueYear() {
  const columnRevenueBook = useSelector((state) => state.analytic.columnRevenueBook);
  const columnRevenueOrder = useSelector((state) => state.analytic.columnRevenueOrder);
  const columnRevenueRevenue = useSelector((state) => state.analytic.columnRevenueRevenue);
  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      series: [
        {
          name: 'Đơn đặt bàn',
          type: 'column',
          data: columnRevenueBook
        },
        {
          name: 'Hoá đơn',
          type: 'column',
          data: columnRevenueOrder
        },
        {
          name: 'Doanh thu',
          type: 'line',
          data: columnRevenueRevenue
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
              },
              formatter: (val) => `${fShortenNumber(val)}`
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
          },
          y: {
            formatter(val) {
              return `${val.toLocaleString(`es-US`)}`;
            }
          }
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      }
    });
    return function () {
      return null;
    };
  }, [columnRevenueBook, columnRevenueRevenue, columnRevenueOrder]);
  if (
    columnRevenueBook.length === 0 ||
    columnRevenueRevenue.length === 0 ||
    columnRevenueOrder.length === 0 ||
    state.options === undefined
  )
    return null;
  return (
    <Box sx={{ width: '100%', padding: '10px' }}>
      <RootStyle>
        <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
      </RootStyle>
    </Box>
  );
}

export default ColumnRevenueYear;
