import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Navigate, Route, RouteProps, Routes
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loading from 'components/atoms/Loading';
import MainLayout from 'components/templates/MainLayout';
import { privateRoutes, routes } from 'routes';
import { getAccessToken, removeAccessToken } from 'services/common/storage';
import { getProfileUserService } from 'services/user';
import { store } from 'store';
import { setUserInfo } from 'store/auth';
import { useAppDispatch } from 'store/hooks';
import { DEFAULT_QUERY_OPTION, ROUTES } from 'utils/constants';
import { authKeys } from 'utils/queryKeys';

const PrivateRoute: React.FC<RouteProps> = ({
  path, index, ...props
}) => {
  const token = getAccessToken();
  const dispatch = useAppDispatch();

  const { isFetching } = useQuery(
    authKeys.profile(token || ''),
    getProfileUserService,
    {
      enabled: !!token,
      onSuccess: (res) => {
        dispatch(setUserInfo(res));
      },
      onError: () => {
        removeAccessToken();
      }
    }
  );

  if (isFetching) {
    return <Loading isShow variant="fullScreen" />;
  }

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
      <ToastContainer
        autoClose={1000}
      />
    </QueryClientProvider>
  </Provider>
);

export default AppWrapper;
