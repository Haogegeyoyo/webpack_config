/**
 * 路由 router
 * author : haoge
 */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "@/pages/Home";
import FunComponent from "@/pages/FunComponent";

// 路由配置，路由配置列表，将需要访问到的路由在这里进行配置
// 可以将路由模块化，在其他文件以这个结构写， 然后再到这里用 展开运算符展开即可
const routerList = [
  {
    path: "/home",
    // component:(props)=>  <Home {...props} />
    render: (props) => <Home {...props} />,
  },
  {
    path: "/FunComponent",
    // component:(props)=>  <Home {...props} />
    render: (props) => <FunComponent {...props} />,
  },
  // {
  //   path :'/404',
  //   component : 'notFound'
  // },
];

const getRouter = (
  <div>
    <Switch>
      {
        // 通过 map 方法， 进行路由列表配置，并在 app.js 处渲染
        routerList.map((item, idx) => {
          return (
            <Route
              key={"route" + idx}
              path={item.path}
              render={item.render}
              exact
            />
          );
        })
      }
    </Switch>
  </div>
);

export { getRouter };
