import React from "react";
import { Route, Switch,withRouter } from "react-router-dom";
import  {routerList}  from '@/router/index'

// 布局
const  Layout = function(props){
  return (
    <Switch>
    {
      // 通过 map 方法， 进行路由列表配置，并在 app.js 处渲染
      routerList.map((item, idx) => {
        const WarpComponent = item.component
        return (
          <Route
            key={"route" + idx}
            render={item.render}
            exact
          >
            <WarpComponent />
          </Route>
        );
      })
    }
  </Switch>
  )
}

export default Layout