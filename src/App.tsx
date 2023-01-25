import { QueryStatus } from '@reduxjs/toolkit/dist/query/react';
import { Spin } from 'antd';
import { useEffect, useMemo } from 'react';
import { Navigate, Outlet, RouterProvider, useNavigate } from 'react-router-dom';
import './App.scss'
import { Home } from './module/Home';
import { AppRouter } from './routes/AppRouter';
import { loginApi } from './shared/redux/api/feature/auth/loginApi';
import { useAppSelector } from './store';

const App = () => {
  


  let showSpinner = useAppSelector((state) => {
    return state.globalState.showSpinner;
  })



  return (
     <Spin size="large" spinning={showSpinner} style={{zIndex:'10'}}>
      <RouterProvider router={AppRouter} />
      </Spin> 
  );

};

export default App
