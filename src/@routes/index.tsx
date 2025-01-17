import React from 'react';

import { createBrowserRouter } from 'react-router-dom';
import { Loader } from '../components/loader';
import { Login } from '../modules/login/pages';
import { ProtectedRoute } from './protected-route';

const Journey = React.lazy(() => import('../modules/journey/pages'));
const NotFound = React.lazy(() => import('../components/404'));
const Layout = React.lazy(() => import('../@layout'));
const Vehicle = React.lazy(() => import('../modules/vehicle/pages'));
const Driver = React.lazy(() => import('../modules/driver/pages'));
const Route = React.lazy(() => import('../modules/route/pages'));

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <React.Suspense fallback={<Loader />}>
            <Driver />
          </React.Suspense>
        ),
        index: true,
      },
      {
        path: 'driver',
        element: (
          <React.Suspense fallback={<Loader />}>
            <Driver />
          </React.Suspense>
        ),
      },
      {
        path: 'journey',
        element: (
          <React.Suspense fallback={<Loader />}>
            <Journey />
          </React.Suspense>
        ),
      },
      {
        path: 'route',
        element: (
          <React.Suspense fallback={<Loader />}>
            <Route />
          </React.Suspense>
        ),
      },
      {
        path: 'vehicle',
        element: (
          <React.Suspense fallback={<Loader />}>
            <Vehicle />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
