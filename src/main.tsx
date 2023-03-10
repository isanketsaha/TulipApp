import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.scss'
import { AppRouter } from './routes/AppRouter'
import { store } from './store'

const validateMessages = {
  required: '${label} is required!',
  types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
  },
};
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider form={{validateMessages}}
      theme={{
        components:{
          Switch: {
            colorPrimary: 'green'
          }
        },
        token: {
          colorPrimary: '#800000',
          fontSize: 15,

        },
      }}
    >
      <Provider store={store}>
        <App/>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
)
