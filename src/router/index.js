/**
 * 路由 router
 * author : haoge
 */
import React from "react";
import Loadable from 'react-loadable'
import homeRouter from "./homeRouter";

const importComponent = (importPromise) => {
  console.log(55555)
  return importPromise.catch((err) => {
    console.error('↓↓↓ 此错误大概率是访问了未定义的变量，请检查出错位置（定义变量必须在使用变量之前） ↓↓↓\n', err)
  })
}

// 路由配置，路由配置列表，将需要访问到的路由在这里进行配置
// 可以将路由模块化，在其他文件以这个结构写， 然后再到这里用 展开运算符展开即可
const routerList = [
  {
    // 函数组件示例页面
    path: '/FunComponent',
    title: '组件示例',
    keepAlive: true,
    component: Loadable({
      loader: () => importComponent(import('@/pages/FunComponent')),
      loading: () => (
        <div>
          加载中
        </div>
      ),
    }),
  },
  {
    // 函数组件示例页面
    path: '/home',
    title: '主页',
    keepAlive: true,
    component: Loadable({
      loader: () => importComponent(import('@/pages/home')),
      loading: () => (
        <div>
          加载中
        </div>
      ),
    }),
  },

  ...homeRouter
];

export { routerList };
