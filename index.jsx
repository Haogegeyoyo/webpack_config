import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './src/app';
// import './index.less'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import store from "@/store/"

// const Router = process.env.NODE_ENV === 'development' ? HashRouter : BrowserRouter;
const Router = HashRouter 


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  // <React.StrictMode>
  //  需要路由监听的，统统放在 <Router> 组件下，<app>
  <Provider store={store}>
      <Router>
        <App />
      </Router>
  </Provider>,
  // </React.StrictMode>,
  
);