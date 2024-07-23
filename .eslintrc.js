module.exports={

  env: {
    browser: true,
    es6: true,
  },

  // parser解构器
  parser : "babel-eslint",

  plugins: ['react', 'react-hooks',"jsx-a11y"],
    
  //继承规则
  extends: ['eslint:recommended', 'plugin:react/recommended'],

  // 解析选项
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },

   //具体检查规则
   rules: {
    'no-unused-vars': 0, // 允许存在未引用的变量
   },
}