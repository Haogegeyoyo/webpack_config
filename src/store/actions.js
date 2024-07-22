import proptype from "./proptype";


// action 创建函数 ，使用 action 创建函数，得到对应的 action 从而 触发 state 的更改
export const resetStore=()=>{
  return {type : proptype.reset }
}

export const updateStore=(payload)=>{
  return {
      type : proptype.updateState,
      payload
   }
}
