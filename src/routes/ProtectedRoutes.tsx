import React, { FC } from "react"
import {  Outlet, Route } from "react-router-dom"
import { useAppSelector } from "../store";
export const ProtectedRoutes : FC = ({...rest}) => {

    let userLogged = useAppSelector((state) => {
        return state.userAuth.idToken != null || undefined;
      })
      
      return userLogged ? ( //Check if logged in
      <>
        {rest} //This is your children
        <Outlet /> //This is your nested route
      </>
    ) : (
      <></> //Go back to login if not logged in
    );

}