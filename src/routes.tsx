import React from 'react';

import { ROUTES } from 'utils/constants';

const Home = React.lazy(() => import('pages/Home'));
const Login = React.lazy(() => import('pages/Login'));
const Welcome = React.lazy(() => import('pages/Welcome'));
const Room = React.lazy(() => import('pages/Room'));
const Register = React.lazy(() => import('pages/Register'));

export const routes = [
  {
    path: ROUTES.WELCOME,
    element: <Welcome />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
  },
];

export const privateRoutes = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.ROOM,
    element: <Room />,
    pathName: '/:code'
  },
];
