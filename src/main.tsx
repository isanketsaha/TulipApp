import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import './index.scss'
import { AppRouter } from './routes/AppRouter'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#800000',
          fontSize: 16

        },
      }}
    >
      <Provider store={store}>
        <App/>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
)
