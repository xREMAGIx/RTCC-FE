import React from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => (
  <div className="t-mainLayout">
    <Outlet />
  </div>
);

MainLayout.defaultProps = {
  children: undefined,
};

export default MainLayout;
