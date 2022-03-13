import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

function PolarAreaGenderCustomer() {
  const genderCustomer = useSelector((state) => state.customer.genderCustomer);
  const [options, setOptions] = useState({});
  useEffect(() => {
    setOptions({
      series: genderCustomer,
      options: {
        chart: {
          width: 380,
          type: 'polarArea'
        },
        labels: ['Nam', 'Nữ'],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        title: {
          text: 'Tỉ lệ giới tính khách hàng',
          align: 'left',
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
        }
      }
    });
    return function () {
      return null;
    };
  }, [genderCustomer]);
  if (options.series === undefined) return null;
  return (
    <ReactApexChart
      options={options.options}
      series={options.series}
      type="polarArea"
      height={350}
    />
  );
}

export default PolarAreaGenderCustomer;
