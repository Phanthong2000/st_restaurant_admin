import { Box, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  borderRadius: '5px',
  border: `1px solid lightgrey`,
  padding: '10px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '15px',
  fontFamily: theme.typography.fontFamily.primary
}));
function LineTotalNewCustomerInWeek() {
  const newCustomer = useSelector((state) => state.customer.newCustomer);
  const [optionsNewCustomer, setOptionsNewCustomer] = useState({});
  useEffect(() => {
    setOptionsNewCustomer({
      series: [
        {
          name: 'Khách hàng mới',
          data: newCustomer.data
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: 10,
            startingShape: 'rounded',
            endingShape: 'rounded',
            borderRadius: 4
          }
        },
        dataLabels: {
          enabled: false
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
        xaxis: {
          categories: newCustomer.categories,
          tickAmount: 10,
          labels: {
            style: {
              fontSize: '12px',
              fontWeight: 'bold',
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
        title: {
          text: '',
          align: 'left',
          style: {
            fontSize: '15px',
            color: '#000',
            fontFamily: 'san-serif'
          }
        },
        yaxis: {
          min: 0,
          max: newCustomer.total,
          title: {
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'san-serif'
            }
          },
          labels: {
            formatter: (value) => value.toFixed(0)
          }
        }
      }
    });
    return function () {
      return null;
    };
  }, [newCustomer]);
  if (optionsNewCustomer.series === undefined) return null;
  return (
    <Box sx={{ width: '100%', padding: '10px' }}>
      <RootStyle>
        <Title>Khách hàng mới trong tuần</Title>
        <ReactApexChart
          options={optionsNewCustomer.options}
          series={optionsNewCustomer.series}
          type="bar"
          height={250}
        />
      </RootStyle>
    </Box>
  );
}

export default LineTotalNewCustomerInWeek;
