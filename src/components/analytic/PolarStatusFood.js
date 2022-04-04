import { styled } from '@mui/material';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function PolarStatusFood() {
  const foodsSelling = useSelector((state) => state.analytic.foodsSelling);
  const foodsStopSell = useSelector((state) => state.analytic.foodsStopSell);
  const [state, setState] = useState({
    series: [foodsSelling, foodsStopSell],
    options: {
      chart: {
        type: 'polarArea',
        background: '#fff'
      },
      labels: ['Đang bán', 'Hết bán'],
      fill: {
        opacity: 1
      },
      stroke: {
        width: 1,
        colors: undefined
      },
      title: {
        text: 'Trạng thái món ăn',
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
            return `${val} món ăn`;
          }
        }
      }
    }
  });
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="polarArea"
      width="100%"
      height={200}
    />
  );
}

export default PolarStatusFood;
