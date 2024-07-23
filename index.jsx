import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from '@/app';
// import './index.less'
import store from "@/store/"

ReactDOM.render(
  // <React.StrictMode>
  //  需要路由监听的，统统放在 <Router> 组件下，<app>
  <Provider store={store}>
        <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('app')
);