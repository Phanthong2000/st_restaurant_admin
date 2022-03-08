import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  actionGetAllFoods,
  actionGetAllFoodsByName,
  actionGetAllTypeFoods
} from '../redux/actions/foodAction';
import {
  actionGetAllCustomerByKeyword,
  actionGetAllCustomers
} from '../redux/actions/customerAction';
import { actionGetAllEmployees } from '../redux/actions/employeeAction';

function UtilRedux() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(actionGetAllCustomers());
    dispatch(actionGetAllTypeFoods());
    dispatch(actionGetAllFoods());
    dispatch(actionGetAllEmployees());
    dispatch(actionGetAllFoodsByName(''));
    dispatch(actionGetAllCustomerByKeyword(''));
    return function () {
      return null;
    };
  }, []);
  return null;
}

export default UtilRedux;
