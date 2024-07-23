import { connect } from 'react-redux'
import proptype from './proptype'
import { updateStore } from './actions';

/**
 *  connectRedux 方法 ，返回一个 由 connect 方法处理好的 容易组件
 *  connectRedux({stateskeys})(component) 或是做为一个装饰器使用
 *  react-redux 的 connect 接受两个参数 mapStateToProps ，mapDispatchToProps
 */
export function connectRedux({stateKeys}) {
  const mapStateToProps = (allState) => {
    // mapStateToProps 方法 ，映射 store state 到 UI 组件的 props 中
    // 该方法，接受 state 作为参数 ， 返回一个对象
    const state = {}
    if (stateKeys) {
      stateKeys.forEach((key) => {
        state[key] = allState.stores[key]
      })
      return {
        stores: state,
      }
    }
  }
  const mapDispatchToProps=(dispatch)=>{
    //将 UI 组件的操作映射成 Action 
    // 该方法接受 dispatch 方法为参数，这个参数可以发起 action ，触发 store 修改
    return {
        dispatch , // 除了下面已经写好的 action 还将 dispatch 方法放在返回的对象中，使 props 可以使用 dispatch 方法发起 action 
        reset:()=>{
          dispatch({type:proptype.reset})
        },
        updateStore:(payload)=>{
          dispatch({type:proptype.updateState,payload})
        }
    }
  }
  // connectRedux 方法 ，返回一个 由 connect 方法处理好的 容易组件
  // connectRedux({stateskeys})(component) 或是做为一个装饰器使用
  return (Component) => connect(mapStateToProps, mapDispatchToProps)(Component)
}

