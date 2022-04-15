import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function PolarWayPay() {
  const user = useSelector((state) => state.user.user);
  const top10Customer = useSelector((state) => state.analytic.top10Customer);
  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      series: [
        {
          data: top10Customer.data,
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
            barHeight: '30%',
            colors: {
              ranges: [
                {
                  from: top10Customer.data.at(0),
                  to: top10Customer.data.at(0),
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
          categories: top10Customer.categories,
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
          y: {
            formatter: (val) => `${val.toFixed(0)}`
          }
        }
      }
    });
    return function () {
      return null;
    };
  }, [top10Customer]);
  if (state.series === undefined) return null;
  return (
    <RootStyle>
      <ReactApexChart
        options={state.options}
        height={350}
        series={state.series}
        type="bar"
        width="100%"
      />
    </RootStyle>
  );
}

export default PolarWayPay;
