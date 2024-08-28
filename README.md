# webpack_config

## 项目架构
  
project-root
│
├── public / template
│   └── index.html
├── src
│   ├── assets
│   │   └── images
│   │       └── xxx.svg
│   │   └── css
│   │       └── global.css
│   ├── bizComponents  // 业务组件
│   │   └── xxx // 
│   ├── components // 公共组件
│   │   └── Button // 组件的主要封装思路：状态 hooks 与视图 view  , 对接外层数据时，统一在 index 进行处理，保证 view 与 hooks 纯净
│   │       ├── view.js   // ui 容器 
│   │       ├── hooks.js  // 使用自定义 hooks ，进行状态管理，处理逻辑等
│   │       ├── style.css // 样式文件
│   │       └── index.js  // 外层数据处理，统一数据格式
│   ├── hooks // 公共自定义hooks 
│   │     ├── useMapStore.js // 通过 hooks 映射 store 
│   │     └── useXXX.js
|   ├── pages
│   │   └── HomePage
│   │       ├── view.js
│   │       ├── hooks.js
│   │       ├── service.js
│   │       └── style.css
│   ├── redux
│   │     ├── index.js
│   │     ├── reducers.js
│   │     ├── connectRedux.js
│   │     └── action.js
│   ├── router
│   │     ├── index.js
│   │     └── homeRouter.js
│   ├── store
│   │     ├── index.js
│   │     └── global.js
│   ├── utils
│   │     ├── index.js
│   │     └── xxx.js
│   ├── app.js
│   └── index.less
│
├── .gitignore
├── package.json
├── package-lock.json
├── webpack.config.js
└── other.config.js


## 组件封装思路
从最简单的 ，iconfont , button 等组件开始封装，主要思想是，组件的状态 hoos 与 视图 view 尽量分离，并且外层的数据高阶组件的处理， view 和 hooks 保持纯净。