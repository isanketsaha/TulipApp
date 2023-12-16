import { QueryStatus } from "@reduxjs/toolkit/dist/query/react"
import { Spin } from "antd"
import { Navigate, Outlet, RouterProvider, useNavigate } from "react-router-dom"
import "./App.scss"
import { AppRouter } from "./routes/AppRouter"
import { useAppSelector } from "./store"
import { SpeedInsights } from "@vercel/speed-insights/next"

const App = () => {
  let showSpinner = useAppSelector((state) => {
    return state.globalState.showSpinner
  })

  return (
    <Spin size="large" spinning={showSpinner} style={{ zIndex: "10" }}>
      <RouterProvider router={AppRouter} />
      <SpeedInsights />
    </Spin>
  )
}

export default App
