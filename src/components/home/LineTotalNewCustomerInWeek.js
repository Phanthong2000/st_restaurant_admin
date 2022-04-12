import { Box, styled } from '@mui/material';
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
          text: 'Khách hàng mới trong tuần',
          align: 'left',
          style: {
            fontSize: '16px',
            color: '#666',
            fontFamily: 'inherit'
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
    <RootStyle>
      <ReactApexChart
        options={optionsNewCustomer.options}
        series={optionsNewCustomer.series}
        type="bar"
        height={250}
      />
    </RootStyle>
  );
}

export default LineTotalNewCustomerInWeek;
