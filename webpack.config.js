const path = require("path")
const os = require('os')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");


const threads = os.cpus().length // cpu 核数
const isBuild = 'loc' !== '' + process.env.ENV

module.exports = {

  // 入口
  entry: './index.js', // 相对路径

  // 输出
  output: {
    // __dirname node.js 的变量，代表当前文件的文件目录
    path: path.resolve(__dirname, 'dist'), // 绝对路径
    // 输出的文件夹名 ,由于使用了 chunk ，会有多个输出文件，所以文件名使用 原文件名 + hash
    filename: isBuild ? '[name].[contenthash:10].js' : '[name].js',
    // 每次打包时，都清理上次打包内容 （也可以在 package.json 通过脚本命令去清除）
    clean: true
  },
  //加载器
  module: {
    rules: [
      {
        oneOf: [
          // loader 的配置
          {
            // test 匹配规则，只处理后缀为 js jsx 的文件
            test: /\.(js|jsx)$/,
            exclude: /node_modules/, // 排除 node_modules 目录下的文件
            // loader: 'babel-loader', // 使用的loader , loader 属性使用一个 loader ，use属性 则可以使用多个loader 
            // use 使用的加载器名，执行顺序 从左到右/从上到下
            use: [{
              loader: 'thread-loader',// 开启多进程
              options: {
                works: threads, // 进程数量
              }
            }, {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true, // 开启 babel 缓存  ，缓存的文件会放在 node_modules/.cache/babel-loader 下
                cacheCompression: false,// 关闭缓存文件压缩 ，该文件只是缓存文件，不需要去压缩，直接打包的文件才需要压缩
                plugins: ['@babel/plugin-transform-runtime'] //减少代码体积
              }
            }],
          },
          // 处理 css 、less 、sass 等预编译样式文件
          {
            test: /\.(css|less)$/,
            use: [
              isBuild ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              {
                // 放在 css-loader 之后，less-loader 之前
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      'postcss-preset-env' // 能解决大多数兼容问题
                    ]
                  }
                }
              },
              'less-loader'
            ],
          },
          {
            test: /\.(png|jpg|gif|md)$/,
            type: 'asset/resource', // type = asset 时使用 file-loader
            generator: { // 生成文件的相关配置
              filename: 'images/[name]_[hash:10][ext]', // 输出文件命名规则
            },
            parser: {
              dataUrlCondition: {
                // 小时 10KB的图片会转为 base64
                //优点: 减少数量请求，缺点：体积会变大（所以需要限制 小图片才转为 base64
                maxSize: 10 * 1024
              }
            }
          },
          {
            // 字体文件处理
            test: /\.(ttf|woff2?)$/,
            type: 'asset/resource', // 表示对文件原封不动的进行输出
            generator: {
              filename: 'fonts/[name]_[hash:10][ext]', // 输出文件的位置与名称规则
            },
          }
        ]
      }


    ]
  },

  // 插件
  plugins: [
    //插件的配置
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'template/index.html'),// 模板路径 
      filename: 'index.html',
    }),
    new ESLintPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, './src'),
      exclude: "node_modules", // 默认值 ,
      cache: true,// 开启缓存
      cacheLocation: path.resolve(__dirname, './node_modules/.cache/eslintcache'), // 缓存的文件路径
      threads: threads // 开启多进程和设置进程数量
    }),
    new MiniCssExtractPlugin({ // 从 js 分离css ，独立 css 文件
      ignoreOrder: true, // 忽略引用顺序，避免打包报警告，
      filename: "static/index.css" // 输出的 css 路径
    }),
    new CssMinimizerPlugin(),// 压缩 css 
    // new ImageMinimizerPlugin({ // 无损压缩本地图片
    //   minimizerOptions: {
    //     // Lossless optimization with custom option
    //     // Feel free to experiment with options for better result for you
    //     plugins: [
    //       ["gifsicle", { interlaced: true }],
    //       ["jpegtran", { progressive: true }],
    //       ["optipng", { optimizationLevel: 5 }],
    //       // Svgo configuration here https://github.com/svg/svgo#configuration
    //       [
    //         "svgo",
    //         {
    //           plugins: extendDefaultPlugins([
    //             {
    //               name: "removeViewBox",
    //               active: false,
    //             },
    //             {
    //               name: "addAttributesToSVGElement",
    //               params: {
    //                 attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
    //               },
    //             },
    //           ]),
    //         },
    //       ],
    //     ],
    //   },
    // }),
  ],
  optimization: {
    splitChunks: { // 代码分割配置
      chunks: 'all', //  对所有模块都进行分割
      // 以下是默认值, 若需要自定义配置，可进行修改
      // minSize : 20000 ,//分割代码最小的大小
      // minRemainingSize : 0 , // 类似于 minSize ，最后确保提取的文件大小不能为 0 
      // minChunks : 1  , // 至少被引用的次数，满足条件才会被分割
      // maxAsyncRequests : 30  ,// 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口 js 文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过 50 kb 一定会单独打包（此时会忽略minRemainingSize  、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组 ， 哪些模块要打包到一个组
      //   defaultVendors: { // 组名 
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重 （越大越高）
      //     reuseExistingChunk: true, // 如果当前chunk 包含已从主 bundle 中拆分出来的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: {  // 其他没有写的 配置会使用上面的默认值
      //     minChunks: 2, // 这里的 minChunks 权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },

      // 修改配置（实例）
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial', // 只打包初始时依赖的第三方
        },
        antd: {  //  antd 独立打包
          name: 'chunk-antd', // 单独将 antd和其图标 拆包
          priority: 20, // 权重要大于 libs 不然会被打包进 libs 
          test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
          chunks: 'initial', // 只打包入口文件依赖的antd
        },
        chart: { 
          name: 'chunk-chart', // 图表chunk
          priority: 20,
          test: /[\\/]node_modules[\\/](bizcharts|@antv)[\\/]/,
          chunks: 'async', // 图表是异步chunk的，当加载才加载这个大chunk
        },
      },
    },
  },
  // 开发服务器 ， 不会输出资源，在内在中编译打包
  devServer: {
    // open: true, // 启动时，自动打开浏览器并打开页面
    port: 9001,
    host: '0.0.0.0',
    // proxy: { // 服务器代理
    // },
  },
  //模式
  mode: isBuild ? 'production' : 'development',
  devtool: isBuild ? 'source-map' : 'cheap-module-source-map'
}