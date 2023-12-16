import { Spin } from "antd"
import { RouterProvider } from "react-router-dom"
import "./App.scss"
import { AppRouter } from "./routes/AppRouter"
import { useAppSelector } from "./store"

const App = () => {
  let showSpinner = useAppSelector((state) => {
    return state.globalState.showSpinner
  })

  return (
    <Spin size="large" spinning={showSpinner} style={{ zIndex: "10" }}>
      <RouterProvider router={AppRouter} />
    </Spin>
  )
}

export default App
