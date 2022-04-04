import { Box, styled } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '196px',
  background: theme.palette.white
}));
function PolarStatusCustomer() {
  const customerEffect = useSelector((state) => state.customer.customerEffect);
  const customerBlock = useSelector((state) => state.customer.customerBlock);
  const [state, setState] = useState({
    series: [customerEffect.length, customerBlock.length],
    options: {
      chart: {
        type: 'polarArea',
        background: undefined
      },
      labels: ['Hiệu lực', 'Đã khoá'],
      fill: {
        opacity: 1
      },
      stroke: {
        width: 1,
        colors: undefined
      },
      title: {
        text: 'Trạng thái khách hàng',
        align: 'center',
        style: {
          fontSize: '16px',
          color: '#666',
          fontFamily: 'inherit'
        }
      },
      yaxis: {
        show: false
      },
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          },
          spokes: {
            strokeWidth: 0
          }
        }
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
    <Box
      sx={{
        width: '100%',
        padding: '1px',
        border: `1px solid lightgrey`,
        background: '#fff',
        borderRadius: '2px'
      }}
    >
      <RootStyle>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="polarArea"
          width="100%"
        />
      </RootStyle>
    </Box>
  );
}

export default PolarStatusCustomer;
