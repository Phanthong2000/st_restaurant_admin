import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

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
          height: 200,
          type: 'line'
        },
        stroke: {
          width: 2,
          curve: 'smooth'
        },
        xaxis: {
          categories: newCustomer.categories,
          tickAmount: 10
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
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#FDD835'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1
          }
        },
        yaxis: {
          min: 0,
          max: newCustomer.total + 5
        }
      }
    });
    return function () {
      return null;
    };
  }, [newCustomer]);
  if (optionsNewCustomer.series === undefined) return null;
  return (
    <ReactApexChart
      options={optionsNewCustomer.options}
      series={optionsNewCustomer.series}
      type="line"
      height={250}
    />
  );
}

export default LineTotalNewCustomerInWeek;
