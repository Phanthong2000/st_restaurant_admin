import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  borderRadius: '2px',
  border: `1px solid lightgrey`
}));
function ColumnAreaTable() {
  const columnAreaTable = useSelector((state) => state.analytic.columnAreaTable);
  const [state, setState] = useState({});
  useEffect(() => {
    setState({
      series: [
        {
          name: 'Bàn',
          data: columnAreaTable.columnData
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        title: {
          text: 'Thống kê bàn theo khu vực',
          align: 'center',
          style: {
            fontFamily: 'san-serif',
            fontWeight: 'bold',
            fontSize: '14px'
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: 20,
            endingShape: 'rounded',
            borderRadius: 20
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
        legend: {
          position: 'top'
        },
        xaxis: {
          categories: columnAreaTable.columnName,
          labels: {
            style: {
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              cssClass: 'apexcharts-xaxis-label'
            }
          }
        },
        yaxis: {
          title: {
            text: '',
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
  }, [columnAreaTable]);
  if (state.series === undefined) return null;
  return (
    <Box sx={{ width: '60%', padding: '10px' }}>
      <RootStyle>
        <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      </RootStyle>
    </Box>
  );
}

export default ColumnAreaTable;
