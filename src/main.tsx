import { ConfigProvider, FloatButton } from "antd"
import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.scss"
import { store } from "./store"
import "chart.js/auto"
import { Chart, Colors } from "chart.js"

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
}
Chart.register(Colors)
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      form={{ validateMessages }}
      theme={{
        components: {
          Switch: {
            colorPrimary: "green",
          },
        },
        token: {
          colorPrimary: "#800000",
        },
      }}
    >
      <Provider store={store}>
        <App />
        <FloatButton.BackTop />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
