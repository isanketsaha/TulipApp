import { QueryStatus } from '@reduxjs/toolkit/dist/query/react';
import { Spin } from 'antd';
import { useEffect, useMemo } from 'react';
import { Navigate, Outlet, RouterProvider, useNavigate } from 'react-router-dom';
import './App.scss'
import { Home } from './module/Home';
import { AppRouter } from './routes/AppRouter';
import { loginApi } from './shared/redux/api/auth/loginApi';
import { useAppSelector } from './store';

const App = () => {
  

  let isLoading = useAppSelector((state) => {
    return Object.values(state.loginApi.queries).some((query) => {
      return query && query.status === QueryStatus.pending;
    });
  });

  let userLogged = useAppSelector((state) => {
    return state.userAuth.user != null || undefined;
  })


  useMemo(() => {

  }, [isLoading])



  return (
     <Spin size="large" spinning={isLoading} >
      <RouterProvider router={AppRouter} />
      </Spin> 
  );

};

export default App
