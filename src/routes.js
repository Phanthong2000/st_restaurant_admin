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
import Area from './page/Area';
import Table from './page/Table';
import OrderChooseManyFood from './page/OrderChooseManyFood';
import Employee2 from './page/Employee2';
import CustomerDetail from './page/CustomerDetail';
import FoodDetail from './page/FoodDetail';
import Chat from './page/Chat';
import Meeting from './page/Meeting';
import Meeting2 from './page/Meeting2';
import CreateCustomer from './components/customer/CreateCustomer';
import News from './page/News';
import CreateNews from './components/news/CreateNews';
import NewsDetail from './components/news/NewsDetail';

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
        { path: 'customer-detail/:id', element: <CustomerDetail /> },
        { path: 'add-customer', element: <CreateCustomer /> },
        // { path: 'employee', element: <Employee /> },
        { path: 'employee', element: <Employee2 /> },
        { path: 'chat', element: <Chat /> },
        { path: 'chat/meeting/:roomId', element: <Meeting2 /> },
        { path: 'analytic', element: <Analytic /> },
        { path: 'report', element: <Report /> },
        { path: 'update-foods-book', element: <UpdateFoodsForBook /> },
        { path: 'pay-order', element: <PayOrder /> },
        {
          path: 'food-create',
          element: <CreateFoods />
        },
        { path: 'food-detail/:id', element: <FoodDetail /> },
        { path: 'order-choose-food', element: <OrderChooseFood /> },
        { path: 'order-choose-many-food', element: <OrderChooseManyFood /> },
        { path: 'profile', element: <Profile /> },
        { path: 'area', element: <Area /> },
        { path: 'table', element: <Table /> },
        { path: 'news', element: <News /> },
        { path: 'news-create', element: <CreateNews /> },
        { path: 'news-detail/:id', element: <NewsDetail /> }
      ]
    }
  ]);
}
