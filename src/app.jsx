import React, { Component } from 'react'
import {HashRouter as Router,  Route, Switch, Redirect,withRouter } from "react-router-dom";
import Layout from '@/widget/Layout/Layout';


class App extends Component {
  render() {
    return (
      <Router>
        {/* 路由配置渲染 */}
          <Switch>
            {/* <Route path={'/login'} component={Login} /> */}
            <Route path={'/'} component={Layout} />
          </Switch>
      </Router>
    )
  }
}
// App = withRouter(App)
export default App
