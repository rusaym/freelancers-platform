import React from 'react'
import SignUpView from './views/SignUpView'
import SignInView from './views/SignInView'
import MainLayout from './layouts/mainLayout/MainLayout'
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout'
import OrderListView from './views/OrderListView'
import OrderView from './views/orders/OrderView'
import { Navigate } from 'react-router'
import OrderEditView from './views/orders/OrderEditView'
import MessangerView from './views/MessangerView'
import AccountView from './views/AccountView'

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to='auction' />,
      },

      { path: 'orders', element: <OrderListView /> },
      { path: 'orders/page/:pageNumber', element: <OrderListView /> },
      { path: 'orders/search/:keyword', element: <OrderListView /> },
      {
        path: 'orders/search/:keyword/page/:pageNumber',
        element: <OrderListView />,
      },
      { path: 'orders/create', element: <OrderEditView /> },
      { path: 'orders/edit/:id', element: <OrderEditView mode='edit' /> },
      { path: 'orders/view/:id', element: <OrderView mode='edit' /> },

      { path: 'auction', element: <OrderListView mode='auction' /> },
      {
        path: 'auction/page/:pageNumber',
        element: <OrderListView mode='auction' />,
      },
      {
        path: 'auction/search/:keyword',
        element: <OrderListView mode='auction' />,
      },
      {
        path: 'auction/search/:keyword/page/:pageNumber',
        element: <OrderListView mode='auction' />,
      },
      { path: 'messages', element: <MessangerView /> },
      { path: 'account', element: <AccountView /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/app/auction'} />,
      },
      { path: 'signup', element: <SignUpView /> },
      { path: 'signin', element: <SignInView /> },
    ],
  },
]

export default routes
