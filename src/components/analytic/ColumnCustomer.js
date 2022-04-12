import {
  Box,
  styled,
  Typography,
  Grid,
  Radio,
  Button,
  ListItemButton,
  Popover,
  Card
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { fShortenNumber } from '../../utils/formatNumber';
import { actionColumnCustomersYear } from '../../redux/actions/analyticAction';

const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  background: theme.palette.white,
  borderRadius: '2px',
  border: `1px solid lightgrey`
}));
const BoxOption = styled(Box)(({ theme }) => ({
  padding: '5px',
  marginLeft: '20px'
}));
const BoxButtonOption = styled(Box)(({ theme }) => ({
  padding: '5px',
  border: `1px solid lightgrey`,
  marginLeft: '20px',
  borderRadius: '5px'
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '12px'
}));
const ButtonOption = styled(Button)(({ theme }) => ({
  background: theme.palette.white,
  color: 'gray',
  textTransform: 'none',
  border: `1px solid lightgrey`,
  marginLeft: '5px',
  width: '120px',
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'left'
}));
function Analytic({ title, icon, value, color }) {
  const BoxAnalytic = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '100%',
    border: `1px solid lightgrey`,
    borderRadius: '5px',
    width: '100%',
    alignItems: 'center'
  }));
  const Title = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    fontSize: '10px',
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.palette.gray
  }));
  const IconAnalytic = styled(Icon)(({ theme }) => ({
    width: '30px',
    height: '30px',
    color
  }));
  const Value = styled(Typography)(({ theme }) => ({
    padding: '2px 10px',
    background: color,
    color: theme.palette.white,
    fontWeight: 'bold',
    fontSize: '10px',
    borderRadius: '5px',
    fontFamily: theme.typography.fontFamily.primary
  }));
  return (
    <Grid
      sx={{
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
      item
      xs={4}
      sm={4}
      md={4}
      lg={4}
      xl={4}
    >
      <BoxAnalytic>
        <Title>{title}</Title>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%'
          }}
        >
          <IconAnalytic icon={icon} />
          <Value>{fShortenNumber(value)}</Value>
        </Box>
      </BoxAnalytic>
    </Grid>
  );
}
function Year({ year, handleChooseYear }) {
  return (
    <ListItemButton sx={{ width: '100px' }} onClick={() => handleChooseYear(year)}>
      {year}
    </ListItemButton>
  );
}
function Row1Month({ month, handleChooseMonth }) {
  const Box1Month = styled(Grid)(({ theme }) => ({
    width: '100%',
    padding: '5px'
  }));
  return (
    <Box1Month item xs={4} sm={4} md={4} lg={4} xl={4}>
      <ListItemButton onClick={() => handleChooseMonth(month)}>Tháng {month}</ListItemButton>
    </Box1Month>
  );
}
function Row3Month({ months, handleChooseMonth }) {
  const BoxRow3Month = styled(Grid)(({ theme }) => ({
    width: '300px'
  }));
  return (
    <BoxRow3Month container>
      {months.map((item, index) => (
        <Row1Month handleChooseMonth={handleChooseMonth} key={item} month={item} />
      ))}
    </BoxRow3Month>
  );
}
function ColumnCustomer() {
  const columnCustomersYear = useSelector((state) => state.analytic.columnCustomersYear);
  const [sort, setSort] = useState('year');
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(0);
  const [anchorElMonth, setAnchorElMonth] = React.useState(null);
  const [anchorElYear, setAnchorElYear] = React.useState(null);
  const handleClickMonth = (event) => {
    setAnchorElMonth(event.currentTarget);
  };
  const handleCloseMonth = () => {
    setAnchorElMonth(null);
  };
  const openMonth = Boolean(anchorElMonth);
  const handleClickYear = (event) => {
    setAnchorElYear(event.currentTarget);
  };
  const handleCloseYear = () => {
    setAnchorElYear(null);
  };
  const openYear = Boolean(anchorElYear);
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
          text: `Khách hàng trong ${month === 0 ? `` : `tháng ${month}`} ${
            year === 0 ? `` : `năm ${year}`
          }`,
          align: 'center'
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: sort === 'month' ? '100%' : '55%',
            endingShape: 'rounded',
            borderRadius: sort === 'month' ? 3 : 5
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
          categories:
            sort === 'year'
              ? [
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
                ]
              : [
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 18, 20, 21, 22, 23,
                  24, 25, 26, 27, 28, 29, 30, 31
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
  const handleChangeSort = (value) => {
    setSort(value);
    setMonth(0);
    setYear(0);
  };
  const months = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
  ];
  const handleChooseMonth = (value) => {
    setMonth(value);
    setYear(0);
    handleCloseMonth();
  };
  const checkYear = () => {
    const years = [];
    for (let i = 2022; i < new Date().getFullYear() + 2; i += 1) {
      years.push(i);
    }
    return years;
  };
  const handleChooseYear = (year) => {
    setYear(year);
    handleCloseYear();
    if (sort === 'month') {
      if (month < 10) {
        dispatch(actionColumnCustomersYear('month', `0${month}`, year));
      } else dispatch(actionColumnCustomersYear('month', month, year));
    } else {
      dispatch(actionColumnCustomersYear('year', new Date().getMonth(), year));
    }
  };
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
      <BoxOption>
        <Title>Thống kê theo</Title>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Radio
                checked={sort === 'year'}
                onChange={() => handleChangeSort('year')}
                title="Năm"
              />
              <Title sx={{ fontWeight: 'bold', fontSize: '12px' }}>Năm</Title>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Radio
                checked={sort === 'month'}
                onChange={() => handleChangeSort('month')}
                title="Tháng"
              />
              <Title sx={{ fontWeight: 'bold', fontSize: '12px' }}>Tháng</Title>
            </Box>
          </Box>
          <BoxButtonOption>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Title>Tháng: </Title>
              <ButtonOption
                onClick={handleClickMonth}
                disabled={sort === 'year'}
                startIcon={<Icon icon="dashicons:calendar-alt" />}
              >
                {month === 0 ? `Chọn tháng` : `Tháng ${month}`}
              </ButtonOption>
              <Popover
                open={openMonth}
                anchorEl={anchorElMonth}
                onClose={handleCloseMonth}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Card sx={{ zIndex: 10, background: '#fff' }}>
                  {months.map((item, index) => (
                    <Row3Month handleChooseMonth={handleChooseMonth} key={index} months={item} />
                  ))}
                </Card>
              </Popover>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '10px',
                justifyContent: 'space-between'
              }}
            >
              <Title>Năm: </Title>
              <ButtonOption
                disabled={year === 0 && month === 0 && sort === 'month'}
                onClick={handleClickYear}
                startIcon={<Icon icon="dashicons:calendar-alt" />}
              >
                {year === 0 ? `Chọn năm` : `Năm ${year}`}
              </ButtonOption>
              <Popover
                open={openYear}
                anchorEl={anchorElYear}
                onClose={handleCloseYear}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
              >
                <Card sx={{ zIndex: 10, background: '#fff' }}>
                  {checkYear().map((item, index) => (
                    <Year key={item} year={item} handleChooseYear={handleChooseYear} />
                  ))}
                </Card>
              </Popover>
            </Box>
          </BoxButtonOption>
          <Grid container>
            <Analytic
              icon="ant-design:user-outlined"
              title="Tổng khách hàng"
              value={columnCustomersYear.totalSum}
              color="#ff4a00"
            />
            <Analytic
              icon="bi:gender-male"
              title="Tổng khách hàng nam"
              value={columnCustomersYear.maleSum}
              color="#3C58C9"
            />
            <Analytic
              icon="bi:gender-female"
              title="Tổng khách hàng nữ"
              value={columnCustomersYear.femaleSum}
              color="#f4ab55"
            />
          </Grid>
        </Box>
      </BoxOption>
    </RootStyle>
  );
}

export default ColumnCustomer;
