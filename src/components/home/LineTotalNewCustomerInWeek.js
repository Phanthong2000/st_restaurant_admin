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
          curve: 'straight'
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
            text: 'Số lượng khách hàng (người)',
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
    <ReactApexChart
      options={optionsNewCustomer.options}
      series={optionsNewCustomer.series}
      type="line"
      height={250}
    />
  );
}

export default LineTotalNewCustomerInWeek;
