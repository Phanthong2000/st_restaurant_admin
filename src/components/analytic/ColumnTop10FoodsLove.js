import { Box, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid lightgrey`,
  borderRadius: '2px',
  background: theme.palette.white
}));
function ColumnTop10FoodsLove() {
  const top10FoodsLove = useSelector((state) => state.analytic.top10FoodsLove);
  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      series: [
        {
          data: top10FoodsLove.value,
          type: 'column',
          name: 'Lượt thích'
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        title: {
          align: 'left',
          text: `Top 10 món ăn được thích nhiều nhất`,
          style: {
            fontSize: '12px',
            fontFamily: 'san-serif'
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
                  from: top10FoodsLove.value.at(0),
                  to: top10FoodsLove.value.at(0),
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
          categories: top10FoodsLove.name,
          title: {
            text: 'Số lượt thích',
            style: {
              fontWeight: 'bold',
              fontSize: '12px',
              fontFamily: 'san-serif'
            }
          },
          labels: {
            formatter(val) {
              return `${val.toFixed(0)}`;
            }
          }
        },
        yaxis: {
          min: 0,
          max: top10FoodsLove.value.at(0) + 5,
          labels: {
            style: {
              fontSize: '8px',
              fontWeight: 'bold'
            }
          }
        },
        tooltip: {
          y: {
            formatter(val) {
              return `${val}`;
            }
          }
        }
      }
    });
    return function () {
      return null;
    };
  }, [top10FoodsLove]);
  if (state.series === undefined) return null;
  return (
    <Box sx={{ width: '50%', padding: '10px' }}>
      <RootStyle>
        <ReactApexChart
          options={state.options}
          height={350}
          series={state.series}
          type="bar"
          width="100%"
        />
      </RootStyle>
    </Box>
  );
}

export default ColumnTop10FoodsLove;
