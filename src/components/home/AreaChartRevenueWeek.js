import React, { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Divider, styled, Typography } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
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
  background: theme.palette.mainHover,
  fontWeight: 'bold',
  padding: '5px 10px',
  fontFamily: theme.typography.fontFamily.primary,
  borderRadius: '5px'
}));
const ButtonGroupTime = styled(ButtonGroup)(({ theme }) => ({
  background: theme.palette.white,
  borderRadius: '50px'
}));
const ButtonTime = styled(Button)(({ theme }) => ({
  background: theme.palette.white,
  color: theme.palette.main,
  textTransform: 'none',
  ':hover': {
    color: theme.palette.main
  }
}));
function AreaChartRevenueWeek() {
  const [state, setState] = useState({});
  const [time, setTime] = useState('week');
  const revenueWeek = useSelector((state) => state.analytic.revenueWeek);
  const columnRevenueRevenue = useSelector((state) => state.analytic.columnRevenueRevenue);
  const totalRevenueRevenue = useSelector((state) => state.analytic.totalRevenueRevenue);
  useEffect(() => {
    setState({
      series: [
        {
          name: 'Doanh thu',
          data: revenueWeek.data
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
        stroke: {
          curve: 'smooth',
          width: 3
        },
        xaxis: {
          categories: revenueWeek.categories,
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
            formatter: (val) => `${val.toLocaleString(`es-US`)} vnđ`
          }
        }
      }
    });
    return function () {
      return null;
    };
  }, [revenueWeek]);
  if (state.series === undefined) return null;
  const handleClick = (value) => {
    setTime(value);
    if (value === 'week') {
      setState({
        series: [
          {
            name: 'Doanh thu',
            data: revenueWeek.data
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
          stroke: {
            curve: 'smooth',
            width: 3
          },
          xaxis: {
            categories: revenueWeek.categories,
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
              formatter: (val) => `${val.toLocaleString(`es-US`)} vnđ`
            }
          }
        }
      });
    } else if (value === 'month') {
      console.log('month');
    } else {
      setState({
        series: [
          {
            name: 'Doanh thu',
            data: columnRevenueRevenue
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
          stroke: {
            curve: 'smooth',
            width: 3
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
              formatter: (val) => `${val.toLocaleString(`es-US`)} vnđ`
            }
          }
        }
      });
    }
  };
  const handleTime = () => {
    if (time === 'week') return `tuần`;
    if (time === 'month') return `tháng`;
    return `năm`;
  };
  const handleTotal = () => {
    if (time === 'week') return `${revenueWeek.total.toLocaleString(`es-US`)}`;
    if (time === 'month') return `tháng`;
    return `${totalRevenueRevenue.toLocaleString(`es-US`)}`;
  };
  return (
    <RootStyle>
      <Wrapper>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title>Doanh thu trong {handleTime()}</Title>
          <ButtonGroupTime>
            <ButtonTime
              onClick={() => handleClick('week')}
              sx={{
                borderTopLeftRadius: '50px',
                borderBottomLeftRadius: '50px',
                background: time === 'week' && `#3C58C9`,
                color: time === 'week' && `#fff`
              }}
            >
              Tuần
            </ButtonTime>
            <ButtonTime
              onClick={() => handleClick('month')}
              sx={{
                background: time === 'month' && `#3C58C9`,
                color: time === 'month' && `#fff`
              }}
            >
              Tháng
            </ButtonTime>
            <ButtonTime
              onClick={() => handleClick('year')}
              sx={{
                borderTopRightRadius: '50px',
                borderBottomRightRadius: '50px',
                background: time === 'year' && `#3C58C9`,
                color: time === 'year' && `#fff`
              }}
            >
              Năm
            </ButtonTime>
          </ButtonGroupTime>
          <BoxTotal>Tổng doanh thu: {handleTotal()} vnđ</BoxTotal>
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

export default AreaChartRevenueWeek;
