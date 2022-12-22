import React, { FC } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { useAppSelector } from "../store";
export const ProtectedRoutes : FC = ({...rest}) => {

    let userLogged = useAppSelector((state) => {
        return state.userAuth.user != null;
      });
      
      return userLogged ? (
        <Outlet/>
    ) : (
      <Navigate to="/login" replace /> 
    );

}