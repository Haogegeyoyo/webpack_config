import axios from 'axios'
import homeUrl from './api/home'
const ConfigBaseURL = 'https://localhost:3000/' // 暂时使用这个路径，正式需要在 config.js 里配置不同环境的 url

  // 初始请求配置
  let accessToken = 7 * 24 * 60 * 60 
  const initRequest =axios.create({
      baseURL: ConfigBaseURL,  // 基础路径配置
      timeout: 5000,
      headers: {
        'content-type': 'application/json',
        'access-token': accessToken, // accessToken 过期时间一周
        
      }  ,
     

  }) 
  // 请求函数
  function request(params){
  let { url = '', method = 'GET', data = {}, header = {}} = params
   // 返回一个请求函数
   return initRequest({ 
      url : url,
      method:method,
      data:data,
      }
   );
 }
 
 
  // 处理发送请求，统一捕获错误，统一返回数据
  async function sendReq (option){
    let res = await request(option)
    
    console.log("执行了该方法",res)
    // if (res && parseInt(res.data.resultCode) === 401) {

    // } else {

    // }
    // return await handleReqCode(res, _apiOpts)
    return res
  }
// 添加请求拦截器
// initRequest.interceptors.request.use(config => {
//   loadingInstance = Loading.service({
//     lock: true,
//     text: 'loading...'
//   })
//   return config
// })
// // 添加响应拦截器
// initRequest.interceptors.response.use(response => {
//   loadingInstance.close()
//   // console.log(response)
//   return response.data
// }, error => {
//   console.log('TCL: error', error)
//   const msg = error.Message !== undefined ? error.Message : ''
//   Message({
//     message: '网络错误' + msg,
//     type: 'error',
//     duration: 3 * 1000
//   })
//   loadingInstance.close()
//   return Promise.reject(error)
// })


/**
  * apiUrl 列表的类型为 
  *
  * objType: { method: 'post', url: '/v1/reservationOrder/cancel' }, // 对象类型
  * funcType: params => {
    return { method: 'get', url: '/v1/reservationOrder/' + params.id }
        },// 函数类型
  *
  *
 */
let apiUrl = {
  ...homeUrl
}
let apis={
  request:request
}


/**
     将 apiUrl 的列表进行映射， 并以一定的格式添加进 apis 中
     以 apiUrl 的 key 值 做为函数名，调用时  apis.Name(params) 
 */
Object.keys(apiUrl).map(key=>{
   if (apis[key]) {
     // 如果 apis 中已经存在这个 接口名了，就不添加进 apis 中
  } 
  else {
    let item =apiUrl[key] 

    // apis[key]  为一个 function 
    apis[key] = async (params={}) =>{
      let _apiOpts =params._apiOpts || {}

       let opts =
        typeof item == 'function' ? item(params) : { ...item, data: params } 
        /**  如果 item （apiUrl[key] 当前 apiUrl） 是 函数，
        则执行这个函数，得到返回的对象*/

      opts._apiOpts =_apiOpts                                                
      let res = await sendReq(opts)  
      // apis[key] 方法最终返回 接口数据     
      return res                                              
    }
  }
})

// 导出 apis 

export default apis