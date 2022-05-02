import React, { useEffect, useState } from 'react';
import { styled, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  border: `1px solid lightgrey`,
  borderRadius: '2px',
  background: theme.palette.white
}));
function ColumnTop10Table() {
  const [state, setState] = useState({});
  const top10Table = useSelector((state) => state.analytic.top10Table);
  useEffect(() => {
    setState({
      series: [
        {
          data: top10Table.columnData,
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
          text: `Top 10 bàn được đặt nhiều nhất`,
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
                  from: top10Table.columnData.at(0),
                  to: top10Table.columnData.at(0),
                  color: '#6df792'
                }
              ]
            }
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
          categories: top10Table.columnName,
          title: {
            text: '',
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
          },
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          min: 0,
          max: top10Table.columnData.at(0) + 5,
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
  }, [top10Table]);
  if (state.series === undefined) return null;
  return (
    <Box sx={{ width: '40%', padding: '10px' }}>
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

export default ColumnTop10Table;
