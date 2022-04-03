import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionGetAllFoods,
  actionGetAllFoodsByName,
  actionGetAllTypeFoods
} from '../redux/actions/foodAction';
import {
  actionGetAllCustomerByKeyword,
  actionGetAllCustomers,
  actionGetGenderCustomer,
  actionGetNewCustomerInWeek
} from '../redux/actions/customerAction';
import {
  actionGetAllEmployees,
  actionGetEmployeesByKeywords
} from '../redux/actions/employeeAction';
import {
  actionGetAllFeedbacks,
  actionGetAllNotifications,
  actionGetUser
} from '../redux/actions/userAction';
import {
  actionGetAllWayPay,
  actionGetBooksByKeyword,
  actionGetBooksNow,
  actionGetOrdersNow,
  actionGetTotalNow,
  actionNewBooks
} from '../redux/actions/orderAction';
import { actionGetAllAreas } from '../redux/actions/areaAction';

function UtilRedux() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    dispatch(actionGetAllCustomers());
    dispatch(actionGetAllTypeFoods());
    // dispatch(actionGetAllFoods());
    // dispatch(actionGetAllEmployees());
    dispatch(actionGetEmployeesByKeywords(''));
    dispatch(actionGetAllFoodsByName(''));
    dispatch(actionGetAllCustomerByKeyword(''));
    dispatch(actionGetGenderCustomer());
    dispatch(actionGetNewCustomerInWeek());
    dispatch(actionGetBooksByKeyword(''));
    dispatch(actionNewBooks());
    dispatch(actionGetAllAreas());
    dispatch(actionGetAllWayPay());
    dispatch(actionGetAllNotifications());
    dispatch(actionGetAllFeedbacks());
    dispatch(actionGetOrdersNow());
    dispatch(actionGetBooksNow());
    dispatch(actionGetTotalNow());
    if (loggedIn) dispatch(actionGetUser(JSON.parse(localStorage.getItem('admin')).id));
    return function () {
      return null;
    };
  }, []);
  return null;
}

export default UtilRedux;
