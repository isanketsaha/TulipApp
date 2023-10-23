import React, { FC } from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { useAppSelector } from "../store";


export const ProtectedRoutes: FC = ({ ...rest }) => {
  const { user } = useAppSelector(state => state.userAuth);
  return user ? <Outlet /> : <Navigate to="/login" replace />
}