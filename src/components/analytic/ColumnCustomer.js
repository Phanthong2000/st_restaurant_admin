import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  borderRadius: '2px',
  border: `1px solid lightgrey`
}));
function ColumnCustomer() {
  const columnCustomersYear = useSelector((state) => state.analytic.columnCustomersYear);
  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      series: [
        {
          name: 'Nam',
          data: columnCustomersYear.male
        },
        {
          name: 'Tổng khách hàng',
          data: columnCustomersYear.total
        },
        {
          name: 'Nữ',
          data: columnCustomersYear.female
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
    return function () {
      return null;
    };
  }, [columnCustomersYear]);
  if (
    state.series === undefined ||
    columnCustomersYear.total.length === 0 ||
    columnCustomersYear.male.length === 0 ||
    columnCustomersYear.female.length === 0
  )
    return null;
  return (
    <RootStyle>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={360} />
    </RootStyle>
  );
}

export default ColumnCustomer;
