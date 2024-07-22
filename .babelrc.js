module.exports = {
  presets :[ [
      "@babel/preset-env",// 智能预设，编译 ES6的语法
      {
        useBuiltIns : 'usage', // 按需引入
        corejs : 3 // 使用版本为3 的 core-js
      }
    ]  
  ]
}