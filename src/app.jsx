import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getRouter } from '@/router'
import Iconfont from "widget/iconfont"

class App extends Component {

  render() {
    console.log('app', getRouter)
    return (
      <div style={{ height: '100%', background: '#fff' }}>
        {/* 路由配置渲染 */}
        {getRouter}
        <div style={{ width: '100%', position: 'fixed', bottom: 0 }}>
          {/*  除了路由配置部分，其他部分可以写在页面内 */}
          hello haoge
        </div>
      </div>
    )
  }
}
App = withRouter(App)
export default App
