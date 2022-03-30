import React from 'react';
import { Card, styled, Typography, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import boxSortConfig from './BoxSortConfig';
import { actionCustomerSortCustomer } from '../../redux/actions/customerAction';

const RootStyle = styled(Card)(({ theme }) => ({
  width: '60%',
  background: theme.palette.white,
  margin: '20px 0px 20px 20%',
  padding: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    width: '80%',
    margin: '10px 10%'
  }
}));
const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '20px'
}));
const BoxContent = styled(Box)(({ theme }) => ({
  width: '100%'
}));
const ButtonSort = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.black,
  background: theme.palette.white,
  fontWeight: 'bold',
  marginRight: '10px',
  marginTop: '10px',
  ':hover': {
    background: theme.palette.lightgrey
  }
}));
function BoxSort() {
  const sortCustomer = useSelector((state) => state.customer.sortCustomer);
  const dispatch = useDispatch();
  const chooseSort = (value) => {
    dispatch(actionCustomerSortCustomer(value));
  };
  return (
    <RootStyle>
      <Title>Sắp xếp theo: </Title>
      <BoxContent>
        {boxSortConfig.map((item, index) => (
          <ButtonSort
            onClick={() => chooseSort(item.value)}
            key={index}
            sx={
              sortCustomer === item.value && {
                background: '#3C58C9',
                color: '#fff',
                '&:hover': {
                  background: '#4d91f7'
                }
              }
            }
          >
            {item.name}
          </ButtonSort>
        ))}
      </BoxContent>
    </RootStyle>
  );
}

export default BoxSort;
