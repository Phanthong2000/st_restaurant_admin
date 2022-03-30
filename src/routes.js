import { Navigate, useRoutes, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Login from './page/Login';
import Home from './page/Home';
import HomeLayout from './layouts/home';
import Order from './page/Order';
import Food from './page/Food';
import Customer from './page/Customer';
import Employee from './page/Employee';
import Analytic from './page/Analytic';
import Report from './page/Report';
import CreateFoods from './components/food/CreateFoods';
import OrderChooseFood from './page/OrderChooseFood';
import Book from './page/Book';
import Profile from './page/Profile';
import Error from './page/Error';
import UpdateFoodsForBook from './page/UpdateFoodsForBook';
import PayOrder from './page/PayOrder';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/home" />
    },
    {
      path: '/login',
      element: <Login />
    },
    { path: '/error', element: <Error /> },
    { path: '*', element: <Navigate to="/error" /> },
    {
      path: '/home',
      element: <HomeLayout />,
      children: [
        { path: '', element: <Navigate to="/home/app" /> },
        { path: 'app', element: <Home /> },
        { path: 'order', element: <Order /> },
        { path: 'book', element: <Book /> },
        {
          path: 'food',
          element: <Food />
        },
        { path: 'customer', element: <Customer /> },
        { path: 'employee', element: <Employee /> },
        { path: 'analytic', element: <Analytic /> },
        { path: 'report', element: <Report /> },
        { path: 'update-foods-book', element: <UpdateFoodsForBook /> },
        { path: 'pay-order', element: <PayOrder /> },
        {
          path: 'food-create',
          element: <CreateFoods />
        },
        { path: 'order-choose-food', element: <OrderChooseFood /> },
        { path: 'profile', element: <Profile /> }
      ]
    }
  ]);
}
