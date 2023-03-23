import './App.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Navigate, Route, RouteProps, Routes
} from 'react-router-dom';

import Loading from 'components/atoms/Loading';
import MainLayout from 'components/templates/MainLayout';
import { privateRoutes, routes } from 'routes';
import { getAccessToken } from 'services/common/storage';
import { store } from 'store';
import { useAppDispatch } from 'store/hooks';
import { DEFAULT_QUERY_OPTION, ROUTES } from 'utils/constants';

const PrivateRoute: React.FC<RouteProps> = ({
  path, index, ...props
}) => {
  const token = getAccessToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getProfileUser = async () => { };
    if (token) {
      getProfileUser();
    }
  }, [dispatch, token]);

  if (!token) {
    return <Navigate to={`/${ROUTES.WELCOME}`} state={{ from: index ? '/' : path }} replace />;
  }

  return (
    <div>
      {props.children}
    </div>
  );
};

const App: React.FC = () => (
  <Suspense fallback={<Loading isShow variant="fullScreen" />}>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((item, index) => (
            <Route
              key={`router-${index.toString()}`}
              path={item.path}
              element={item.element}
            />
          ))}
          {privateRoutes.map((item, index) => (
            <Route
              key={`router-${index.toString()}`}
              path={`${item.path}${item.pathName || ''}`}
              element={(
                <PrivateRoute
                  path={`${item.path}${item.pathName || ''}`}
                >
                  {item.element}
                </PrivateRoute>
              )}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </Suspense>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...DEFAULT_QUERY_OPTION,
    },
  },
});

const AppWrapper: React.FC = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);

export default AppWrapper;
