import { createStore , combineReducers } from "redux";
import reducers from "./reducers";
import { connectRedux } from "./connectRedux";
/**
 * combineReducers 把一个由多个不同 reducer 函数作为 value 的 object 合并成为一个总的 reducers 函数
 * 然后可以对这个 reducers 调用 createStore()。
 */

// 导出一个 创建好的 store , 只需要在app处引入一次
export default createStore(combineReducers({store:reducers}))

export {
  connectRedux
}